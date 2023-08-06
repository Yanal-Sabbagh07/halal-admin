// import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { options } from "@/app/api/auth/[...nextauth]/options";

const DashboardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/login");
  }
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });
  if (!store) {
    redirect("/");
  } else {
    return (
      <div>
        <Navbar />
        {children}
      </div>
    );
  }
};

export default DashboardLayout;
