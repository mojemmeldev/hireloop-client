"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "cn";
import { signOut, useSession } from "@/lib/auth-client";






function Logo() {
  return (
    <Link href="/" className="shrink-0">
      <Image
        src={logo}
        alt="HireLoop"
        priority
        className="h-9 w-auto sm:h-11"
      />
    </Link>
  );
}






function NavLinks({ className }: { className?: string }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Dashboard link only when logged in — points to the role's dashboard
  const navLinks = [
    { href: "/browser-jobs", label: "Browse Jobs" },
    { href: "/companies", label: "Company" },
    { href: "/pricing", label: "Pricing" },

    {
      href: `/dashboard/${session?.user.role || "seeker"}`,
      label: "Dashboard",
    },

  ] as const;

  return (
    <nav className={cn("flex items-center gap-2", className)}>
      {navLinks.map((link) => {
        const isActive = pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex h-11 items-center rounded-lg px-3 text-base font-medium transition-colors",
              isActive
                ? "text-[#645BFF]"
                : "text-[#EDEDEF]/90 hover:bg-white/5 hover:text-white"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}


function AuthButtons({ className }: { className?: string }) {
  const { data: session } = useSession()

  const handleSignOUt = async () => {
    await signOut()

  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {session?.user ?
        <>
          <span className="text-[#EDEDEF]">welcome, {session.user.name}</span>
          <Button onClick={handleSignOUt} nativeButton={false} className="h-10 bg-white px-5 text-lg font-medium text-[#645BFF] hover:bg-[#EDEDEF]">
            Sign Out
          </Button>
        </>
        : <>
          <Button render={<Link href="/sign-in"></Link>} nativeButton={false} className="h-10 bg-white px-5 text-lg font-medium text-[#645BFF] hover:bg-[#EDEDEF]">
            Sign In
          </Button>
          <Button render={<Link href="/sign-up"></Link>} nativeButton={false} className="h-10 bg-[#5C53FE] px-5 text-lg font-medium text-[#EDEDEF] hover:bg-[#4B43F0]">
            Get Started
          </Button>
        </>}

    </div>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#141418]">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <NavLinks className="hidden md:flex" />

        <div className="flex items-center gap-3">
          <AuthButtons className="hidden sm:flex" />

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#EDEDEF] hover:bg-white/5 md:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 border-white/10 bg-[#141418] text-[#EDEDEF]"
            >
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <NavLinks className="flex-col items-stretch gap-1" />
              <div className="mt-auto flex flex-col gap-3 p-4">
                <AuthButtons></AuthButtons>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
