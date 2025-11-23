import { Header } from '../components/landing/Header';
import { Hero } from '../components/landing/Hero';
import { Services } from '../components/landing/Services';
import { About } from '../components/landing/About';
import { Contact } from '../components/landing/Contact';
import { Footer } from '../components/landing/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
