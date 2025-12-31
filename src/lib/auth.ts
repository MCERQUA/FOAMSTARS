// Neon Auth (Better Auth) Client Configuration
// FOAMSTARS Authentication

import { createAuthClient } from 'better-auth/react'

// Neon Auth URL from environment
const NEON_AUTH_URL = import.meta.env.VITE_NEON_AUTH_URL

// Check if auth is configured
export const isAuthConfigured = !!NEON_AUTH_URL

if (!isAuthConfigured && import.meta.env.DEV) {
  console.warn('⚠️ Neon Auth not configured. Add VITE_NEON_AUTH_URL to .env')
}

// Create Better Auth client pointing to Neon Auth
export const authClient = createAuthClient({
  baseURL: NEON_AUTH_URL || 'http://localhost:3000/api/auth',
})

// Export auth hooks and utilities
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
} = authClient

// Types
export interface AuthUser {
  id: string
  email: string
  name: string | null
  image: string | null
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface AuthSession {
  user: AuthUser
  session: {
    id: string
    userId: string
    expiresAt: Date
    token: string
  }
}

// Helper functions
export async function signInWithEmail(email: string, password: string) {
  const result = await signIn.email({
    email,
    password,
  })
  return result
}

export async function signUpWithEmail(
  email: string,
  password: string,
  name: string,
  userType: 'contractor' | 'customer' = 'customer'
) {
  const result = await signUp.email({
    email,
    password,
    name,
    // Store user type in user metadata if supported
  })
  return result
}

export async function signInWithGoogle() {
  const result = await signIn.social({
    provider: 'google',
    callbackURL: `${window.location.origin}/auth/callback`,
  })
  return result
}

export async function resetPassword(email: string) {
  // Better Auth password reset
  const result = await authClient.forgetPassword({
    email,
    redirectTo: `${window.location.origin}/auth/reset-password`,
  })
  return result
}

export async function updatePassword(newPassword: string) {
  const result = await authClient.resetPassword({
    newPassword,
  })
  return result
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const session = await getSession()
  return session?.user || null
}

export async function getCurrentSession(): Promise<AuthSession | null> {
  const session = await getSession()
  return session || null
}
