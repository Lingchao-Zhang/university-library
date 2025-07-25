import Image from "next/image"
import Link from "next/link"
import webLogo from "@/public/icons/logo.svg"
import avatar from "@/public/icons/user.svg"
import logout from "@/public/icons/logout.svg"
import homeIcon from "@/public/icons/home.svg"
import searchIcon from "@/public/icons/search-fill.svg"
const Navbar = () => {
    return(
        <section className="navbar">
            <div className="flex gap-2">
                <Image 
                 src={webLogo}
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
                        src={homeIcon}
                        alt="avatar placeholder"
                        width={32}
                        height={32}
                        className="rounded-full sm:hidden"
                    />
                </Link>
                <Link href="/">
                    <span className="text-20-normal-light-100 max-sm:hidden">Search</span>
                    <Image 
                        src={searchIcon}
                        alt="avatar placeholder"
                        width={32}
                        height={32}
                        className="rounded-full sm:hidden"
                    />
                </Link>
                <div className="flex-between gap-8">
                    <div className="flex-between gap-2">
                        <Image 
                            src={avatar}
                            alt="avatar placeholder"
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                        <span className="text-20-semibold-light-100 max-sm:hidden">username</span>
                    </div>
                    <button>
                        <Image 
                            src={logout}
                            alt="avatar placeholder"
                            width={24}
                            height={24}
                        />
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Navbar