"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Package,
  DollarSign,
  Users,
  FileText,
  Warehouse,
  Plus,
  ArrowLeft,
} from "lucide-react";

export default function AddProdukPage() {
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [petaniId, setPetaniId] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(`http://localhost:3001/api/produk`, {
        nama,
        deskripsi,
        harga,
        stok,
        petaniId,
      });

      if (response.data?.meta_data?.error === 0) {
        setMessage("Produk berhasil ditambahkan!");
        setTimeout(() => {
          router.push("/produk");
        }, 1500);
      } else {
        setMessage(response.data?.meta_data?.message || "Terjadi kesalahan");
      }
    } catch (error) {
      if (error.response) {
        setMessage(
          error.response.data?.meta_data?.message || "Gagal mengirim data"
        );
      } else {
        setMessage("Terjadi kesalahan koneksi");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2334d399' fill-opacity='0.03'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
      </div>

      <div className="relative max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-lg mb-6 transform hover:scale-105 transition-transform duration-300">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent mb-3">
            Tambah Produk Baru
          </h1>
          <p className="text-gray-600 text-lg">
            Lengkapi informasi produk untuk menambahkan ke katalog
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-100 to-emerald-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

          <div className="relative space-y-8">
            <div className="group">
              <label
                htmlFor="nama"
                className="flex items-center gap-2 font-semibold text-gray-700 mb-3 text-lg">
                <Package className="w-5 h-5 text-emerald-600" />
                Nama Produk
              </label>
              <div className="relative">
                <input
                  id="nama"
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Masukkan nama produk"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 text-gray-900 placeholder:text-gray-400 text-lg transition-all duration-300 group-hover:border-gray-300"
                  required
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/0 to-green-500/0 group-focus-within:from-emerald-500/5 group-focus-within:to-green-500/5 pointer-events-none transition-all duration-300"></div>
              </div>
            </div>

            <div className="group">
              <label
                htmlFor="deskripsi"
                className="flex items-center gap-2 font-semibold text-gray-700 mb-3 text-lg">
                <FileText className="w-5 h-5 text-emerald-600" />
                Deskripsi
              </label>
              <div className="relative">
                <textarea
                  id="deskripsi"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  placeholder="Masukkan deskripsi produk"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 text-gray-900 placeholder:text-gray-400 text-lg transition-all duration-300 group-hover:border-gray-300 resize-none"
                  rows={4}
                  required
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/0 to-green-500/0 group-focus-within:from-emerald-500/5 group-focus-within:to-green-500/5 pointer-events-none transition-all duration-300"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="group">
                <label
                  htmlFor="harga"
                  className="flex items-center gap-2 font-semibold text-gray-700 mb-3 text-lg">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  Harga
                </label>
                <div className="relative">
                  <input
                    id="harga"
                    type="number"
                    value={harga}
                    onChange={(e) => setHarga(e.target.value)}
                    placeholder="0"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 text-gray-900 placeholder:text-gray-400 text-lg transition-all duration-300 group-hover:border-gray-300"
                    required
                    min="0"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/0 to-green-500/0 group-focus-within:from-emerald-500/5 group-focus-within:to-green-500/5 pointer-events-none transition-all duration-300"></div>
                </div>
              </div>

              <div className="group">
                <label
                  htmlFor="stok"
                  className="flex items-center gap-2 font-semibold text-gray-700 mb-3 text-lg">
                  <Warehouse className="w-5 h-5 text-emerald-600" />
                  Stok
                </label>
                <div className="relative">
                  <input
                    id="stok"
                    type="number"
                    value={stok}
                    onChange={(e) => setStok(e.target.value)}
                    placeholder="0"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 text-gray-900 placeholder:text-gray-400 text-lg transition-all duration-300 group-hover:border-gray-300"
                    required
                    min="0"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/0 to-green-500/0 group-focus-within:from-emerald-500/5 group-focus-within:to-green-500/5 pointer-events-none transition-all duration-300"></div>
                </div>
              </div>
            </div>

            <div className="group">
              <label
                htmlFor="petaniId"
                className="flex items-center gap-2 font-semibold text-gray-700 mb-3 text-lg">
                <Users className="w-5 h-5 text-emerald-600" />
                ID Petani
              </label>
              <div className="relative">
                <input
                  id="petaniId"
                  type="number"
                  value={petaniId}
                  onChange={(e) => setPetaniId(e.target.value)}
                  placeholder="Contoh: 1"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 text-gray-900 placeholder:text-gray-400 text-lg transition-all duration-300 group-hover:border-gray-300"
                  required
                  min="1"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/0 to-green-500/0 group-focus-within:from-emerald-500/5 group-focus-within:to-green-500/5 pointer-events-none transition-all duration-300"></div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                disabled={loading}
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Plus className="w-6 h-6" />
                      Simpan Produk
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>

          {message && (
            <div
              className={`mt-6 p-4 rounded-xl border-l-4 ${
                message.includes("berhasil")
                  ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                  : "bg-red-50 border-red-500 text-red-800"
              } transform transition-all duration-300`}>
              <div className="flex items-center gap-2">
                {message.includes("berhasil") ? (
                  <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                ) : (
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-0.5 bg-white rounded-full"></div>
                  </div>
                )}
                <p className="font-semibold">{message}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push("/produk")}
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-300 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Kembali ke Daftar Produk
          </button>
        </div>
      </div>
    </div>
  );
}

