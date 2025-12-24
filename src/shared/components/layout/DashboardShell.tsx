import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen p-4">
      {/* Top Navigation */}
      <Topbar />

      {/* Main content wrapper */}
      <div className="mt-4 flex gap-4">
        <Sidebar />
        <main className="w-full flex-1 min-h-screen">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
