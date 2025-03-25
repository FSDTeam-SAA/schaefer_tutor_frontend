import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-blue-600 font-bold text-xl">
              Schäfer Tutoring
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button effect="gooeyLeft">Free trial lesson</Button>
            {session ? (
              <form
                action={async () => {
                  "use server";
                  await signOut({
                    redirectTo: "/",
                  });
                }}
              >
                <Button type="submit">Log out</Button>
              </form>
            ) : (
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
