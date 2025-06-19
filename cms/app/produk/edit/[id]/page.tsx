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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">⏳ Memuat data produk...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-lg border border-green-200">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          ✏️ Edit Produk
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Nama Produk</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Deskripsi</label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Harga</label>
              <input
                type="number"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Stok</label>
              <input
                type="number"
                value={stok}
                onChange={(e) => setStok(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Petani</label>
            <select
              value={petaniId}
              onChange={(e) => setPetaniId(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required>
              <option value="">-- Pilih Petani --</option>
              {listPetani.map((petani) => (
                <option key={petani.id} value={petani.id}>
                  {petani.nama}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition">
            Simpan Perubahan
          </button>

          {message && (
            <p
              className={`text-center text-sm mt-2 ${
                error ? "text-red-600" : "text-green-600"
              }`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
