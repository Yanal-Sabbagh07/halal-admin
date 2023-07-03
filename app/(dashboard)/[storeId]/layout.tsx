import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";

const DashboardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId: userId, // shorthand ==> userId
    },
  });
  if (!store) {
    redirect("/");
  } else {
    return (
      <div>
        {/* <h1>Navigation Bar</h1> */}
        <Navbar />
        {children}
      </div>
    );
  }
};

export default DashboardLayout;
