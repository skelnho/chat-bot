'use server'
import { signIn, signOut } from '@/lib/auth'

export async function logIn() {
  await signIn('google')
}

export async function logOut() {
  await signOut()
}