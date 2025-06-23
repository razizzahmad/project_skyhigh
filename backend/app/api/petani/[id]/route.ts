import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "http://localhost:3000",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// OPTIONS /api/petani/[id]
export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: CORS_HEADERS,
  });
}

// GET /api/petani/[id]
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  try {
    const petani = await prisma.petani.findUnique({
      where: { id },
    });

    if (!petani) {
      return NextResponse.json(
        {
          meta_data: {
            error: 1,
            message: "Petani tidak ditemukan",
            status: 404,
          },
          data_petani: null,
        },
        {
          status: 404,
          headers: CORS_HEADERS,
        }
      );
    }

    return NextResponse.json(
      {
        meta_data: {
          error: 0,
          message: "Sukses mengambil data",
          status: 200,
        },
        data_petani: petani,
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
          message: "Gagal mengambil data",
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

// PUT /api/petani/[id]
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const id = Number(context?.params?.id);

  if (isNaN(id)) {
    return NextResponse.json(
      {
        meta_data: {
          error: 1,
          message: "ID tidak valid",
          status: 400,
        },
      },
      {
        status: 400,
        headers: CORS_HEADERS,
      }
    );
  }

  try {
    const body = await request.json();

    const updatedPetani = await prisma.petani.update({
      where: { id },
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
          message: "Petani diperbarui",
          status: 200,
        },
        data_petani: updatedPetani,
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
          message: "Gagal memperbarui data",
          status: 500,
        },
      },
      {
        status: 500,
        headers: CORS_HEADERS,
      }
    );
  }
}

// DELETE /api/petani/[id]
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const id = Number(context?.params?.id);

  if (isNaN(id)) {
    return NextResponse.json(
      {
        meta_data: {
          error: 1,
          message: "ID tidak valid",
          status: 400,
        },
      },
      {
        status: 400,
        headers: CORS_HEADERS,
      }
    );
  }

  try {
    await prisma.petani.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        meta_data: {
          error: 0,
          message: "Petani berhasil dihapus",
          status: 200,
        },
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
          message: "Gagal menghapus petani",
          status: 500,
        },
      },
      {
        status: 500,
        headers: CORS_HEADERS,
      }
    );
  }
}
