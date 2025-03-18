"use client";

import EnrollmentForm from '@/components/features/auth/EnrollmentForm'
import PageTransition from '@/components/ui/PageTransition'

export default function Enrollment() {
  return (
    <PageTransition>
      <EnrollmentForm />
    </PageTransition>
  )
} 