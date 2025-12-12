import React from 'react';
import { useGamification } from '../context/GamificationContext';
import { Trophy, Medal, Map, Star, Award, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Profile() {
    const { xp, level, getLevelTitle, getLevelProgress, badges, completedQuests, stamps } = useGamification();
    const progress = getLevelProgress();

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-6">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Profile Header Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-accent to-purple-500" />

                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full bg-brand-light flex items-center justify-center text-4xl border-4 border-white shadow-lg overflow-hidden">
                                👤
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-brand-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-md border-2 border-white">
                                Lvl {level}
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-black text-brand-dark mb-1">Explorer Aayush</h1>
                            <p className="text-brand-accent font-bold uppercase tracking-wider text-sm mb-4">{getLevelTitle()}</p>

                            {/* XP Bar */}
                            <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-accent to-orange-400"
                                />
                                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-black/50 uppercase tracking-widest">
                                    {Math.floor(progress)}% to Level {level + 1}
                                </div>
                            </div>
                            <div className="mt-2 flex justify-between text-xs font-medium text-gray-500">
                                <span>Current XP: {xp}</span>
                                <span>Next Level Goal</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard icon={<Zap className="text-yellow-500" />} label="Total XP" value={xp} delay={0.1} />
                    <StatCard icon={<Trophy className="text-brand-accent" />} label="Quests Done" value={completedQuests.length} delay={0.2} />
                    <StatCard icon={<Medal className="text-blue-500" />} label="Badges" value={badges.length} delay={0.3} />
                    <StatCard icon={<Star className="text-purple-500" />} label="Stamps" value={stamps ? Object.values(stamps).reduce((a, b) => a + b, 0) : 0} delay={0.4} />
                </div>

                {/* Stamps Collection */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
                >
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Star className="text-purple-500" />
                        Stamps Collection
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {stamps && Object.entries(stamps).map(([type, count], idx) => (
                            <div key={type} className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 ${count > 0 ? 'bg-white border-gray-100' : 'bg-gray-50 border-dashed border-gray-200 opacity-60'}`}>
                                <div className={`w-3 h-3 rounded-full ${type === 'common' ? 'bg-emerald-400' : type === 'rare' ? 'bg-blue-400' : type === 'epic' ? 'bg-purple-400' : 'bg-amber-400'}`} />
                                <span className="font-bold uppercase text-xs tracking-wider text-gray-500">{type}</span>
                                <span className="text-2xl font-black text-gray-800">{count}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Badges Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
                >
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Award className="text-brand-accent" />
                        Badges Collection
                    </h2>

                    {badges.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {badges.map((badge, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.05, rotate: 2 }}
                                    className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center border-2 border-gray-100 hover:border-brand-accent/30 transition-colors"
                                >
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-2xl mb-2">
                                        🎖️
                                    </div>
                                    <span className="font-bold text-sm text-gray-800 leading-tight">{badge}</span>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-400 font-medium">Complete quests to earn badges!</p>
                        </div>
                    )}
                </motion.div>

            </div>
        </div>
    );
}

const StatCard = ({ icon, label, value, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay }}
        whileHover={{ y: -5 }}
        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center justify-center gap-2"
    >
        <div className="p-3 bg-gray-50 rounded-full mb-1">{icon}</div>
        <div className="text-2xl font-black text-brand-dark">{value}</div>
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</div>
    </motion.div>
);
