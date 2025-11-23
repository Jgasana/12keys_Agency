import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  const quickLinks = [
    { label: 'Home', href: '#' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#212121] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-light tracking-widest uppercase mb-6 text-[#a2886a]">
              12 Keys Agency
            </h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Your trusted partner for exceptional concierge services.
            </p>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-wider font-light mb-6 text-[#a2886a]">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#a2886a] font-light transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-wider font-light mb-6 text-[#a2886a]">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 font-light">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>+250 788863209</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 font-light">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>info@12keys.agency</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 font-light">
                <Chat className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Telegram Chat:<br />Twelvekeys_bot</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-wider font-light mb-6 text-[#a2886a]">
              Follow Us
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-[#a2886a] transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 font-light text-sm">
            &copy; {currentYear} 12 Keys Agency. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
