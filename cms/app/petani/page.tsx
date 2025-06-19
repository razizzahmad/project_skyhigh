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
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl bg-white p-6 rounded-2xl shadow-lg border border-green-200">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-700">
            📦 Data Petani
          </h1>
          <Link
            href="/petani/add"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FontAwesomeIcon icon={faPlus} />
            Tambah Petani
          </Link>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="table w-full table-zebra">
            <thead className="bg-green-100 text-green-800">
              <tr className="text-center font-semibold">
                <th>Nama</th>
                <th>Kontak</th>
                <th>Alamat</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {data?.meta_data?.error === 1 ? (
                <tr>
                  <td colSpan={4} className="text-center text-red-500 py-4">
                    {data.meta_data.message}
                  </td>
                </tr>
              ) : (
                data?.data_petani?.map((item: any) => (
                  <tr key={item.id}>
                    <td>{item.nama}</td>
                    <td>{item.kontak}</td>
                    <td>{item.alamat}</td>
                    <td className="flex gap-2 justify-center">
                      <Link
                        href={`/petani/edit/${item.id}`}
                        className="text-blue-600 hover:text-blue-800">
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </Link>
                      <button
                        onClick={() => deletePetani(item.id)}
                        className="text-red-600 hover:text-red-800">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
