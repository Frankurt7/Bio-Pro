import { useState } from 'react';
import { useHistory } from './hooks/use-history';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from 'recharts';
import { TrendingUp, Calendar, Trash2, Edit2, ChevronLeft, Save, Scale, Activity, Droplets, Dumbbell, Bone, Flame, Zap, Beef, Clock, LayoutPanelLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BodyEntry } from '../../types/stats';
import { cn } from '../../lib/utils';

export const HistoryView = () => {
  const { entries, handleDelete, handleUpdate } = useHistory();
  const [editingEntry, setEditingEntry] = useState<BodyEntry | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<{ label: string, key: keyof BodyEntry, unit: string, icon: any }>({ 
    label: 'Peso', key: 'weight', unit: 'kg', icon: Scale 
  });

  const chartData = [...entries].map(entry => ({
    date: format(new Date(entry.date), 'dd/MM'),
    value: entry[selectedMetric.key] as number || 0,
  })).reverse();

  const metrics = [
    { label: 'Peso', key: 'weight' as keyof BodyEntry, unit: 'kg', icon: Scale },
    { label: 'IMC', key: 'bmi' as keyof BodyEntry, unit: '', icon: Activity },
    { label: 'Grasa', key: 'bodyFatPercent' as keyof BodyEntry, unit: '%', icon: Droplets },
    { label: 'Músculo', key: 'musclePercent' as keyof BodyEntry, unit: '%', icon: Dumbbell },
    { label: 'Hueso', key: 'boneMass' as keyof BodyEntry, unit: 'kg', icon: Bone },
    { label: 'BMR', key: 'bmr' as keyof BodyEntry, unit: 'kcal', icon: Flame },
    { label: 'Agua', key: 'waterPercent' as keyof BodyEntry, unit: '%', icon: Zap },
    { label: 'Proteína', key: 'proteinPercent' as keyof BodyEntry, unit: '%', icon: Beef },
    { label: 'Edad Met.', key: 'metabolicAge' as keyof BodyEntry, unit: 'a', icon: Clock },
    { label: 'Visceral', key: 'visceralFat' as keyof BodyEntry, unit: '', icon: LayoutPanelLeft },
  ];

  if (editingEntry) {
    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <button onClick={() => setEditingEntry(null)} className="p-2 glass-card rounded-xl text-gray-400 hover:text-brand-cyan transition-colors">
                    <ChevronLeft size={20} />
                </button>
                <h1 className="text-xl font-display font-bold uppercase italic tracking-widest neon-text">Editar Registro</h1>
                <div className="w-10" />
            </header>
            <div className="glass-card p-6 overflow-y-auto max-h-[75vh]">
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <EditField label="Peso (KG)" value={editingEntry.weight} onChange={(v) => setEditingEntry({...editingEntry, weight: v})} />
                        <EditField label="Grasa (%)" value={editingEntry.bodyFatPercent} onChange={(v) => setEditingEntry({...editingEntry, bodyFatPercent: v})} />
                        <EditField label="IMC" value={editingEntry.bmi} onChange={(v) => setEditingEntry({...editingEntry, bmi: v})} />
                        <EditField label="Agua (%)" value={editingEntry.waterPercent} onChange={(v) => setEditingEntry({...editingEntry, waterPercent: v})} />
                        <EditField label="Hueso (KG)" value={editingEntry.boneMass} onChange={(v) => setEditingEntry({...editingEntry, boneMass: v})} />
                        <EditField label="BMR (Kcal)" value={editingEntry.bmr} onChange={(v) => setEditingEntry({...editingEntry, bmr: v})} />
                        <EditField label="Musculo (%)" value={editingEntry.musclePercent} onChange={(v) => setEditingEntry({...editingEntry, musclePercent: v})} />
                        <EditField label="Proteina (%)" value={editingEntry.proteinPercent} onChange={(v) => setEditingEntry({...editingEntry, proteinPercent: v})} />
                        <EditField label="Edad Met." value={editingEntry.metabolicAge} onChange={(v) => setEditingEntry({...editingEntry, metabolicAge: v})} />
                        <EditField label="Visceral (%)" value={editingEntry.visceralFat} onChange={(v) => setEditingEntry({...editingEntry, visceralFat: v})} />
                    </div>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            handleUpdate(editingEntry);
                            setEditingEntry(null);
                        }}
                        className="w-full bg-brand-cyan text-brand-bg font-display font-black uppercase italic tracking-widest py-5 rounded-2xl shadow-[0_0_20px_rgba(0,242,255,0.4)] flex items-center justify-center gap-2 mt-4"
                    >
                        <Save size={20} />
                        Guardar Registro
                    </motion.button>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <header>
        <h1 className="text-2xl font-display font-bold uppercase italic tracking-wider">Log de Evolución</h1>
        <p className="text-gray-500 text-sm">Visualizando tu progreso biomecánico</p>
      </header>

      {/* Metric Selector Slider */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
        {metrics.map((m) => (
            <button
                key={m.key}
                onClick={() => setSelectedMetric({ label: m.label, key: m.key as keyof BodyEntry, unit: m.unit, icon: m.icon })}
                className={cn(
                    "flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-xs font-bold uppercase tracking-tighter",
                    selectedMetric.key === m.key 
                        ? "bg-brand-cyan/20 border-brand-cyan text-brand-cyan" 
                        : "bg-brand-bg border-white/5 text-gray-500 hover:border-white/20"
                )}
            >
                <m.icon size={12} />
                {m.label}
            </button>
        ))}
      </div>

      {/* Chart Section */}
      <motion.div 
        key={selectedMetric.key}
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="glass-card p-4 h-64 border-t border-brand-cyan/20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <selectedMetric.icon size={120} className="text-brand-cyan" />
        </div>
        <div className="flex items-center justify-between mb-4 ml-2">
            <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-brand-cyan" />
                <span className="text-xs font-black uppercase tracking-[0.2em]">Tendencia: {selectedMetric.label}</span>
            </div>
            <span className="text-[10px] font-mono text-brand-cyan font-bold">{selectedMetric.unit}</span>
        </div>
        <div className="w-full h-44">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#4b5563', fontSize: 9, fontWeight: 700 }}
                minTickGap={20}
              />
              <YAxis 
                hide 
                domain={['auto', 'auto']} 
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0d1526', border: '1px solid #00f2ff33', borderRadius: '12px' }}
                itemStyle={{ color: '#00f2ff' }}
                labelStyle={{ color: '#6b7280', fontSize: '10px', fontWeight: 'bold' }}
                formatter={(value: any) => [value, 'VALOR']}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#00f2ff" 
                strokeWidth={3} 
                dot={{ fill: '#00f2ff', r: 4 }} 
                activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                animationDuration={1000}
              >
                <LabelList 
                  dataKey="value" 
                  position="top" 
                  fill="#00f2ff" 
                  fontSize={10} 
                  fontWeight="900" 
                  offset={12}
                />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* History List */}
      <div className="space-y-3 pb-8">
        <h3 className="text-[10px] uppercase font-black text-gray-500 tracking-[0.3em] ml-2">Registros de Misión</h3>
        <AnimatePresence mode="popLayout">
          {entries.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card p-8 text-center text-gray-500 italic"
            >
              No se han encontrado bio-registros.
            </motion.div>
          ) : (
            entries.map((entry) => (
              <motion.div 
                layout
                key={entry.id} 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                className="glass-card p-4 flex items-center justify-between group hover:border-brand-cyan/30 transition-all border border-white/5"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/50 flex flex-col items-center justify-center border border-white/5 group-hover:border-brand-cyan/20 transition-all">
                    <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-tighter">{format(new Date(entry.date), 'MMM')}</span>
                    <span className="text-lg font-display font-black tracking-tighter -mt-1">{format(new Date(entry.date), 'dd')}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-display font-black tracking-tight">
                        {entry[selectedMetric.key]} <span className="text-[10px] text-gray-500 uppercase">{selectedMetric.unit}</span>
                      </span>
                      {selectedMetric.key === 'weight' && (
                        <span className="text-[8px] bg-brand-cyan/10 text-brand-cyan px-1.5 py-0.5 rounded border border-brand-cyan/20 font-black uppercase tracking-tighter">Estable</span>
                      )}
                    </div>
                    <div className="flex gap-3 mt-1">
                      <span className="text-[10px] text-gray-400 flex items-center gap-1 font-bold">
                          <Calendar size={10} /> {format(new Date(entry.date), 'HH:mm')}
                      </span>
                      {selectedMetric.key !== 'bmi' && (
                        <span className="text-[10px] text-gray-500 font-black tracking-tighter uppercase">IMC: {entry.bmi}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                    <button 
                        onClick={() => setEditingEntry(entry)}
                        className="p-2.5 text-gray-600 hover:text-brand-cyan hover:bg-brand-cyan/10 rounded-xl transition-all"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button 
                        onClick={() => handleDelete(entry.id)}
                        className="p-2.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const EditField = ({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) => (
    <div className="flex flex-col gap-1">
        <label className="text-[9px] uppercase font-black text-gray-500 ml-1 tracking-widest">{label}</label>
        <input 
            type="number"
            step="0.1"
            className="bg-brand-accent/30 border border-white/5 rounded-xl p-4 text-sm font-bold focus:outline-none focus:border-brand-cyan/30 text-white"
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        />
    </div>
);
