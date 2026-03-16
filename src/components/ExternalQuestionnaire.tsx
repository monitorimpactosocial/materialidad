import React, { useState } from 'react';
import { externalQuestions, sectors } from '../lib/questions';
// import { useData } from '../lib/DataContext';
import { Send, CheckCircle2 } from 'lucide-react';

export const ExternalQuestionnaire = () => {
  // const { reload } = useData();
  const [formData, setFormData] = useState({
    nombreApellidos: '',
    sexo: '',
    cedula: '',
    edad: '',
    sector: '',
    organizacion: '',
    respuestas: Array(externalQuestions.length).fill(null),
    temasSugeridos: ['', '', '', ''],
    percepcion: '',
    comentarios: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRespuestaChange = (index: number, value: number) => {
    const newRespuestas = [...formData.respuestas];
    newRespuestas[index] = value;
    setFormData(prev => ({ ...prev, respuestas: newRespuestas }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
        await fetch("https://script.google.com/macros/s/AKfycbygA3Rb1RRwMXWosnHIMDOvebYyxzQn3hJBuFzu5gZdCV9523Do93MlyIaz-y74NT2dLg/exec", {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({
                type: 'external',
                payload: formData
            })
        });
        
        setIsSubmitting(false);
        setIsSuccess(true);
    } catch (error) {
        console.error("Error enviando formulario:", error);
        setIsSubmitting(false);
        alert("Ocurrió un error al enviar el formulario. Por favor, intente nuevamente.");
    }
  };

  if (isSuccess) {
      return (
          <div className="flex-1 flex items-center justify-center p-8">
              <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-2xl p-10 max-w-lg text-center shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col items-center">
                  <CheckCircle2 size={64} className="text-emerald-400 mb-6" />
                  <h2 className="text-3xl font-light text-white mb-4">¡Respuestas Enviadas!</h2>
                  <p className="text-emerald-200/80 mb-8">
                      Muchas gracias por completar la Encuesta de Materialidad a Grupos de Interés. Su opinión es fundamental para nosotros.
                  </p>
                  <button 
                      onClick={() => {
                          setIsSuccess(false);
                          setFormData({...formData, respuestas: Array(externalQuestions.length).fill(null)});
                      }}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all"
                  >
                      Volver a iniciar
                  </button>
              </div>
          </div>
      );
  }

  return (
    <div className="flex-1 overflow-auto p-4 md:p-8 relative scroll-smooth">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
            <h1 className="text-3xl font-light text-white mb-2">Encuesta de Materialidad</h1>
            <p className="text-slate-400">Cuestionario dirigido a Grupos de Interés Externos</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
            {/* I. Identificación */}
            <section className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 md:p-8">
                <h2 className="text-xl text-emerald-400 font-medium mb-6">I. Identificación</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">1. Nombre y Apellido*</label>
                        <input required type="text" name="nombreApellidos" value={formData.nombreApellidos} onChange={handleInputChange} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50" />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">2. Sexo*</label>
                        <select required name="sexo" value={formData.sexo} onChange={handleInputChange} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50">
                            <option value="">Seleccione...</option>
                            <option value="HOMBRE">HOMBRE</option>
                            <option value="MUJER">MUJER</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">3. Nro de Cédula de Identidad*</label>
                        <input required type="text" name="cedula" value={formData.cedula} onChange={handleInputChange} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50" />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">4. Edad (Años)*</label>
                        <input required type="number" name="edad" value={formData.edad} onChange={handleInputChange} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50" />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">5. Sector de su Organización*</label>
                        <select required name="sector" value={formData.sector} onChange={handleInputChange} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50">
                            <option value="">Seleccione...</option>
                            {sectors.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">6. Nombre de la Organización que representa*</label>
                        <input required type="text" name="organizacion" value={formData.organizacion} onChange={handleInputChange} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50" />
                    </div>
                </div>
            </section>

            {/* II. Evaluación de Temas */}
            <section className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 md:p-8">
                <h2 className="text-xl text-emerald-400 font-medium mb-2">II. Evaluación de Temas</h2>
                <p className="text-sm text-slate-400 mb-8">¿Qué tan importante es que PARACEL gestione los siguientes temas? Califique de 1 al 5 (5 es Muy Relevante y 1 Nada Relevante)</p>
                
                <div className="space-y-6">
                    {externalQuestions.map((q, idx) => (
                        <div key={idx} className="bg-black/20 p-5 rounded-xl border border-white/5">
                            <p className="text-slate-200 mb-4 font-medium"><span className="text-emerald-500/70 mr-2">{idx + 1}.</span> {q}</p>
                            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                                {[1, 2, 3, 4, 5].map(val => (
                                    <label key={val} className={`cursor-pointer flex-1 text-center py-2 px-3 rounded-lg border transition-all ${formData.respuestas[idx] === val ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-black/30 border-white/10 text-slate-400 hover:bg-white/5'}`}>
                                        <input 
                                            type="radio" 
                                            required
                                            name={`q_${idx}`} 
                                            value={val} 
                                            checked={formData.respuestas[idx] === val}
                                            onChange={() => handleRespuestaChange(idx, val)}
                                            className="sr-only"
                                        />
                                        <div className="text-lg mb-1">{val}</div>
                                        <div className="text-[10px] uppercase tracking-wider opacity-70">
                                            {val === 1 && 'Nada'}
                                            {val === 3 && 'Media'}
                                            {val === 5 && 'Muy'}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* III. Percepción y Sugerencias */}
            <section className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 md:p-8">
                <h2 className="text-xl text-emerald-400 font-medium mb-6">III. Percepción y Sugerencias</h2>
                
                <div className="mb-8">
                    <label className="block text-sm text-slate-300 mb-4 mt-2">¿Cuál es su percepción sobre el desempeño general de la empresa?</label>
                    <div className="flex gap-4">
                        {['NEGATIVA', 'NEUTRAL', 'POSITIVA'].map(val => (
                            <label key={val} className={`cursor-pointer flex-1 text-center py-3 px-4 rounded-xl border transition-all ${formData.percepcion === val ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-black/30 border-white/10 text-slate-400 hover:bg-white/5'}`}>
                                <input 
                                    type="radio" 
                                    name="percepcion" 
                                    value={val} 
                                    checked={formData.percepcion === val}
                                    onChange={handleInputChange}
                                    className="sr-only"
                                />
                                {val}
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-slate-300 mb-2">¿Desea agregar algún comentario?</label>
                    <textarea 
                        name="comentarios" 
                        value={formData.comentarios} 
                        onChange={handleInputChange} 
                        rows={4}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50"
                    ></textarea>
                </div>
            </section>

            {/* Submit */}
            <div className="flex justify-end pt-4 pb-20">
                <button 
                    disabled={isSubmitting}
                    type="submit" 
                    className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50"
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Enviando...
                        </>
                    ) : (
                        <>
                            Enviando Encuesta Externa <Send size={18} />
                        </>
                    )}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};
