import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import MainNav from "@/components/main-nav";
import StoreSWitcher from "@/components/store-switcher";
import prismadb from "@/lib/prismadb";
import Signout from "./ui/Signout";
import { options } from "@/app/api/auth/[...nextauth]/options";

const Navbar = async () => {
  const session = await getServerSession(options);
  const adminId = session?.user.id;

  if (!session) {
    redirect("/login");
  }

  const adminStores = await prismadb.store.findMany({
    where: {
      adminId: adminId,
    },
  });

  const ownerStores = await prismadb.store.findMany({
    where: {
      id: session.user.storeId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        {session.user.role === "admin" ? (
          <StoreSWitcher items={adminStores} />
        ) : (
          <StoreSWitcher items={ownerStores} />
        )}

        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          {/* <UserButton afterSignOutUrl="/" /> */}
          {/* {session.user.name} */}
        </div>
        <Signout />
      </div>
    </div>
  );
};

export default Navbar;
