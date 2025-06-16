import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { nama_value, deskripsi_value, harga_value, stok_value, petaniId_value } = body;

    // Validasi field kosong
    if (!nama_value || !deskripsi_value || harga_value === undefined || stok_value === undefined || petaniId_value === undefined) {
      return NextResponse.json({
        meta_data: {
          error: 1,
          message: "Semua field wajib diisi",
          status: 400,
        },
      }, { status: 400 });
    }

    // Konversi angka dan validasi
    const harga = Number(harga_value);
    const stok = Number(stok_value);
    const petaniId = Number(petaniId_value);

    if ([harga, stok, petaniId].some(isNaN)) {
      return NextResponse.json({
        meta_data: {
          error: 1,
          message: "Harga, stok, dan ID petani harus berupa angka valid",
          status: 400,
        },
      }, { status: 400 });
    }

    // Cek duplikat nama produk untuk petani yang sama
    const existing = await prisma.produk.findFirst({
      where: {
        nama: nama_value,
        petaniId,
      },
    });

    if (existing) {
      return NextResponse.json({
        meta_data: {
          error: 1,
          message: "Produk sudah terdaftar untuk petani ini",
          status: 409,
        },
      }, { status: 409 });
    }

    // Simpan ke database
    const result = await prisma.produk.create({
      data: {
        nama: nama_value,
        deskripsi: deskripsi_value,
        harga,
        stok,
        petaniId,
      },
    });

    return NextResponse.json({
      meta_data: {
        error: 0,
        message: "Produk berhasil disimpan",
        status: 201,
      },
      data: result,
    }, { status: 201 });

  } catch (error) {
    console.error("POST Produk Error:", error);
    return NextResponse.json({
      meta_data: {
        error: 1,
        message: "Terjadi kesalahan pada server",
        status: 500,
      },
    }, { status: 500 });
  }
};
