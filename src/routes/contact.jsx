import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { createCometAnimation } from '../utils/createCometAnimation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGithub, faInstagram, faLinkedin} from '@fortawesome/free-brands-svg-icons';

export const Route = createFileRoute('/contact')({
  component: Contact,
});

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    return createCometAnimation('cometCanvas');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          ...formData
        }).toString()
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: faGithub,
      url: 'https://github.com/diagnosis'
    },
    {
      name: 'LinkedIn',
      icon: faLinkedin,
      url: 'https://www.linkedin.com/in/safa-demirkan-94663b280/'
    },
    {
      name: 'Instagram',
      icon: faInstagram,
      url: 'https://www.instagram.com/serik_lee'
    }
  ];

  return (
    <section className="aurora-bg pt-16">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="bg-black/70 p-8 rounded-lg ring-1 ring-gray-900/5">
            <h2 className="text-4xl text-teal-100 mb-6 font-heading">Get in Touch</h2>
            <form 
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </p>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-teal-100 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-black/50 border border-teal-500/20 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-teal-100 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-black/50 border border-teal-500/20 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-teal-100 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 rounded-lg bg-black/50 border border-teal-500/20 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  placeholder="Your message..."
                />
              </div>
              <div className="space-y-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-800 via-purple-700 to-fuchsia-600 text-white font-medium hover:from-blue-900 hover:to-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform transition-all duration-200 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:scale-[1.02]'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                <div className="flex justify-center space-x-6">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-teal-100 hover:text-purple-300 transform hover:scale-110 transition-all duration-200"
                    >
                      <FontAwesomeIcon icon={link.icon} size="2x" />
                      <span className="sr-only">{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>
              {submitStatus === 'success' && (
                <p className="text-green-400 text-center">Message sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400 text-center">Failed to send message. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}