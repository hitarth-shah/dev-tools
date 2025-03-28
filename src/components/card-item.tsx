"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpenText,
  Clock,
  Code,
  FileCode2,
  FileJson,
  Fingerprint,
  KeyRound,
  Regex,
  Timer,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";

interface CardItemProps {
  title: string;
  url: string;
  description: string;
  icon: string;
}

const iconMap: Record<string, LucideIcon> = {
  BookOpenText,
  Clock,
  Code,
  FileCode2,
  FileJson,
  Fingerprint,
  KeyRound,
  Regex,
  Timer,
};

export const CardItem = ({ title, url, description, icon }: CardItemProps) => {
  const router = useRouter();

  const handleClick = (url: string) => {
    router.push(url);
  };

  const Icon: LucideIcon = iconMap[icon];

  return (
    <Card
      className="flex items-center p-4 h-28 w-[500px] cursor-pointer transform transition-transform duration-300 hover:scale-105"
      onClick={() => handleClick(url)}
    >
      <div className="bg-sidebar-accent h-12 w-12 flex justify-center items-center rounded-lg">
        <Icon size={32} className="p-1" />
      </div>
      <CardHeader className="pl-4 py-2">
        <CardTitle className="flex gap-0.5 items-center">
          {title}
          <svg
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18px"
            height="18px"
          >
            <path
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M13 5h6v6m0-6L10 15"
            />
          </svg>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};
