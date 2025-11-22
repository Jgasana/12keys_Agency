import { useState } from 'react';
import { Send } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { sendToWebhook } from '../../api/contact-webhook';

interface ServiceContactFormProps {
  serviceName?: string;
  onSubmit?: (data: FormData) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  serviceType: string;
  countryCode: string;
  phoneNumber: string;
  message: string;
  serviceName: string;
}

export function ServiceContactForm({ serviceName = '', onSubmit }: ServiceContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    serviceType: '',
    countryCode: '',
    phoneNumber: '',
    message: '',
    serviceName,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const fullPhone = `${formData.countryCode}${formData.phoneNumber}`.trim();

      const { error } = await supabase
        .from('service_requests')
        .insert([
          {
            name: fullName,
            email: formData.email,
            phone: fullPhone,
            service_type: formData.serviceName,
            message: formData.message,
            status: 'pending',
          },
        ]);

      if (error) throw error;

      await sendToWebhook({
        name: fullName,
        email: formData.email,
        phone: fullPhone,
        message: formData.message,
        serviceName: formData.serviceName,
        subject: formData.serviceType,
      });

      if (onSubmit) {
        onSubmit(formData);
      }

      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        serviceType: '',
        countryCode: '',
        phoneNumber: '',
        message: '',
        serviceName,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-light tracking-wide uppercase text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="e.g., John"
            className="w-full px-4 py-3 border border-gray-300 focus:border-[#8e6d46] focus:outline-none transition-colors bg-white"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-light tracking-wide uppercase text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            placeholder="e.g., Mugabo"
            className="w-full px-4 py-3 border border-gray-300 focus:border-[#8e6d46] focus:outline-none transition-colors bg-white"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-light tracking-wide uppercase text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="e.g., john@example.com"
          className="w-full px-4 py-3 border border-gray-300 focus:border-[#8e6d46] focus:outline-none transition-colors bg-white"
        />
      </div>

      <div>
        <label htmlFor="serviceType" className="block text-sm font-light tracking-wide uppercase text-gray-700 mb-2">
          Service Type
        </label>
        <input
          type="text"
          id="serviceType"
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          required
          placeholder="e.g., Private Events, Corporate Functions"
          className="w-full px-4 py-3 border border-gray-300 focus:border-[#8e6d46] focus:outline-none transition-colors bg-white"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="countryCode" className="block text-sm font-light tracking-wide uppercase text-gray-700 mb-2">
            Country Code
          </label>
          <input
            type="text"
            id="countryCode"
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            placeholder="+250"
            className="w-full px-4 py-3 border border-gray-300 focus:border-[#8e6d46] focus:outline-none transition-colors bg-white"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="phoneNumber" className="block text-sm font-light tracking-wide uppercase text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="e.g., 788123456"
            className="w-full px-4 py-3 border border-gray-300 focus:border-[#8e6d46] focus:outline-none transition-colors bg-white"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-light tracking-wide uppercase text-gray-700 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Write your message here…"
          className="w-full px-4 py-3 border border-gray-300 focus:border-[#8e6d46] focus:outline-none transition-colors bg-white resize-none"
        />
      </div>

      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-sm">
          Thank you for your inquiry. We will be in touch soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm">
          Something went wrong. Please try again later.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#8e6d46] hover:bg-[#a2886a] text-white py-3 px-6 uppercase tracking-wider text-sm font-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          'Sending...'
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
