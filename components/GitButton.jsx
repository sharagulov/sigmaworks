'use client'
import Image from "next/image";
import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button";
import { useSearchParams } from 'next/navigation';
import { Suspense } from "react";

const GitButton = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/profile';

  return (
    <Suspense>

    <Button variant="white" className="w-full" onClick={() => signIn('github', { callbackUrl })}>
      <div className="flex items-center gap-2">
        <div className="w-[15px] h-[15px]">
          <Image
            src="/img/github.png"
            width={15}
            height={15}
            alt="github"
            />
        </div>
        <span>GH</span>
      </div>
    </Button>
</Suspense>
  )
}

export default GitButton;