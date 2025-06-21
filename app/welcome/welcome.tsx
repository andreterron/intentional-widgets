"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
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
import { MessageSquare, Settings, History, Plus } from "lucide-react";

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

export default function Welcome() {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      console.log("Starting intentional session with:", input);
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
                <h1 className="text-6xl font-bold tracking-tight text-foreground">
                  Intentional
                </h1>
                <p className="text-lg text-muted-foreground">
                  Start your intentional journey with a single thought
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Textarea
                    placeholder="What would you like to be intentional about today?"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[120px] resize-none text-base"
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={!input.trim()}
                >
                  Begin Intentional Session
                </Button>
              </form>

              <div className="text-center text-sm text-muted-foreground">
                <p>Press Enter to submit, or click the button above</p>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
