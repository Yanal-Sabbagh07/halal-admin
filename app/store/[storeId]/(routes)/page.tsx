import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const session = await getServerSession(options);

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return (
    <div>
      <h2>
        Active Store: <span className="text-blue-600">{store?.name}</span>
      </h2>
      <h3>Owner is : {session?.user.name} </h3>
    </div>
  );
};

export default DashboardPage;
