import Link from "next/link";
import Image from "next/image";

export const HeaderLogo = () => {
    return (
        <Link href="/">
            <div className="items-center hidden lg:flex">
                <Image src = "./logo.svg" alt="Logo" height={23} width={23}/>
            <p className="font-semibold text-white text-2xl ml-2.5">
                Exp-Man
            </p>
            </div>
        </Link>
    );
};