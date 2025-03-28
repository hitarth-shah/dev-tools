"use client";

import {
  BookOpen,
  BookOpenText,
  Clock,
  Code,
  FileCode2,
  FileJson,
  Fingerprint,
  Home,
  KeyRound,
  Moon,
  Regex,
  Sun,
  Timer,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    isActive: true,
  },
  {
    title: "JSON Viewer",
    url: "/json",
    icon: FileJson,
  },
  {
    title: "JWT Decoder",
    url: "/jwt",
    icon: Fingerprint,
  },
  {
    title: "Text Compare",
    url: "/text-compare",
    icon: BookOpenText,
  },
  {
    title: "Cron Calculator",
    url: "/cron",
    icon: Clock,
  },
  {
    title: "Regex Generator",
    url: "/regex",
    icon: Regex,
  },
  {
    title: "UUID Generator",
    url: "/uuid",
    icon: KeyRound,
  },
  {
    title: "Playground",
    url: "/playground",
    icon: Code,
  },
  {
    title: "Timestamp",
    url: "/timestamp",
    icon: Timer,
  },
  {
    title: "Base64 Converter",
    url: "/base64",
    icon: FileCode2,
  },
  {
    title: "Markdown",
    url: "/markdown",
    icon: BookOpen,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { open } = useSidebar();

  const isItemActive = (itemUrl: string) => {
    if (itemUrl === "/" && pathname === "/") {
      return true;
    }

    if (itemUrl !== "/" && pathname && pathname.startsWith(itemUrl)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        {!open ? (
          <>
            <Image
              src="/logo.svg"
              alt="logo"
              className="pl-2 pt-1.5"
              width={36}
              height={36}
            />
          </>
        ) : (
          <p className="text-[24px] pl-2 text-black dark:text-white font-semibold">
            DevTools
          </p>
        )}
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarMenu className="gap-2 px-2 pt-2">
          {items.map((item) => (
            <SidebarMenuItem
              key={item.title}
              className="cursor-pointer hover:font-[500]"
            >
              <Link href={item.url} passHref>
                <SidebarMenuButton
                  asChild
                  isActive={isItemActive(item.url)}
                  className="gap-1.5 py-2 px-2 text-muted-foreground"
                  tooltip={item.title}
                >
                  <div>
                    <div className="w-6 h-6" role="icon">
                      <item.icon />
                    </div>
                    {open && (
                      <span className="text-[14px] font-medium">
                        {item.title}
                      </span>
                    )}
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t px-3 py-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="relative h-8 w-8 hover:bg-sidebar-accent"
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          <Sun
            className={`h-6 w-6 absolute transition-all ${
              isDarkMode ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          />
          <Moon
            className={`h-6 w-6 absolute transition-all ${
              isDarkMode ? "scale-0 opacity-0" : "scale-100 opacity-100"
            }`}
          />
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
