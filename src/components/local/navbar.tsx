import { Button } from "@/components/ui/button";

const Navbar = () => {
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
            <Button variant="outline">Login</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
