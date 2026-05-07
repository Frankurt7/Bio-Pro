import { BodyEntry } from '../../types/stats';

export const BodyAnalysis = ({ entry }: { entry: BodyEntry | null }) => {
  if (!entry) return null;

  // Simple logic for body type analysis based on BMI and Body Fat
  const getBodyType = () => {
    const { bmi, bodyFatPercent } = entry;
    if (bmi < 18.5) return 'Delgado';
    if (bmi < 25 && bodyFatPercent < 20) return 'Atlético';
    if (bmi < 25) return 'Saludable';
    if (bmi < 30) return 'Sobrepeso';
    return 'Obeso';
  };

  const bodyType = getBodyType();

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Análisis del Tipo de Cuerpo</h3>
      
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 bg-brand-cyan/5 rounded-2xl border border-brand-cyan/20 flex flex-col items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-brand-cyan/10 to-transparent" />
             <span className="text-3xl mb-1">👤</span>
             <span className="text-[10px] font-black text-brand-cyan uppercase tracking-tighter">{bodyType}</span>
        </div>
        
        <div className="flex-1 space-y-3">
          <AnalysisRow label="IMC" value={entry.bmi} status="Normal" color="text-green-400" />
          <AnalysisRow label="Grasa" value={`${entry.bodyFatPercent}%`} status="Alto" color="text-orange-400" />
          <AnalysisRow label="Músculo" value={`${entry.musclePercent}%`} status="Excelente" color="text-brand-cyan" />
        </div>
      </div>
      
      <p className="text-[10px] text-gray-500 leading-relaxed italic">
        Tu tipo de cuerpo es <span className="text-brand-cyan underline">{bodyType.toLowerCase()}</span>. 
        Se recomienda mantener una ingesta balanceada de proteínas para optimizar la masa muscular.
      </p>
    </div>
  );
};

const AnalysisRow = ({ label, value, status, color }: { label: string, value: any, status: string, color: string }) => (
  <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
    <span className="text-[10px] font-bold text-gray-400 uppercase">{label}</span>
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold">{value}</span>
      <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded-sm bg-black/30 ${color}`}>{status}</span>
    </div>
  </div>
);
