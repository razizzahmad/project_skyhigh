// app/api/petani/route.ts
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "http://localhost:3000",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// OPTIONS: Preflight request handler
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: CORS_HEADERS,
  });
}

// GET: Ambil semua data petani beserta produk
export async function GET() {
  try {
    const petaniList = await prisma.petani.findMany({
      include: { produk: true },
    });

    return NextResponse.json(
      {
        meta_data: {
          error: 0,
          message: "Data petani berhasil diambil",
          status: 200,
        },
        data_petani: petaniList,
      },
      {
        status: 200,
        headers: CORS_HEADERS,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        meta_data: {
          error: 1,
          message: "Gagal mengambil data petani",
          status: 500,
        },
        data_petani: [],
      },
      {
        status: 500,
        headers: CORS_HEADERS,
      }
    );
  }
}

// POST: Tambah data petani baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const petani = await prisma.petani.create({
      data: {
        nama: body.nama,
        kontak: body.kontak,
        alamat: body.alamat,
      },
    });

    return NextResponse.json(
      {
        meta_data: {
          error: 0,
          message: "Data petani berhasil ditambahkan",
          status: 201,
        },
        data_petani: petani,
      },
      {
        status: 201,
        headers: CORS_HEADERS,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        meta_data: {
          error: 1,
          message: "Gagal menambahkan data",
          status: 500,
        },
        data_petani: null,
      },
      {
        status: 500,
        headers: CORS_HEADERS,
      }
    );
  }
}
