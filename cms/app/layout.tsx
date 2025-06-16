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
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faTwitter,
  faFacebook,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
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
      <body className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 min-h-screen">
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-md border-b border-emerald-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <div className="flex items-center">
                  <Link href="/" className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">🌾</span>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-emerald-800">
                        CropMarket Hub
                      </h1>
                      <p className="text-sm text-emerald-600 -mt-1">
                        Agricultural Platform
                      </p>
                    </div>
                  </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        pathname === item.href
                          ? "bg-emerald-100 text-emerald-800 font-semibold"
                          : "text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                      }`}>
                      <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>

                {/* User Menu */}
                <div className="flex items-center space-x-4">
                  {/* User Profile */}
                  <div className="relative"></div>
                </div>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div
              className={`md:hidden transition-all duration-300 ${
                mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden bg-white border-t border-emerald-200`}>
              <nav className="px-4 py-4 space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      pathname === item.href
                        ? "bg-emerald-100 text-emerald-800 font-semibold"
                        : "text-emerald-700 hover:bg-emerald-50"
                    }`}>
                    <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer className="bg-white/90 backdrop-blur-md border-t border-emerald-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Company Info */}
                <div className="md:col-span-2">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-xl">🌾</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-emerald-800">
                        CropMarket Hub
                      </h3>
                      <p className="text-emerald-600">Agricultural Platform</p>
                    </div>
                  </div>
                  <p className="text-emerald-700 mb-6 max-w-md">
                    Platform terpercaya untuk manajemen data petani dan produk
                    pertanian. Menghubungkan petani dengan teknologi modern
                    untuk hasil yang optimal.
                  </p>
                </div>

                {/* Contact Info */}
                <div>
                  <h4 className="text-lg font-semibold text-emerald-800 mb-4">
                    Hubungi Kami
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-emerald-700">
                      <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
                      <span className="text-sm">+62 812 3456 7890</span>
                    </div>
                    <div className="flex items-center space-x-3 text-emerald-700">
                      <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                      <span className="text-sm">support@cropmarkethub.id</span>
                    </div>
                    <div className="flex items-center space-x-3 text-emerald-700">
                      <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
                      <span className="text-sm">
                        Senin - Jumat: 08:00 - 17:00
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Copyright */}
              <div className="border-t border-emerald-200 mt-8 pt-8 text-center">
                <p className="text-sm text-emerald-600">
                  © 2024 CropMarket Hub. Semua hak dilindungi. Dibuat dengan ❤️
                  untuk petani Indonesia.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
