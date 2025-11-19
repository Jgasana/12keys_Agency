import { Header } from '../components/landing/Header';
import { Hero } from '../components/landing/Hero';
import { Services } from '../components/landing/Services';
import { About } from '../components/landing/About';
import { Contact } from '../components/landing/Contact';
import { Footer } from '../components/landing/Footer';
import { ChatwootWidget } from '../components/ChatwootWidget';

export function LandingPage() {
  const chatwootToken = import.meta.env.VITE_CHATWOOT_WEBSITE_TOKEN;
  const chatwootBaseUrl = import.meta.env.VITE_CHATWOOT_BASE_URL || 'https://app.chatwoot.com';

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
      {chatwootToken && (
        <ChatwootWidget
          websiteToken={chatwootToken}
          baseUrl={chatwootBaseUrl}
          position="right"
          locale="en"
        />
      )}
    </div>
  );
}
