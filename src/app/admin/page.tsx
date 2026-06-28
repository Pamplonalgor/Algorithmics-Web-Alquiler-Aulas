'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import ItemForm from '@/components/ItemForm';
import { Aula, Course, Service as AppService } from '@/lib/types';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'servicios' | 'formacion' | 'aulas' | 'reservas' | 'config'>('aulas');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const [adminEmail, setAdminEmail] = useState('pamplona@algoacademy.es');
  const [isSavingEmail, setIsSavingEmail] = useState(false);

  const fetchData = useCallback(async () => {
    if (activeTab === 'config') return;
    setLoading(true);
    try {
      const { data, error } = await supabase.from(activeTab).select('*').order('id', { ascending: true });
      if (error) throw error;
      setItems(data || []);
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  const fetchConfig = useCallback(async () => {
    const { data } = await supabase.from('config').select('admin_email').eq('id', 1).single();
    if (data) setAdminEmail(data.admin_email);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'config') {
        fetchConfig();
      } else {
        fetchData();
      }
    }
  }, [isAuthenticated, activeTab, fetchData, fetchConfig]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') setIsAuthenticated(true);
    else alert('Contraseña incorrecta');
  };

  const handleSaveEmail = async () => {
    setIsSavingEmail(true);
    try {
      const { error } = await supabase.from('config').upsert({ id: 1, admin_email: adminEmail });
      if (error) throw error;
      alert("Email configurado correctamente para notificaciones.");
    } catch (err: any) {
      alert("Error al guardar: " + err.message);
    } finally {
      setIsSavingEmail(false);
    }
  };

  const handleDelete = async (id: any) => {
    if (!confirm('¿Seguro?')) return;
    const { error } = await supabase.from(activeTab).delete().eq('id', id);
    if (!error) fetchData();
  };

  if (!isAuthenticated) {
    return (
      <main className="pt-32 min-h-screen flex items-center justify-center bg-slate-950 px-4">
        <div className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 max-w-md w-full text-center shadow-2xl">
          <h1 className="text-3xl font-bold mb-8 text-brand-cobalt">Acceso Admin</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="password" placeholder="Contraseña" className="w-full bg-slate-950 border border-slate-700 p-4 rounded-xl text-white outline-none focus:border-brand-cobalt transition-colors" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" className="w-full bg-brand-cobalt text-white font-bold py-4 rounded-xl hover:bg-brand-purple transition-all">Entrar al Panel</button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-32 min-h-screen bg-slate-950 text-white pb-20">
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h1 className="text-4xl font-bold tracking-tighter">Panel de <span className="text-brand-cobalt">Administración</span></h1>
          <button onClick={() => setIsAuthenticated(false)} className="px-6 py-2 border border-slate-700 hover:bg-slate-800 rounded-full font-bold transition-all text-sm">Cerrar Sesión</button>
        </div>

        <div className="flex flex-wrap gap-3 mb-10 overflow-x-auto pb-2">
          {['servicios', 'formacion', 'aulas', 'reservas', 'config'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-8 py-3 rounded-full font-bold capitalize transition-all ${
                activeTab === tab ? 'bg-brand-cobalt text-white shadow-lg shadow-brand-cobalt/20' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab === 'config' ? 'Ajustes ⚙️' : tab}
            </button>
          ))}
        </div>

        <div className="bg-slate-900/50 rounded-[2.5rem] p-10 border border-slate-800 shadow-xl backdrop-blur-sm min-h-[500px]">
          {activeTab === 'config' ? (
            <div className="max-w-xl mx-auto text-center py-12">
              <div className="text-6xl mb-6">⚙️</div>
              <h2 className="text-3xl font-black mb-4">Ajustes de Notificaciones</h2>
              <p className="text-slate-400 mb-12">Configura el email donde recibirás las nuevas reservas y solicitudes.</p>
              <div className="space-y-6 text-left">
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Email del Administrador</label>
                  <input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl focus:border-brand-cobalt outline-none text-white font-bold" />
                </div>
                <button onClick={handleSaveEmail} disabled={isSavingEmail} className="w-full bg-brand-cobalt text-white font-black py-5 rounded-2xl hover:bg-brand-purple transition-all shadow-xl shadow-brand-cobalt/20 disabled:opacity-50">
                  {isSavingEmail ? 'Guardando...' : 'Guardar Email'}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-6">
                <h2 className="text-2xl font-bold capitalize">Gestionar {activeTab}</h2>
                {activeTab !== 'reservas' && (
                  <button onClick={() => { setEditingItem(null); setShowForm(true); }} className="bg-brand-cobalt hover:bg-brand-purple text-white px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2">
                    <span className="text-xl">+</span> Añadir Nuevo
                  </button>
                )}
              </div>

              {showForm && (
                <ItemForm type={activeTab} initialData={editingItem} onClose={() => setShowForm(false)} onSuccess={fetchData} />
              )}

              {loading ? (
                <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-cobalt"></div></div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-500 text-sm uppercase tracking-widest">
                        <th className="pb-6 px-4">ID</th>
                        {activeTab === 'reservas' ? (
                          <><th>Usuario</th><th>Aula</th><th>Fecha</th><th>Precio</th></>
                        ) : (
                          <th>Título / Nombre</th>
                        )}
                        <th className="pb-6 px-4 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {items.map((item: any) => (
                        <tr key={item.id} className="group hover:bg-white/5 transition-colors">
                          <td className="py-6 px-4 text-slate-500">#{item.id}</td>
                          {activeTab === 'reservas' ? (
                            <>
                              <td className="py-6 px-4"><div className="font-semibold text-white">{item.user_name}</div><div className="text-xs text-slate-500">{item.user_email}</div></td>
                              <td className="py-6 px-4"><span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-bold border border-blue-500/20">{item.classroom_name}</span></td>
                              <td className="py-6 px-4"><div className="text-sm text-white font-medium">{item.date}</div><div className="text-xs text-slate-500 uppercase tracking-tighter">{item.shift}</div></td>
                              <td className="py-6 px-4"><div className="text-brand-cobalt font-bold">{item.total_price}€</div></td>
                            </>
                          ) : (
                            <td className="py-6 px-4 font-semibold flex items-center gap-3">
                              <svg className="w-5 h-5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                              </svg>
                              {item.title || item.name}
                            </td>
                          )}
                          <td className="py-6 px-4 text-right">
                            <div className="flex justify-end gap-6">
                              {activeTab !== 'reservas' && <button onClick={() => { setEditingItem(item); setShowForm(true); }} className="text-slate-400 hover:text-white font-medium transition-colors">Editar</button>}
                              <button onClick={() => handleDelete(item.id)} className="text-red-500/70 hover:text-red-500 font-medium transition-colors">Eliminar</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}

