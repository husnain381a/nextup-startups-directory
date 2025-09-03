import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut, Sparkles, Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 px-5 py-4 backdrop-blur-xl bg-white/80 border-b border-purple-100/50 shadow-lg shadow-purple-500/5">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo Section */}
         <Link href="/" className="group flex items-center gap-3 transition-all duration-300 hover:scale-105">
          <div className="relative">
            <div className="absolute inset-0"></div>
            <div className="relative">
              <Image 
                src="/logo.png" 
                alt="StartupVibe Logo" 
                width={150} 
                height={40}
                className="relative z-10"
              />
            </div>
          </div>
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center gap-4">
          {session && session?.user ? (
            <>
              {/* Create Button */}
              <Link href="/startup/create">
                <div className="group relative overflow-hidden bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25">
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <div className="relative flex items-center gap-2">
                    <BadgePlus className="size-4" />
                    <span className="font-medium max-sm:hidden">Create</span>
                  </div>
                </div>
              </Link>


              {/* User Profile */}
             <Link href={`/user/${session?.id}`} className="group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <Avatar className="size-10 ring-2 ring-pink-200 group-hover:ring-pink-400 transition-all duration-300 relative">
                    <AvatarImage
                      src={session?.user?.image || ""}
                      alt={session?.user?.name || ""}
                      className="object-cover"
                    />
                   <AvatarFallback className="bg-gradient-to-r from-pink-400 to-pink-600 text-white font-semibold">
                      {session?.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </Link>

              {/* Logout Button */}
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button 
                  type="submit" 
                  className="group p-3 rounded-full bg-pink-50 hover:bg-pink-100 transition-all duration-300 hover:scale-110"
                  title="Logout"
                >
                  <LogOut className="size-5 text-pink-500 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="sr-only">Logout</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex items-center gap-3">
              {/* Sign In Button */}
              <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                <button 
                  type="submit"
                  className="group relative overflow-hidden bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/25"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <span className="relative flex items-center gap-2">
                    <Zap className="size-4" />
                    Join the Vibe
                  </span>
                </button>
              </form>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Indicator */}
      <div className="sm:hidden absolute right-5 top-1/2 transform -translate-y-1/2">
        <div className="flex items-center gap-1">
          <div className="w-1 h-1 bg-pink-400 rounded-full animate-pulse"></div>
          <div className="w-1 h-1 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1 h-1 bg-pink-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;