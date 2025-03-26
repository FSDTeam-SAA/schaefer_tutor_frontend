import { auth, signOut } from "@/auth";
import { Button } from "../ui/button";

const DashboardNav = async () => {
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
            {session && (
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <Button type="submit">Log out</Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
