import { HeaderLogo } from "@/components/header-logo";
import { Navigation } from "./navigation";
import { UserButton, ClerkLoading,ClerkLoaded } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { WelcomeMsg } from "./welcome-msg";

export const Header =() => {
    return(
       <header className="bg-gradient-to-b from-violet-950
       to-violet-900 px-4 py-8 lg:px-14
pb-36">
    <div className="max-w-screen-2xl mx-auto">
   <div className="w-full flex items-center justify-beteen mb-14">
    <div  className="flex items-center lg:gap-x-16"><HeaderLogo/><Navigation/>
    <div><ClerkLoaded>
        <UserButton afterSignOutUrl="/">

        </UserButton></ClerkLoaded><ClerkLoading>
            <Loader2 className="size-8 animate-spin text-slate-400"/>
        </ClerkLoading>
    </div>

   </div>
    </div>
    <WelcomeMsg/></div>
</header>    
);
};