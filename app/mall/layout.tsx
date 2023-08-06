// import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import Navbar from "@/components/navbar";
import StoreSWitcher from "@/components/store-switcher";
import prismadb from "@/lib/prismadb";
import { options } from "@/app/api/auth/[...nextauth]/options";

const AdminDashboardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) => {
  const session = await getServerSession(options);
  const adminId = session?.user.id;

  if (!session) {
    redirect("/login");
  }
  const mall = await prismadb.mall.findFirst({
    where: {
      id: "27071990",
    },
  });
  const adminStores = await prismadb.store.findMany({
    where: {
      adminId: adminId,
    },
  });
  if (!mall) {
    redirect("/");
  } else {
    return (
      <div>
        <StoreSWitcher items={adminStores} />
        {children}
      </div>
    );
  }
};

export default AdminDashboardLayout;
