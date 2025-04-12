import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const Navbar = async () => {
  const session = await auth();
  const role = session?.user.role as "student" | "teacher" | "admin";

  return (
    <nav className="shadow-md">
      <div className="container ">
        <div className="flex justify-between h-16">
          <Link href="/" className="flex items-center  cursor-pointer">
            <span className="text-blue-600 font-bold text-xl">
              Schäfer Tutoring
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            {!session && (
              <Button effect="gooeyLeft" asChild>
                <Link href="/sign-up">Free trial lesson</Link>
              </Button>
            )}

            {session && (
              <Button
                effect="expandIcon"
                icon={ArrowRightIcon}
                iconPlacement="right"
                variant="outline"
                asChild
              >
                <Link href={`/dashboard/${role}`}>Dashboard</Link>
              </Button>
            )}
            {session ? (
              <form
                action={async () => {
                  "use server";
                  await signOut();
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
