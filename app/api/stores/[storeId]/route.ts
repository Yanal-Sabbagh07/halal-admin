import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { options } from "../../auth/[...nextauth]/options";

// Update Store
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const session = await getServerSession(options);
  try {
    const userId = session?.user.id;
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const body = await req.json();
    const { name, type } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is Required", { status: 400 });
    }

    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        adminId: userId,
      },
      data: {
        name: name,
        type: type,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("STORE_PATCH", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

//Delete Store

export async function DELETE(
  _req: Request, // first parameter we should keep it even if it's unused
  { params }: { params: { storeId: string } }
) {
  const session = await getServerSession(options);

  try {
    const userId = session?.user.id;
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is Required", { status: 400 });
    }

    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeId,
        adminId: userId,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("STORE_DELETE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
