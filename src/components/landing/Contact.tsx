import { ServiceContactForm } from '../forms/ServiceContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Contact() {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      content: 'KK 20 Avenue, Kigali Rwanda',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (234) 567-8900',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@12keys.com',
    },
    {
      icon: Clock,
      title: 'Hours',
      content: 'Available 24/7',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-widest uppercase text-gray-800 mb-4">
            Get in Touch
          </h2>
          <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto">
            Ready to plan your next event? Contact us today to discuss how we can bring your vision to life
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div key={info.title} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-[#8e6d46]/10">
                      <Icon className="w-6 h-6 text-[#8e6d46]" />
                    </div>
                    <div>
                      <h3 className="text-sm uppercase tracking-wider font-light text-gray-800 mb-1">
                        {info.title}
                      </h3>
                      <p className="text-gray-600 font-light">
                        {info.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="aspect-[16/9] overflow-hidden bg-gray-200">
              <img
                src="https://images.pexels.com/photos/2144326/pexels-photo-2144326.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Luxury location"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="bg-[#f3f3f3] p-8">
            <h3 className="text-2xl font-light tracking-wider uppercase text-gray-800 mb-6">
              Send us a Message
            </h3>
            <ServiceContactForm
              serviceName="General Inquiry"
              onSubmit={(data) => console.log('Contact form submitted:', data)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
