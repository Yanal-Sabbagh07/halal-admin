import * as bcrypt from "bcrypt";

import prismadb from "@/lib/prismadb";

interface RequestBody {
  username: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const { username, password } = body;

  const user = await prismadb.owner.findFirst({
    where: {
      email: username,
    },
  });

  if (!user) {
    return new Response(JSON.stringify("Email is not Registered!"));
  }

  if (user && (await bcrypt.compare(password, user.Password))) {
    const { Password, ...result } = user;
    console.log(result);
    return new Response(JSON.stringify(result));
  } else return new Response(JSON.stringify("Password is not correct!"));
}
