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

export default function PetaniPage() {
  const { data, error, isLoading, mutate } = useSWR(
    "http://localhost:3001/api/petani",
    fetcher
  );

  const deletePetani = async (id: number) => {
    if (confirm("Yakin ingin menghapus petani ini?")) {
      try {
        const res = await axios.delete(
          `http://localhost:3001/api/petani/${id}`
        );
        alert(res.data.message || "Petani berhasil dihapus");
        mutate();
      } catch (err) {
        alert("Terjadi kesalahan saat menghapus data");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-emerald-100/20 to-teal-100/20 rounded-full blur-2xl"></div>
      </div>

      <div className="relative w-full max-w-6xl bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 transition-all duration-500 hover:shadow-3xl">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
              🌾 Data Petani
            </h1>
            <p className="text-slate-600 font-medium text-lg">
              Kelola informasi petani dengan mudah dan efisien
            </p>
          </div>

          <Link
            href="/petani/add"
            className="group relative bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3 rounded-2xl flex items-center gap-3 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <FontAwesomeIcon icon={faPlus} className="relative z-10" />
            <span className="relative z-10">Tambah Petani</span>
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl p-6 mb-6">
            <p className="text-red-700 font-semibold text-center">
              Terjadi kesalahan saat memuat data
            </p>
          </div>
        )}

        {/* Table Section */}
        {!isLoading && !error && (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/70 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-500/90 to-teal-600/90 text-white">
                    <th className="text-center font-bold text-lg py-6 first:rounded-tl-2xl">
                      <span className="bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                        Nama Petani
                      </span>
                    </th>
                    <th className="text-center font-bold text-lg py-6">
                      <span className="bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                        Kontak
                      </span>
                    </th>
                    <th className="text-center font-bold text-lg py-6">
                      <span className="bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                        Alamat
                      </span>
                    </th>
                    <th className="text-center font-bold text-lg py-6 last:rounded-tr-2xl">
                      <span className="bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                        Aksi
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.meta_data?.error === 1 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-12">
                        <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl p-6 mx-4">
                          <p className="text-red-600 font-semibold text-lg">
                            {data.meta_data.message}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : data?.data_petani?.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-12">
                        <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-8 mx-4">
                          <p className="text-slate-600 font-semibold text-lg mb-2">
                            Belum ada data petani
                          </p>
                          <p className="text-slate-500">
                            Klik tombol "Tambah Petani" untuk menambahkan data
                            baru
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    data?.data_petani?.map((item: any, index: number) => (
                      <tr
                        key={item.id}
                        className={`
                          hover:bg-gradient-to-r hover:from-emerald-50/80 hover:to-teal-50/80 
                          transition-all duration-300 border-b border-white/50
                          ${
                            index % 2 === 0 ? "bg-white/30" : "bg-emerald-50/20"
                          }
                        `}>
                        <td className="text-center py-6 font-semibold text-slate-700">
                          <span className="bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent font-bold">
                            {item.nama}
                          </span>
                        </td>
                        <td className="text-center py-6 font-medium text-slate-600">
                          {item.kontak}
                        </td>
                        <td className="text-center py-6 font-medium text-slate-600 max-w-xs truncate">
                          {item.alamat}
                        </td>
                        <td className="text-center py-6">
                          <div className="flex gap-4 justify-center">
                            <Link
                              href={`/petani/edit/${item.id}`}
                              className="group relative p-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                              <FontAwesomeIcon
                                icon={faPencilAlt}
                                className="relative z-10 text-sm"
                              />
                            </Link>
                            <button
                              onClick={() => deletePetani(item.id)}
                              className="group relative p-3 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-rose-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="relative z-10 text-sm"
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
        )}

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 font-medium">
            Total Data:{" "}
            <span className="font-bold text-emerald-600">
              {data?.data_petani?.length || 0}
            </span>{" "}
            Petani
          </p>
        </div>
      </div>
    </div>
  );
}
