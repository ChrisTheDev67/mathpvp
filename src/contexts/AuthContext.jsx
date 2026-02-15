import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ADMIN_EMAILS } from '../lib/config';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchProfile(session.user.id);
            } else {
                setLoading(false);
            }
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchProfile(session.user.id);
            } else {
                setProfile(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async (userId) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (data) {
            setProfile(data);
        }
        setLoading(false);
    };

    const signUp = async (email, password, nickname) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) throw error;

        // Create profile with nickname AND email so we can look up by nickname later
        if (data.user) {
            const { error: profileError } = await supabase
                .from('profiles')
                .insert([{ id: data.user.id, nickname, email }]);

            if (profileError) throw profileError;
        }

        return data;
    };

    const signIn = async (identifier, password) => {
        let loginEmail = identifier.trim();

        // If identifier doesn't look like an email, treat it as a nickname
        if (!loginEmail.includes('@')) {
            // Try exact case-insensitive match first
            let { data: profileData, error: profileErr } = await supabase
                .from('profiles')
                .select('email')
                .ilike('nickname', loginEmail)
                .limit(1);

            // If array result, grab first match
            if (profileData && profileData.length > 0) {
                loginEmail = profileData[0].email;
            } else {
                // Also try with wildcard in case of partial match
                const { data: fuzzyData } = await supabase
                    .from('profiles')
                    .select('email')
                    .ilike('nickname', `%${loginEmail}%`)
                    .limit(1);

                if (fuzzyData && fuzzyData.length > 0) {
                    loginEmail = fuzzyData[0].email;
                } else {
                    throw new Error('No account found with that nickname. Check your spelling and try again.');
                }
            }
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: loginEmail,
            password,
        });

        if (error) throw error;
        return data;
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        setProfile(null);
    };

    const updateMoney = async (amount) => {
        if (!user || !profile) return;

        const currentMoney = profile.money || 0;
        const newMoney = Math.max(0, currentMoney + amount); // Prevent negative money

        // Optimistic update
        setProfile(prev => ({ ...prev, money: newMoney }));

        try {
            const { error } = await supabase
                .from('profiles')
                .update({ money: newMoney })
                .eq('id', user.id);

            if (error) throw error;
        } catch (err) {
            console.error('Error updating money:', err);
            // Revert on error? For now, let's just log it.
            // In a real app we'd revert the optimistic update.
        }
    };

    const isAdmin = ADMIN_EMAILS.some(adminEmail => {
        const ae = adminEmail.toLowerCase();
        return (user?.email && user.email.toLowerCase() === ae) ||
            (profile?.email && profile.email.toLowerCase() === ae);
    });

    const adminGiveMoney = async (targetNickname, amount) => {
        if (!isAdmin) return { error: 'Not authorized' };

        try {
            // Find the target user by nickname — try exact match first
            let { data: targetProfile, error: findErr } = await supabase
                .from('profiles')
                .select('*')
                .eq('nickname', targetNickname)
                .limit(1);

            console.log('Exact match result:', { targetProfile, findErr });

            // If not found, try case-insensitive
            if ((!targetProfile || targetProfile.length === 0) && !findErr) {
                const res = await supabase
                    .from('profiles')
                    .select('*')
                    .ilike('nickname', targetNickname.replace(/_/g, '\\_').replace(/%/g, '\\%'))
                    .limit(1);
                targetProfile = res.data;
                findErr = res.error;
                console.log('ILIKE match result:', { data: res.data, error: res.error });
            }

            if (findErr) {
                console.error('DB error finding user:', findErr);
                return { error: `Database error: ${findErr.message}` };
            }

            if (!targetProfile || targetProfile.length === 0) {
                return { error: `User "${targetNickname}" not found` };
            }

            const target = targetProfile[0];
            const newMoney = Math.max(0, (target.money || 0) + amount);

            const { error: updateErr } = await supabase
                .from('profiles')
                .update({ money: newMoney })
                .eq('id', target.id);

            if (updateErr) {
                console.error('DB error updating money:', updateErr);
                return { error: `Update failed: ${updateErr.message}` };
            }

            return { success: true, nickname: target.nickname, newBalance: newMoney };
        } catch (err) {
            console.error('adminGiveMoney error:', err);
            return { error: err.message };
        }
    };

    const value = {
        user,
        profile,
        loading,
        signUp,
        signIn,
        signOut,
        updateMoney,
        isAdmin,
        adminGiveMoney,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
