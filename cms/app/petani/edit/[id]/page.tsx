"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function EditPetaniPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [nama, setNama] = useState("");
  const [kontak, setKontak] = useState("");
  const [alamat, setAlamat] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPetani = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/petani/${id}`);
        const petani = res.data.data_petani;

        if (!petani) throw new Error("Data tidak ditemukan");

        setNama(petani.nama || "");
        setKontak(petani.kontak || "");
        setAlamat(petani.alamat || "");

        setError(false);
        setMessage("");
      } catch (err) {
        console.error("Fetch error:", err);
        setError(true);
        setMessage("Gagal mengambil data petani");
      } finally {
        setLoading(false);
      }
    };

    fetchPetani();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.put(`http://localhost:3001/api/petani/${id}`, {
        nama,
        kontak,
        alamat,
      });
      
      if (res.data.meta_data?.error === 0) {
        setMessage("Berhasil memperbarui data");
        setError(false);
        router.push("/petani"); // redirect ke halaman list petani
      } else {
        throw new Error("Gagal memperbarui");
      }
    } catch (err) {
      console.error("Update error:", err);
      setError(true);
      setMessage("Gagal memperbarui data petani");
    }
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-4">
        <p className="text-gray-500">Memuat data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Data Petani</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nama Petani"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Kontak"
          value={kontak}
          onChange={(e) => setKontak(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <textarea
          placeholder="Alamat"
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Perbarui Data
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-sm ${
            error ? "text-red-600" : "text-green-600"
          }`}>
          {message}
        </p>
      )}
    </div>
  );
}
