"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // ✅ gunakan ini

export default function AddPetaniPage() {
  const [nama, setNama] = useState("");
  const [kontak, setKontak] = useState("");
  const [alamat, setAlamat] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter(); // ✅ gunakan hook dengan benar

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(`http://localhost:3001/api/petani`, {
        nama,
        kontak,
        alamat,
      });

      if (response.data?.meta_data?.error === 0) {
        // ✅ Redirect langsung jika sukses
        router.push("/petani");
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
      <h1 className="text-2xl font-semibold mb-4">Tambah Data Petani</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nama" className="block font-medium mb-1">
            Nama Petani
          </label>
          <input
            id="nama"
            name="nama"
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full border px-2 py-1 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="kontak" className="block font-medium mb-1">
            Kontak
          </label>
          <input
            id="kontak"
            name="kontak"
            type="text"
            value={kontak}
            onChange={(e) => setKontak(e.target.value)}
            className="w-full border px-2 py-1 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="alamat" className="block font-medium mb-1">
            Alamat
          </label>
          <textarea
            id="alamat"
            name="alamat"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            className="w-full border px-2 py-1 rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50">
          {loading ? "Menyimpan..." : "Simpan Petani"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm text-blue-700">{message}</p>
      )}
    </div>
  );
}
