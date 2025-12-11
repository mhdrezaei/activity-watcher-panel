import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background p-4">
      {/* Top Navigation */}
      <Topbar />

      {/* Main content wrapper */}
      <div className="mt-4 flex gap-4">
        <Sidebar />
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}
