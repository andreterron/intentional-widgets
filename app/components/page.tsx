import { PropsWithChildren } from "react";
import { cn } from "../lib/utils";
import { SidebarTrigger } from "./ui/sidebar";

export interface PageProps {
  className?: string;
  navbar?: React.ReactNode;
}

export default function Page({
  navbar,
  children,
  className,
}: PropsWithChildren<PageProps>) {
  return (
    <div className={cn("min-h-screen w-full bg-white", className)}>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1"></div>
        {navbar}
      </header>
      {children}
    </div>
  );
}
