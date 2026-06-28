'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { TrainingCourse } from '@/lib/types';

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
            subject: 'Información sobre formación - Aula Web',
            html: `
              <div style="font-family: sans-serif; color: #333;">
                <h1 style="color: #f59e0b;">¡Solicitud recibida!</h1>
                <p>Hola <strong>${formData.name}</strong>,</p>
                <p>Gracias por tu interés en nuestro programa de <strong>${selectedCourse?.title}</strong>.</p>
                <p><strong>Tu consulta:</strong></p>
                <blockquote style="background: #f3f4f6; padding: 15px; border-left: 4px solid #f59e0b;">
                  ${formData.message}
                </blockquote>
                <p>Te enviaremos los detalles del programa y disponibilidad en breve.</p>
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
      alert('Error: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <main className="pt-32 text-center bg-slate-950 min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div></main>;
  if (error) return <main className="pt-32 text-center text-red-500 bg-slate-950 min-h-screen"><p>{error}</p></main>;

  const corporateCourses = courses.filter(c => !c.is_highlighted && !c.title.toLowerCase().includes('algorithmics'));

  return (
    <main className="pt-32 min-h-screen bg-slate-950 text-white">
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">Nuestra <span className="text-amber-500">Formación</span></h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Programas diseñados para potenciar el talento en todas las etapas del desarrollo.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-20">
          <div className="bg-slate-900/50 p-2 rounded-full border border-slate-800 flex gap-2 backdrop-blur-sm">
            <button 
              onClick={() => setActiveTab('empresa')}
              className={`px-8 py-4 rounded-full font-black text-sm transition-all duration-300 ${
                activeTab === 'empresa' 
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 scale-105' 
                  : 'text-slate-500 hover:text-white'
              }`}
            >
              Formación Empresa
            </button>
            <button 
              onClick={() => setActiveTab('algorithmics')}
              className={`px-8 py-4 rounded-full font-black text-sm transition-all duration-300 ${
                activeTab === 'algorithmics' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105' 
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
                <h3 className="text-3xl font-bold mb-4">Soluciones para <span className="text-amber-500">Profesionales</span></h3>
                <p className="text-slate-400 max-w-xl mx-auto">Capacitación de alto nivel para equipos que buscan liderar el cambio tecnológico.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {corporateCourses.map((course) => (
                  <div key={course.id} className="group flex flex-col bg-slate-900/40 p-10 rounded-[2.5rem] border border-slate-800 hover:border-amber-500/50 transition-all duration-300 shadow-xl">
                    <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform">{course.icon}</div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-amber-400 transition-colors">{course.title}</h3>
                    <p className="text-slate-400 leading-relaxed mb-8 flex-grow">{course.description}</p>
                    <button 
                      onClick={() => openModal(course)}
                      className="w-full bg-slate-800 text-white font-bold py-4 rounded-xl hover:bg-amber-500 hover:text-slate-950 transition-all text-sm"
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
                <h3 className="text-3xl font-bold mb-4">Campus <span className="text-blue-500">Tecnológico</span></h3>
                <p className="text-slate-400 max-w-xl mx-auto">Preparando a la próxima generación de innovadores de 5 a 18 años.</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 rounded-[4rem] overflow-hidden border border-blue-500/20 flex flex-col lg:flex-row shadow-2xl">
                <div className="p-12 lg:p-20 flex-1">
                  <div className="flex items-center gap-6 mb-10">
                    <div className="text-6xl animate-bounce-slow">🚀</div>
                    <h3 className="text-4xl lg:text-6xl font-black text-white tracking-tighter">Algorithmics</h3>
                  </div>
                  <p className="text-2xl text-slate-300 mb-12 leading-relaxed">
                    Un campus tecnológico donde los niños desarrollan habilidades críticas: 
                    <span className="text-white font-bold"> Programación, Diseño y Matemáticas Lógicas</span>.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
                    <div className="bg-blue-500/10 p-8 rounded-3xl border border-blue-500/20 text-center backdrop-blur-md hover:bg-blue-500/20 transition-colors">
                      <span className="block text-4xl mb-3">💻</span>
                      <span className="font-bold text-blue-100 uppercase tracking-widest text-xs">Programación</span>
                    </div>
                    <div className="bg-indigo-500/10 p-8 rounded-3xl border border-indigo-500/20 text-center backdrop-blur-md hover:bg-indigo-500/20 transition-colors">
                      <span className="block text-4xl mb-3">🎨</span>
                      <span className="font-bold text-indigo-100 uppercase tracking-widest text-xs">Diseño Digital</span>
                    </div>
                    <div className="bg-cyan-500/10 p-8 rounded-3xl border border-cyan-500/20 text-center backdrop-blur-md hover:bg-cyan-500/20 transition-colors">
                      <span className="block text-4xl mb-3">🧮</span>
                      <span className="font-bold text-cyan-100 uppercase tracking-widest text-xs">Lógica</span>
                    </div>
                  </div>
                  <a 
                    href="https://es.alg.academy/franquiciadosalgorithmics" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-4 bg-white text-blue-950 font-black py-6 px-12 rounded-full transition-all hover:bg-blue-400 hover:text-white shadow-2xl hover:scale-105 active:scale-95 group"
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
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-[3rem] p-10 lg:p-14 shadow-2xl" onClick={e => e.stopPropagation()}>
            <button className="absolute top-8 right-8 text-slate-500 hover:text-white text-3xl" onClick={() => setIsModalOpen(false)}>&times;</button>
            
            {!isSuccess ? (
              <>
                <div className="text-5xl mb-6">{selectedCourse?.icon}</div>
                <h2 className="text-3xl font-black mb-4">Información sobre <span className="text-amber-500">{selectedCourse?.title}</span></h2>
                <p className="text-slate-400 mb-10">Solicita los detalles del programa para tu empresa o equipo.</p>
                
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
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">¿Qué te gustaría saber?</label>
                    <textarea 
                      required 
                      rows={4}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:border-amber-500 outline-none resize-none"
                      placeholder="Ej: Me gustaría saber el precio para un grupo de 10 personas y si es posible hacerlo online..."
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
                <div className="text-7xl mb-6 animate-bounce">🎓</div>
                <h3 className="text-3xl font-black mb-4">¡Solicitud Enviada!</h3>
                <p className="text-slate-400 mb-10 leading-relaxed">
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
