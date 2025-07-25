import Link from 'next/link';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <img 
                src="https://res.cloudinary.com/effichat/image/upload/v1753446475/yr4tun8huqhdedklgve0.png" 
                alt="Jessylilled Logo" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-gray-900">Jessylilled</span>
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-pink-600 transition-colors">
                Avaleht
              </Link>
              <Link href="/#lilled" className="text-gray-700 hover:text-pink-600 transition-colors">
                Lilled
              </Link>
              <Link href="/#meist" className="text-gray-700 hover:text-pink-600 transition-colors">
                Meist
              </Link>
              <Link href="/#kontakt" className="text-gray-700 hover:text-pink-600 transition-colors">
                Kontakt
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img 
                  src="https://res.cloudinary.com/effichat/image/upload/v1753446475/yr4tun8huqhdedklgve0.png" 
                  alt="Jessylilled Logo" 
                  className="h-8 w-auto"
                />
                <span className="text-xl font-bold">Jessylilled</span>
              </div>
              <p className="text-gray-400">
                Kaunid lilleseaded igaks eluhetkeks.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Kiirlingid</h3>
              <div className="space-y-2">
                <Link href="/" className="block text-gray-400 hover:text-white transition-colors">Avaleht</Link>
                <Link href="/#lilled" className="block text-gray-400 hover:text-white transition-colors">Lilled</Link>
                <Link href="/#meist" className="block text-gray-400 hover:text-white transition-colors">Meist</Link>
                <Link href="/#kontakt" className="block text-gray-400 hover:text-white transition-colors">Kontakt</Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Teenused & Info</h3>
              <div className="space-y-2">
                <Link href="/lillede-hooldamine" className="block text-gray-400 hover:text-white transition-colors">Lillede hooldamine</Link>
                {/* <Link href="/kuidas-osta" className="block text-gray-400 hover:text-white transition-colors">Kuidas osta</Link> */}
                {/* <Link href="/kattetoimetamine" className="block text-gray-400 hover:text-white transition-colors">Kättetoimetamine</Link> */}
                <Link href="/maksetingimused" className="block text-gray-400 hover:text-white transition-colors">Maksetingimused</Link>
                <Link href="/tagastamisoigus" className="block text-gray-400 hover:text-white transition-colors">Tagastamisõigus</Link>
                <Link href="/privaatsuseeskirjad" className="block text-gray-400 hover:text-white transition-colors">Privaatsuseeskirjad</Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Kontaktinfo</h3>
              <div className="space-y-2 text-gray-400">
                <p>Õismäe tee 107</p>
                <p>Tallinn, Eesti</p>
                <p>+372 5380 2101</p>
                <p>jessylilled107@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2025 Jessy OÜ. Kõik õigused kaitstud.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
