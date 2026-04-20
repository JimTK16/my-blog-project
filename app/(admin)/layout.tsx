export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='admin-container'>
      {/* This is where your Sidebar or Admin Nav would go later */}
      <nav className='p-4 bg-gray-100 border-b'>
        <span className='font-bold'>Admin Dashboard</span>
      </nav>

      <main>{children}</main>
    </div>
  )
}
