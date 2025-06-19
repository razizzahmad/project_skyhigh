"use client";

import useSWR from "swr";
import axios from "axios";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProdukPage() {
  const { data, error, isLoading, mutate } = useSWR(
    "http://localhost:3001/api/produk",
    fetcher
  );

  const deleteProduk = async (id: number) => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      try {
        const res = await axios.delete(
          `http://localhost:3001/api/produk/${id}`
        );
        alert(res.data.message || "Produk berhasil dihapus");
        mutate();
      } catch (err) {
        alert("Terjadi kesalahan saat menghapus data");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 via-cyan-50 to-blue-50 p-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/20 via-transparent to-cyan-100/20"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-cyan-200/30 to-transparent rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full max-w-7xl bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/30 relative z-10">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">📦</span>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
                Data Produk
              </h1>
              <p className="text-gray-600 text-lg font-medium mt-1">
                Kelola produk pertanian Anda
              </p>
            </div>
          </div>

          <Link
            href="/produk/add"
            className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faPlus} className="text-xs" />
            </div>
            <span className="font-semibold">Tambah Produk</span>
          </Link>
        </div>

        {/* Table Container */}
        <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-100 via-teal-100 to-cyan-100 border-b border-emerald-200">
                  <th className="text-center font-bold text-emerald-800 py-6 text-lg bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                    Nama
                  </th>
                  <th className="text-center font-bold text-emerald-800 py-6 text-lg bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                    Deskripsi
                  </th>
                  <th className="text-center font-bold text-emerald-800 py-6 text-lg bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                    Harga
                  </th>
                  <th className="text-center font-bold text-emerald-800 py-6 text-lg bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                    Stok
                  </th>
                  <th className="text-center font-bold text-emerald-800 py-6 text-lg bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                    Petani
                  </th>
                  <th className="text-center font-bold text-emerald-800 py-6 text-lg bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.meta_data?.error === 1 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
                          <span className="text-2xl">⚠️</span>
                        </div>
                        <p className="text-xl font-semibold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                          {data.meta_data.message}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data?.data_produk?.map((item: any, index: number) => (
                    <tr
                      key={item.id}
                      className={`hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-teal-50/50 transition-all duration-300 border-b border-gray-100/50 ${
                        index % 2 === 0 ? "bg-white/50" : "bg-gray-50/30"
                      }`}>
                      <td className="text-center py-5">
                        <span className="font-semibold text-gray-800 text-lg">
                          {item.nama}
                        </span>
                      </td>
                      <td className="text-center py-5">
                        <span className="text-gray-700 font-medium">
                          {item.deskripsi}
                        </span>
                      </td>
                      <td className="text-center py-5">
                        <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                          Rp {item.harga.toLocaleString()}
                        </span>
                      </td>
                      <td className="text-center py-5">
                        <div className="inline-flex items-center justify-center">
                          <span
                            className={`px-4 py-2 rounded-full font-semibold text-sm ${
                              item.stok > 10
                                ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200"
                                : item.stok > 0
                                ? "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 border border-yellow-200"
                                : "bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border border-red-200"
                            }`}>
                            {item.stok}
                          </span>
                        </div>
                      </td>
                      <td className="text-center py-5">
                        <span className="text-gray-700 font-medium">
                          {item.petani?.nama || "-"}
                        </span>
                      </td>
                      <td className="text-center py-5">
                        <div className="flex gap-3 justify-center items-center">
                          <Link
                            href={`/produk/edit/${item.id}`}
                            className="group w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                            <FontAwesomeIcon
                              icon={faPencilAlt}
                              className="text-white text-sm group-hover:rotate-12 transition-transform duration-300"
                            />
                          </Link>
                          <button
                            onClick={() => deleteProduk(item.id)}
                            className="group w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="text-white text-sm group-hover:rotate-12 transition-transform duration-300"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
              <span className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Memuat data...
              </span>
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 font-medium">
            Total produk:{" "}
            <span className="font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {data?.data_produk?.length || 0}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
