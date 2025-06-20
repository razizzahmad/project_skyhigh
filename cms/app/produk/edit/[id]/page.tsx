"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function EditProdukPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [petaniId, setPetaniId] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [listPetani, setListPetani] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [produkRes, petaniRes] = await Promise.all([
          axios.get(`http://localhost:3001/api/produk/${id}`),
          axios.get("http://localhost:3001/api/petani"),
        ]);

        const produk = produkRes.data.data_produk;
        if (!produk) throw new Error("Data produk tidak ditemukan");

        setNama(produk.nama || "");
        setDeskripsi(produk.deskripsi || "");
        setHarga(produk.harga?.toString() || "");
        setStok(produk.stok?.toString() || "");
        setPetaniId(produk.petani_id?.toString() || "");

        setListPetani(petaniRes.data.data_petani || []);
        setError(false);
        setMessage("");
      } catch (err) {
        console.error("Fetch error:", err);
        setError(true);
        setMessage("Gagal mengambil data produk");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3001/api/produk/${id}`, {
        nama,
        deskripsi,
        harga: parseInt(harga),
        stok: parseInt(stok),
        petaniId: parseInt(petaniId),
      });

      if (res.data.meta_data?.error === 0) {
        router.push("/produk");
      } else {
        throw new Error("Gagal memperbarui produk");
      }
    } catch (err) {
      console.error("Update error:", err);
      setError(true);
      setMessage("Gagal memperbarui produk");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-teal-400 rounded-full animate-spin animation-delay-150"></div>
            </div>
            <p className="text-slate-600 text-lg font-medium">
              Memuat data produk...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent mb-2">
            Edit Produk
          </h1>
          <p className="text-slate-600 text-lg">
            Perbarui informasi produk pertanian
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-6">
            <h2 className="text-2xl font-semibold text-white flex items-center">
              <svg
                className="w-6 h-6 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Informasi Produk
            </h2>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nama Produk */}
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-2 group-focus-within:text-emerald-600 transition-colors">
                  <svg
                    className="w-4 h-4 inline mr-2"
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
                </label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full px-4 py-3 bg-white/50 border-2 border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-700 placeholder:text-slate-400 font-medium transition-all duration-200 hover:border-emerald-300"
                  placeholder="Masukkan nama produk"
                />
              </div>

              {/* Deskripsi */}
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-2 group-focus-within:text-emerald-600 transition-colors">
                  <svg
                    className="w-4 h-4 inline mr-2"
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
                  Deskripsi Produk
                </label>
                <textarea
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  className="w-full px-4 py-3 bg-white/50 border-2 border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-700 placeholder:text-slate-400 font-medium transition-all duration-200 hover:border-emerald-300 resize-none"
                  rows={3}
                  placeholder="Deskripsikan produk Anda..."
                />
              </div>

              {/* Harga dan Stok Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-2 group-focus-within:text-emerald-600 transition-colors">
                    <svg
                      className="w-4 h-4 inline mr-2"
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
                    Harga (IDR)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={harga}
                      onChange={(e) => setHarga(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/50 border-2 border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-700 placeholder:text-slate-400 font-medium transition-all duration-200 hover:border-emerald-300"
                      placeholder="0"
                    />
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">
                      Rp
                    </span>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-2 group-focus-within:text-emerald-600 transition-colors">
                    <svg
                      className="w-4 h-4 inline mr-2"
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
                    Stok Tersedia
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={stok}
                      onChange={(e) => setStok(e.target.value)}
                      className="w-full pr-12 pl-4 py-3 bg-white/50 border-2 border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-700 placeholder:text-slate-400 font-medium transition-all duration-200 hover:border-emerald-300"
                      placeholder="0"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">
                      pcs
                    </span>
                  </div>
                </div>
              </div>

              {/* Pilih Petani */}
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-2 group-focus-within:text-emerald-600 transition-colors">
                  <svg
                    className="w-4 h-4 inline mr-2"
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
                  Pilih Petani
                </label>
                <div className="relative">
                  <select
                    value={petaniId}
                    onChange={(e) => setPetaniId(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 bg-white/50 border-2 border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-700 font-medium transition-all duration-200 hover:border-emerald-300 appearance-none cursor-pointer">
                    <option value="" className="text-slate-400">
                      -- Pilih Petani --
                    </option>
                    {listPetani.map((petani) => (
                      <option
                        key={petani.id}
                        value={petani.id}
                        className="text-slate-700">
                        {petani.nama}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => router.push("/produk")}
                  className="flex-1 py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl shadow-sm transition-all duration-200 hover:shadow-md border border-slate-200 hover:border-slate-300">
                  <svg
                    className="w-5 h-5 inline mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Batal
                </button>

                <button
                  type="submit"
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl transform hover:-translate-y-0.5">
                  <svg
                    className="w-5 h-5 inline mr-2"
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
                  Simpan Perubahan
                </button>
              </div>

              {/* Message Display */}
              {message && (
                <div
                  className={`p-4 rounded-xl border-l-4 ${
                    error
                      ? "bg-red-50 border-red-400 text-red-700"
                      : "bg-emerald-50 border-emerald-400 text-emerald-700"
                  }`}>
                  <div className="flex items-center">
                    {error ? (
                      <svg
                        className="w-5 h-5 mr-2"
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
                    ) : (
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                    <span className="font-medium">{message}</span>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8 text-slate-500">
          <p className="text-sm">
            <svg
              className="w-4 h-4 inline mr-1"
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
            Pastikan semua informasi yang dimasukkan sudah benar sebelum
            menyimpan
          </p>
        </div>
      </div>
    </div>
  );
}
