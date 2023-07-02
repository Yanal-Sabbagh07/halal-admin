import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello Admin Dashboard</h1>
      <UserButton afterSignOutUrl="/" />
      <Button size="lg"> Log in</Button>
    </main>
  );
}
