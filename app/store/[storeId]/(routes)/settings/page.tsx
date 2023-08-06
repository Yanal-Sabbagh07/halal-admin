import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import SettingsForm from "./components/settings-form";
import { options } from "@/app/api/auth/[...nextauth]/options";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}
const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const session = await getServerSession(options);
  // Check if I'm authenticated
  const userId = session?.user.id;

  if (!userId) {
    redirect("/sign-in");
  }

  // Check if i can get the store from the url
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      adminId: userId,
    },
  });

  //for someone typing ids in url
  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
