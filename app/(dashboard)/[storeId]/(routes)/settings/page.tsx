import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import SettingsForm from "./components/settings-form";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}
const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  // Check if I'm authenticated
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Check if i can get the store from the url
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId: userId,
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
