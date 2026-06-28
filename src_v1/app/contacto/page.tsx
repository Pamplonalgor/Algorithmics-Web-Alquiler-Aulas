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
    <main className="pt-32 bg-slate-950 min-h-screen text-white overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          
          {/* Left Side: Info */}
          <div className="lg:w-1/3 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-block px-4 py-1.5 mb-6 border border-amber-500/30 rounded-full bg-amber-500/5 backdrop-blur-sm">
              <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.3em]">Hablemos</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
              Estamos <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Aquí para ti</span>
            </h2>
            <p className="text-slate-400 text-xl mb-12 leading-relaxed font-light">
              ¿Tienes una idea brillante o necesitas un espacio a medida? Cuéntanoslo y lo haremos realidad.
            </p>

            <div className="space-y-10">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-2xl border border-slate-800 group-hover:border-amber-500/50 transition-all">📍</div>
                <div>
                  <h4 className="text-amber-500 font-black uppercase text-xs tracking-widest mb-2">Ubicación</h4>
                  <p className="text-slate-300 text-lg">Calle Falsa 123, 28001 Madrid</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-2xl border border-slate-800 group-hover:border-amber-500/50 transition-all">✉️</div>
                <div>
                  <h4 className="text-amber-500 font-black uppercase text-xs tracking-widest mb-2">Email</h4>
                  <p className="text-slate-300 text-lg">hola@aulapremium.es</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-2xl border border-slate-800 group-hover:border-amber-500/50 transition-all">📞</div>
                <div>
                  <h4 className="text-amber-500 font-black uppercase text-xs tracking-widest mb-2">Teléfono</h4>
                  <p className="text-slate-300 text-lg">+34 912 345 678</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="flex-1 w-full animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="bg-slate-900/40 backdrop-blur-3xl p-10 md:p-16 rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Nombre Completo</label>
                      <input 
                        type="text" 
                        required 
                        className="w-full bg-slate-950/50 border border-slate-800 rounded-3xl p-6 text-white focus:border-amber-500 outline-none transition-all focus:ring-4 focus:ring-amber-500/5"
                        placeholder="Tu nombre..."
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Correo Electrónico</label>
                      <input 
                        type="email" 
                        required 
                        className="w-full bg-slate-950/50 border border-slate-800 rounded-3xl p-6 text-white focus:border-amber-500 outline-none transition-all focus:ring-4 focus:ring-amber-500/5"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Asunto</label>
                    <select 
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-3xl p-6 text-white focus:border-amber-500 outline-none transition-all appearance-none"
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
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Mensaje</label>
                    <textarea 
                      required 
                      rows={6}
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-3xl p-6 text-white focus:border-amber-500 outline-none transition-all focus:ring-4 focus:ring-amber-500/5 resize-none"
                      placeholder="Cuéntanos más sobre tus necesidades..."
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-amber-500 text-slate-950 font-black py-6 rounded-3xl hover:bg-amber-400 transition-all shadow-2xl shadow-amber-500/20 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isSubmitting ? 'Enviando Mensaje...' : 'Enviar Mensaje Ahora'}
                  </button>
                </form>
              ) : (
                <div className="text-center py-20 animate-in zoom-in duration-500">
                  <div className="text-9xl mb-8">✨</div>
                  <h3 className="text-5xl font-black mb-6 tracking-tighter text-white">¡Mensaje Enviado!</h3>
                  <p className="text-slate-400 text-xl max-w-sm mx-auto leading-relaxed mb-12">
                    Gracias <span className="text-white font-bold">{formData.name}</span>, hemos recibido tu consulta. Te responderemos en un abrir y cerrar de ojos.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="bg-white text-slate-950 font-black px-12 py-5 rounded-full hover:bg-amber-500 transition-all"
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
