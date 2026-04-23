import Footer from '@/components/public/Footer'
import Header from '@/components/public/Header'

export default function PublicLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='min-h-screen flex flex-col bg-white text-gray-900 selection:bg-blue-100 selection:text-blue-900 font-sans'>
      <Header />

      <main className='grow pt-32'>{children}</main>

      <Footer />
    </div>
  )
}
