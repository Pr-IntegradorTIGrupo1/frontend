import Link from "next/link";
import { Button } from "./button";
import Image from "next/image";

interface NavBarProps {
  // Define any props if needed
}

const NavBar: React.FC<NavBarProps> = () => {
  return (
    <header className="top-0 left-0 w-full bg-blue-900 shadow-md z-50 dark:bg-gray-900">
      <div className=" mx-auto px-4 md:px-6 flex items-center justify-between h-16">
        <div className="flex  items-center  ">
          <Image
            src="/img/logo-base.png"
            alt="ucn-logo"
            width={50}
            height={50}
          />
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/user/dashboard"
            className="text-white hover:text-blue-500 transition-colors dark:text-gray-400 dark:hover:text-blue-500"
          >
            Inicio
          </Link>
          <Link
            href="/user/help"
            className="text-white hover:text-blue-500 transition-colors dark:text-gray-400 dark:hover:text-blue-500"
          >
            Ayuda
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button className="hidden md:inline-flex">
            <Link href="https://management-system-frontend-woad.vercel.app/login">
              Salir
            </Link>
          </Button>
          <Button className="md:hidden" size={"icon"} variant={"outline"}>
            <span className="sr-only">Toggle navigation</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
