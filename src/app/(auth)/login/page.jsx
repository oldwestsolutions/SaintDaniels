"use client";

import LoginForm from '@/components/features/auth/LoginForm'
import PageTransition from '@/components/ui/PageTransition'

export default function Login() {
  return (
    <PageTransition>
      <LoginForm />
    </PageTransition>
  )
} 