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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 sm:py-20 lg:py-24">
            <div className="text-center space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full text-emerald-800 text-sm font-medium">
                <FontAwesomeIcon icon={faSeedling} className="w-4 h-4 mr-2" />
                Platform Pertanian Modern
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-emerald-900 leading-tight">
                  Revolusi Digital untuk
                  <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Pertanian Indonesia
                  </span>
                </h1>
              </div>

              {/* Description */}
              <div className="max-w-4xl mx-auto">
                <p className="text-lg sm:text-xl text-emerald-700 leading-relaxed">
                  CropMarket Hub menghadirkan solusi teknologi terdepan untuk
                  mengelola data petani, produk pertanian, dan mengoptimalkan
                  hasil panen dengan sistem yang terintegrasi.
                </p>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Link
                  href="/petani"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out">
                  Mulai Sekarang
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="ml-2 w-4 h-4"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-emerald-900">
                Fitur Unggulan Platform
              </h2>
              <div className="max-w-3xl mx-auto">
                <p className="text-lg sm:text-xl text-emerald-700">
                  Dapatkan kemudahan mengelola bisnis pertanian dengan
                  fitur-fitur canggih yang dirancang khusus untuk kebutuhan Anda
                </p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.href}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col items-center text-center space-y-4">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <FontAwesomeIcon
                        icon={feature.icon}
                        className="w-8 h-8 text-white"
                      />
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-800 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-emerald-900">
                Mengapa Memilih CropMarket Hub?
              </h2>
              <div className="max-w-3xl mx-auto">
                <p className="text-lg sm:text-xl text-emerald-700">
                  Kami berkomitmen memberikan layanan terbaik dengan teknologi
                  terdepan untuk mendukung kemajuan pertanian Indonesia
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center space-y-4">
                {/* Icon */}
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={benefit.icon}
                      className="w-8 h-8 text-emerald-600"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
