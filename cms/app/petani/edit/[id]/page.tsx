"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

function EditPetaniPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [nama, setNama] = useState("");
  const [kontak, setKontak] = useState("");
  const [alamat, setAlamat] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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
    setSubmitting(true);

    try {
      const res = await axios.put(`http://localhost:3001/api/petani/${id}`, {
        nama,
        kontak,
        alamat,
      });

      if (res.data.meta_data?.error === 0) {
        setMessage("Berhasil memperbarui data");
        setError(false);
        setTimeout(() => {
          router.push("/petani");
        }, 1500);
      } else {
        throw new Error("Gagal memperbarui");
      }
    } catch (err) {
      console.error("Update error:", err);
      setError(true);
      setMessage("Gagal memperbarui data petani");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-teal-50 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-sm w-full mx-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
            <p className="text-gray-700 font-bold">Memuat data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-teal-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-green-600 rounded-full mb-4 shadow-lg">
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent mb-2">
            Edit Data Petani
          </h1>
          <p className="text-gray-600 text-lg font-medium">
            Perbarui informasi data petani
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-green-600 px-8 py-6">
            <h2 className="text-xl font-bold text-white">
              Formulir Edit Petani
            </h2>
            <p className="text-teal-100 mt-1 font-medium">
              Lengkapi informasi di bawah ini
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nama Field */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-800">
                  Nama Petani
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-500"
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
                  </div>
                  <input
                    type="text"
                    placeholder="Masukkan nama lengkap petani"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm placeholder-gray-500 text-gray-800 font-medium"
                    required
                  />
                </div>
              </div>

              {/* Kontak Field */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-800">
                  Nomor Kontak
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Masukkan nomor telepon atau WhatsApp"
                    value={kontak}
                    onChange={(e) => setKontak(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm placeholder-gray-500 text-gray-800 font-medium"
                    required
                  />
                </div>
              </div>

              {/* Alamat Field */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-800">
                  Alamat Lengkap
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-500 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <textarea
                    placeholder="Masukkan alamat lengkap termasuk RT/RW, Kelurahan, Kecamatan"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm placeholder-gray-500 text-gray-800 font-medium resize-none"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2">
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Memperbarui...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                      <span>Perbarui Data Petani</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Message Display */}
            {message && (
              <div
                className={`mt-6 p-4 rounded-xl border-l-4 ${
                  error
                    ? "bg-red-50 border-red-400 text-red-700"
                    : "bg-green-50 border-green-400 text-green-700"
                }`}>
                <div className="flex items-center space-x-2">
                  {error ? (
                    <svg
                      className="w-5 h-5 text-red-500"
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
                      className="w-5 h-5 text-green-500"
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
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push("/petani")}
            className="inline-flex items-center space-x-2 text-gray-700 hover:text-gray-900 font-bold transition-colors duration-200">
            <svg
              className="w-5 h-5"
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
            <span>Kembali ke Daftar Petani</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditPetaniPage;
