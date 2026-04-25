import Footer from '@/components/public/Footer'
import Header from '@/components/public/Header'

export default function PublicLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='min-h-screen flex flex-col bg-soil-50 text-soil-900'>
      <Header />

      <main className='grow pt-32'>{children}</main>

      <Footer />
    </div>
  )
}
