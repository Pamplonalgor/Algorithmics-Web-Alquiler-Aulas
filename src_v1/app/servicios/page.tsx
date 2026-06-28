'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Service } from '@/lib/types';

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
            subject: 'Recibida tu solicitud de información - Aula Web',
            html: `
              <div style="font-family: sans-serif; color: #333;">
                <h1 style="color: #f59e0b;">¡Solicitud recibida!</h1>
                <p>Hola <strong>${formData.name}</strong>,</p>
                <p>Gracias por interesarte en nuestro servicio de <strong>${selectedService?.title}</strong>.</p>
                <p><strong>Tu mensaje:</strong></p>
                <blockquote style="background: #f3f4f6; padding: 15px; border-left: 4px solid #f59e0b;">
                  ${formData.message}
                </blockquote>
                <p>Nuestro equipo revisará tu solicitud y te contactará en menos de 24 horas.</p>
                <hr />
                <p style="font-size: 12px; color: #999;">Este es un mensaje automático de Aula Web.</p>
              </div>
            `
          })
        });
      } catch (emailErr) {
        console.error("Non-critical email error:", emailErr);
      }

      setIsSuccess(true);
    } catch (err: any) {
      alert('Error al enviar la solicitud: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
    setIsSuccess(false);
  };

  if (isLoading) return <main className="pt-32 text-center text-white bg-slate-950 min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div></main>;
  if (error) return <main className="pt-32 text-center text-red-500 bg-slate-950 min-h-screen"><p>{error}</p></main>;

  return (
    <main className="pt-32 bg-slate-950 text-white min-h-screen">
      <section className="max-w-7xl mx-auto px-4 text-center mb-20 animate-fade-in">
        <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">Nuestros <span className="text-amber-500">Servicios</span></h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-xl leading-relaxed">
          Soluciones integrales de alto nivel para transformar tu experiencia educativa en algo excepcional.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
        {services.map((service) => (
          <div key={service.id} className="group relative bg-slate-900/40 rounded-[3rem] p-12 border border-slate-800 hover:border-amber-500/50 transition-all duration-500 shadow-2xl">
            <div className="flex flex-col h-full">
              <div className="text-7xl mb-10 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 inline-block">{service.icon}</div>
              <h3 className="text-4xl font-bold mb-6 text-white tracking-tight">{service.title}</h3>
              <p className="text-xl text-slate-400 leading-relaxed mb-10 flex-grow">
                {service.description}
              </p>
              
              <div className="space-y-4 mb-12">
                <h4 className="text-xs font-black uppercase tracking-widest text-amber-500/60">¿Qué incluye?</h4>
                <ul className="grid grid-cols-1 gap-3">
                  {['Soporte Técnico Premium', 'Configuración Personalizada', 'Garantía de Disponibilidad'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => openModal(service)}
                className="w-full bg-white text-slate-950 font-black py-5 rounded-2xl hover:bg-amber-500 transition-all flex items-center justify-center gap-3 group/btn"
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
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-[3rem] p-10 lg:p-14 shadow-2xl" onClick={e => e.stopPropagation()}>
            <button className="absolute top-8 right-8 text-slate-500 hover:text-white text-3xl" onClick={() => setIsModalOpen(false)}>&times;</button>
            
            {!isSuccess ? (
              <>
                <div className="text-5xl mb-6">{selectedService?.icon}</div>
                <h2 className="text-3xl font-black mb-4">Solicitar <span className="text-amber-500">{selectedService?.title}</span></h2>
                <p className="text-slate-400 mb-10">Cuéntanos brevemente qué necesitas y te contactaremos en menos de 24h.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Nombre</label>
                      <input 
                        type="text" 
                        required 
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:border-amber-500 outline-none"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email</label>
                      <input 
                        type="email" 
                        required 
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:border-amber-500 outline-none"
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
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:border-amber-500 outline-none resize-none"
                      placeholder="Ej: Necesito configurar una red local para 15 alumnos y soporte durante la mañana..."
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-amber-500 text-slate-950 font-black py-5 rounded-2xl hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-10">
                <div className="text-7xl mb-6 animate-bounce">✉️</div>
                <h3 className="text-3xl font-black mb-4">¡Solicitud Enviada!</h3>
                <p className="text-slate-400 mb-10 leading-relaxed">
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
