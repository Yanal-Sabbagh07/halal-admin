import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import * as bcrypt from "bcrypt";
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
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

    const owner = await prismadb.owner.create({
      data: {
        name,
        email,
        Password: await bcrypt.hash(password, 10),
        phone,
        storeId: params.storeId,
      },
    });
    const { Password, ...result } = owner;
    console.log(result);
    return NextResponse.json(result);
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
