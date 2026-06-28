'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';
import { Classroom } from '@/lib/types';
import BookingModal from '@/components/BookingModal';

export default function ClassroomsPage() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState<string>('');

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const { data, error: fetchError } = await supabase.from('aulas').select('*');
        if (fetchError) throw fetchError;
        if (data) setClassrooms(data);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.error('Error fetching classrooms:', errorMessage);
        setError('No se pudieron cargar las aulas. Por favor, inténtalo de nuevo más tarde.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchClassrooms();
  }, []);

  const handleOpenModal = (classroomName: string) => {
    setSelectedClassroom(classroomName);
    setIsModalOpen(true);
  };

  if (isLoading) return (
    <main className="pt-32 min-h-screen bg-[#07020d] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-purple"></div>
    </main>
  );

  if (error) return (
    <main className="pt-32 min-h-screen bg-[#07020d] text-center flex flex-col items-center justify-center px-4">
      <svg className="w-16 h-16 text-brand-magenta mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <p className="text-red-400 text-xl font-bold mb-4">{error}</p>
      <button onClick={() => window.location.reload()} className="btn-premium">Reintentar</button>
    </main>
  );

  return (
    <main className="pt-32 min-h-screen bg-[#07020d] text-white relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[10%] right-[-10%] w-[35%] h-[35%] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[-10%] w-[35%] h-[35%] bg-brand-magenta/5 rounded-full blur-[100px] pointer-events-none"></div>

      <section id="classrooms" className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="section-title text-5xl md:text-6xl font-medium tracking-normal text-white mb-6">Nuestras <span className="bg-gradient-to-r from-white to-[#8B5CF6] bg-clip-text text-transparent">Aulas</span></h2>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Espacios diseñados para potenciar el aprendizaje y la colaboración, equipados con la última tecnología.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {classrooms.map((classroom, index) => (
            <div key={classroom.id} className="group bg-slate-950/40 backdrop-blur-xl rounded-[3rem] overflow-hidden border border-slate-900 hover:border-brand-purple/40 transition-all duration-500 hover:-translate-y-2 shadow-2xl hover:shadow-brand-purple/10">
              <div className="relative h-80 overflow-hidden">
                <Image 
                  src={classroom.images?.[0] || '/hero.png'} 
                  alt={classroom.name} 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index < 2}
                />
                <div className="absolute top-6 right-6 bg-gradient-to-r from-brand-purple to-brand-magenta text-white font-bold px-6 py-2 rounded-full text-sm shadow-xl border border-white/10">
                  {classroom.size}
                </div>
              </div>
              
              <div className="p-10">
                <h3 className="text-3xl font-semibold mb-4 group-hover:text-brand-cyan transition-colors">{classroom.name}</h3>
                <p className="text-slate-400 mb-8 leading-relaxed text-lg">{classroom.description}</p>
                
                <div className="mb-10">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-cyan mb-6">Equipamiento</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {classroom.equipment?.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-slate-300">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-cyan">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span> 
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button 
                  onClick={() => handleOpenModal(classroom.name)} 
                  className="w-full bg-gradient-to-r from-brand-purple to-brand-magenta hover:brightness-110 text-white font-bold py-5 rounded-[1.5rem] transition-all flex items-center justify-center gap-3 group/btn text-lg shadow-lg shadow-brand-purple/20"
                >
                  Reservar ahora
                  <span className="group-hover/btn:translate-x-2 transition-transform">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedAula={selectedClassroom} 
      />
    </main>
  );
}

