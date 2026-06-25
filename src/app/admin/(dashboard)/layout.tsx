import Sidebar from "@/components/admin/Sidebar";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto px-8 py-8 lg:px-12">{children}</main>
    </div>
  );
}
