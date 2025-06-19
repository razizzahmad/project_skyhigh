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
        router.push("/produk"); // ✅ redirect jika berhasil
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
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow bg-white">
      <h1 className="text-2xl font-semibold mb-4">Tambah Produk Baru</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nama" className="block font-medium mb-1">
            Nama Produk
          </label>
          <input
            id="nama"
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full border px-2 py-1 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="deskripsi" className="block font-medium mb-1">
            Deskripsi
          </label>
          <textarea
            id="deskripsi"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            className="w-full border px-2 py-1 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="harga" className="block font-medium mb-1">
            Harga
          </label>
          <input
            id="harga"
            type="number"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            className="w-full border px-2 py-1 rounded"
            required
            min="0"
          />
        </div>
        <div>
          <label htmlFor="stok" className="block font-medium mb-1">
            Stok
          </label>
          <input
            id="stok"
            type="number"
            value={stok}
            onChange={(e) => setStok(e.target.value)}
            className="w-full border px-2 py-1 rounded"
            required
            min="0"
          />
        </div>
        <div>
          <label htmlFor="petaniId" className="block font-medium mb-1">
            ID Petani
          </label>
          <input
            id="petaniId"
            type="number"
            value={petaniId}
            onChange={(e) => setPetaniId(e.target.value)}
            className="w-full border px-2 py-1 rounded"
            required
            min="1"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">
          {loading ? "Menyimpan..." : "Simpan Produk"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm text-blue-700">{message}</p>
      )}
    </div>
  );
}
