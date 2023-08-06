import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";

import prismadb from "@/lib/prismadb";
// import { auth } from "@clerk/nextjs";

export async function GET(
  req: Request,
  { params }: { params: { ownerId: string } }
) {
  try {
    if (!params.ownerId) {
      return new NextResponse("Owner id is required", { status: 400 });
    }

    const owner = await prismadb.user.findUnique({
      where: {
        id: params.ownerId,
      },
    });

    return NextResponse.json(owner);
  } catch (error) {
    console.log("[SIZE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { ownerId: string; storeId: string } }
) {
  try {
    const userId = "001";

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.ownerId) {
      return new NextResponse("Owner id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        adminId: userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const owner = await prismadb.user.delete({
      where: {
        id: params.ownerId,
      },
    });

    return NextResponse.json(owner);
  } catch (error) {
    console.log("[Owner]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { ownerId: string; storeId: string } }
) {
  try {
    const userId = "001";

    const body = await req.json();

    const { name, email, password, phone, role } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }
    if (!password) {
      return new NextResponse("Password is required", { status: 400 });
    }
    if (!phone) {
      return new NextResponse("Phone is required", { status: 400 });
    }
    if (!role) {
      return new NextResponse("Role is required", { status: 400 });
    }

    if (!params.ownerId) {
      return new NextResponse("Owner id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        adminId: userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const owner = await prismadb.user.update({
      where: {
        id: params.ownerId,
      },
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 10),
        phone,
        role,
      },
    });

    return NextResponse.json(owner);
  } catch (error) {
    console.log("[OWNER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
