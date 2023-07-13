import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function GET(
  req: Request,
  { params }: { params: { ownerId: string } }
) {
  try {
    if (!params.ownerId) {
      return new NextResponse("Owner id is required", { status: 400 });
    }

    const owner = await prismadb.owner.findUnique({
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
    const { userId } = auth();

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

    const owner = await prismadb.owner.delete({
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
    const { userId } = auth();

    const body = await req.json();

    const { name, email, password, phone } = body;

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

    const owner = await prismadb.owner.update({
      where: {
        id: params.ownerId,
      },
      data: {
        name,
        email,
        Password: password,
        phone,
      },
    });

    return NextResponse.json(owner);
  } catch (error) {
    console.log("[OWNER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
