import { ModeToggle } from "@/components/mode-toggle";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>
        <h1>My Application</h1>
        <ModeToggle toggle />
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; 2026 Employee Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};
export default Layout;
