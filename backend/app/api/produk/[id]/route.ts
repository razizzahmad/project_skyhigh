// app/api/produk/[id]/route.ts
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// OPTIONS method (CORS preflight support)
export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

// GET /api/produk/[id]
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json(
      {
        meta_data: { error: 1, message: "ID tidak valid", status: 400 },
        data_produk: null,
      },
      {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "http://localhost:3000" },
      }
    );
  }

  try {
    const produk = await prisma.produk.findUnique({
      where: { id },
      include: {
        petani: true,
      },
    });

    if (!produk) {
      return NextResponse.json(
        {
          meta_data: { error: 1, message: "Produk tidak ditemukan", status: 404 },
          data_produk: null,
        },
        {
          status: 404,
          headers: { "Access-Control-Allow-Origin": "http://localhost:3000" },
        }
      );
    }

    return NextResponse.json(
      {
        meta_data: { error: 0, message: "Sukses mengambil data", status: 200 },
        data_produk: produk,
      },
      {
        status: 200,
        headers: { "Access-Control-Allow-Origin": "http://localhost:3000" },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        meta_data: { error: 1, message: "Gagal mengambil data produk", status: 500 },
        data_produk: null,
      },
      {
        status: 500,
        headers: { "Access-Control-Allow-Origin": "http://localhost:3000" },
      }
    );
  }
}

// PUT /api/produk/[id]
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json(
      {
        meta_data: { error: 1, message: "ID tidak valid", status: 400 },
      },
      {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "http://localhost:3000" },
      }
    );
  }

  try {
    const body = await request.json();

    const updated = await prisma.produk.update({
      where: { id },
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
        meta_data: { error: 0, message: "Produk diperbarui", status: 200 },
        data_produk: updated,
      },
      {
        status: 200,
        headers: { "Access-Control-Allow-Origin": "http://localhost:3000" },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        meta_data: { error: 1, message: "Gagal memperbarui produk", status: 500 },
      },
      {
        status: 500,
        headers: { "Access-Control-Allow-Origin": "http://localhost:3000" },
      }
    );
  }
}

// DELETE /api/produk/[id]
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json(
      {
        meta_data: { error: 1, message: "ID tidak valid", status: 400 },
      },
      {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "http://localhost:3000" },
      }
    );
  }

  try {
    await prisma.produk.delete({ where: { id } });

    return NextResponse.json(
      {
        meta_data: { error: 0, message: "Produk dihapus", status: 200 },
      },
      {
        status: 200,
        headers: { "Access-Control-Allow-Origin": "http://localhost:3000" },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        meta_data: { error: 1, message: "Gagal menghapus produk", status: 500 },
      },
      {
        status: 500,
        headers: { "Access-Control-Allow-Origin": "http://localhost:3000" },
      }
    );
  }
}
