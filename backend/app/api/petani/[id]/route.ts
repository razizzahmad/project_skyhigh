import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET: Detail petani by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) throw new Error("ID bukan angka");

    const petani = await prisma.petani.findUnique({
      where: { id },
      include: { produk: true }, // optional: tampilkan produk yang dimiliki
    });

    if (!petani) {
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
        data_petani: petani,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        meta_data: {
          error: 1,
          message: "Parameter ID harus berupa angka!",
          status: 400,
        },
      },
      { status: 400 }
    );
  }
}

// DELETE: Hapus petani by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) throw new Error("ID bukan angka");

    const petani = await prisma.petani.findUnique({ where: { id } });

    if (!petani) {
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

    await prisma.petani.delete({ where: { id } });

    return NextResponse.json(
      {
        meta_data: {
          error: 0,
          message: "Data Petani Berhasil Dihapus",
          status: 200,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        meta_data: {
          error: 1,
          message: "Parameter ID harus berupa angka!",
          status: 400,
        },
      },
      { status: 400 }
    );
  }
}

// PUT: Ubah data petani by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) throw new Error("ID bukan angka");

    const { nama_value, kontak_value, alamat_value } = await request.json();

    const petani = await prisma.petani.findUnique({ where: { id } });

    if (!petani) {
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

    const duplikat = await prisma.petani.findFirst({
      where: {
        nama: nama_value,
        kontak: kontak_value,
        alamat: alamat_value,
        NOT: { id },
      },
    });

    if (duplikat) {
      return NextResponse.json(
        {
          meta_data: {
            error: 1,
            message: "Data Petani Gagal Diubah! Sudah Terdaftar",
            status: 409,
          },
        },
        { status: 409 }
      );
    }

    const updated = await prisma.petani.update({
      where: { id },
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
          message: "Data Petani Berhasil Diubah",
          status: 200,
        },
        data_petani: updated,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        meta_data: {
          error: 1,
          message: "Parameter ID harus berupa angka atau input tidak valid!",
          status: 400,
        },
      },
      { status: 400 }
    );
  }
}
