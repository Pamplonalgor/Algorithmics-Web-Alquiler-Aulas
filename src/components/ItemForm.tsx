'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface ItemFormProps {
  type: string;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: any;
}

export default function ItemForm({ type, onClose, onSuccess, initialData }: ItemFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [files, setFiles] = useState<FileList | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else if (type === 'aulas') {
      // Default values for NEW classrooms
      setFormData({
        is_available_morning: true,
        is_available_afternoon: true,
        is_available_full: true,
        price_half: 50,
        price_full: 80,
        equipment: []
      });
    }
  }, [initialData, type]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type: inputType } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: inputType === 'number' ? parseFloat(value) : value 
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const uploadImages = async (): Promise<string[]> => {
    if (!files || files.length === 0) {
      return initialData?.images || (initialData?.image_url ? [initialData.image_url] : []);
    }
    
    setSaveStatus("Subiendo imágenes...");
    const uploadPromises = Array.from(files).map(async (file) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${type}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw new Error(`Error en storage: ${uploadError.message}`);

      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      return data.publicUrl;
    });

    return await Promise.all(uploadPromises);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    console.log("Submit triggered!");
    
    // Safety check for name
    const finalName = formData.name || formData.title;
    if (!finalName) {
      setError("Por favor, introduce un nombre para el aula.");
      return;
    }

    setLoading(true);
    setError(null);
    setSaveStatus("Iniciando...");

    try {
      const imageUrls = await uploadImages();
      setSaveStatus("Guardando en base de datos...");
      
      const isAula = type === 'aulas';
      const payload: any = {
        [isAula ? 'name' : 'title']: finalName,
        description: formData.description || '',
      };

      if (isAula) {
        payload.size = formData.size || '';
        payload.equipment = Array.isArray(formData.equipment) ? formData.equipment : (typeof formData.equipment === 'string' ? formData.equipment.split(',').map((s: any) => s.trim()) : []);
        payload.images = imageUrls;
        payload.price_half = parseFloat(String(formData.price_half)) || 50;
        payload.price_full = parseFloat(String(formData.price_full)) || 80;
        payload.is_available_morning = formData.is_available_morning !== false;
        payload.is_available_afternoon = formData.is_available_afternoon !== false;
        payload.is_available_full = formData.is_available_full !== false;
      } else {
        payload.icon = formData.icon || '';
        payload.image_url = imageUrls[0] || null;
      }

      console.log("Sending payload:", payload);

      let result;
      if (initialData?.id) {
        result = await supabase.from(type).update(payload).eq('id', initialData.id);
      } else {
        result = await supabase.from(type).insert([payload]);
      }

      if (result.error) {
        console.error("DB Error:", result.error);
        throw new Error(`Error de Base de Datos: ${result.error.message}`);
      }

      setSaveStatus("¡Éxito!");
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1000);
    } catch (err: any) {
      console.error("Critical Save Error:", err);
      setError(err.message || "Error desconocido al guardar");
      setSaveStatus(null);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[9999] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 p-8 md:p-12 rounded-[3rem] max-w-2xl w-full my-auto shadow-2xl animate-fade-in-up relative">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-black capitalize text-white">{initialData ? 'Editar' : 'Añadir'} {type}</h2>
            <p className="text-slate-500 text-sm mt-1">Completa los detalles a continuación.</p>
          </div>
          <button onClick={onClose} className="w-12 h-12 flex items-center justify-center bg-slate-800 hover:bg-slate-700 rounded-full text-white transition-all text-2xl">×</button>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-5 rounded-2xl mb-8 flex items-center gap-3">
            <span className="text-xl">⚠️</span> {error}
          </div>
        )}

        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-5 rounded-2xl mb-8 flex items-center gap-3">
            <span className="text-xl">✅</span> ¡Guardado correctamente!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Título / Nombre</label>
              <input 
                type="text" 
                name={type === 'aulas' ? 'name' : 'title'} 
                value={formData.name || formData.title || ''}
                onChange={handleInputChange} 
                className="bg-slate-950 border border-slate-800 p-5 rounded-2xl focus:border-brand-cobalt outline-none transition-all text-white"
              />
            </div>

            {type === 'aulas' && (
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Tamaño</label>
                <input 
                  type="text" 
                  name="size" 
                  placeholder="Ej: 25 m²" 
                  value={formData.size || ''}
                  onChange={handleInputChange} 
                  className="bg-slate-950 border border-slate-800 p-5 rounded-2xl focus:border-brand-cobalt outline-none text-white" 
                />
              </div>
            )}
          </div>

          {type === 'aulas' && (
            <div className="grid grid-cols-2 gap-8 bg-brand-cobalt/5 p-6 rounded-3xl border border-brand-cobalt/10">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-cobalt ml-2">Precio Media Jornada (€)</label>
                <input 
                  type="number" 
                  name="price_half" 
                  step="0.01"
                  required
                  value={formData.price_half || ''}
                  onChange={handleInputChange} 
                  className="bg-slate-950 border border-slate-800 p-5 rounded-2xl focus:border-brand-cobalt outline-none text-white font-bold" 
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-cobalt ml-2">Precio Jornada Completa (€)</label>
                <input 
                  type="number" 
                  name="price_full" 
                  step="0.01"
                  required
                  value={formData.price_full || ''}
                  onChange={handleInputChange} 
                  className="bg-slate-950 border border-slate-800 p-5 rounded-2xl focus:border-brand-cobalt outline-none text-white font-bold" 
                />
              </div>
            </div>
          )}

          {type === 'aulas' && (
            <div className="space-y-6 bg-slate-950/50 p-8 rounded-[2rem] border border-slate-800">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Disponibilidad de Turnos</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <label className="flex items-center gap-4 p-5 bg-slate-900 rounded-3xl border border-slate-800 cursor-pointer hover:border-brand-cobalt/50 transition-all">
                  <input 
                    type="checkbox" 
                    name="is_available_morning" 
                    checked={formData.is_available_morning !== false}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_available_morning: e.target.checked }))}
                    className="w-6 h-6 rounded-lg bg-slate-950 accent-brand-cobalt"
                  />
                  <span className="text-sm font-bold text-slate-300">Mañana</span>
                </label>
                <label className="flex items-center gap-4 p-5 bg-slate-900 rounded-3xl border border-slate-800 cursor-pointer hover:border-brand-cobalt/50 transition-all">
                  <input 
                    type="checkbox" 
                    name="is_available_afternoon" 
                    checked={formData.is_available_afternoon !== false}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_available_afternoon: e.target.checked }))}
                    className="w-6 h-6 rounded-lg bg-slate-950 accent-brand-cobalt"
                  />
                  <span className="text-sm font-bold text-slate-300">Tarde</span>
                </label>
                <label className="flex items-center gap-4 p-5 bg-slate-900 rounded-3xl border border-slate-800 cursor-pointer hover:border-brand-cobalt/50 transition-all">
                  <input 
                    type="checkbox" 
                    name="is_available_full" 
                    checked={formData.is_available_full !== false}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_available_full: e.target.checked }))}
                    className="w-6 h-6 rounded-lg bg-slate-950 accent-brand-cobalt"
                  />
                  <span className="text-sm font-bold text-slate-300">Completo</span>
                </label>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Descripción</label>
            <textarea 
              name="description" 
              rows={3} 
              value={formData.description || ''}
              onChange={handleInputChange} 
              className="bg-slate-950 border border-slate-800 p-5 rounded-2xl focus:border-brand-cobalt outline-none transition-all w-full text-white resize-none" 
            />
          </div>

          {(type === 'servicios' || type === 'formacion') && (
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Icono (Emoji)</label>
              <input 
                type="text" 
                name="icon" 
                placeholder="Ej: 📊" 
                value={formData.icon || ''}
                onChange={handleInputChange} 
                className="bg-slate-950 border border-slate-800 p-5 rounded-2xl focus:border-brand-cobalt outline-none text-white" 
              />
            </div>
          )}

          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">{type === 'aulas' ? 'Imágenes' : 'Imagen de Portada'}</label>
            <input 
              type="file" 
              multiple={type === 'aulas'} 
              accept="image/*" 
              onChange={handleFileChange}
              className="bg-slate-950 border border-slate-800 p-5 rounded-2xl file:bg-brand-cobalt file:text-white file:border-none file:px-6 file:py-2 file:rounded-xl file:mr-6 file:font-black file:cursor-pointer text-slate-500 text-sm"
            />
            {initialData && <p className="text-[10px] text-slate-500 ml-2 italic">Deja vacío para mantener las imágenes actuales.</p>}
          </div>

          <div className="flex gap-6 pt-6">
            <button type="button" onClick={onClose} className="flex-1 px-8 py-5 border border-slate-800 rounded-2xl font-black hover:bg-slate-800 transition-all text-white">Cancelar</button>
            <button 
              type="submit" 
              onClick={() => handleSubmit()}
              disabled={loading || success} 
              className="flex-1 px-8 py-5 bg-brand-cobalt text-white rounded-2xl font-black hover:bg-brand-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-brand-cobalt/20"
            >
              {loading ? (saveStatus || 'Guardando...') : (success ? '¡Hecho!' : 'Guardar Cambios')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

