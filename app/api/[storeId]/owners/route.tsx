import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs";
import * as bcrypt from "bcrypt";
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
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

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
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

    const owner = await prismadb.user.create({
      data: {
        name,
        email,
        password: password,
        phone,
        role,
        image: "",
        storeId: params.storeId,
      },
    });

    console.log(owner);
    return NextResponse.json(owner);
  } catch (error) {
    console.log("[Owner_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const owners = await prismadb.owner.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(owners);
  } catch (error) {
    console.log("[Owner_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
