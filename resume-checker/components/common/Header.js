import { FileUser, Wallet, LogIn } from "lucide-react";
import NavLink from "./NavLink";

export default function Header() {
  const isLoggedin = false;

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
        <div className="flex items-center space-x-2 group">
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

        {isLoggedin && (
          <NavLink
            href="/#Pricing"
            className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
          >
            Your Resume Results
          </NavLink>
        )}
      </div>

      {/* Auth Section */}
      <div className="flex items-center">
        {!isLoggedin ? (
          <div className="flex items-center space-x-2 group">
            <div className="p-1.5 bg-emerald-50 rounded-full group-hover:bg-emerald-100 transition-colors">
              <LogIn className="w-4 h-4 text-emerald-600" />
            </div>
            <NavLink
              href="/sign-in"
              className="px-4 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 font-medium transition-colors"
            >
              Sign In
            </NavLink>
          </div>
        ) : (
          <NavLink
            href="/upload"
            className="px-4 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 font-medium transition-colors"
          >
            Upload a PDF
          </NavLink>
        )}
      </div>
    </nav>
  );
}
