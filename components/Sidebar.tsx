'use client';
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SideBarDropdown from "./SidebarDropdown";

interface menuLink {
  name: string;
  link: string;
}

const Sidebar: React.FC<{ menuLinks: menuLink[], submenuLinks: menuLink[] }> = ({ menuLinks, submenuLinks }) => {
  const pathname = usePathname();

  

  return (
    <div className="fixed top-0 left-0 h-full w-1/6 border-r bg-gray-100/40">
      <div className="flex flex-col h-full">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link
            className="flex items-center gap-1 font-semibold"
            href={menuLinks[0].link}
          >
            <span>EZRequirement</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <SideBarDropdown title="Control de versiones" links={submenuLinks} pathname={pathname} />
            {menuLinks.map((link) => (
              <Link
                key={link.name}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  pathname === link.link
                    ? "text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-gray-50"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                }`}
                href={link.link}
              >
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="border-t py-2">
          <div className="flex items-center justify-center h-12">
            <span className="text-gray-500">
              © {new Date().getFullYear()} EZRequirement
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
