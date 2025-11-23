import { ChevronDown } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-widest uppercase text-white mb-6 animate-fade-in">
          Luxury Concierge
        </h1>
        <p className="text-xl md:text-2xl font-light text-white/90 tracking-wide mb-8 animate-fade-in-delay">
          Exceptional service and bespoke experiences in Rwanda
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay-2">
          <a
            href="#services"
            className="px-8 py-4 bg-[#8e6d46] hover:bg-[#a2886a] text-white uppercase tracking-wider text-sm font-light transition-all hover:shadow-lg"
          >
            Explore Services
          </a>
          <a
            href="#contact"
            className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#8e6d46] uppercase tracking-wider text-sm font-light transition-all"
          >
            Get in Touch
          </a>
        </div>
      </div>

      <a
        href="#services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white hover:text-[#a2886a] transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-8 h-8" />
      </a>
    </section>
  );
}
