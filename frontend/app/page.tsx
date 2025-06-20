"use client";

import Link from "next/link";
import "./globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faPhone, faEnvelope, faSeedling } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faTwitter, faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { useRef, useState } from "react";

export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLogout, setShowLogout] = useState(false);
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === "left" ? -300 : 300, behavior: "smooth" });
    }
  };
  const handleLogout = () => {
    alert("Logout berhasil!");
    setShowLogout(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <header className="fixed w-full z-30 flex justify-between items-center px-10 py-5 backdrop-blur bg-white/60 border-b border-gray-300 shadow-lg">
        {showLogout && (
          <button onClick={handleLogout} className="absolute right-10 mt-2 w-28 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-xl shadow-lg py-3 text-white font-bold hover:scale-105 hover:shadow-2xl transition">
            Logout
          </button>
        )}
      </header>

      <main className="pt-32 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full text-emerald-800 text-sm font-medium mb-4">
          <FontAwesomeIcon icon={faSeedling} className="w-4 h-4 mr-2" />
          Platform Pertanian Modern
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold text-emerald-900 leading-tight">
          Revolusi Digital untuk
          <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Pertanian Indonesia
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-emerald-700 max-w-2xl mt-4">
          Marketplace premium untuk produk pertanian segar dari para petani terpercaya, membawa kualitas tinggi langsung ke rumahmu!
        </p>

        <div className="mt-8 flex space-x-6">
          <Link href="/petani" className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition">
            Jelajahi Petani
          </Link>
          <Link href="/produk" className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition">
            Jelajahi Produk
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mt-20 max-w-3xl w-full px-6">
          {[{ title: "Data Petani", link: "/petani", color: "green" }, { title: "Data Produk", link: "/produk", color: "green" }].map((item, idx) => (
            <Link key={idx} href={item.link} className={`bg-white rounded-2xl p-8 text-center border border-${item.color}-100 hover:border-${item.color}-300 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition`}>
              <h2 className={`text-xl font-bold text-${item.color}-700 group-hover:text-${item.color}-800`}>{item.title}</h2>
              <p className="text-gray-500 mt-2">Temukan {item.title.toLowerCase()} terpercaya</p>
            </Link>
          ))}
        </div>

        <section className="w-full mt-24 max-w-6xl px-8">
          <h3 className="text-3xl sm:text-4xl font-bold text-emerald-900 mb-8">Apa Kata Pelanggan?</h3>
          <div className="relative">
            <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 bg-emerald-100 p-3 rounded-full shadow-lg hover:bg-emerald-300 z-10">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div ref={scrollRef} className="flex space-x-6 overflow-x-auto scrollbar-hide scroll-smooth p-4">
              {[{ name: "Budi Santoso", review: "Produk sangat segar dan pengirimannya cepat!" },
                { name: "Siti Aminah", review: "Kualitas pertanian luar biasa dari CropMarket Hub." },
                { name: "Andi Wijaya", review: "Layanan cepat dan harga bersaing!" },
                { name: "Lestari Dewi", review: "Suka banget dengan kemudahan berbelanja produk tani!" }
              ].map((item, idx) => (
                <div key={idx} className="min-w-[250px] bg-white rounded-2xl shadow-lg p-6 border border-emerald-100 hover:border-emerald-300 hover:shadow-2xl hover:-translate-y-1 transition">
                  <p className="text-gray-600 italic">"{item.review}"</p>
                  <p className="text-emerald-700 font-bold text-right mt-2">- {item.name}</p>
                </div>
              ))}
            </div>
            <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 -translate-y-1/2 bg-emerald-100 p-3 rounded-full shadow-lg hover:bg-emerald-300 z-10">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </section>

        <footer className="mt-24 text-gray-600 space-y-4 border-t border-gray-300 pt-8 text-center">
          <div className="flex justify-center items-center gap-3">
            <FontAwesomeIcon icon={faPhone} />
            <span>+62 123-456-789</span>
          </div>
          <div className="flex justify-center items-center gap-3">
            <FontAwesomeIcon icon={faEnvelope} />
            <span>cropmarkethub@gmail.com</span>
          </div>
          <div>Senin - Jumat: 08:00 - 17:00</div>
          <div>Jl. Pagar Alam, Gg. Ulangan, Segala Mider, Tanjung Karang Barat</div>
          <div className="flex justify-center space-x-6 mt-4 text-2xl">
            {[faInstagram, faTwitter, faFacebook, faYoutube].map((icon, idx) => (
              <a key={idx} href="#" className="hover:text-emerald-600 transition hover:scale-110">
                <FontAwesomeIcon icon={icon} />
              </a>
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
}
