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
      const { data } = await supabase.from('aulas').select('*');
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
      
      const { data } = await supabase
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
    
    // Adjust firstDay (0 is Sunday, we want 0 for Monday)
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
            subject: 'Confirmación de tu reserva - Adimentek',
            html: `
              <div style="font-family: sans-serif; color: #333;">
                <h1 style="color: #5e17eb;">¡Reserva recibida!</h1>
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
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'No se pudo guardar la reserva. Verifica la tabla "reservas" en Supabase.';
      setError(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto" onClick={onClose}>
      <div className="relative w-full max-w-4xl bg-[#0b0617] border border-brand-purple/20 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
        
        {/* Left Side: Calendar & Selection */}
        <div className="flex-1 p-8 lg:p-12 border-b md:border-b-0 md:border-r border-slate-900">
          <h2 className="text-3xl font-black mb-2 text-white">Reserva <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-magenta">Visual</span></h2>
          <p className="text-slate-500 text-sm mb-8">Elige tu fecha y turno preferido.</p>

          <div className="space-y-8">
            {/* Custom Calendar Grid */}
            <div className="bg-[#07020d] p-6 rounded-3xl border border-slate-900">
              <div className="flex justify-between items-center mb-6">
                <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))} className="text-slate-400 hover:text-white">←</button>
                <span className="font-bold text-brand-cyan capitalize">{currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</span>
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
                        isSelected ? 'bg-gradient-to-r from-brand-purple to-brand-magenta text-white scale-110 shadow-lg shadow-brand-purple/20' : 
                        isToday ? 'border border-brand-magenta/50 text-brand-magenta' : 'text-slate-400 hover:bg-slate-900'
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
                         formData.shift === t ? 'bg-brand-purple/10 border-brand-purple text-brand-cyan' : 
                         isShiftDisabled ? 'bg-slate-950 border-slate-900 text-slate-700 opacity-30 cursor-not-allowed' :
                         'bg-[#07020d] border-slate-900 text-slate-500 hover:border-slate-800'
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
        <div className="w-full md:w-[380px] bg-slate-950/40 backdrop-blur-xl p-8 lg:p-12 flex flex-col border-t md:border-t-0 md:border-l border-slate-900">
          <h3 className="text-xl font-bold mb-6 text-white">Aulas Disponibles</h3>
          <div className="space-y-3 mb-8 flex-grow">
            {classrooms.map(c => {
              const isBusy = existingReservations.some(r => r.classroom_name === c.name);
              const isSelected = formData.selectedClassrooms.includes(c.id.toString());
              
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
                    isDisabled ? 'opacity-20 grayscale border-slate-900 cursor-not-allowed' : isSelected ? 'bg-gradient-to-r from-brand-purple to-brand-magenta text-white border-transparent font-bold' : 'bg-[#07020d] border-slate-900 text-slate-400 hover:border-slate-800'
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
            <input type="text" name="name" required placeholder="Tu Nombre" value={formData.name} onChange={handleInputChange} className="w-full bg-[#07020d] border border-slate-900 rounded-xl p-4 text-sm text-white focus:border-brand-cyan outline-none" />
            <div className="grid grid-cols-1 gap-4">
              <input type="email" name="email" required placeholder="Tu Email" value={formData.email} onChange={handleInputChange} className="w-full bg-[#07020d] border border-slate-900 rounded-xl p-4 text-sm text-white focus:border-brand-cyan outline-none" />
              <input type="tel" name="phone" required placeholder="Tu Teléfono" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#07020d] border border-slate-900 rounded-xl p-4 text-sm text-white focus:border-brand-cyan outline-none" />
            </div>
            
            <div className="bg-brand-purple/10 p-5 rounded-2xl border border-brand-purple/20 text-center">
              <div className="text-[10px] uppercase font-black text-brand-cyan/70 tracking-widest mb-1">Total a pagar</div>
              <div className="text-3xl font-black text-brand-cyan">{priceCalculation.total}</div>
            </div>

            {error && <div className="text-red-500 text-xs text-center font-bold px-2">{error}</div>}

            <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-brand-purple to-brand-magenta hover:brightness-110 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-brand-purple/20">
              {isLoading ? 'Procesando...' : 'Confirmar Reserva'}
            </button>
          </form>
        </div>

        <button onClick={onClose} className="absolute top-8 right-8 text-slate-500 hover:text-white text-3xl font-light">&times;</button>
        
        {isSuccess && (
          <div className="absolute inset-0 bg-[#07020d] z-50 flex flex-col items-center justify-center text-center p-12 animate-in fade-in duration-500">
            <div className="mb-6 flex justify-center">
              <div className="w-24 h-24 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-cyan">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h2 className="text-4xl font-black mb-4">¡Reserva Confirmada!</h2>
            <p className="text-slate-400 mb-10 max-w-sm font-light">Hemos registrado tu estancia. Te llegará un email de confirmación en unos minutos.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <button 
                onClick={() => {
                  setIsSuccess(false);
                  setFormData(prev => ({ ...prev, selectedClassrooms: [] }));
                  setError(null);
                }} 
                className="flex-1 bg-gradient-to-r from-brand-purple to-brand-magenta text-white px-8 py-4 rounded-full font-black hover:brightness-110 transition-all shadow-xl shadow-brand-purple/20"
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
