import prismadb from "@/lib/prismadb";
import React from "react";

const page = async () => {
  const stores = await prismadb.store.findMany({
    where: {
      mallId: "27071990",
    },
  });
  const formatedItems = stores.map((store) => ({
    label: store.name,
    value: store.id,
  }));
  console.log(formatedItems);
  return (
    <div>
      <h1>Welcome to Halal Mall</h1>
      <div>
        <h2>Our Stores :</h2>
        <div className="w-full h-[calc(100vh-120px)] flex items-center justify-center gap-4">
          {formatedItems.map((store) => (
            <div
              className="border w-1/4  h-56 bg-gray-200 rounded"
              key={store.value}
            >
              <p>Store Name: {store.label}</p>
              <p>Store ID: {store.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
