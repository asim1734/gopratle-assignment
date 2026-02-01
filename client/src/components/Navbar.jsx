import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-black sticky top-0 z-50">
      {/* Container: max-w-5xl matches the form width below. 
         mx-auto centers it. 
      */}
      <div className="max-w-5xl mx-auto px-6 py-6 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-3xl font-serif font-black tracking-widest text-black uppercase">
            GoPratle
          </span>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-10 text-xs font-bold tracking-[0.2em] uppercase">
          <Link href="#" className="text-black hover:text-amber-600 transition-colors">
            Portfolio
          </Link>
          <Link href="#" className="text-black hover:text-amber-600 transition-colors">
            Services
          </Link>
          
          {/* Solid Black Button for "Lux" feel */}
          <Link 
              href="#" 
              className="bg-black text-white px-8 py-3 hover:bg-amber-700 transition-all duration-300"
          >
            Book Talent
          </Link>
        </div>
      </div>
    </nav>
  );
}