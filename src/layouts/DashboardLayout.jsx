import Sidebar from "../components/layout/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F6F7FC] flex">

      <Sidebar />

      <main className="flex-1 overflow-y-auto p-5 sm:p-8">

        {children}

      </main>

    </div>
  );
}
