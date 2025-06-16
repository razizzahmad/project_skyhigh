import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) => {
  try {
    const { nama_value, deskripsi_value, harga_value, stok_value, petaniId_value } = await request.json();

    // Validasi isian wajib
    if (
      !nama_value ||
      !deskripsi_value ||
      harga_value === undefined ||
      stok_value === undefined ||
      petaniId_value === undefined
    ) {
      return NextResponse.json(
        {
          meta_data: {
            error: 1,
            message: "Semua field harus diisi",
            status: 400,
          },
        },
        { status: 400 }
      );
    }

    // Pastikan input angka valid
    const hargaNum = Number(harga_value);
    const stokNum = Number(stok_value);
    const petaniIdNum = Number(petaniId_value);

    if (isNaN(hargaNum) || isNaN(stokNum) || isNaN(petaniIdNum)) {
      return NextResponse.json(
        {
          meta_data: {
            error: 1,
            message: "Harga, stok, dan petaniId harus berupa angka",
            status: 400,
          },
        },
        { status: 400 }
      );
    }

    // Cek duplikasi produk (nama + petaniId)
    const produkDuplikat = await prisma.produk.findFirst({
      where: {
        nama: nama_value,
        petaniId: petaniIdNum,
      },
    });

    if (produkDuplikat) {
      return NextResponse.json(
        {
          meta_data: {
            error: 1,
            message: "Produk dengan nama yang sama sudah ada pada petani ini",
            status: 409,
          },
        },
        { status: 409 }
      );
    }

    // Simpan produk
    const simpan = await prisma.produk.create({
      data: {
        nama: nama_value,
        deskripsi: deskripsi_value,
        harga: hargaNum,
        stok: stokNum,
        petaniId: petaniIdNum,
      },
    });

    return NextResponse.json(
      {
        meta_data: {
          error: 0,
          message: "Produk berhasil disimpan",
          status: 201,
        },
        data: simpan,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Gagal menyimpan produk:", error);
    return NextResponse.json(
      {
        meta_data: {
          error: 1,
          message: "Terjadi kesalahan saat menyimpan produk",
          status: 500,
        },
      },
      { status: 500 }
    );
  }
};
