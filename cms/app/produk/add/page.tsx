"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddProdukPage() {
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [petaniId, setPetaniId] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
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
        router.push("/produk");
      } else {
        setMessage(response.data?.meta_data?.message || "Terjadi kesalahan");
      }
    } catch (error: any) {
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
    <div className="min-h-screen bg-gradient-to-br from-[#f1fdf4] to-[#e6f4ec] flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 border border-[#d5f2e3]">
        <h1 className="text-3xl font-bold text-[#1e7347] mb-6 text-center">
          Tambah Produk Baru
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5 text-gray-800">
          <div>
            <label
              htmlFor="nama"
              className="block font-semibold mb-1 text-[#2e7d54]">
              Nama Produk
            </label>
            <input
              id="nama"
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Masukkan nama produk"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2e7d54] text-gray-900 placeholder:text-gray-500 text-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="deskripsi"
              className="block font-semibold mb-1 text-[#2e7d54]">
              Deskripsi
            </label>
            <textarea
              id="deskripsi"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Masukkan deskripsi produk"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2e7d54] text-gray-900 placeholder:text-gray-500 text-md"
              rows={4}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="harga"
                className="block font-semibold mb-1 text-[#2e7d54]">
                Harga
              </label>
              <input
                id="harga"
                type="number"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                placeholder="0"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2e7d54] text-gray-900 placeholder:text-gray-500 text-md"
                required
                min="0"
              />
            </div>
            <div>
              <label
                htmlFor="stok"
                className="block font-semibold mb-1 text-[#2e7d54]">
                Stok
              </label>
              <input
                id="stok"
                type="number"
                value={stok}
                onChange={(e) => setStok(e.target.value)}
                placeholder="0"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2e7d54] text-gray-900 placeholder:text-gray-500 text-md"
                required
                min="0"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="petaniId"
              className="block font-semibold mb-1 text-[#2e7d54]">
              ID Petani
            </label>
            <input
              id="petaniId"
              type="number"
              value={petaniId}
              onChange={(e) => setPetaniId(e.target.value)}
              placeholder="Contoh: 1"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2e7d54] text-gray-900 placeholder:text-gray-500 text-md"
              required
              min="1"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1e7347] text-white font-semibold py-2 rounded-lg hover:bg-[#195d3a] transition disabled:opacity-50 text-md">
            {loading ? "Menyimpan..." : "Simpan Produk"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-red-600">{message}</p>
        )}
      </div>
    </div>
  );
}
