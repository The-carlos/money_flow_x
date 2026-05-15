export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full">
      <aside className="w-64 border-r border-gray-200 bg-gray-50 p-4">
        <nav className="space-y-2">
          <h2 className="text-lg font-semibold">Money Flow X</h2>
          {/* Sidebar navigation — to be built with components/layout/Sidebar */}
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
