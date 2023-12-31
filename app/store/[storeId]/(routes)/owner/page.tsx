import prismadb from "@/lib/prismadb";

import { OwnerColumn } from "./components/columns";
import { OwnersClient } from "./components/client";

const OwnersPage = async ({ params }: { params: { storeId: string } }) => {
  const owners = await prismadb.user.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const formattedOwners: OwnerColumn[] = owners.map((owner) => ({
    id: owner.id,
    name: owner.name,
    email: owner.email,
    phone: owner.phone,
    image: owner.image,
    role: owner.role,
    createdAt: owner.createdAt,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OwnersClient data={formattedOwners} />
      </div>
    </div>
  );
};

export default OwnersPage;
