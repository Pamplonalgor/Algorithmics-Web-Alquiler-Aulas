'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { TrainingCourse } from '@/lib/types';

const getCourseIcon = (iconStr: string) => {
  switch (iconStr) {
    case '💻':
    case 'code':
      return (
        <svg className="w-8 h-8 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    case '☁️':
    case 'cloud':
      return (
        <svg className="w-8 h-8 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      );
    case '🧠':
    case 'ai':
    case 'brain':
      return (
        <svg className="w-8 h-8 text-brand-magenta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    default:
      return (
        <svg className="w-8 h-8 text-brand-cyan" viewBox="20 15 85 85" fill="currentColor">
          <path d="M 83 37 Q 83 52 93 52 Q 83 52 83 67 Q 83 52 73 52 Q 83 52 83 37 Z" />
        </svg>
      );
  }
};

export default function TrainingPage() {
  const [courses, setCourses] = useState<TrainingCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'empresa' | 'algorithmics'>('empresa');

  // Modal and Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<TrainingCourse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error: fetchError } = await supabase.from('formacion').select('*');
        if (fetchError) throw fetchError;
        if (data) setCourses(data);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.error('Error fetching courses:', errorMessage);
        setError('No se pudieron cargar los cursos. Por favor, inténtalo de nuevo más tarde.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const openModal = (course: TrainingCourse) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
    setIsSuccess(false);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error: insertError } = await supabase
        .from('solicitudes_formacion')
        .insert([{
          course_id: selectedCourse?.id,
          course_title: selectedCourse?.title,
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
            type: `Solicitud de Formación: ${selectedCourse?.title}`,
            subject: 'Información sobre formación - Adimentech',
            html: `
              <div style="font-family: sans-serif; color: #333;">
                <h1 style="color: #5e17eb;">¡Solicitud recibida!</h1>
                <p>Hola <strong>${formData.name}</strong>,</p>
                <p>Gracias por tu interés en nuestro programa de <strong>${selectedCourse?.title}</strong>.</p>
                <p><strong>Tu consulta:</strong></p>
                <blockquote style="background: #f3f4f6; padding: 15px; border-left: 4px solid #5e17eb;">
                  ${formData.message}
                </blockquote>
                <p>Te enviaremos los detalles del programa y disponibilidad en breve.</p>
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
      alert('Error: ' + errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return (
    <main className="pt-32 text-center bg-[#07020d] min-h-screen flex items-center justify-center">
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

  const corporateCourses = courses.filter(c => !c.is_highlighted && !c.title.toLowerCase().includes('algorithmics'));

  return (
    <main className="pt-32 min-h-screen bg-[#07020d] text-white relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[10%] right-[-10%] w-[35%] h-[35%] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[-10%] w-[35%] h-[35%] bg-brand-magenta/5 rounded-full blur-[100px] pointer-events-none"></div>

      <section className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-semibold mb-6 tracking-normal">Nuestra <span className="bg-gradient-to-r from-white to-[#8B5CF6] bg-clip-text text-transparent">Formación</span></h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Programas diseñados para potenciar el talento en todas las etapas del desarrollo.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-20">
          <div className="bg-slate-900/40 p-2 rounded-full border border-slate-900 flex gap-2 backdrop-blur-md">
            <button 
              onClick={() => setActiveTab('empresa')}
              className={`px-8 py-4 rounded-full font-black text-sm transition-all duration-300 ${
                activeTab === 'empresa' 
                  ? 'bg-gradient-to-r from-brand-purple to-brand-magenta text-white shadow-lg shadow-brand-purple/20 scale-105' 
                  : 'text-slate-500 hover:text-white'
              }`}
            >
              Formación Empresa
            </button>
            <button 
              onClick={() => setActiveTab('algorithmics')}
              className={`px-8 py-4 rounded-full font-black text-sm transition-all duration-300 ${
                activeTab === 'algorithmics' 
                  ? 'bg-gradient-to-r from-brand-cyan to-blue-600 text-white shadow-lg shadow-brand-cyan/20 scale-105' 
                  : 'text-slate-500 hover:text-white'
              }`}
            >
              Formación Algorithmics
            </button>
          </div>
        </div>

        {/* Content Sections */}
        <div className="transition-all duration-500">
          {activeTab === 'empresa' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-16">
                <h3 className="text-3xl font-semibold mb-4">Soluciones para <span className="text-brand-magenta">Profesionales</span></h3>
                <p className="text-slate-400 max-w-xl mx-auto font-light">Capacitación de alto nivel para equipos que buscan liderar el cambio tecnológico.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {corporateCourses.map((course) => (
                  <div key={course.id} className="group flex flex-col bg-slate-950/40 backdrop-blur-xl p-10 rounded-[2.5rem] border border-slate-900 hover:border-brand-purple/40 transition-all duration-300 shadow-xl">
                    <div className="w-16 h-16 bg-brand-purple/10 rounded-2xl flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform">
                      {getCourseIcon(course.icon)}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-cyan transition-colors">{course.title}</h3>
                    <p className="text-slate-400 leading-relaxed mb-8 flex-grow font-light">{course.description}</p>
                    <button 
                      onClick={() => openModal(course)}
                      className="w-full bg-gradient-to-r from-brand-purple to-brand-magenta text-white font-bold py-4 rounded-xl hover:brightness-110 transition-all text-sm shadow-md shadow-brand-purple/10"
                    >
                      Solicitar Información
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-16">
                <h3 className="text-3xl font-semibold mb-4">Campus <span className="text-brand-cyan">Tecnológico</span></h3>
                <p className="text-slate-400 max-w-xl mx-auto font-light">Preparando a la próxima generación de innovadores de 5 a 18 años.</p>
              </div>
              
              <div className="bg-gradient-to-br from-[#0b0617] to-[#120b24] rounded-[4rem] overflow-hidden border border-brand-purple/20 flex flex-col lg:flex-row shadow-2xl">
                <div className="p-12 lg:p-20 flex-1">
                  <div className="flex items-center gap-6 mb-10">
                    <div className="w-16 h-16 bg-brand-cyan/10 rounded-2xl flex items-center justify-center text-brand-cyan">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-3-3m10 0l-7 7-3-3" />
                      </svg>
                    </div>
                    <h3 className="text-4xl lg:text-6xl font-semibold text-white tracking-normal">Algorithmics</h3>
                  </div>
                  <p className="text-2xl text-slate-300 mb-12 leading-relaxed font-light">
                    Un campus tecnológico donde los niños desarrollan habilidades críticas: 
                    <span className="text-white font-bold font-normal"> Programación, Diseño y Matemáticas Lógicas</span>.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
                    <div className="bg-brand-purple/5 p-8 rounded-3xl border border-brand-purple/15 text-center backdrop-blur-md hover:bg-brand-purple/10 transition-colors">
                      <span className="flex justify-center mb-3">
                        <svg className="w-10 h-10 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </span>
                      <span className="font-bold text-blue-100 uppercase tracking-widest text-xs">Programación</span>
                    </div>
                    <div className="bg-brand-magenta/5 p-8 rounded-3xl border border-brand-magenta/15 text-center backdrop-blur-md hover:bg-brand-magenta/10 transition-colors">
                      <span className="flex justify-center mb-3">
                        <svg className="w-10 h-10 text-brand-magenta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </span>
                      <span className="font-bold text-indigo-100 uppercase tracking-widest text-xs">Diseño Digital</span>
                    </div>
                    <div className="bg-brand-cyan/5 p-8 rounded-3xl border border-brand-cyan/15 text-center backdrop-blur-md hover:bg-brand-cyan/10 transition-colors">
                      <span className="flex justify-center mb-3">
                        <svg className="w-10 h-10 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h-6a2 2 0 00-2 2v8a2 2 0 002 2h6m12-12h-6a2 2 0 00-2 2v8a2 2 0 002 2h6m-6-12V9a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h6" />
                        </svg>
                      </span>
                      <span className="font-bold text-cyan-100 uppercase tracking-widest text-xs">Lógica</span>
                    </div>
                  </div>
                  <a 
                    href="https://es.alg.academy/franquiciadosalgorithmics" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-4 bg-gradient-to-r from-brand-purple to-brand-magenta text-white font-black py-6 px-12 rounded-full transition-all hover:brightness-110 shadow-2xl hover:scale-105 active:scale-95 group"
                  >
                    Explorar Algorithmics
                    <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
                  </a>
                </div>
                <div className="lg:w-2/5 min-h-[400px]" style={{ 
                    backgroundImage: 'url(/hero.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}></div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in" onClick={() => setIsModalOpen(false)}>
          <div className="relative w-full max-w-xl bg-[#0b0617] border border-brand-purple/20 rounded-[3rem] p-10 lg:p-14 shadow-2xl" onClick={e => e.stopPropagation()}>
            <button className="absolute top-8 right-8 text-slate-500 hover:text-white text-3xl" onClick={() => setIsModalOpen(false)}>&times;</button>
            
            {!isSuccess ? (
              <>
                <div className="mb-6">{selectedCourse && getCourseIcon(selectedCourse.icon)}</div>
                <h2 className="text-3xl font-semibold mb-4 text-white">Información sobre <span className="bg-gradient-to-r from-white to-[#8B5CF6] bg-clip-text text-transparent">{selectedCourse?.title}</span></h2>
                <p className="text-slate-400 mb-10 font-light">Solicita los detalles del programa para tu empresa o equipo.</p>
                
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
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">¿Qué te gustaría saber?</label>
                    <textarea 
                      required 
                      rows={4}
                      className="w-full bg-[#07020d] border border-slate-800 rounded-2xl p-4 text-white focus:border-brand-cyan outline-none resize-none"
                      placeholder="Ej: Me gustaría saber el precio para un grupo de 10 personas y si es posible hacerlo online..."
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-3xl font-semibold mb-4">¡Solicitud Enviada!</h3>
                <p className="text-slate-400 mb-10 leading-relaxed font-light">
                  Gracias <span className="text-white font-bold">{formData.name}</span>. Te enviaremos toda la información sobre <span className="text-white font-bold">{selectedCourse?.title}</span> muy pronto.
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
