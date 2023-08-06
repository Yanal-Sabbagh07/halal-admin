import prismadb from "@/lib/prismadb";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SetupLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/login");
  }
  if (session?.user.role === "admin") {
    const mallId = "27071990";
    const mall = await prismadb.mall.findFirst({
      where: {
        id: mallId,
      },
    });
    if (mall) {
      redirect(`/mall`);
    }
  }
  if (session.user.role === "owner") {
    const store = await prismadb.store.findFirst({
      where: {
        id: session?.user.storeId,
      },
    });
    if (store) {
      redirect(`/store/${store.id}`);
    }
  }

  return <>{children}</>;
};

export default SetupLayout;
