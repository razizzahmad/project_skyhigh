// app/api/produk/route.ts

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "http://localhost:3000",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// OPTIONS: CORS preflight request
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: CORS_HEADERS,
  });
}

// GET: Ambil semua produk (termasuk relasi petani)
export async function GET() {
  try {
    const produkList = await prisma.produk.findMany({
      include: { petani: true },
    });

    return NextResponse.json(
      {
        meta_data: {
          error: 0,
          message: "Data produk berhasil diambil",
          status: 200,
        },
        data_produk: produkList,
      },
      {
        status: 200,
        headers: CORS_HEADERS,
      }
    );
  } catch {
    return NextResponse.json(
      {
        meta_data: {
          error: 1,
          message: "Gagal mengambil data produk",
          status: 500,
        },
        data_produk: [],
      },
      {
        status: 500,
        headers: CORS_HEADERS,
      }
    );
  }
}

// POST: Tambah produk baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newProduk = await prisma.produk.create({
      data: {
        nama: body.nama,
        deskripsi: body.deskripsi,
        harga: Number(body.harga),
        stok: Number(body.stok),
        petaniId: Number(body.petaniId),
      },
    });

    return NextResponse.json(
      {
        meta_data: {
          error: 0,
          message: "Produk berhasil ditambahkan",
          status: 201,
        },
        data_produk: newProduk,
      },
      {
        status: 201,
        headers: CORS_HEADERS,
      }
    );
  } catch {
    return NextResponse.json(
      {
        meta_data: {
          error: 1,
          message: "Gagal menambahkan produk",
          status: 500,
        },
        data_produk: null,
      },
      {
        status: 500,
        headers: CORS_HEADERS,
      }
    );
  }
}
