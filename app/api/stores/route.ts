import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import prismadb from "@/lib/prismadb";
import { options } from "../auth/[...nextauth]/options";

export async function POST(req: Request) {
  const session = await getServerSession(options);
  try {
    const adminId = session?.user.id;

    const body = await req.json();
    const { name, type } = body;

    if (!adminId) {
      return new NextResponse("Unauthorizeddd", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is Required", { status: 400 });
    }
    // create the store
    const store = await prismadb.store.create({
      data: { name: name, type: type, adminId: adminId },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("Internal server Error in Store", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || undefined;

    const perfumeStores = await prismadb.store.findMany({
      where: {
        type: type,
      },
      select: {
        id: true,
        name: true,
      },
    });
    return NextResponse.json(perfumeStores);
  } catch (error) {
    console.log("[STORES_GET]", error);
    return new NextResponse("Internal server Error in Perfumes Store", {
      status: 500,
    });
  }
}
