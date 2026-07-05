'use client';

import { useState } from 'react';

export default function Contacto() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <main className="pt-32 bg-[#07020d] min-h-screen text-white overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-magenta/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          
          {/* Left Side: Info */}
          <div className="lg:w-1/3 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-flex items-center px-6 py-2 mb-6 border border-brand-purple/30 rounded-full bg-brand-purple/5 backdrop-blur-sm">
              <span className="text-brand-cyan text-xs font-medium uppercase tracking-[0.3em]">Hablemos</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-semibold mb-8 tracking-normal leading-none text-[#F3F4F6]">
              Estamos <br />
              <span>Aquí para ti</span>
            </h2>
            <p className="text-slate-400 text-xl mb-12 leading-relaxed font-light">
              ¿Tienes una idea brillante o necesitas un espacio a medida? Cuéntanoslo y lo haremos realidad.
            </p>

            <div className="space-y-10">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-[#0b0617] rounded-2xl flex items-center justify-center border border-slate-900 group-hover:border-brand-purple/50 transition-all text-brand-cyan">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-brand-cyan font-medium uppercase text-xs tracking-widest mb-2">Ubicación</h4>
                  <p className="text-slate-300 text-lg">Calle Principal 123, 28001 Madrid</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-[#0b0617] rounded-2xl flex items-center justify-center border border-slate-900 group-hover:border-brand-purple/50 transition-all text-brand-cyan">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-brand-cyan font-medium uppercase text-xs tracking-widest mb-2">Email</h4>
                  <p className="text-slate-300 text-lg font-light">info@adimentek.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-[#0b0617] rounded-2xl flex items-center justify-center border border-slate-900 group-hover:border-brand-purple/50 transition-all text-brand-cyan">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-brand-cyan font-medium uppercase text-xs tracking-widest mb-2">Teléfono</h4>
                  <p className="text-slate-300 text-lg">+34 912 345 678</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="flex-1 w-full animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="bg-slate-950/40 backdrop-blur-3xl p-10 md:p-16 rounded-[4rem] border border-slate-900 shadow-2xl relative overflow-hidden">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-medium uppercase tracking-widest text-slate-500 ml-2">Nombre Completo</label>
                      <input 
                        type="text" 
                        required 
                        className="w-full bg-[#07020d]/50 border border-slate-800 rounded-3xl p-6 text-white focus:border-brand-cyan outline-none transition-all focus:ring-4 focus:ring-brand-cyan/5"
                        placeholder="Tu nombre..."
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-medium uppercase tracking-widest text-slate-500 ml-2">Correo Electrónico</label>
                      <input 
                        type="email" 
                        required 
                        className="w-full bg-[#07020d]/50 border border-slate-800 rounded-3xl p-6 text-white focus:border-brand-cyan outline-none transition-all focus:ring-4 focus:ring-brand-cyan/5"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-medium uppercase tracking-widest text-slate-500 ml-2">Asunto</label>
                    <select 
                      className="w-full bg-[#07020d]/50 border border-slate-800 rounded-3xl p-6 text-white focus:border-brand-cyan outline-none transition-all appearance-none"
                      value={formData.subject}
                      onChange={e => setFormData({...formData, subject: e.target.value})}
                    >
                      <option value="General">Consulta General</option>
                      <option value="Presupuesto">Solicitud de Presupuesto</option>
                      <option value="Visita">Agendar Visita</option>
                      <option value="Otros">Otros</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-medium uppercase tracking-widest text-slate-500 ml-2">Mensaje</label>
                    <textarea 
                      required 
                      rows={6}
                      className="w-full bg-[#07020d]/50 border border-slate-800 rounded-3xl p-6 text-white focus:border-brand-cyan outline-none transition-all focus:ring-4 focus:ring-brand-cyan/5 resize-none"
                      placeholder="Cuéntanos más sobre tus necesidades..."
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-brand-purple to-brand-magenta text-white font-semibold py-6 rounded-3xl hover:brightness-110 transition-all shadow-2xl shadow-brand-purple/20 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isSubmitting ? 'Enviando Mensaje...' : 'Enviar Mensaje Ahora'}
                  </button>
                </form>
              ) : (
                <div className="text-center py-20 animate-in zoom-in duration-500">
                  <div className="mb-8 flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-cyan">
                      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-5xl font-semibold mb-6 tracking-normal text-white">¡Mensaje Enviado!</h3>
                  <p className="text-slate-400 text-xl max-w-sm mx-auto leading-relaxed mb-12 font-light">
                    Gracias <span className="text-white font-bold">{formData.name}</span>, hemos recibido tu consulta. Te responderemos en un abrir y cerrar de ojos.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/25 px-12 py-5 rounded-full transition-all"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
