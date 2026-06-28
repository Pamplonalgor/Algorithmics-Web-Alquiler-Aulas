'use client';

import { useState, useMemo, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Classroom, Reservation } from '@/lib/types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAula?: string;
}

export default function BookingModal({ isOpen, onClose, selectedAula }: BookingModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [existingReservations, setExistingReservations] = useState<Reservation[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    selectedClassrooms: [] as string[],
    date: new Date().toISOString().split('T')[0],
    shift: 'morning'
  });

  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Fetch all classrooms and handle initial shift selection
  useEffect(() => {
    async function fetchClassrooms() {
      const { data, error } = await supabase.from('aulas').select('*');
      if (data) {
        setClassrooms(data);
        
        // If a specific aula is selected, ensure the default shift is available
        if (selectedAula) {
          const target = data.find(c => c.name === selectedAula);
          if (target) {
            if (target.is_available_morning === false && target.is_available_afternoon !== false) {
              setFormData(prev => ({ ...prev, shift: 'afternoon' }));
            } else if (target.is_available_morning === false && target.is_available_afternoon === false && target.is_available_full !== false) {
              setFormData(prev => ({ ...prev, shift: 'full' }));
            }
          }
        }
      }
    }
    fetchClassrooms();
  }, [selectedAula]);

  // Fetch reservations for the selected date/shift and for the current month view
  useEffect(() => {
    async function checkAvailability() {
      if (!formData.date || !formData.shift) return;
      
      const { data, error } = await supabase
        .from('reservas')
        .select('*')
        .eq('date', formData.date)
        .eq('shift', formData.shift);
      
      if (data) setExistingReservations(data);
    }
    checkAvailability();
  }, [formData.date, formData.shift, classrooms]);

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();
    
    // Adjust firstDay (0 is Sunday, we want 0 for Monday or just handle it)
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
    
    return { adjustedFirstDay, days, year, month };
  }, [currentMonth]);

  const priceCalculation = useMemo(() => {
    let total = 0;
    const summaries: string[] = [];
    formData.selectedClassrooms.forEach(id => {
      const classroom = classrooms.find(c => c.id.toString() === id.toString()) || classrooms.find(c => c.name === id);
      if (classroom) {
        const price = formData.shift === 'full' ? (classroom.price_full || 80) : (classroom.price_half || 50);
        total += price;
        summaries.push(classroom.name);
      }
    });
    return {
      summary: summaries.length > 0 ? `${summaries.join(', ')}` : 'Ninguna seleccionada',
      total: `${total}€`
    };
  }, [formData.selectedClassrooms, formData.shift, classrooms]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.selectedClassrooms.length === 0) {
      setError('Selecciona al menos un aula.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const reservations = formData.selectedClassrooms.map(id => {
        const classroom = classrooms.find(c => c.id.toString() === id.toString()) || classrooms.find(c => c.name === id);
        const price = formData.shift === 'full' ? (classroom?.price_full || 80) : (classroom?.price_half || 50);
        
        return {
          classroom_name: classroom?.name || id,
          user_name: formData.name,
          user_email: formData.email,
          user_phone: formData.phone,
          date: formData.date,
          shift: formData.shift,
          total_price: price
        };
      });

      const { error: insertError } = await supabase.from('reservas').insert(reservations);
      if (insertError) throw insertError;

      // Send emails
      try {
        const { data: config } = await supabase.from('config').select('admin_email').single();
        const adminEmail = config?.admin_email || 'pamplona@algoacademy.es';

        await fetch('/api/send-email', {
          method: 'POST',
          body: JSON.stringify({
            to: formData.email,
            adminEmail: adminEmail,
            type: 'Reserva de Aula',
            subject: 'Confirmación de tu reserva - Aula Web',
            html: `
              <div style="font-family: sans-serif; color: #333;">
                <h1 style="color: #f59e0b;">¡Reserva recibida!</h1>
                <p>Hola <strong>${formData.name}</strong>,</p>
                <p>Hemos recibido tu solicitud de reserva para:</p>
                <ul>
                  ${reservations.map(r => `<li>${r.classroom_name} - ${r.date} (${r.shift === 'morning' ? 'Mañana' : r.shift === 'afternoon' ? 'Tarde' : 'Completo'})</li>`).join('')}
                </ul>
                <p><strong>Teléfono de contacto:</strong> ${formData.phone}</p>
                <p><strong>Total estimado:</strong> ${priceCalculation.total}</p>
                <p>Nos pondremos en contacto contigo muy pronto.</p>
              </div>
            `
          })
        });
      } catch (emailErr) {
        console.error("Non-critical email error:", emailErr);
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(`Error: ${err.message || 'No se pudo guardar la reserva. Verifica la tabla "reservas" en Supabase.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto" onClick={onClose}>
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row" onClick={e => e.stopPropagation()}>
        
        {/* Left Side: Calendar & Selection */}
        <div className="flex-1 p-8 lg:p-12 border-b md:border-b-0 md:border-r border-slate-800">
          <h2 className="text-3xl font-black mb-2 text-white">Reserva <span className="text-amber-500">Visual</span></h2>
          <p className="text-slate-500 text-sm mb-8">Elige tu fecha y turno preferido.</p>

          <div className="space-y-8">
            {/* Custom Calendar Grid */}
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800">
              <div className="flex justify-between items-center mb-6">
                <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))} className="text-slate-400 hover:text-white">←</button>
                <span className="font-bold text-amber-500 capitalize">{currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</span>
                <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))} className="text-slate-400 hover:text-white">→</button>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-black text-slate-600 mb-4 tracking-widest">
                {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(d => <div key={d}>{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: daysInMonth.adjustedFirstDay }).map((_, i) => <div key={i}></div>)}
                {Array.from({ length: daysInMonth.days }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = `${daysInMonth.year}-${String(daysInMonth.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const isSelected = formData.date === dateStr;
                  const isToday = new Date().toISOString().split('T')[0] === dateStr;
                  
                  return (
                    <button 
                      key={day}
                      onClick={() => setFormData(prev => ({ ...prev, date: dateStr }))}
                      className={`h-10 w-full rounded-xl flex items-center justify-center font-bold transition-all text-sm ${
                        isSelected ? 'bg-amber-500 text-slate-950 scale-110 shadow-lg shadow-amber-500/20' : 
                        isToday ? 'border border-amber-500/50 text-amber-500' : 'text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
               <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Turno</label>
               <div className="grid grid-cols-3 gap-3">
                 {['morning', 'afternoon', 'full'].map(t => {
                   // Check if ANY of the selected classrooms or the pre-selected one block this shift
                   const targetClassroom = selectedAula ? classrooms.find(c => c.name === selectedAula) : null;
                   
                   let isShiftDisabled = false;
                   if (targetClassroom) {
                     if (t === 'morning' && targetClassroom.is_available_morning === false) isShiftDisabled = true;
                     if (t === 'afternoon' && targetClassroom.is_available_afternoon === false) isShiftDisabled = true;
                     if (t === 'full' && targetClassroom.is_available_full === false) isShiftDisabled = true;
                   }

                   return (
                     <button 
                      key={t}
                      type="button"
                      disabled={isShiftDisabled}
                      onClick={() => setFormData(prev => ({ ...prev, shift: t }))}
                      className={`py-3 rounded-2xl font-bold text-xs transition-all border ${
                        formData.shift === t ? 'bg-amber-500/10 border-amber-500 text-amber-500' : 
                        isShiftDisabled ? 'bg-slate-950 border-slate-900 text-slate-700 opacity-30 cursor-not-allowed' :
                        'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'
                      }`}
                     >
                       {t === 'morning' ? 'Mañana' : t === 'afternoon' ? 'Tarde' : 'Completo'}
                     </button>
                   );
                 })}
               </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form & Summary */}
        <div className="w-full md:w-[380px] bg-slate-900/50 p-8 lg:p-12 flex flex-col">
          <h3 className="text-xl font-bold mb-6 text-white">Aulas Disponibles</h3>
          <div className="space-y-3 mb-8 flex-grow">
            {classrooms.map(c => {
              const isBusy = existingReservations.some(r => r.classroom_name === c.name);
              const isSelected = formData.selectedClassrooms.includes(c.id.toString());
              
              // New availability check
              const isAvailableForShift = 
                formData.shift === 'morning' ? c.is_available_morning !== false :
                formData.shift === 'afternoon' ? c.is_available_afternoon !== false :
                formData.shift === 'full' ? c.is_available_full !== false : true;

              const isDisabled = isBusy || !isAvailableForShift;

              return (
                <button 
                  key={c.id}
                  disabled={isDisabled}
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      selectedClassrooms: isSelected ? prev.selectedClassrooms.filter(id => id !== c.id.toString()) : [...prev.selectedClassrooms, c.id.toString()]
                    }));
                  }}
                  className={`w-full flex justify-between items-center p-4 rounded-2xl border transition-all ${
                    isDisabled ? 'opacity-20 grayscale border-slate-800 cursor-not-allowed' : isSelected ? 'bg-amber-500 border-amber-500 text-slate-950 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col items-start">
                    <span className="text-sm">{c.name}</span>
                    {!isAvailableForShift && <span className="text-[10px] text-red-500 font-bold">No disp. este turno</span>}
                  </div>
                  <span className="text-[10px] opacity-60">{isBusy ? 'Ocupado' : c.size}</span>
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" required placeholder="Tu Nombre" value={formData.name} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-white focus:border-amber-500 outline-none" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="email" name="email" required placeholder="Tu Email" value={formData.email} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-white focus:border-amber-500 outline-none" />
              <input type="tel" name="phone" required placeholder="Tu Teléfono" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-white focus:border-amber-500 outline-none" />
            </div>
            
            <div className="bg-amber-500/10 p-5 rounded-2xl border border-amber-500/20 text-center">
              <div className="text-[10px] uppercase font-black text-amber-500/50 tracking-widest mb-1">Total a pagar</div>
              <div className="text-3xl font-black text-amber-500">{priceCalculation.total}</div>
            </div>

            {error && <div className="text-red-500 text-xs text-center font-bold px-2">{error}</div>}

            <button type="submit" disabled={isLoading} className="w-full bg-amber-500 text-slate-950 font-black py-5 rounded-2xl hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20">
              {isLoading ? 'Procesando...' : 'Confirmar Reserva'}
            </button>
          </form>
        </div>

        <button onClick={onClose} className="absolute top-8 right-8 text-slate-500 hover:text-white text-3xl font-light">&times;</button>
        
        {isSuccess && (
          <div className="absolute inset-0 bg-slate-950 z-50 flex flex-col items-center justify-center text-center p-12 animate-in fade-in duration-500">
            <div className="text-8xl mb-6 animate-bounce">✨</div>
            <h2 className="text-4xl font-black mb-4">¡Reserva Confirmada!</h2>
            <p className="text-slate-400 mb-10 max-w-sm">Hemos registrado tu estancia. Te llegará un email de confirmación en unos minutos.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <button 
                onClick={() => {
                  setIsSuccess(false);
                  setFormData(prev => ({ ...prev, selectedClassrooms: [] }));
                  setError(null);
                }} 
                className="flex-1 bg-amber-500 text-slate-950 px-8 py-4 rounded-full font-black hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20"
              >
                Reservar otro día
              </button>
              <button 
                onClick={onClose} 
                className="flex-1 bg-slate-800 text-white px-8 py-4 rounded-full font-black hover:bg-slate-700 transition-all"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

