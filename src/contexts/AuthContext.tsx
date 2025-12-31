import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  isAuthConfigured,
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  resetPassword as authResetPassword,
  updatePassword as authUpdatePassword,
  signOut as authSignOut,
  getCurrentSession,
  AuthUser,
  AuthSession,
} from '../lib/auth';
import {
  Profile,
  getProfileById,
  createProfile,
  updateProfile as updateProfileDb,
} from '../lib/neon';

export interface AuthUserWithProfile extends AuthUser {
  profile?: Profile | null;
}

interface AuthContextType {
  user: AuthUserWithProfile | null;
  profile: Profile | null;
  session: AuthSession | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, userType?: 'contractor' | 'customer') => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUserWithProfile | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  // Load profile data for authenticated user
  const loadProfile = async (authUser: AuthUser) => {
    try {
      // Try to get existing profile
      let profileData = await getProfileById(authUser.id);

      // If no profile exists, create one
      if (!profileData) {
        profileData = await createProfile({
          id: authUser.id,
          clerk_id: authUser.id, // Using Better Auth user ID
          email: authUser.email,
          full_name: authUser.name,
          avatar_url: authUser.image,
          user_type: 'customer',
        });
      }

      setProfile(profileData);
      setUser({ ...authUser, profile: profileData });
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error loading profile:', error);
      }
      setProfile(null);
      setUser({ ...authUser, profile: null });
    }
  };

  useEffect(() => {
    // Skip auth if not configured
    if (!isAuthConfigured) {
      if (import.meta.env.DEV) {
        console.log('Auth not configured - running in demo mode');
      }
      setLoading(false);
      return;
    }

    // Get initial session
    const getInitialSession = async () => {
      try {
        const sessionData = await getCurrentSession();

        if (sessionData?.user) {
          setSession(sessionData);
          await loadProfile(sessionData.user);
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('Error getting session:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Note: Better Auth doesn't have onAuthStateChange like Supabase
    // The login/logout functions handle state updates directly
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      const result = await signInWithEmail(email, password);

      if (result.error) {
        throw new Error(result.error.message || 'Login failed');
      }

      // User state will be updated by the auth state change listener
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Login error:', error);
      }
      throw new Error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    userType: 'contractor' | 'customer' = 'customer'
  ): Promise<void> => {
    try {
      setLoading(true);
      const result = await signUpWithEmail(email, password, name, userType);

      if (result.error) {
        throw new Error(result.error.message || 'Registration failed');
      }

      // After signup, create the profile with the user type
      if (result.data?.user) {
        await createProfile({
          id: result.data.user.id,
          clerk_id: result.data.user.id,
          email: result.data.user.email,
          full_name: name,
          user_type: userType,
        });
      }

      // User state will be updated by the auth state change listener
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Registration error:', error);
      }
      throw new Error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    try {
      setLoading(true);
      const result = await signInWithGoogle();

      if (result.error) {
        throw new Error(result.error.message || 'Google login failed');
      }

      // User state will be updated by the auth state change listener
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Google login error:', error);
      }
      throw new Error(error.message || 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      await authSignOut();
      setUser(null);
      setProfile(null);
      setSession(null);
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Logout error:', error);
      }
      throw new Error(error.message || 'Logout failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (email: string): Promise<void> => {
    try {
      setLoading(true);
      const result = await authResetPassword(email);

      if (result.error) {
        throw new Error(result.error.message || 'Password reset failed');
      }
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Password reset error:', error);
      }
      throw new Error(error.message || 'Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (newPassword: string): Promise<void> => {
    try {
      setLoading(true);
      const result = await authUpdatePassword(newPassword);

      if (result.error) {
        throw new Error(result.error.message || 'Password update failed');
      }
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Password update error:', error);
      }
      throw new Error(error.message || 'Password update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (updates: Partial<Profile>): Promise<void> => {
    if (!user) throw new Error('No authenticated user');

    try {
      setLoading(true);

      const updatedProfile = await updateProfileDb(user.id, updates);

      if (updatedProfile) {
        setProfile(updatedProfile);
        setUser({ ...user, profile: updatedProfile });
      }
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Profile update error:', error);
      }
      throw new Error(error.message || 'Profile update failed');
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async (): Promise<void> => {
    if (!user) return;

    try {
      const profileData = await getProfileById(user.id);
      if (profileData) {
        setProfile(profileData);
        setUser({ ...user, profile: profileData });
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error refreshing profile:', error);
      }
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    session,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    loginWithGoogle,
    logout,
    resetPassword: handleResetPassword,
    updatePassword: handleUpdatePassword,
    updateProfile: handleUpdateProfile,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Custom hook for checking if user is a contractor
export const useIsContractor = (): boolean => {
  const { profile } = useAuth();
  return profile?.user_type === 'contractor';
};

// Custom hook for checking if user is verified
export const useIsVerified = (): boolean => {
  const { profile } = useAuth();
  return profile?.is_verified === true;
};
