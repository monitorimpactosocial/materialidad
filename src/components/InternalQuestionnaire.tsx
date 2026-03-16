import React, { useState } from 'react';
import { externalQuestions } from '../lib/questions';
// import { useData } from '../lib/DataContext';
import { Send, CheckCircle2 } from 'lucide-react';

export const InternalQuestionnaire = () => {
  // const { reload } = useData();
  const [formData, setFormData] = useState({
    nombreApellidos: '',
    area: '',
    cargo: '',
    // Dos arrays de respuestas, uno para impacto socio-ambiental y otro financiero
    respuestasImpacto: Array(externalQuestions.length).fill(null),
    respuestasFinanciero: Array(externalQuestions.length).fill(null),
    comentarios: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRespuestaChange = (tipo: 'impacto' | 'financiero', index: number, value: number) => {
    if (tipo === 'impacto') {
        const newArr = [...formData.respuestasImpacto];
        newArr[index] = value;
        setFormData(prev => ({ ...prev, respuestasImpacto: newArr }));
    } else {
        const newArr = [...formData.respuestasFinanciero];
        newArr[index] = value;
        setFormData(prev => ({ ...prev, respuestasFinanciero: newArr }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
        await fetch("https://script.google.com/macros/s/AKfycbygA3Rb1RRwMXWosnHIMDOvebYyxzQn3hJBuFzu5gZdCV9523Do93MlyIaz-y74NT2dLg/exec", {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({
                type: 'internal',
                payload: formData
            })
        });
        
        setIsSubmitting(false);
        setIsSuccess(true);
    } catch (error) {
        console.error("Error enviando formulario:", error);
        setIsSubmitting(false);
        alert("Ocurrió un error al enviar la evaluación. Por favor, intente nuevamente.");
    }
  };

  if (isSuccess) {
      return (
          <div className="flex-1 flex items-center justify-center p-8">
              <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-2xl p-10 max-w-lg text-center shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col items-center">
                  <CheckCircle2 size={64} className="text-emerald-400 mb-6" />
                  <h2 className="text-3xl font-light text-white mb-4">¡Evaluación Registrada!</h2>
                  <p className="text-emerald-200/80 mb-8">
                      Gracias por completar la evaluación de Riesgos, Impactos y Oportunidades (Directivos y Líderes).
                  </p>
                  <button 
                      onClick={() => {
                          setIsSuccess(false);
                          setFormData({...formData, respuestasImpacto: Array(externalQuestions.length).fill(null), respuestasFinanciero: Array(externalQuestions.length).fill(null)});
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
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 border-b border-white/10 pb-6">
            <h1 className="text-3xl font-light text-white mb-2">Encuesta de Materialidad (Interna)</h1>
            <p className="text-slate-400">Evaluación Estratégica para Líderes y Directivos de PARACEL</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
            {/* I. Identificación */}
            <section className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 md:p-8">
                <h2 className="text-xl text-emerald-400 font-medium mb-6">I. Identificación del Evaluador</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">Nombre y Apellido*</label>
                        <input required type="text" name="nombreApellidos" value={formData.nombreApellidos} onChange={handleInputChange} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50" />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">Área / Dirección*</label>
                        <input required type="text" name="area" value={formData.area} onChange={handleInputChange} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50" />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">Cargo*</label>
                        <input required type="text" name="cargo" value={formData.cargo} onChange={handleInputChange} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50" />
                    </div>
                </div>
            </section>

            {/* II. Evaluación Dual */}
            <section className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="mb-8">
                    <h2 className="text-xl text-emerald-400 font-medium mb-2">II. Evaluación de Doble Materialidad</h2>
                    <p className="text-sm text-slate-400 mb-4">
                        Para cada tema propuesto, evalúe dos dimensiones del 1 (Nada Relevante) al 5 (Muy Relevante):
                    </p>
                    <ul className="text-sm text-slate-300 space-y-2 list-disc pl-5">
                        <li><strong>Impacto:</strong> Efectos reales o potenciales sobre la economía, medio ambiente y personas (incluye DDHH).</li>
                        <li><strong>Financiero:</strong> Riesgos u oportunidades que afectan la posición financiera, resultados o flujos de caja de PARACEL.</li>
                    </ul>
                </div>
                
                <div className="space-y-8">
                    {externalQuestions.map((q, idx) => (
                        <div key={idx} className="bg-black/20 p-5 md:p-6 rounded-xl border border-white/5">
                            <p className="text-slate-200 mb-6 font-medium text-lg leading-relaxed"><span className="text-emerald-500/70 mr-2">{idx + 1}.</span> {q}</p>
                            
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                {/* Escala 1: Impacto */}
                                <div>
                                    <h4 className="text-emerald-300/80 text-sm mb-3 font-medium uppercase tracking-wider flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Materialidad de Impacto
                                    </h4>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map(val => (
                                            <label key={`imp-${val}`} className={`cursor-pointer flex-1 text-center py-2 px-1 rounded-lg border transition-all ${formData.respuestasImpacto[idx] === val ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-black/30 border-white/10 text-slate-400 hover:bg-white/5'}`}>
                                                <input required type="radio" name={`imp_${idx}`} value={val} checked={formData.respuestasImpacto[idx] === val} onChange={() => handleRespuestaChange('impacto', idx, val)} className="hidden" />
                                                <div className="text-lg font-medium">{val}</div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Escala 2: Financiero */}
                                <div>
                                    <h4 className="text-amber-300/80 text-sm mb-3 font-medium uppercase tracking-wider flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-amber-500"></div> Materialidad Financiera
                                    </h4>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map(val => (
                                            <label key={`fin-${val}`} className={`cursor-pointer flex-1 text-center py-2 px-1 rounded-lg border transition-all ${formData.respuestasFinanciero[idx] === val ? 'bg-amber-500/20 border-amber-500/50 text-amber-500' : 'bg-black/30 border-white/10 text-slate-400 hover:bg-white/5'}`}>
                                                <input required type="radio" name={`fin_${idx}`} value={val} checked={formData.respuestasFinanciero[idx] === val} onChange={() => handleRespuestaChange('financiero', idx, val)} className="hidden" />
                                                <div className="text-lg font-medium">{val}</div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
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
                            Guardando Evaluación...
                        </>
                    ) : (
                        <>
                            Enviar Evaluación <Send size={18} />
                        </>
                    )}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};
