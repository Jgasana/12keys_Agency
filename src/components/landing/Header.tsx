import { Menu, X, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-light tracking-widest uppercase text-[#8e6d46]">
              12 Keys Agency
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm uppercase tracking-wider font-light text-gray-700 hover:text-[#8e6d46] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#8e6d46] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-light">Call Us</span>
            </a>
            <a
              href="mailto:info@12keys.agency"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#8e6d46] transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="font-light">Email</span>
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-[#8e6d46] transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-sm uppercase tracking-wider font-light text-gray-700 hover:text-[#8e6d46] transition-colors py-2"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#8e6d46] transition-colors py-2"
              >
                <Phone className="w-4 h-4" />
                <span className="font-light">Call Us</span>
              </a>
              <a
                href="mailto:info@12keys.agency"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#8e6d46] transition-colors py-2"
              >
                <Mail className="w-4 h-4" />
                <span className="font-light">Email</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
