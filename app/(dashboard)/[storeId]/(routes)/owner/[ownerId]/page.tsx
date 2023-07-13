import prismadb from "@/lib/prismadb";

import { OwnerForm } from "./components/owner-form";

const OwnerPage = async ({ params }: { params: { ownerId: string } }) => {
  const owner = await prismadb.owner.findUnique({
    where: {
      id: params.ownerId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OwnerForm initialData={owner} />
      </div>
    </div>
  );
};

export default OwnerPage;
