import React, { useState } from "react";
import Link from "next/link";

interface menuLink {
    name: string;
    link: string;
}

interface DropdownProps {
  title: string;
  links: menuLink[];
  pathname: string; // Añadido pathname
}

const SideBarDropdown: React.FC<DropdownProps> = ({ title, links, pathname }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className={`flex items-center justify-between cursor-pointer px-3 py-2 transition-all ${
          isOpen 
            ? "text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-gray-50" 
            : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <span>{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && (
        <div className="ml-4">
          {links.map((link) => (
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
        </div>
      )}
    </div>
  );
};

export default SideBarDropdown;
