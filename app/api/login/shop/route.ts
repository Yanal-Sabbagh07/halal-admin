import * as bcrypt from "bcrypt";

import prismadb from "@/lib/prismadb";

interface RequestBody {
  username: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const { username, password } = body;

  const user = await prismadb.user.findFirst({
    where: {
      email: username,
    },
  });

  if (!user) {
    throw new Error(JSON.stringify("user doesn't Exist"));
  }

  if (user && password === user.password) {
    return new Response(JSON.stringify(user));
  } else throw new Error("Password isn't correct");
}
