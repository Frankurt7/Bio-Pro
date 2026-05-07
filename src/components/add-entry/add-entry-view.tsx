import { useAddEntry } from './hooks/use-add-entry';
import { ChevronLeft, Database, LucideIcon, Save, Activity, Droplets, Flame, Zap, Dumbbell, Bone, Beef, Scale, LayoutPanelLeft, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface AddEntryViewProps {
  onComplete: () => void;
}

export const AddEntryView = ({ onComplete }: AddEntryViewProps) => {
  const { formData, handleChange, handleSubmit } = useAddEntry(onComplete);

  const fields: { name: string, label: string, icon: LucideIcon, min: number, max: number, step: number, unit: string }[] = [
    { name: 'weight', label: 'Peso', icon: Scale, min: 30, max: 200, step: 0.1, unit: 'kg' },
    { name: 'bmi', label: 'IMC', icon: Activity, min: 10, max: 50, step: 0.1, unit: '' },
    { name: 'bodyFatPercent', label: 'Grasa Corp.', icon: Droplets, min: 2, max: 60, step: 0.1, unit: '%' },
    { name: 'musclePercent', label: 'Músculo', icon: Dumbbell, min: 10, max: 90, step: 0.1, unit: '%' },
    { name: 'boneMass', label: 'Masa Ósea', icon: Bone, min: 0, max: 10, step: 0.1, unit: 'kg' },
    { name: 'bmr', label: 'Tasa Met.', icon: Flame, min: 500, max: 4000, step: 1, unit: 'kcal' },
    { name: 'waterPercent', label: 'Agua Corp.', icon: Zap, min: 30, max: 80, step: 0.1, unit: '%' },
    { name: 'proteinPercent', label: 'Proteína', icon: Beef, min: 5, max: 30, step: 0.1, unit: '%' },
    { name: 'metabolicAge', label: 'Edad Met.', icon: Clock, min: 12, max: 100, step: 1, unit: 'años' },
    { name: 'visceralFat', label: 'Grasa Visc.', icon: LayoutPanelLeft, min: 1, max: 30, step: 1, unit: '' },
  ];

  return (
    <div className="space-y-6 pb-20">
      <header className="flex items-center justify-between">
        <button onClick={onComplete} className="p-2 glass-card rounded-xl text-gray-400 hover:text-brand-cyan transition-colors">
           <ChevronLeft size={20} />
        </button>
        <div className="text-center">
            <h1 className="text-lg font-display font-black uppercase italic tracking-[0.3em] neon-text">Protocolo de Carga</h1>
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-0.5">Sincronización de Bio-Datos v2.4</p>
        </div>
        <div className="w-10" />
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Date Selector - Spaceship Style */}
        <div className="glass-card p-6 border-l-2 border-brand-cyan relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
                <Clock size={40} className="text-brand-cyan" />
            </div>
            <label className="text-[9px] uppercase font-black text-brand-cyan mb-3 block tracking-[0.2em]">
                Ventana Temporal de Registro
            </label>
            <input 
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-brand-bg/50 border border-brand-cyan/20 rounded-xl py-3 px-4 text-brand-cyan font-mono font-bold focus:outline-none focus:border-brand-cyan/50 transition-all text-sm"
            />
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 gap-6">
            {fields.map((field) => (
                <div key={field.name} className="glass-card p-5 relative group overflow-hidden border border-white/5 hover:border-brand-cyan/20 transition-all">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-brand-cyan/10 rounded-lg text-brand-cyan border border-brand-cyan/20 group-hover:scale-110 transition-transform">
                                <field.icon size={16} />
                            </div>
                            <div>
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">{field.label}</h3>
                                <p className="text-[8px] text-brand-cyan/50 font-bold uppercase tracking-tighter">Sensor Activo</p>
                            </div>
                        </div>
                        <div className="text-right flex items-center gap-1 justify-end">
                             <input 
                                type="number"
                                name={field.name}
                                step={field.step}
                                value={formData[field.name as keyof typeof formData] || ''}
                                onChange={handleChange}
                                className="w-20 bg-brand-cyan/5 border-b border-brand-cyan/20 text-right text-xl font-display font-black tracking-tighter text-white focus:outline-none focus:border-brand-cyan transition-colors px-1"
                             />
                             <span className="text-[10px] text-brand-cyan uppercase font-black w-8 text-left">{field.unit}</span>
                        </div>
                    </div>
                    
                    <div className="relative flex items-center">
                        <input 
                            type="range"
                            name={field.name}
                            min={field.min}
                            max={field.max}
                            step={field.step}
                            value={formData[field.name as keyof typeof formData] || field.min}
                            onChange={handleChange}
                            className="bio-range-input w-full cursor-pointer h-1.5 bg-brand-accent/30 rounded-full appearance-none outline-none"
                        />
                        <div className="absolute -bottom-4 left-0 w-full flex justify-between px-1">
                            <span className="text-[8px] font-bold text-gray-600 font-mono">{field.min}</span>
                            <span className="text-[8px] font-bold text-gray-600 font-mono">{field.max}</span>
                        </div>
                    </div>
                    
                    {/* Visual Deco */}
                    <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-brand-cyan/5 to-transparent pointer-events-none" />
                </div>
            ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-brand-cyan/20 blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative bg-brand-cyan text-brand-bg font-display font-black uppercase italic tracking-[0.3em] py-5 rounded-2xl flex items-center justify-center gap-3 border border-white/20 shadow-[0_4px_30px_rgba(0,242,255,0.4)]">
                <Save size={20} />
                Confirmar Bio-Carga
            </div>
        </motion.button>
      </form>

      <style>{`
        .bio-range-input::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 18px;
            height: 18px;
            background: #00f2ff;
            border: 4px solid #0d1526;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(0, 242, 255, 0.5);
            transition: all 0.2s;
        }
        .bio-range-input::-webkit-slider-thumb:hover {
            transform: scale(1.2);
            box-shadow: 0 0 15px rgba(0, 242, 255, 0.8);
        }
        .bio-range-input::-moz-range-thumb {
            width: 18px;
            height: 18px;
            background: #00f2ff;
            border: 4px solid #0d1526;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(0, 242, 255, 0.5);
        }
        /* Hide spin buttons */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        input[type="number"] {
            -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};
