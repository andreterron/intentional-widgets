import type { Route } from "./+types/home";
import type React from "react";

import { useLiveState, useModel } from "live-model";
import { Button } from "../components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";
import {
  MessageSquare,
  Settings,
  History,
  Plus,
  ArrowRightIcon,
} from "lucide-react";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import { Intention } from "../lib/data/intention";
import { useNavigate } from "react-router";

const sidebarItems = [
  {
    title: "New Session",
    icon: Plus,
    url: "#",
  },
  {
    title: "Recent Sessions",
    icon: History,
    url: "#",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "#",
  },
];

const recentSessions = [
  "Morning Reflection",
  "Goal Setting",
  "Weekly Review",
  "Creative Thinking",
  "Problem Solving",
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Intentional" },
    { name: "description", content: "Intentional" },
  ];
}

export default function Home() {
  const { value: input, setValue: setInput } = useLiveState("Draft", "");
  const { create: createIntention } = useModel<Intention>("Intentions");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = input.trim();
    if (title) {
      const intention = createIntention({
        title,
      }).get();

      if (!intention) {
        console.error("Failed to create intention");
        return;
      }
      console.log("Starting intentional session with:", title);
      navigate(`/intention/${intention.id}`);
      // Here you would handle the input submission
      setInput("");
    }
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full">
        <Sidebar collapsible="offcanvas" className="border-r">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <MessageSquare className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Intentional</span>
                    <span className="text-xs text-muted-foreground">
                      AI Assistant
                    </span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url} className="flex items-center gap-2">
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Recent Sessions</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {recentSessions.map((session) => (
                    <SidebarMenuItem key={session}>
                      <SidebarMenuButton asChild>
                        <a
                          href="#"
                          className="text-sm text-muted-foreground hover:text-foreground"
                        >
                          {session}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
          </header>

          <main className="flex flex-1 flex-col items-center justify-center p-8">
            <div className="w-full max-w-2xl space-y-8">
              <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-foreground">
                  What are we doing?
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="flex items-center gap-4">
                <div className="space-y-2 grow shrink">
                  <Input
                    placeholder="Type an intention…"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className={cn(
                      "text-lg md:text-base file:text-sm",
                      "px-4 py-2",
                      "h-auto",
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="grow-0 shrink-0"
                  disabled={!input.trim()}
                >
                  <ArrowRightIcon />
                </Button>
              </form>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
