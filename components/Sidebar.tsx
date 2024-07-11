'use client';
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SideBarDropdown from "./SidebarDropdown";
import Image from "next/image";

interface menuLink {
  name: string;
  link: string;
}

const Sidebar: React.FC<{ menuLinks: menuLink[], submenuLinks: menuLink[] }> = ({ menuLinks, submenuLinks }) => {
  const pathname = usePathname();

  

  return (
    <div className="relative hidden lg:block w-1/6 h-screen">
      <div className="absolute inset-0">
        <Image
          src="/img/ucn-bg.png"
          alt="ucn-background"
          layout="fill"
          objectFit="cover"
          priority
          className="z-0 filter blur-[1.3px]"
        />
      </div>
      <div className="relative flex flex-col gap-2 z-10 h-full">
        
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {menuLinks.map((link) => (
              <Link
                key={link.name}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  pathname === link.link
                    ? "text-white bg-orange-500"
                    : "text-white  hover:bg-orange-600"
                }`}
                href={link.link}
              >
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className=" flex items-center justify-center h-12 ">
        
          <Link
            type="button"
            className="rounded-lg bg-blue-500  p-2 text-white hover:bg-orange-600"
            href="http://localhost:4000/login"
          >
            Salir
          </Link>
        </div>
        <div className="flex items-center justify-center h-12 border-t">
          <span className="text-white">
            © {new Date().getFullYear()} EZRequirement
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
