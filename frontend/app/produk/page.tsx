"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProdukPage() {
  const { data, error, isLoading } = useSWR(
    `http://localhost:3001/api/produk`,
    fetcher
  );

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(angka);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-white p-6 flex items-center justify-center">
        <div className="text-green-700 text-xl">Memuat data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl bg-white p-6 rounded-2xl shadow-lg border border-green-200">
        <div className="flex justify-center items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-700">
            🌾 Data Produk Pertanian
          </h1>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="table w-full table-zebra">
            <thead className="bg-green-100 text-green-800">
              <tr className="text-center font-semibold">
                <th>No</th>
                <th>Nama Produk</th>
                <th>Deskripsi</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Petani</th>
                <th>Kontak Petani</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {data?.meta_data?.error === 1 ? (
                <tr>
                  <td colSpan={7} className="text-center text-red-500 py-4">
                    {data.meta_data.message}
                  </td>
                </tr>
              ) : data?.data_produk?.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-gray-500 py-8">
                    Belum ada data produk
                  </td>
                </tr>
              ) : (
                data?.data_produk?.map((item: any, index: number) => (
                  <tr key={item.id} className="hover:bg-green-50">
                    <td className="font-medium">{index + 1}</td>
                    <td className="font-semibold text-green-700">{item.nama}</td>
                    <td className="max-w-xs">
                      <div className="truncate" title={item.deskripsi}>
                        {item.deskripsi}
                      </div>
                    </td>
                    <td className="font-semibold text-green-600">
                      {formatRupiah(item.harga)}
                    </td>
                    <td>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.stok > 10 
                          ? 'bg-green-100 text-green-800' 
                          : item.stok > 0 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.stok} unit
                      </span>
                    </td>
                    <td className="font-medium">{item.petani?.nama || 'N/A'}</td>
                    <td>{item.petani?.kontak || 'N/A'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {data?.data_produk?.length > 0 && (
          <div className="mt-6 text-center text-gray-600">
            Total: {data.data_produk.length} produk
          </div>
        )}
      </div>
    </div>
  );
}