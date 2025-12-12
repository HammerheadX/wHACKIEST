import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Sparkles, Trophy } from 'lucide-react';

export default function LevelUpModal({ level, onClose }) {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.5, y: 100 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: "spring", damping: 12 }}
                    className="bg-white rounded-3xl p-8 max-w-md w-full text-center relative overflow-hidden shadow-2xl border-4 border-yellow-400"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Confetti Background (Simple CSS/SVG simulation) */}
                    <div className="absolute inset-0 pointer-events-none opacity-20">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,rgba(255,215,0,0.5)_0%,transparent_70%)] animate-pulse" />
                    </div>

                    <motion.div
                        initial={{ rotate: -180, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-32 h-32 bg-yellow-100 rounded-full mx-auto flex items-center justify-center mb-6 shadow-inner border-4 border-yellow-300"
                    >
                        <Trophy size={64} className="text-yellow-600" />
                    </motion.div>

                    <h2 className="text-4xl font-black text-brand-dark mb-2 uppercase tracking-tight">Level Up!</h2>
                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600 mb-4 drop-shadow-sm">
                        {level}
                    </div>

                    <p className="text-gray-600 font-medium mb-8">
                        You are now a higher level explorer! New quests and hidden secrets await you.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onClose}
                        className="w-full py-4 bg-brand-accent text-white font-bold rounded-xl shadow-lg border-b-4 border-brand-dark/20"
                    >
                        Awesome!
                    </motion.button>

                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
