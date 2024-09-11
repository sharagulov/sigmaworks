'use client'

import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button";
import { useSearchParams } from 'next/navigation';

const GitButton = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/profile';

  return (
    <Button onClick={() => signIn('github', { callbackUrl })}>
      Github
    </Button>
  )
}

export default GitButton;