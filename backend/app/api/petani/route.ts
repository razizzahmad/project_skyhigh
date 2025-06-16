import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Service GET: Ambil semua data petani beserta produk-produk mereka (optional)
export const GET = async () => {
  try {
    const data = await prisma.petani.findMany({
      include: {
        produk: true, // kalau mau ambil produk-produk yang terkait, bisa diaktifkan
      },
    });

    if (data.length === 0) {
      return NextResponse.json(
        {
          meta_data: {
            error: 1,
            message: "Data Petani Tidak Ditemukan",
            status: 404,
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        meta_data: {
          error: 0,
          message: null,
          status: 200,
        },
        data_user: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        meta_data: {
          error: 1,
          message: "Terjadi kesalahan saat mengambil data",
          status: 500,
        },
      },
      { status: 500 }
    );
  }
};

// Service POST: Tambah data petani baru (hanya untuk data petani, tanpa produk)
export const POST = async (request: NextRequest) => {
  try {
    const { nama_value, kontak_value, alamat_value } = await request.json();

    // Cek apakah petani sudah ada berdasarkan nama dan kontak (bisa disesuaikan)
    const checkUser = await prisma.petani.findFirst({
      where: {
        nama: nama_value,
        kontak: kontak_value,
      },
    });

    if (checkUser) {
      return NextResponse.json(
        {
          meta_data: {
            error: 1,
            message: "Data Gagal Disimpan! Petani Sudah Terdaftar",
            status: 409,
          },
        },
        { status: 409 }
      );
    }

    // Simpan data petani baru
    const save = await prisma.petani.create({
      data: {
        nama: nama_value,
        kontak: kontak_value,
        alamat: alamat_value,
      },
    });

    return NextResponse.json(
      {
        meta_data: {
          error: 0,
          message: "Data Petani Berhasil Disimpan",
          status: 201,
        },
        data_user: save,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        meta_data: {
          error: 1,
          message: "Terjadi kesalahan saat menyimpan data",
          status: 500,
        },
      },
      { status: 500 }
    );
  }
};
