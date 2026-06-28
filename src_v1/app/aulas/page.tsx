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
    <main className="pt-32 min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
    </main>
  );

  if (error) return (
    <main className="pt-32 min-h-screen bg-slate-950 text-center flex flex-col items-center justify-center px-4">
      <div className="text-6xl mb-6">⚠️</div>
      <p className="text-red-400 text-xl font-bold mb-4">{error}</p>
      <button onClick={() => window.location.reload()} className="btn-premium">Reintentar</button>
    </main>
  );

  return (
    <main className="pt-32 min-h-screen bg-slate-950 text-white">
      <section id="classrooms" className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="section-title text-5xl md:text-6xl font-bold mb-6">Nuestras <span className="text-amber-500">Aulas</span></h2>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Espacios diseñados para potenciar el aprendizaje y la colaboración, equipados con la última tecnología.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {classrooms.map((classroom, index) => (
            <div key={classroom.id} className="group bg-slate-900/40 rounded-[3rem] overflow-hidden border border-slate-800 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl hover:shadow-amber-500/10">
              <div className="relative h-80 overflow-hidden">
                <Image 
                  src={classroom.images?.[0] || '/hero.png'} 
                  alt={classroom.name} 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index < 2}
                />
                <div className="absolute top-6 right-6 bg-amber-500 text-slate-950 font-bold px-6 py-2 rounded-full text-sm shadow-xl">
                  {classroom.size}
                </div>
              </div>
              
              <div className="p-10">
                <h3 className="text-3xl font-bold mb-4 group-hover:text-amber-400 transition-colors">{classroom.name}</h3>
                <p className="text-slate-400 mb-8 leading-relaxed text-lg">{classroom.description}</p>
                
                <div className="mb-10">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 mb-6">Equipamiento</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {classroom.equipment?.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-slate-300">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 text-xs">✓</span> 
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button 
                  onClick={() => handleOpenModal(classroom.name)} 
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-5 rounded-[1.5rem] transition-all flex items-center justify-center gap-3 group/btn text-lg"
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

