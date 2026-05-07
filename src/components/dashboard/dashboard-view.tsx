import { motion, AnimatePresence } from 'motion/react';
import { useDashboard } from './hooks/use-dashboard';
import { Activity, Droplets, Flame, Zap, Dumbbell, Bone, Beef, X, ChevronRight } from 'lucide-react';
import { BodyAnalysis } from './body-analysis';
import { cn } from '../../lib/utils';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from 'recharts';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { BrandLogo } from '../brand-logo';

export const DashboardView = () => {
  const { latestEntry, allEntries, user, weightDiff } = useDashboard();
  const [selectedMetric, setSelectedMetric] = useState<{ label: string, key: string, unit: string } | null>(null);
  const todayFormatted = format(new Date(), "eeee, d 'de' MMMM", { locale: es });

  const getStatus = (current: number, goal: number) => {
    const diff = Math.abs(current - goal);
    if (diff === 0 || current <= goal) return { text: 'ÓPTIMO', color: 'text-green-400' };
    if (diff < 3) return { text: 'ESTABLE', color: 'text-brand-cyan' };
    if (diff < 7) return { text: 'ALERTA', color: 'text-yellow-400' };
    return { text: 'CRÍTICO', color: 'text-red-400' };
  };

  const currentStatus = latestEntry ? getStatus(latestEntry.weight, user.stats.weightGoal) : { text: 'S/D', color: 'text-gray-500' };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const metricTrendData = allEntries.map(e => ({
    date: format(new Date(e.date), 'dd/MM'),
    value: e[selectedMetric?.key as keyof typeof e] as number || 0
  })).reverse();

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4 pb-4 relative"
    >
      {/* Metric Detail Overlay */}
      <AnimatePresence>
        {selectedMetric && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-brand-bg/90 backdrop-blur-xl" onClick={() => setSelectedMetric(null)} />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card w-full p-6 relative z-10 border-brand-cyan/30"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <BrandLogo size={32} />
                  <div>
                    <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter text-white">
                      {selectedMetric.label} <span className="text-brand-cyan">PRO</span>
                    </h3>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1 font-black">Nivel de Evolución Lograda</p>
                  </div>
                </div>
                <button onClick={() => setSelectedMetric(null)} className="p-2 glass-card rounded-xl text-gray-400">
                  <X size={20} />
                </button>
              </div>

              <div className="h-56 w-full mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metricTrendData} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 700 }} />
                    <YAxis hide domain={['auto', 'auto']} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#0d1526', border: '1px solid #00f2ff33', borderRadius: '12px' }}
                        itemStyle={{ color: '#00f2ff' }}
                        formatter={(value: any) => [value, 'VALOR']}
                    />
                    <Line type="monotone" dataKey="value" stroke="#00f2ff" strokeWidth={3} dot={{ fill: '#00f2ff', r: 4 }} activeDot={{ r: 6 }}>
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

              <div className="flex gap-4">
                <div className="flex-1 glass-card p-4 bg-brand-cyan/5">
                    <p className="text-[8px] text-gray-500 font-black uppercase mb-1 tracking-widest">Valor Actual</p>
                    <p className="text-2xl font-display font-black text-white">
                        {latestEntry ? latestEntry[selectedMetric.key as keyof typeof latestEntry] : '---'}
                        <span className="text-xs text-brand-cyan ml-1 font-black">{selectedMetric.unit}</span>
                    </p>
                </div>
                <div className="flex-1 glass-card p-4">
                    <p className="text-[8px] text-gray-500 font-black uppercase mb-1 tracking-widest">Estado</p>
                    <p className={cn("text-2xl font-display font-black", 
                        selectedMetric.key === 'weight' ? currentStatus.color : 'text-green-400'
                    )}>
                        {selectedMetric.key === 'weight' ? currentStatus.text : 'ESTABLE'}
                    </p>
                </div>
              </div>

              <button 
                onClick={() => setSelectedMetric(null)}
                className="w-full mt-6 py-4 bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan font-bold uppercase text-xs rounded-xl flex items-center justify-center gap-2"
              >
                Cerrar Análisis <ChevronRight size={14} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.header variants={itemVariants} className="flex justify-between items-start step-dashboard-header">
        <div className="flex flex-col gap-1">
          <p className="text-gray-400 text-xs font-medium uppercase tracking-tight">{todayFormatted}</p>
          <h1 className="text-3xl font-display font-bold uppercase tracking-tight">
            HOLA, <span className="neon-text">{user.name}</span>
          </h1>
        </div>
        <BrandLogo size={44} />
      </motion.header>

      {/* Level Card */}
      <motion.div variants={itemVariants} className="glass-card p-4 relative overflow-hidden step-dashboard-level">
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-black mb-1">Nivel Actual</p>
            <p className="text-2xl font-display font-black italic">LVL {user.level}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-black mb-1">XP</p>
            <div className="flex items-center gap-1">
              <Zap size={16} className="text-brand-cyan" />
              <span className="text-xl font-black">{user.xp}</span>
            </div>
          </div>
        </div>
        
        <div className="h-1.5 bg-brand-accent/50 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(user.xp / user.xpToNextLevel) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-brand-cyan shadow-[0_0_8px_rgba(0,242,255,0.8)]"
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[9px] font-bold text-gray-500 italic">{user.xp}/{user.xpToNextLevel} XP</span>
        </div>
      </motion.div>

      {/* Character / Hero Area */}
      <motion.div variants={itemVariants} className="relative flex justify-center py-2 pt-5 h-80 step-dashboard-avatar !mt-[22px]">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-72 h-72 bg-brand-cyan/10 rounded-full blur-3xl" 
          />
        </div>
        
        <div className="relative z-10 flex flex-col items-center">
            <div className="w-64 h-64 rounded-full border-2 border-brand-cyan/20 p-2 relative">
                <div className="w-full h-full rounded-full bg-gradient-to-b from-brand-cyan/20 to-transparent flex items-center justify-center overflow-hidden">
                    <UserCharacter />
                </div>
                {/* Orbital Stats */}
                <OrbitalStat 
                    icon={Activity} 
                    label="GRASA" 
                    value={latestEntry?.bodyFatPercent ? `${latestEntry.bodyFatPercent}%` : '---'} 
                    position="top-0 left-0" 
                    delay={0.4} 
                    onClick={() => setSelectedMetric({ label: 'Grasa Corporal', key: 'bodyFatPercent', unit: '%' })}
                />
                <OrbitalStat 
                    icon={Droplets} 
                    label="AGUA" 
                    value={latestEntry?.waterPercent ? `${latestEntry.waterPercent}%` : '---'} 
                    position="top-20 -right-4" 
                    delay={0.5} 
                    onClick={() => setSelectedMetric({ label: 'Agua Corporal', key: 'waterPercent', unit: '%' })}
                />
                <OrbitalStat 
                    icon={Flame} 
                    label="BMR" 
                    value={latestEntry?.bmr ? `${latestEntry.bmr}` : '---'} 
                    position="bottom-8 -left-4" 
                    delay={0.6} 
                    title="Metabolismo Basal" 
                    onClick={() => setSelectedMetric({ label: 'Metabolismo Basal', key: 'bmr', unit: 'Kcal' })}
                />
                <OrbitalStat 
                    icon={Dumbbell} 
                    label="MÚSC" 
                    value={latestEntry?.musclePercent ? `${latestEntry.musclePercent}%` : '---'} 
                    position="top-0 right-0" 
                    delay={0.7} 
                    onClick={() => setSelectedMetric({ label: 'Masa Muscular', key: 'musclePercent', unit: '%' })}
                />
                <OrbitalStat 
                    icon={Bone} 
                    label="HUESO" 
                    value={latestEntry?.boneMass ? `${latestEntry.boneMass}` : '---'} 
                    position="bottom-8 -right-4" 
                    delay={0.8} 
                    onClick={() => setSelectedMetric({ label: 'Masa Ósea', key: 'boneMass', unit: 'KG' })}
                />
                <OrbitalStat 
                    icon={Beef} 
                    label="PROT" 
                    value={latestEntry?.proteinPercent ? `${latestEntry.proteinPercent}%` : '---'} 
                    position="bottom-[-20px] left-1/2 -ml-7" 
                    delay={0.9} 
                    onClick={() => setSelectedMetric({ label: 'Proteína', key: 'proteinPercent', unit: '%' })}
                />
            </div>
        </div>
      </motion.div>

      {/* Body Analysis Feature */}
      <motion.div variants={itemVariants} className="step-dashboard-analysis">
        <BodyAnalysis entry={latestEntry} />
      </motion.div>

      {/* Weight Summary */}
      <motion.div variants={itemVariants} className="glass-card p-4 border-t-2 border-t-brand-cyan step-dashboard-weight">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-1 font-black">Composición Corporal</p>
            <h2 className="text-3xl font-black font-display uppercase italic text-white">
              {latestEntry?.weight || '---'} <span className="text-brand-cyan text-base">KG</span>
            </h2>
          </div>
          <div className="text-right cursor-pointer group" onClick={() => setSelectedMetric({ label: 'Peso Corporal', key: 'weight', unit: 'KG' })}>
            <p className={cn(
                "text-base font-black font-mono tracking-tighter group-hover:scale-110 transition-transform",
                parseFloat(weightDiff) > 0 ? "text-red-400" : "text-brand-cyan"
            )}>
                {parseFloat(weightDiff) > 0 ? '+' : ''}{weightDiff} KG
            </p>
            <p className="text-xs text-gray-500 uppercase font-black tracking-tighter">DELTA REGISTRO</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const UserCharacter = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full text-brand-cyan active">
        <path fill="currentColor" opacity="0.1" d="M100 20 L130 60 L130 140 L100 180 L70 140 L70 60 Z" />
        <path fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" d="M100 20 L130 60 L130 140 L100 180 L70 140 L70 60 Z" />
        <circle cx="100" cy="40" r="15" fill="currentColor" opacity="0.3" />
        <rect x="85" y="60" width="30" height="60" rx="4" fill="currentColor" opacity="0.2" />
    </svg>
);

const OrbitalStat = ({ icon: Icon, label, value, position, delay, title, onClick }: { icon: any, label: string, value: string, position: string, delay?: number, title?: string, onClick?: () => void }) => (
    <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay, duration: 0.5, type: 'spring' }}
        onClick={onClick}
        title={title}
        className={`absolute ${position} flex flex-col items-center bg-brand-bg border border-brand-cyan/30 rounded-xl p-1.5 w-14 h-14 justify-center shadow-lg transition-all hover:scale-110 cursor-pointer overflow-hidden group/orbit`}
    >
        <div className="absolute inset-0 bg-brand-cyan/5 group-hover/orbit:bg-brand-cyan/10 -z-10 transition-colors" />
        <Icon size={16} className="text-brand-cyan mb-0.5 group-hover/orbit:scale-110 transition-transform" />
        <span className="text-[7px] font-black text-gray-500 uppercase leading-none mb-0.5 tracking-tighter">{label}</span>
        <span className="text-[9px] font-black leading-none text-white">{value}</span>
    </motion.div>
);
