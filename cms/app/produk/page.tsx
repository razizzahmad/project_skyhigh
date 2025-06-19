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
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl bg-white p-6 rounded-2xl shadow-lg border border-green-200">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-700">
            📦 Data Produk
          </h1>
          <Link
            href="/produk/add"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FontAwesomeIcon icon={faPlus} />
            Tambah Produk
          </Link>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="table w-full table-zebra">
            <thead className="bg-green-100 text-green-800">
              <tr className="text-center font-semibold">
                <th>Nama</th>
                <th>Deskripsi</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Petani</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {data?.meta_data?.error === 1 ? (
                <tr>
                  <td colSpan={6} className="text-center text-red-500 py-4">
                    {data.meta_data.message}
                  </td>
                </tr>
              ) : (
                data?.data_produk?.map((item: any) => (
                  <tr key={item.id}>
                    <td>{item.nama}</td>
                    <td>{item.deskripsi}</td>
                    <td>Rp {item.harga.toLocaleString()}</td>
                    <td>{item.stok}</td>
                    <td>{item.petani?.nama || "-"}</td>
                    <td className="flex gap-2 justify-center">
                      <Link
                        href={`/produk/edit/${item.id}`}
                        className="text-blue-600 hover:text-blue-800">
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </Link>
                      <button
                        onClick={() => deleteProduk(item.id)}
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
