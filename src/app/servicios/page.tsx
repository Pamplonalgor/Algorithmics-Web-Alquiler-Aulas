'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Service } from '@/lib/types';

const getIconComponent = (iconStr: string) => {
  switch (iconStr) {
    case '🏫':
    case 'classroom':
      return (
        <svg className="w-16 h-16 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    case '🛠️':
    case 'tools':
    case 'settings':
      return (
        <svg className="w-16 h-16 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case '🎓':
    case 'education':
    case 'academic':
      return (
        <svg className="w-16 h-16 text-brand-magenta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    default:
      return (
        <svg className="w-16 h-16 text-brand-cyan" viewBox="20 15 85 85" fill="currentColor">
          <path d="M 83 37 Q 83 52 93 52 Q 83 52 83 67 Q 83 52 73 52 Q 83 52 83 37 Z" />
        </svg>
      );
  }
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error: fetchError } = await supabase.from('servicios').select('*');
        if (fetchError) throw fetchError;
        if (data) setServices(data);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.error('Error fetching services:', errorMessage);
        setError('No se pudieron cargar los servicios. Por favor, inténtalo de nuevo más tarde.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error: insertError } = await supabase
        .from('solicitudes_servicios')
        .insert([{
          service_id: selectedService?.id,
          service_title: selectedService?.title,
          user_name: formData.name,
          user_email: formData.email,
          description: formData.message,
          created_at: new Date().toISOString()
        }]);

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
            type: `Solicitud de Servicio: ${selectedService?.title}`,
            subject: 'Recibida tu solicitud de información - Adimentech',
            html: `
              <div style="font-family: sans-serif; color: #333;">
                <h1 style="color: #5e17eb;">¡Solicitud recibida!</h1>
                <p>Hola <strong>${formData.name}</strong>,</p>
                <p>Gracias por interesarte en nuestro servicio de <strong>${selectedService?.title}</strong>.</p>
                <p><strong>Tu mensaje:</strong></p>
                <blockquote style="background: #f3f4f6; padding: 15px; border-left: 4px solid #5e17eb;">
                  ${formData.message}
                </blockquote>
                <p>Nuestro equipo revisará tu solicitud y te contactará en menos de 24 horas.</p>
                <hr />
                <p style="font-size: 12px; color: #999;">Este es un mensaje automático de Adimentech.</p>
              </div>
            `
          })
        });
      } catch (emailErr) {
        console.error("Non-critical email error:", emailErr);
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      alert('Error al enviar la solicitud: ' + errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
    setIsSuccess(false);
  };

  if (isLoading) return (
    <main className="pt-32 text-center text-white bg-[#07020d] min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-purple mx-auto"></div>
    </main>
  );
  
  if (error) return (
    <main className="pt-32 text-center text-red-500 bg-[#07020d] min-h-screen flex flex-col items-center justify-center">
      <svg className="w-16 h-16 text-brand-magenta mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <p className="text-xl font-bold">{error}</p>
    </main>
  );

  return (
    <main className="pt-32 bg-[#07020d] text-white min-h-screen relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[15%] left-[-10%] w-[40%] h-[40%] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[15%] right-[-10%] w-[40%] h-[40%] bg-brand-magenta/5 rounded-full blur-[120px] pointer-events-none"></div>

      <section className="max-w-7xl mx-auto px-4 text-center mb-20 animate-fade-in relative z-10">
        <h2 className="text-5xl md:text-7xl font-medium tracking-normal text-white mb-8">Nuestros <span className="bg-gradient-to-r from-white to-[#8B5CF6] bg-clip-text text-transparent">Servicios</span></h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-xl leading-relaxed font-light">
          Soluciones integrales de alto nivel para transformar tu experiencia educativa y tecnológica.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 mb-32 relative z-10">
        {services.map((service) => (
          <div key={service.id} className="group relative bg-slate-950/40 backdrop-blur-xl rounded-[3rem] p-12 border border-slate-900 hover:border-brand-purple/40 transition-all duration-500 shadow-2xl">
            <div className="flex flex-col h-full">
              <div className="mb-10 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 inline-block">
                {getIconComponent(service.icon)}
              </div>
              <h3 className="text-4xl font-semibold mb-6 text-white tracking-normal">{service.title}</h3>
              <p className="text-xl text-slate-400 leading-relaxed mb-10 flex-grow font-light">
                {service.description}
              </p>
              
              <div className="space-y-4 mb-12">
                <h4 className="text-xs font-black uppercase tracking-widest text-brand-cyan">¿Qué incluye?</h4>
                <ul className="grid grid-cols-1 gap-3">
                  {['Soporte Técnico Premium', 'Configuración Personalizada', 'Garantía de Disponibilidad'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-magenta"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => openModal(service)}
                className="w-full bg-gradient-to-r from-brand-purple to-brand-magenta hover:brightness-110 text-white font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-3 group/btn shadow-lg shadow-brand-purple/10"
              >
                Solicitar Información
                <span className="group-hover/btn:translate-x-2 transition-transform">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>


      {/* Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in" onClick={() => setIsModalOpen(false)}>
          <div className="relative w-full max-w-xl bg-[#0b0617] border border-brand-purple/20 rounded-[3rem] p-10 lg:p-14 shadow-2xl" onClick={e => e.stopPropagation()}>
            <button className="absolute top-8 right-8 text-slate-500 hover:text-white text-3xl" onClick={() => setIsModalOpen(false)}>&times;</button>
            
            {!isSuccess ? (
              <>
                <div className="mb-6">{selectedService && getIconComponent(selectedService.icon)}</div>
                <h2 className="text-3xl font-semibold tracking-normal mb-4 text-white">Solicitar <span className="bg-gradient-to-r from-white to-[#8B5CF6] bg-clip-text text-transparent">{selectedService?.title}</span></h2>
                <p className="text-slate-400 mb-10 font-light">Cuéntanos brevemente qué necesitas y te contactaremos en menos de 24h.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Nombre</label>
                      <input 
                        type="text" 
                        required 
                        className="w-full bg-[#07020d] border border-slate-800 rounded-2xl p-4 text-white focus:border-brand-cyan outline-none"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email</label>
                      <input 
                        type="email" 
                        required 
                        className="w-full bg-[#07020d] border border-slate-800 rounded-2xl p-4 text-white focus:border-brand-cyan outline-none"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">¿Qué necesitas exactamente?</label>
                    <textarea 
                      required 
                      rows={4}
                      className="w-full bg-[#07020d] border border-slate-800 rounded-2xl p-4 text-white focus:border-brand-cyan outline-none resize-none"
                      placeholder="Ej: Necesito configurar una red local para 15 alumnos y soporte durante la mañana..."
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-brand-purple to-brand-magenta hover:brightness-110 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-brand-purple/20 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-10">
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-cyan">
                    <svg className="w-10 h-10 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-3xl font-black mb-4">¡Solicitud Enviada!</h3>
                <p className="text-slate-400 mb-10 leading-relaxed font-light">
                  Gracias <span className="text-white font-bold">{formData.name}</span>. Hemos recibido tu mensaje sobre <span className="text-white font-bold">{selectedService?.title}</span>. Nuestro equipo se pondrá en contacto contigo muy pronto.
                </p>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-full bg-slate-800 text-white font-bold py-4 rounded-2xl hover:bg-slate-700 transition-all"
                >
                  Cerrar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
