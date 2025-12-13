import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Map, Compass, Ghost, MapPin, ArrowRight, ChevronDown } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';

// --- Scroll Reveal Helper Component ---
const RevealOnScroll = ({ children, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                } ${className}`}
        >
            {children}
        </div>
    );
};

export default function LandingPage() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const { userProfile } = useGamification();

    // Helper to determine destination
    const getDestination = () => {
        if (!isAuthenticated) return "/auth";
        return userProfile ? "/explore" : "/onboarding";
    };

    return (
        <div className="min-h-screen bg-brand-bg text-brand-dark font-sans overflow-x-hidden selection:bg-brand-accent selection:text-white">

            {/* --- Navigation --- */}
            <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-brand-bg/80 backdrop-blur-md border-b border-brand-dark/5">
                <div className="text-2xl font-serif font-bold tracking-tighter">
                    Heritage<span className="text-brand-accent">Quest</span>.
                </div>
                <div className="flex gap-4">
                    <Link
                        to="/auth"
                        state={{ mode: 'login' }}
                        className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-wide border border-brand-dark px-6 py-2 rounded-full hover:bg-brand-dark hover:text-brand-bg transition-all"
                    >
                        Login
                    </Link>
                    <Link
                        to="/auth"
                        state={{ mode: 'signup' }}
                        className="flex items-center gap-2 bg-brand-accent text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-brand-accent/30 hover:shadow-xl hover:scale-105 transition-all"
                    >
                        Begin Journey <ArrowRight size={16} />
                    </Link>
                </div>
            </nav>

            {/* --- Hero Section --- */}
            <header className="relative pt-32 pb-20 px-6 min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
                {/* Abstract Background Shapes */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-card rounded-full blur-3xl opacity-50"></div>

                <RevealOnScroll className="relative z-10 max-w-4xl mx-auto space-y-6">
                    <div className="inline-block bg-brand-card px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-brand-dark/10">
                        Re-imagine Travel
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.1] text-brand-dark">
                        Not just a trip.<br />
                        A <span className="text-brand-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-orange-600">Legend.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-brand-dark/70 max-w-2xl mx-auto font-medium leading-relaxed">
                        Gamified GPS quests, AI-curated heritage paths, and a Wanderer mode that rewards you for getting lost. Experience the world like never before.
                    </p>

                    <div className="pt-8 flex flex-col md:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/auth"
                            state={{ mode: 'signup' }}
                            className="bg-brand-dark text-brand-bg px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-accent transition-colors duration-300 w-full md:w-auto shadow-2xl"
                        >
                            Start Your Quest
                        </Link>
                        <button
                            onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                            className="text-brand-dark/60 font-bold text-sm hover:text-brand-dark transition-colors flex items-center gap-1"
                        >
                            Discover More <ChevronDown size={16} />
                        </button>
                    </div>
                </RevealOnScroll>

                {/* Hero Image Marquee / Collage */}
                <RevealOnScroll className="mt-16 w-full max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 opacity-90">
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-brand-card rotate-[-2deg] translate-y-4 hover:rotate-0 transition-transform duration-500 shadow-xl">
                        <img src="/images/heritage_cycling.png" alt="Cycling" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-brand-card rotate-[2deg] hover:rotate-0 transition-transform duration-500 shadow-xl">
                        <img src="/images/cave_exploration.png" alt="Caves" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-brand-card rotate-[-1deg] translate-y-8 hover:rotate-0 transition-transform duration-500 shadow-xl hidden md:block">
                        <img src="/images/virupaksha.png" alt="Temples" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-brand-card rotate-[3deg] hover:rotate-0 transition-transform duration-500 shadow-xl hidden md:block">
                        <img src="/images/coracle_ride.png" alt="Coracle" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                    </div>
                </RevealOnScroll>
            </header>

            {/* --- Features Grid (USP) --- */}
            <section id="features" className="py-24 px-6 bg-brand-dark text-brand-bg rounded-t-[3rem] relative -mt-10 z-20">
                <div className="max-w-6xl mx-auto">
                    <RevealOnScroll>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-16 text-center">
                            The Art of <span className="text-brand-accent">Exploration</span>
                        </h2>
                    </RevealOnScroll>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Feature 1 */}
                        <RevealOnScroll className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-2 cursor-pointer">
                            <div className="w-14 h-14 bg-brand-accent rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:rotate-6 transition-transform">
                                <Map size={28} strokeWidth={2.5} />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 font-serif">Gamified GPS Quests</h3>
                            <p className="text-brand-bg/70 leading-relaxed">
                                Transform physical locations into digital playgrounds. Solve riddles, find waypoints, and unlock the history beneath your feet.
                            </p>
                        </RevealOnScroll>

                        {/* Feature 2 */}
                        <RevealOnScroll className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-2 cursor-pointer md:mt-12">
                            <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:rotate-6 transition-transform">
                                <Compass size={28} strokeWidth={2.5} />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 font-serif">Contextual Trip Planner</h3>
                            <p className="text-brand-bg/70 leading-relaxed">
                                Our AI doesn't just list places; it weaves a narrative. Get itineraries based on weather, crowd levels, and your personal energy.
                            </p>
                        </RevealOnScroll>

                        {/* Feature 3 */}
                        <RevealOnScroll className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-2 cursor-pointer">
                            <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:rotate-6 transition-transform">
                                <Ghost size={28} strokeWidth={2.5} />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 font-serif">Wanderer Mode</h3>
                            <p className="text-brand-bg/70 leading-relaxed">
                                Turn off the map. Let the fog of war guide you. Unlock the map only as you physically move through the world.
                            </p>
                        </RevealOnScroll>

                        {/* Feature 4 */}
                        <RevealOnScroll className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-2 cursor-pointer md:mt-12">
                            <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:rotate-6 transition-transform">
                                <MapPin size={28} strokeWidth={2.5} />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 font-serif">Hidden Gems</h3>
                            <p className="text-brand-bg/70 leading-relaxed">
                                Move beyond the tourist traps. Our community-driven database highlights the "Whackiest" spots no guidebook knows about.
                            </p>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>

            {/* --- Call to Action Footer --- */}
            <section className="py-24 px-6 bg-brand-bg text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[url('/images/vittala.png')] bg-cover bg-center mix-blend-multiply"></div>
                <RevealOnScroll className="relative z-10 max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-dark mb-6">
                        Ready to <span className="text-brand-accent">Wander?</span>
                    </h2>
                    <p className="text-xl text-brand-dark/70 mb-10">
                        Join thousands of explorers uncovering the secrets of Hampi and beyond.
                    </p>
                    <Link
                        to="/auth"
                        className="inline-flex items-center gap-3 bg-brand-dark text-brand-bg px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-accent hover:scale-105 transition-all shadow-2xl"
                    >
                        Create Your Profile <ArrowRight />
                    </Link>
                </RevealOnScroll>
            </section>

            {/* --- Simple Footer --- */}
            <footer className="bg-brand-bg border-t border-brand-dark/10 py-8 text-center text-sm text-brand-dark/40 font-bold tracking-widest uppercase">
                © 2024 Heritage Quest. All rights reserved.
            </footer>
        </div>
    );
}