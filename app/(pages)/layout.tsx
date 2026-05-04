import { ModeToggle } from "@/components/mode-toggle";
import NavigationMenu from "@/components/navigation-menu";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="flex items-center justify-between md:px-6 px-4 py-3 border-b bg-background z-10 shrink-0">
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

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-56 border-r bg-muted/40 flex flex-col p-4 shrink-0 hidden md:flex overflow-y-auto">
          <NavigationMenu />
        </aside>

        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto">{children}</main>
          <footer className="border-t px-6 py-3 text-center text-xs text-muted-foreground bg-background">
            &copy; 2026 Employee Management System. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;
