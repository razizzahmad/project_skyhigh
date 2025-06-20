"use client";

import Link from "next/link";
import "./globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
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
    <div className="min-h-screen bg-gradient-to-b from-emerald-100 via-green-100 to-white">
      <header className="fixed w-full z-30 flex justify-between items-center px-10 py-5 backdrop-blur bg-white/50 border-b border-gray-300 shadow-xl">
        {showLogout && (
          <button onClick={handleLogout} className="absolute right-10 mt-2 w-28 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-xl shadow-lg py-3 text-white font-bold hover:scale-105 hover:shadow-2xl">
            Logout
          </button>
        )}
      </header>
      <main className="pt-32 flex flex-col items-center justify-center text-center">
        <h2 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-500 to-lime-500 drop-shadow-2xl animate-bounce">
          Selamat Datang User 🌱
        </h2>
        <p className="text-gray-600 text-xl mt-3 max-w-2xl">Marketplace premium untuk produk pertanian segar dari para petani terpercaya, membawa kualitas tinggi langsung ke rumahmu!</p>
        <div className="mt-8 flex space-x-6 justify-center">
          <Link href="/petani" className="rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold px-12 py-3 shadow-2xl hover:scale-110 transition transform">
            Jelajahi Petani
          </Link>
          <Link href="/produk" className="rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold px-12 py-3 shadow-2xl hover:scale-110 transition transform">
            Jelajahi Produk
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-20 max-w-3xl w-full px-6">
          {[{title: "Data Petani", link: "/petani", color: "green"}, {title: "Data Produk", link: "/produk", color: "green"}].map((item, idx) => (
            <Link key={idx} href={item.link} className={`bg-white rounded-3xl p-8 text-center border border-${item.color}-100 hover:border-${item.color}-300 hover:scale-105 hover:shadow-2xl transition group`}>
              <h2 className={`text-2xl font-bold text-${item.color}-600 group-hover:text-${item.color}-800`}>{item.title}</h2>
              <p className="text-gray-500 mt-3">Temukan {item.title.toLowerCase()} terpercaya</p>
            </Link>
          ))}
        </div>
        <section className="w-full mt-24 max-w-6xl px-8">
          <h3 className="text-4xl font-bold text-emerald-800 text-center">Apa Kata Pelanggan?</h3>
          <div className="relative mt-12">
            <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 bg-emerald-100 p-4 rounded-full shadow-xl hover:bg-emerald-300 z-10">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div ref={scrollRef} className="flex space-x-8 overflow-x-auto scrollbar-hide scroll-smooth p-4">
              {[{"name": "Budi Santoso", "review": "Produk sangat segar dan pengirimannya cepat!"}, {"name": "Siti Aminah", "review": "Kualitas pertanian luar biasa dari CropMarket Hub."}, {"name": "Andi Wijaya", "review": "Layanan cepat dan harga bersaing!"}, {"name": "Lestari Dewi", "review": "Suka banget dengan kemudahan berbelanja produk tani!"}].map((item, idx) => (
                <div key={idx} className="min-w-[250px] bg-white rounded-3xl shadow-2xl p-8 border border-emerald-100 hover:border-emerald-300 hover:scale-105 transition">
                  <p className="text-gray-600 italic text-lg">"{item.review}"</p>
                  <p className="text-emerald-700 font-bold text-right mt-3">- {item.name}</p>
                </div>
              ))}
            </div>
            <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 -translate-y-1/2 bg-emerald-100 p-4 rounded-full shadow-xl hover:bg-emerald-300 z-10">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </section>
        <footer className="mt-24 text-gray-600 space-y-5 border-t border-gray-300 pt-10 text-center">
          <div className="flex justify-center items-center gap-3">
            <FontAwesomeIcon icon={faPhone} />
            <span>+62 812 3456 7890</span>
          </div>
          <div className="flex justify-center items-center gap-3">
            <FontAwesomeIcon icon={faEnvelope} />
            <span>support@cropmarkethub.id</span>
          </div>
          <div>Senin - Jumat: 08:00 - 17:00</div>
          <div>Jl. Pagar Alam, Gg. Ulangan, Segala Mider, Tanjung Karang Barat</div>
          <div className="flex justify-center space-x-8 mt-5 text-3xl">
            {[faInstagram, faTwitter, faFacebook, faYoutube].map((icon, idx) => (
              <a key={idx} href="#" className="hover:text-emerald-600 transition transform hover:scale-125">
                <FontAwesomeIcon icon={icon} />
              </a>
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
}
