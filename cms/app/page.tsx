"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBoxOpen,
  faChartLine,
  faShieldAlt,
  faClock,
  faGlobe,
  faArrowRight,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {
  const features = [
    {
      icon: faUsers,
      title: "Manajemen Petani",
      description:
        "Kelola data petani dengan sistem yang terintegrasi dan mudah digunakan",
      color: "from-emerald-500 to-teal-500",
      href: "/petani",
    },
    {
      icon: faBoxOpen,
      title: "Manajemen Produk",
      description: "Pantau dan kelola produk hasil pertanian dengan efisien",
      color: "from-lime-500 to-green-500",
      href: "/produk",
    },
  ];

  const benefits = [
    {
      icon: faShieldAlt,
      title: "Keamanan Terjamin",
      description: "Data Anda aman dengan enkripsi tingkat enterprise",
    },
    {
      icon: faClock,
      title: "Efisiensi Waktu",
      description: "Otomatisasi proses untuk menghemat waktu operasional",
    },
    {
      icon: faGlobe,
      title: "Akses Global",
      description: "Platform dapat diakses kapan saja, di mana saja",
    },
  ];

  const stats = [
    { number: "1,000+", label: "Petani Terdaftar" },
    { number: "5,000+", label: "Produk Dikelola" },
    { number: "99.9%", label: "Uptime Server" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full text-emerald-800 text-sm font-medium mb-8">
              <FontAwesomeIcon icon={faSeedling} className="w-4 h-4 mr-2" />
              Platform Pertanian Modern
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-emerald-900 mb-6 leading-tight">
              Revolusi Digital untuk
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {" "}
                Pertanian Indonesia
              </span>
            </h1>

            <p className="text-xl text-emerald-700 mb-10 max-w-3xl mx-auto leading-relaxed">
              CropMarket Hub menghadirkan solusi teknologi terdepan untuk
              mengelola data petani, produk pertanian, dan mengoptimalkan hasil
              panen dengan sistem yang terintegrasi.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/petani"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                Mulai Sekarang
                <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
              Fitur Unggulan Platform
            </h2>
            <p className="text-xl text-emerald-700 max-w-2xl mx-auto">
              Dapatkan kemudahan mengelola bisnis pertanian dengan fitur-fitur
              canggih yang dirancang khusus untuk kebutuhan Anda
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.href}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                <div className="p-8">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <FontAwesomeIcon
                      icon={feature.icon}
                      className="w-8 h-8 text-white"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-800 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
              Mengapa Memilih CropMarket Hub?
            </h2>
            <p className="text-xl text-emerald-700 max-w-2xl mx-auto">
              Kami berkomitmen memberikan layanan terbaik dengan teknologi
              terdepan untuk mendukung kemajuan pertanian Indonesia
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon
                    icon={benefit.icon}
                    className="w-8 h-8 text-emerald-600"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Siap Memulai Transformasi Digital?
          </h2>
          <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan petani yang telah merasakan manfaat
            platform kami. Mulai kelola data pertanian Anda dengan lebih efisien
            hari ini.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/petani"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              <FontAwesomeIcon icon={faUsers} className="mr-2 w-4 h-4" />
              Kelola Data Petani
            </Link>
            <Link
              href="/produk"
              className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-emerald-400 transition-all duration-200">
              <FontAwesomeIcon icon={faBoxOpen} className="mr-2 w-4 h-4" />
              Kelola Data Produk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
