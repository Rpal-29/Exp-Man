import { Loader2 } from 'lucide-react';
import {  ClerkLoaded,ClerkLoading, SignIn } from '@clerk/nextjs'
import Image from 'next/image';

export default function Page() {
  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2'>
        <div className='h-full lg:flex flex-col items-center justify-center px-4'>
            <div className='text-center space-y-4 pt-16'>
            <h1 className='font-bold text-3xl text-[#101010]'>
                 Hiii ! Saver&apos;s
                </h1>
                <div className='flex items-center justify-center'>
                    <ClerkLoaded>
                <SignIn path="/sign-in"/>
                </ClerkLoaded>
                <ClerkLoading>
                    <Loader2 className='animate-spin text-muted-foreground'></Loader2>
                </ClerkLoading>
                </div>
            </div>
        </div>
        <div>
        <div className="h-full bg-gradient-to-b from-violet-950
       to-violet-900 hidden lg:flex items-center justify-center">
        <div className="flex flex-col items-center ml-5">
                <Image src="/logo.svg" height={100} width={100} alt='Logo'/>
                <p className="font-semibold text-white text-5xl mt-5">
                Exp-Man
            </p>
            </div>
        </div>
        </div>
 </div>);
}
