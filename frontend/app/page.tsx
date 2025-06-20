"use client";

import Link from "next/link";
import "./globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faTwitter,
  faFacebook,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useRef, useState } from "react";

export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLogout, setShowLogout] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };
  const handleLogout = () => {
    alert("Logout berhasil!");
    setShowLogout(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-green-100 to-white">
      {/* Navbar */}
      {/* Navbar */}
<header className="fixed w-full z-20 flex justify-between items-center px-8 py-4 backdrop-blur bg-white/60 border-b border-gray-200">
  <div className="relative">
    
    {showLogout && (
      <button
        onClick={handleLogout}
        className="absolute right-0 mt-2 w-24 bg-white border border-green-700 rounded-lg shadow-lg py-2 text-green-700 font-semibold hover:bg-green-50"
      >
        Logout
      </button>
    )}
  </div>
</header>


      <main className="pt-24 flex flex-col items-center justify-center">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-2xl">
          <h2 className="text-4xl font-extrabold text-green-800 drop-shadow">
            Selamat Datang User 🌱
          </h2>
          <p className="text-gray-600 text-lg">
            Marketplace untuk produk pertanian segar dari para petani terpercaya.
          </p>

          {/* Buttons */}
          <div className="mt-4 flex space-x-4 justify-center">
            <Link
              href="/petani"
              className="rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 shadow-lg transition"
            >
              Jelajahi Petani
            </Link>
            <Link
              href="/produk"
              className="rounded-full bg-lime-600 hover:bg-lime-700 text-white font-semibold px-8 py-3 shadow-lg transition"
            >
              Jelajahi Produk
            </Link>
          </div>
        </div>

        {/* Services Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16 max-w-3xl w-full px-4">
          <Link
            href="/petani"
            className="bg-white rounded-2xl p-6 text-center border border-green-100 hover:border-green-300 hover:shadow-xl transition group"
          >
            <h2 className="text-xl font-semibold text-green-700 group-hover:text-green-800">Data Petani</h2>
            <p className="text-gray-500 mt-2">Lihat data para petani terpercaya</p>
          </Link>
          
          <Link
            href="/produk"
            className="bg-white rounded-2xl p-6 text-center border border-lime-100 hover:border-lime-300 hover:shadow-xl transition group"
          >
            <h2 className="text-xl font-semibold text-lime-700 group-hover:text-lime-800">Data Produk</h2>
            <p className="text-gray-500 mt-2">Temukan produk pertanian terbaik</p>
          </Link>
        </div>

        {/* Testimonial Section */}
        <section className="w-full mt-20 max-w-5xl px-4">
          <h3 className="text-2xl font-bold text-green-800 text-center">Apa Kata Pelanggan?</h3>
          <div className="relative mt-8">
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-green-100 hover:bg-green-300 text-green-800 p-2 rounded-full shadow z-10"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div ref={scrollRef} className="flex space-x-6 overflow-x-auto scrollbar-hide scroll-smooth p-4">
              {[
                {
                  name: "Budi Santoso",
                  review: "Produk sangat segar dan pengirimannya cepat. Terbaik!",
                },
                {
                  name: "Siti Aminah",
                  review: "Saya sangat puas dengan kualitas hasil tani dari CropMarket Hub.",
                },
                {
                  name: "Andi Wijaya",
                  review: "Layanan cepat dan harga bersaing. Pasti langganan!",
                },
                {
                  name: "Lestari Dewi",
                  review: "Suka banget dengan tampilannya yang mudah digunakan dan informatif.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="min-w-[250px] bg-white rounded-2xl shadow-lg p-6 border border-green-100 flex-shrink-0 hover:shadow-2xl hover:border-green-300 transition"
                >
                  <p className="text-gray-600 italic">"{item.review}"</p>
                  <p className="text-green-700 font-bold text-right mt-2">- {item.name}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-green-100 hover:bg-green-300 text-green-800 p-2 rounded-full shadow z-10"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 text-green-700 space-y-4 border-t border-gray-200 pt-8 text-center">
          <div className="flex justify-center items-center gap-2">
            <FontAwesomeIcon icon={faPhone} />
            <span>+62 812 3456 7890</span>
          </div>
          <div className="flex justify-center items-center gap-2">
            <FontAwesomeIcon icon={faEnvelope} />
            <span>support@cropmarkethub.id</span>
          </div>
          <div className="flex justify-center items-center gap-2">
            <span>Senin - Jumat: 08:00 - 17:00</span>
          </div>
          <div className="flex justify-center items-center gap-2">
            <span>Jl. Pagar Alam, Gg. Ulangan, Segala Mider, Tanjung Karang Barat</span>
          </div>
          <div className="flex justify-center space-x-6 mt-4 text-2xl">
            <a
              href="https://instagram.com/cropmarkethub"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-600 transition"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://twitter.com/cropmarkethub"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="https://facebook.com/cropmarkethub"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transition"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href="https://youtube.com/cropmarkethub"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600 transition"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
