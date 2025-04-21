import React from "react";

// TODO: Replace with actual shared layout components (Sidebar, Header, etc.)
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Replace with actual Sidebar component */}
      <aside className="w-64 bg-gray-100 p-4">
        <p>Sidebar Placeholder</p>
        {/* Add navigation links here */}
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        {/* Replace with actual Header/Workspace components if needed */}
        {children}
      </main>
    </div>
  );
}
