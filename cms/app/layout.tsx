"use client";

import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faPhone,
  faEnvelope,
  faClock,
  faHome,
  faUsers,
  faBoxOpen,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  const [showLogout, setShowLogout] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    alert("Logout berhasil!");
    setShowLogout(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigationItems = [
    { href: "/", label: "Beranda", icon: faHome },
    { href: "/petani", label: "Data Petani", icon: faUsers },
    { href: "/produk", label: "Data Produk", icon: faBoxOpen },
  ];
  return (
    <html lang="id" className={inter.className}>
      <head>
        <title>CropMarket Hub - Platform Manajemen Pertanian</title>
        <meta
          name="description"
          content="Platform terpercaya untuk manajemen data petani dan produk pertanian"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 min-h-screen antialiased">
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <header className="bg-white/90 backdrop-blur-md border-b border-emerald-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16 lg:h-20">
                {/* Logo Section */}
                <div className="flex items-center flex-shrink-0">
                  <Link href="/" className="flex items-center space-x-3 group">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <span className="text-white font-bold text-lg lg:text-xl">
                        🌾
                      </span>
                    </div>
                    <div className="hidden sm:block">
                      <h1 className="text-xl lg:text-2xl font-bold text-emerald-800 group-hover:text-emerald-700 transition-colors">
                        CropMarket Hub
                      </h1>
                      <p className="text-sm lg:text-base text-emerald-600 -mt-1">
                        Agricultural Platform
                      </p>
                    </div>
                  </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-2 px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-medium transition-all duration-200 ${
                        pathname === item.href
                          ? "bg-emerald-100 text-emerald-800 shadow-sm"
                          : "text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                      }`}>
                      <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                      <span className="text-sm lg:text-base">{item.label}</span>
                    </Link>
                  ))}
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                  <button
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-lg text-emerald-700 hover:bg-emerald-50 transition-colors duration-200"
                    aria-label="Toggle mobile menu">
                    <FontAwesomeIcon
                      icon={mobileMenuOpen ? faTimes : faBars}
                      className="w-6 h-6"
                    />
                  </button>
                </div>

                {/* User Menu (Desktop) */}
                <div className="hidden md:flex items-center space-x-4">
                  <div className="relative">
                    {/* User profile placeholder */}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div
              className={`md:hidden transition-all duration-300 ease-in-out ${
                mobileMenuOpen
                  ? "max-h-96 opacity-100 visible"
                  : "max-h-0 opacity-0 invisible"
              } overflow-hidden bg-white/95 backdrop-blur-sm border-t border-emerald-200`}>
              <nav className="px-4 py-4 space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      pathname === item.href
                        ? "bg-emerald-100 text-emerald-800 shadow-sm"
                        : "text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100"
                    }`}>
                    <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer className="bg-white/95 backdrop-blur-md border-t border-emerald-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                {/* Company Info */}
                <div className="md:col-span-2 lg:col-span-2">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-xl lg:text-2xl">
                        🌾
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl lg:text-2xl font-bold text-emerald-800">
                        CropMarket Hub
                      </h3>
                      <p className="text-emerald-600 text-sm lg:text-base">
                        Agricultural Platform
                      </p>
                    </div>
                  </div>
                  <p className="text-emerald-700 text-sm lg:text-base leading-relaxed max-w-md mb-6">
                    Platform terpercaya untuk manajemen data petani dan produk
                    pertanian. Menghubungkan petani dengan teknologi modern
                    untuk hasil yang optimal.
                  </p>
                </div>

                {/* Quick Links */}
                <div className="lg:col-span-1">
                  <h4 className="text-lg font-semibold text-emerald-800 mb-4 lg:mb-6">
                    Menu Utama
                  </h4>
                  <nav className="space-y-3">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center space-x-2 text-emerald-700 hover:text-emerald-800 transition-colors duration-200 text-sm lg:text-base">
                        <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* Contact Info */}
                <div className="lg:col-span-1">
                  <h4 className="text-lg font-semibold text-emerald-800 mb-4 lg:mb-6">
                    Hubungi Kami
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 text-emerald-700">
                      <FontAwesomeIcon
                        icon={faPhone}
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                      />
                      <div className="text-sm lg:text-base">
                        <p>+62 812 3456 7890</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 text-emerald-700">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                      />
                      <div className="text-sm lg:text-base">
                        <p>support@cropmarkethub.id</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 text-emerald-700">
                      <FontAwesomeIcon
                        icon={faClock}
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                      />
                      <div className="text-sm lg:text-base">
                        <p>Senin - Jumat</p>
                        <p>08:00 - 17:00 WIB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Copyright */}
              <div className="border-t border-emerald-200 mt-8 lg:mt-12 pt-8 text-center">
                <p className="text-sm lg:text-base text-emerald-600">
                  © 2024 CropMarket Hub. Semua hak dilindungi.
                </p>
                <p className="text-sm lg:text-base text-emerald-600 mt-1">
                  Dibuat dengan ❤️ untuk petani Indonesia.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
