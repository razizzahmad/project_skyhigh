"use client";

import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProdukPage() {
  const { data, error, isLoading, mutate } = useSWR(
    "http://localhost:3001/api/produk",
    fetcher
  );

  const deleteProduk = async (id: number) => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      const res = await axios.delete(`http://localhost:3001/api/produk/${id}`);
      alert(res.data.message || "Produk berhasil dihapus");
      mutate();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl bg-white p-6 rounded-2xl shadow-lg border border-green-200">
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-700 text-center mb-8">
          📦 Data Produk
        </h1>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="table w-full table-zebra">
            <thead className="bg-green-100 text-green-800">
              <tr className="text-center font-semibold">
                <th>Nama</th>
                <th>Deskripsi</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Petani</th>
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
                    <td>
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