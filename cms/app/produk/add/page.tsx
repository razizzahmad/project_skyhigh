"use client";

import { useState } from "react";

export default function AddProdukPage() {
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [petaniId, setPetaniId] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`http://localhost:3001/api/produk`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama,
          deskripsi,
          harga,
          stok,
          petaniId,
        }),
      });

      const data = await response.json();

      if (data?.meta_data?.error === 0) {
        window.location.href = "/produk";
      } else {
        setMessage(data?.meta_data?.message || "Terjadi kesalahan");
      }
    } catch (error) {
      setMessage("Terjadi kesalahan koneksi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-emerald-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-teal-300/10 to-emerald-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl mb-6 shadow-lg shadow-emerald-500/25">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 bg-clip-text text-transparent mb-3">
            Tambah Produk Baru
          </h1>
          <p className="text-gray-600 text-lg font-medium">
            Lengkapi informasi produk dengan detail yang akurat
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-cyan-500/5 p-1">
            <div className="bg-white rounded-3xl">
              <div className="p-10 md:p-12">
                <div onSubmit={handleSubmit} className="space-y-10">
                  {/* Nama Produk */}
                  <div className="group space-y-3">
                    <label
                      htmlFor="nama"
                      className="block text-sm font-semibold text-gray-800 mb-2">
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          />
                        </svg>
                        Nama Produk
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        id="nama"
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        placeholder="Masukkan nama produk"
                        className="w-full border-2 border-gray-200 rounded-2xl px-6 py-4 bg-gray-50/50 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-gray-900 placeholder:text-gray-400 group-hover:border-gray-300"
                        required
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Deskripsi */}
                  <div className="group space-y-3">
                    <label
                      htmlFor="deskripsi"
                      className="block text-sm font-semibold text-gray-800 mb-2">
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h7"
                          />
                        </svg>
                        Deskripsi
                      </span>
                    </label>
                    <div className="relative">
                      <textarea
                        id="deskripsi"
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}
                        placeholder="Masukkan deskripsi produk"
                        className="w-full border-2 border-gray-200 rounded-2xl px-6 py-4 bg-gray-50/50 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-gray-900 placeholder:text-gray-400 resize-none group-hover:border-gray-300"
                        rows={5}
                        required
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Harga & Stok */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group space-y-3">
                      <label
                        htmlFor="harga"
                        className="block text-sm font-semibold text-gray-800 mb-2">
                        <span className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-emerald-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                            />
                          </svg>
                          Harga
                        </span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-emerald-600 font-semibold text-sm z-10">
                          Rp
                        </span>
                        <input
                          id="harga"
                          type="number"
                          value={harga}
                          onChange={(e) => setHarga(e.target.value)}
                          placeholder="0"
                          className="w-full border-2 border-gray-200 rounded-2xl pl-12 pr-6 py-4 bg-gray-50/50 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-gray-900 placeholder:text-gray-400 group-hover:border-gray-300"
                          required
                          min="0"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    <div className="group space-y-3">
                      <label
                        htmlFor="stok"
                        className="block text-sm font-semibold text-gray-800 mb-2">
                        <span className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-emerald-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                          </svg>
                          Stok
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          id="stok"
                          type="number"
                          value={stok}
                          onChange={(e) => setStok(e.target.value)}
                          placeholder="0"
                          className="w-full border-2 border-gray-200 rounded-2xl px-6 pr-16 py-4 bg-gray-50/50 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-gray-900 placeholder:text-gray-400 group-hover:border-gray-300"
                          required
                          min="0"
                        />
                        <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-emerald-600 font-semibold text-sm">
                          unit
                        </span>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>
                  </div>

                  {/* ID Petani */}
                  <div className="group space-y-3">
                    <label
                      htmlFor="petaniId"
                      className="block text-sm font-semibold text-gray-800 mb-2">
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        ID Petani
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        id="petaniId"
                        type="number"
                        value={petaniId}
                        onChange={(e) => setPetaniId(e.target.value)}
                        placeholder="Contoh: 1"
                        className="w-full border-2 border-gray-200 rounded-2xl px-6 py-4 bg-gray-50/50 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-gray-900 placeholder:text-gray-400 group-hover:border-gray-300"
                        required
                        min="1"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-8">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-bold py-5 px-8 rounded-2xl hover:from-emerald-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 transform hover:-translate-y-1">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative flex items-center justify-center text-lg">
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-3"></div>
                            Menyimpan...
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-5 h-5 mr-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Simpan Produk
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {message && (
                  <div className="mt-8 p-5 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200/50 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-red-800">
                          {message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-10">
          <div className="inline-flex items-center px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-white/30">
            <svg
              className="w-4 h-4 text-emerald-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-700 text-sm font-medium">
              Pastikan semua informasi telah diisi dengan benar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
