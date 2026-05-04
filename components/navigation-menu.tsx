"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  Settings,
  Menu,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface NavigationMenuProps {
  mobileView?: boolean;
}

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/employees", label: "Employees", icon: Users },
  { href: "/departments", label: "Departments", icon: Building2 },
  { href: "/settings", label: "Settings", icon: Settings },
];

const NavigationMenu = ({ mobileView }: NavigationMenuProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navMenu = () => {
    return (
      <>
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname === href
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
            onClick={() => setIsOpen(false)}
          >
            {label}
          </Link>
        ))}
      </>
    );
  };

  return (
    <>
      {mobileView ? (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger>
            <Menu className="w-6 h-6 md:hidden" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            {navMenu()}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex flex-col gap-1">{navMenu()}</div>
      )}
    </>
  );
};

export default NavigationMenu;
