import { ModeToggle } from "@/components/mode-toggle";
import NavigationMenu from "@/components/navigation-menu";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-6 py-3 border-b bg-background z-10">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-lg tracking-tight">
            Employee Management
          </span>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle toggle />
          <NavigationMenu mobileView />
        </div>
      </header>

      <div className="flex flex-1 ">
        <aside className="w-56 border-r bg-muted/40 flex flex-col p-4 shrink-0 hidden md:flex">
          <NavigationMenu />
        </aside>

        <div className="flex flex-col flex-1">
          <main className="flex-1 p-6">{children}</main>
          <footer className="border-t px-6 py-3 text-center text-xs text-muted-foreground bg-background">
            &copy; 2026 Employee Management System. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;
