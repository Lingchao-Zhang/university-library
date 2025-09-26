
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { getNameInitial } from "@/lib/utils"
import { signOut } from "@/auth"
const Navbar = ({userName, userId}: {userName: string, userId: string}) => {
    return(
        <section className="navbar">
            <div className="flex gap-2">
                <Image 
                 src="/icons/logo.svg"
                 alt="website logo"
                 width={40}
                 height={32}
                />
                <span className="text-28-semibold-white my-2 max-sm:hidden">BookWise</span>
            </div>
            <div className="flex items-center gap-10">
                <Link href="/">
                    <span className="text-20-normal-light-200 max-sm:hidden">Home</span>
                    <Image 
                        src="/icons/home.svg"
                        alt="home icon"
                        width={32}
                        height={32}
                        className="rounded-full sm:hidden"
                    />
                </Link>
                <Link href="/">
                    <span className="text-20-normal-light-100 max-sm:hidden">Search</span>
                    <Image 
                        src="/icons/search-fill.svg"
                        alt="search icon"
                        width={32}
                        height={32}
                        className="rounded-full sm:hidden"
                    />
                </Link>
                <div className="flex-between gap-8">
                    <div className="flex-between gap-2">
                        <Link href={`/profile/${userId}`}>
                            <Avatar>
                                <AvatarFallback>{getNameInitial(userName)}</AvatarFallback>
                            </Avatar>
                        </Link>
                        <span className="text-20-semibold-light-100 max-sm:hidden">{userName}</span>
                    </div>
                    <form
                        action={async () => {
                            "use server"
                            await signOut()
                        }}
                    >
                        <button type="submit">
                            <Image 
                                src="/icons/logout.svg"
                                alt="logout icon"
                                width={24}
                                height={24}
                            />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Navbar