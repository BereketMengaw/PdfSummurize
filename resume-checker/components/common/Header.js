import { FileUser, Wallet, LogIn } from "lucide-react";
import NavLink from "./NavLink";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <nav className="container mx-auto flex items-center justify-between py-4 px-6 bg-white shadow-sm rounded-full max-w-7xl mt-4 border border-emerald-100">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="p-2 bg-emerald-100 rounded-full">
          <FileUser className="w-5 h-5 text-emerald-700" />
        </div>
        <NavLink
          href="/"
          className="font-bold text-lg text-emerald-700 hover:text-emerald-800 transition-colors"
        >
          ResumeChecker
        </NavLink>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8">
        <div className="flex items-center space-x-1 group">
          <div className="p-1.5 bg-emerald-50 rounded-full group-hover:bg-emerald-100 transition-colors">
            <Wallet className="w-4 h-4 text-emerald-600" />
          </div>
          <NavLink
            href="/#Pricing"
            className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
          >
            Pricing Plan
          </NavLink>
        </div>
        
      </div>

      {/* Auth Section */}
      <div className="flex items-center">
        <div className="flex items-center space-x-2 group">
          <div className="p-1.5 bg-emerald-50 rounded-full group-hover:bg-emerald-100 transition-colors">
            <SignedIn>
              <div className="flex ">
                <div className="flex align-bottom mr-1 ">
                  <UserButton />
                </div>
                <NavLink
  href="/upload"
  className="px-4 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 font-medium transition-colors"
>
  Upload a Resume
</NavLink>

              </div>
            </SignedIn>
          </div>
          <SignedOut>
            <NavLink
              href="/sign-in"
              className="px-4 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 font-medium transition-colors"
            >
              <LogIn width={4} height={3} />
              Sign In
            </NavLink>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
