import React, { createContext, useContext, useState, useEffect } from 'react';
import questsData from '../data/quests.json';

const GamificationContext = createContext();

export function GamificationProvider({ children }) {
    // --- State ---
    const [xp, setXp] = useState(() => parseInt(localStorage.getItem('hampi_xp')) || 0);
    const [level, setLevel] = useState(() => parseInt(localStorage.getItem('hampi_level')) || 1);
    const [completedQuests, setCompletedQuests] = useState(() => JSON.parse(localStorage.getItem('hampi_completed_quests')) || []);
    const [badges, setBadges] = useState(() => JSON.parse(localStorage.getItem('hampi_badges')) || []);
    // Stamps: { common: 0, rare: 0, epic: 0, mythic: 0 }
    const [stamps, setStamps] = useState(() => JSON.parse(localStorage.getItem('hampi_stamps')) || { common: 0, rare: 0, epic: 0, mythic: 0 });
    const [activeQuests, setActiveQuests] = useState([]);

    // --- Logic Constants ---
    const LEVEL_TIERS = [
        { name: "Novice Explorer", maxLevel: 5 },
        { name: "Curious Wanderer", maxLevel: 10 },
        { name: "Heritage Enthusiast", maxLevel: 15 },
        { name: "Cultural Scholar", maxLevel: 20 },
        { name: "Hampi Legend", maxLevel: 25 },
    ];

    // --- Effects ---
    useEffect(() => {
        localStorage.setItem('hampi_xp', xp);
        localStorage.setItem('hampi_level', level);
        localStorage.setItem('hampi_completed_quests', JSON.stringify(completedQuests));
        localStorage.setItem('hampi_badges', JSON.stringify(badges));
        localStorage.setItem('hampi_stamps', JSON.stringify(stamps));
    }, [xp, level, completedQuests, badges, stamps]);

    // Check Level Up
    useEffect(() => {
        // Formula: XP to next = (Current Level * 250) + 250
        let xpForNext = 0;
        // Calculate total XP needed to BE at 'level + 1'
        for (let i = 1; i <= level; i++) {
            xpForNext += (i * 250) + 250;
        }

        if (xp >= xpForNext && level < 25) {
            setLevel(l => l + 1);
        }
    }, [xp, level]);


    // --- Actions ---
    const addXp = (amount) => {
        setXp(prev => prev + amount);
    };

    const completeQuest = (questId) => {
        if (completedQuests.includes(questId)) return;

        const quest = questsData.find(q => q.id === questId);
        if (!quest) return;

        setCompletedQuests(prev => [...prev, questId]);

        let awardedXp = quest.xp;
        if (quest.bonus_xp) {
            awardedXp += quest.bonus_xp;
        }
        addXp(awardedXp);

        if (quest.badge) {
            if (!badges.includes(quest.badge)) {
                setBadges(prev => [...prev, quest.badge]);
            }
        }

        if (quest.stamps) {
            setStamps(prev => {
                const newStamps = { ...prev };
                Object.entries(quest.stamps).forEach(([type, count]) => {
                    newStamps[type] = (newStamps[type] || 0) + count;
                });
                return newStamps;
            });
        }

        return { xp: awardedXp, badge: quest.badge, stamps: quest.stamps };
    };

    const getLevelTitle = () => {
        const tier = LEVEL_TIERS.find(t => level <= t.maxLevel) || LEVEL_TIERS[LEVEL_TIERS.length - 1];
        return tier.name;
    };

    // Progress to next level (0-100%)
    const getLevelProgress = () => {
        // Calculate XP needed for CURRENT level start
        let xpStart = 0;
        for (let i = 1; i < level; i++) {
            xpStart += (i * 250) + 250;
        }

        // Calculate XP needed for NEXT level
        let xpNext = xpStart + ((level * 250) + 250);

        const currentLevelXp = xp - xpStart;
        const requiredLevelXp = xpNext - xpStart;

        let percent = (currentLevelXp / requiredLevelXp) * 100;
        return Math.min(Math.max(percent, 0), 100);
    };

    const value = {
        xp,
        level,
        completedQuests,
        badges,
        stamps,
        quests: questsData,
        addXp,
        completeQuest,
        getLevelTitle,
        getLevelProgress
    };

    return (
        <GamificationContext.Provider value={value}>
            {children}
        </GamificationContext.Provider>
    );
}

export const useGamification = () => useContext(GamificationContext);
