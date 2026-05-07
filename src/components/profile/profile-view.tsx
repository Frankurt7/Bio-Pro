import { useProfile } from './hooks/use-profile';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Bell, Globe, LogOut, Award, X, AlertCircle, Download, BrainCircuit } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../../store/slices/user-slice';
import { resetStats } from '../../store/slices/stats-slice';
import { ALL_BADGES, Badge } from '../../constants/badges';
import { RootState } from '../../store';
import { toast } from 'sonner';

export const ProfileView = () => {
    const { user, updateProfileStats, updateBasicProfile } = useProfile();
    const history = useSelector((state: RootState) => state.stats.entries);
    const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const dispatch = useDispatch();

    const handleReset = () => {
        dispatch(resetUser());
        dispatch(resetStats());
        setShowResetConfirm(false);
        toast.info("SISTEMA BIOEVO FORMATEADO");
        setTimeout(() => window.location.reload(), 1000);
    };

    const handleExportAI = () => {
        const exportData = {
            metadata: {
                app: "BioEvo Command Center",
                version: "2.0.0",
                exportDate: new Date().toISOString(),
                agentName: user.name,
                context: "Dataset biológico para análisis de evolución y metabolismo mediante IA."
            },
            agentProfile: {
                level: user.level,
                xp: user.xp,
                stats: user.stats,
                badges: user.badges.map(bid => ALL_BADGES.find(b => b.id === bid)?.name || bid)
            },
            history: history.map(h => ({
                date: h.date,
                weight: h.weight,
                bmi: (h.weight / Math.pow(user.stats.height / 100, 2)).toFixed(2),
                weightDiff: (h.weight - user.stats.weightGoal).toFixed(2)
            }))
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bioevo_protocol_${user.name.toLowerCase().replace(/\s+/g, '_')}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast.success("BIO-DATOS EXPORTADOS CORRECTAMENTE", {
            description: "Archivo optimizado para análisis de IA generado."
        });
    };

    const badges = [
        { id: 1, name: 'Madrugador', icon: '🌅', unlocked: user.badges.includes('early_bird') },
        { id: 2, name: 'Constante', icon: '🔥', unlocked: user.badges.includes('consistent') },
        { id: 3, name: 'IMC Sano', icon: '✅', unlocked: user.badges.includes('bmi_pro') },
        { id: 4, name: 'Meta Lograda', icon: '🎯', unlocked: user.badges.includes('goal_setter') },
        { id: 5, name: 'Hidratado', icon: '💧', unlocked: user.badges.includes('water_master') },
        { id: 6, name: 'Hércules', icon: '💪', unlocked: user.badges.includes('muscle_hero') },
        { id: 7, name: 'Carnívoro', icon: '🥩', unlocked: user.badges.includes('protein_king') },
        { id: 8, name: 'Escudo Óseo', icon: '🦴', unlocked: user.badges.includes('bone_shield') },
        { id: 9, name: 'Fénix', icon: '🔥', unlocked: user.badges.includes('fat_burner') },
        { id: 10, name: 'Guerrero', icon: '⚔️', unlocked: user.badges.includes('metabolic_warrior') },
        { id: 11, name: 'Élite', icon: '⭐', unlocked: user.badges.includes('tracker_elite') },
        { id: 12, name: 'Experto', icon: '🏆', unlocked: user.badges.includes('weight_loss_pro') },
        { id: 13, name: 'Veterano', icon: '🎖️', unlocked: user.badges.includes('scale_veteran') },
        { id: 14, name: 'Viajero', icon: '🗺️', unlocked: user.badges.includes('health_journey') },
        { id: 15, name: 'Hacker', icon: '💻', unlocked: user.badges.includes('bio_hacker') },
        { id: 16, name: 'Coleccionista', icon: '📂', unlocked: user.badges.includes('stats_collector') },
        { id: 17, name: 'Visionario', icon: '👁️', unlocked: user.badges.includes('visionary') },
        { id: 18, name: 'Disciplinado', icon: '🧘', unlocked: user.badges.includes('disciplined') },
        { id: 19, name: 'Imparable', icon: '🚀', unlocked: user.badges.includes('unstoppable') },
        { id: 20, name: 'Leyenda', icon: '👑', unlocked: user.badges.includes('legendary') },
    ];

    return (
        <div className="space-y-8 pb-12">
            {/* Badge Detail Modal */}
            <AnimatePresence>
                {selectedBadge && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6"
                    >
                        <div className="absolute inset-0 bg-brand-bg/90 backdrop-blur-md" onClick={() => setSelectedBadge(null)} />
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="glass-card w-full p-8 relative z-10 border-brand-cyan/30 text-center"
                        >
                            <div className="text-6xl mb-4">{selectedBadge.icon}</div>
                            <h3 className="text-2xl font-display font-black uppercase italic text-brand-cyan">{selectedBadge.name}</h3>
                            <p className="text-gray-300 mt-4 text-sm leading-relaxed">{selectedBadge.description}</p>
                            
                            <div className="mt-6 p-4 bg-brand-cyan/5 rounded-2xl border border-brand-cyan/20">
                                <p className="text-[10px] uppercase font-black text-gray-400 mb-1">¿Cómo desbloquear?</p>
                                <p className="text-xs font-medium text-brand-cyan italic">{selectedBadge.howToUnlock}</p>
                            </div>

                            <button 
                                onClick={() => setSelectedBadge(null)}
                                className="w-full mt-8 py-4 bg-white/5 border border-white/10 text-gray-400 font-bold uppercase text-xs rounded-xl"
                            >
                                Entendido
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Reset Confirmation Modal */}
            <AnimatePresence>
                {showResetConfirm && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6"
                    >
                        <div className="absolute inset-0 bg-brand-bg/90 backdrop-blur-md" onClick={() => setShowResetConfirm(false)} />
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="glass-card w-full p-8 relative z-10 border-red-500/30 text-center"
                        >
                            <div className="flex justify-center mb-4">
                                <div className="p-4 bg-red-500/10 rounded-full">
                                    <AlertCircle className="text-red-500" size={32} />
                                </div>
                            </div>
                            <h3 className="text-xl font-display font-black uppercase italic text-red-500">¿Resetear BioEvo?</h3>
                            <p className="text-gray-400 mt-4 text-sm">Esta acción borrará permanentemente todos tus registros y progreso. No se puede deshacer.</p>
                            
                            <div className="flex gap-4 mt-8">
                                <button 
                                    onClick={() => setShowResetConfirm(false)}
                                    className="flex-1 py-4 bg-white/5 border border-white/10 text-gray-400 font-bold uppercase text-xs rounded-xl"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    onClick={handleReset}
                                    className="flex-1 py-4 bg-red-500 text-white font-bold uppercase text-xs rounded-xl shadow-lg shadow-red-500/20"
                                >
                                    Confirmar
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col items-center gap-4 step-profile-avatar">
                <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative"
                >
                    <div className="w-36 h-36 rounded-full border-4 border-brand-cyan p-1 shadow-[0_0_20px_rgba(0,242,255,0.3)]">
                        <div className="w-full h-full rounded-full bg-brand-accent flex items-center justify-center text-4xl overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </motion.div>
                <div className="text-center w-full px-4">
                    <input 
                        className="bg-transparent text-3xl font-display font-black uppercase italic text-center w-full focus:outline-none border-b border-white/5 focus:border-brand-cyan/30 transition-all"
                        value={user.name}
                        onChange={(e) => updateBasicProfile({ name: e.target.value })}
                        placeholder="TU NOMBRE"
                    />
                    <p className="text-brand-cyan text-sm font-bold tracking-widest mt-1 uppercase">Operativo de Vanguardia</p>
                </div>
            </div>

            <div className="glass-card p-6 space-y-6">
                <div className="flex items-center gap-2">
                    <Settings size={14} className="text-brand-cyan" />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Datos del Agente</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <ProfileInput 
                        label="Meta de Peso" 
                        value={user.stats.weightGoal} 
                        unit="KG" 
                        onChange={(val) => updateProfileStats({ weightGoal: val })} 
                    />
                    <ProfileInput 
                        label="Talla" 
                        value={user.stats.height} 
                        unit="CM" 
                        onChange={(val) => updateProfileStats({ height: val })} 
                    />
                    <ProfileInput 
                        label="Edad Actual" 
                        value={user.stats.age} 
                        unit="AÑOS" 
                        onChange={(val) => updateProfileStats({ age: val })} 
                    />
                    <div className="glass-card p-4 text-center border border-white/5 bg-brand-bg/50">
                        <p className="text-[10px] text-gray-500 uppercase font-black mb-1 tracking-tight">Nivel Actual</p>
                        <p className="text-xl font-display font-bold text-brand-cyan italic">LVL {user.level}</p>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-2 ml-2">
                    <Award size={14} className="text-brand-cyan" />
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Bio-Logros</h3>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {ALL_BADGES.map(badge => {
                        const isUnlocked = user.badges.includes(badge.id);
                        return (
                            <div key={badge.id} className="flex flex-col items-center gap-2">
                                <motion.div 
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setSelectedBadge(badge)}
                                    className={`aspect-square w-full glass-card flex items-center justify-center text-3xl transition-all ${isUnlocked ? 'border-brand-cyan/40 bg-brand-cyan/10' : 'filter grayscale opacity-20 border-white/5 bg-brand-accent/30'} shadow-lg cursor-pointer`}
                                >
                                    {badge.icon}
                                </motion.div>
                                <span className={`text-[10px] font-bold uppercase text-center leading-tight tracking-tight px-1 ${isUnlocked ? 'text-brand-cyan' : 'text-gray-600'}`}>{badge.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="glass-card p-6 space-y-6">
                <div className="flex items-center gap-2">
                    <BrainCircuit size={14} className="text-brand-cyan" />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Exportar Protocolos</h3>
                </div>
                <button 
                    onClick={handleExportAI}
                    className="w-full p-4 bg-brand-cyan/10 border border-brand-cyan/20 rounded-2xl flex items-center justify-between group hover:bg-brand-cyan/20 transition-all"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-brand-cyan/20 rounded-lg group-hover:scale-110 transition-transform">
                            <Download size={18} className="text-brand-cyan" />
                        </div>
                        <div className="text-left">
                            <p className="text-xs font-black uppercase text-white tracking-widest">Dataset para IA</p>
                            <p className="text-[10px] text-gray-500 uppercase font-black tracking-tighter">Formato JSON Optimizado</p>
                        </div>
                    </div>
                    <div className="p-1 px-2 border border-brand-cyan/30 rounded text-[8px] font-bold text-brand-cyan uppercase">
                        AI READY
                    </div>
                </button>
            </div>

            <div className="pt-8 mb-4">
                <button 
                    onClick={() => setShowResetConfirm(true)}
                    className="w-full p-5 glass-card border-red-500/20 text-red-400 flex items-center justify-center gap-3 hover:bg-red-500/5 transition-all group"
                >
                    <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
                    <span className="text-xs font-black uppercase tracking-[0.2em] italic">Resetear Datos de Fábrica</span>
                </button>
            </div>
        </div>
    );
};

const ProfileInput = ({ label, value, unit, onChange }: { label: string, value: number, unit: string, onChange: (v: number) => void }) => (
    <div className="glass-card p-4 text-center border border-white/5 bg-brand-bg/50 focus-within:border-brand-cyan/30 transition-all">
        <p className="text-[10px] text-gray-500 uppercase font-black mb-2 tracking-tight">{label}</p>
        <div className="flex items-center justify-center gap-1">
            <input 
                type="number"
                className="bg-transparent font-display font-bold text-center w-16 text-xl focus:outline-none text-white"
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            />
            <span className="text-[10px] text-brand-cyan font-black italic">{unit}</span>
        </div>
    </div>
);
