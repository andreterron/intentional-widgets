import { useLiveState, useModel } from "live-model";
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
import { Link, Outlet } from "react-router";
import { MessageSquare, Plus } from "lucide-react";
import { Intention } from "../lib/data/intention";

const sidebarItems = [
  {
    title: "New Session",
    icon: Plus,
    url: "/",
  },
  // {
  //   title: "Recent Sessions",
  //   icon: History,
  //   url: "#",
  // },
  // {
  //   title: "Settings",
  //   icon: Settings,
  //   url: "#",
  // },
];

export default function Layout() {
  const { items: intentions } = useModel(Intention.key);
  const { value: navbarOpen, setValue: setNavbarOpen } = useLiveState(
    "navbar-open",
    false,
  );

  return (
    <SidebarProvider
      defaultOpen={false}
      open={navbarOpen}
      onOpenChange={(open) => setNavbarOpen(open)}
    >
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
                        <Link to={item.url} className="flex items-center gap-2">
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </Link>
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
                  {intentions.map((intention) => (
                    <SidebarMenuItem key={intention.id}>
                      <SidebarMenuButton
                        className="text-sm text-muted-foreground hover:text-foreground truncate"
                        asChild
                      >
                        <Link
                          to={`/intention/${intention.id}`}
                          title={intention.title}
                        >
                          <span>{intention.title}</span>
                        </Link>
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
          <Outlet />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
