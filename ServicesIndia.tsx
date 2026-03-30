import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

type FormData = {
  name: string;
  email: string;
  serviceInterest: string;
  message: string;
  date?: string;
  time?: string;
};

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formType, setFormType] = useState<'inquiry' | 'appointment'>('inquiry');

  const onSubmit = async (data: FormData) => {
    try {
      setSubmitStatus('idle');
      await addDoc(collection(db, 'leads'), {
        ...data,
        status: 'new',
        createdAt: new Date().toISOString()
      });
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="bg-background min-h-screen bg-grain">
      {/* Header */}
      <div className="bg-primary text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B68D40_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent text-[10px] font-bold tracking-[0.3em] uppercase rounded-full mb-8 border border-accent/30">
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-8xl font-serif font-bold mb-8 leading-tight">Contact Us</h1>
            <p className="text-xl text-gray-300 max-w-2xl font-light leading-relaxed italic">
              Get in touch with our experts to discuss your financial, tax, or corporate advisory needs. We are here to help you achieve complete financial clarity.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-stretch">
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col h-full"
          >
            <h2 className="text-4xl font-serif font-bold text-primary mb-12">Office Information</h2>
            <div className="space-y-12 flex-grow">
              <div className="flex items-start group">
                <div className="w-14 h-14 bg-paper rounded-2xl flex items-center justify-center text-accent mr-8 flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">Office Location</h3>
                  <p className="text-gray-600 leading-relaxed font-light text-lg">
                    3355, Top Floor, Sector 37-D<br />
                    Chandigarh, India 160036
                  </p>
                </div>
              </div>
              <div className="flex items-start group">
                <div className="w-14 h-14 bg-paper rounded-2xl flex items-center justify-center text-accent mr-8 flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">Phone</h3>
                  <p className="text-gray-600 leading-relaxed font-light text-lg">
                    +91 99152 16636<br />
                    +91 98156 26653
                  </p>
                </div>
              </div>
              <div className="flex items-start group">
                <div className="w-14 h-14 bg-paper rounded-2xl flex items-center justify-center text-accent mr-8 flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">Email</h3>
                  <p className="text-gray-600 leading-relaxed font-light text-lg">
                    kamalbatra244@gmail.com<br />
                    cakamalbatra@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex items-start group">
                <div className="w-14 h-14 bg-paper rounded-2xl flex items-center justify-center text-accent mr-8 flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">Business Hours</h3>
                  <p className="text-gray-600 leading-relaxed font-light text-lg">
                    Monday - Friday: 9:30 AM - 6:30 PM<br />
                    Saturday: 10:00 AM - 2:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/80 backdrop-blur-sm p-12 rounded-3xl shadow-sm border border-accent/10 hover:shadow-2xl transition-all duration-700 flex flex-col h-full"
          >
            <div className="flex space-x-4 mb-8">
              <button
                onClick={() => setFormType('inquiry')}
                className={`flex-1 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all ${
                  formType === 'inquiry' ? 'bg-primary text-white shadow-md' : 'bg-paper text-gray-500 hover:bg-paper/80'
                }`}
              >
                General Inquiry
              </button>
              <button
                onClick={() => setFormType('appointment')}
                className={`flex-1 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all ${
                  formType === 'appointment' ? 'bg-primary text-white shadow-md' : 'bg-paper text-gray-500 hover:bg-paper/80'
                }`}
              >
                Book Appointment
              </button>
            </div>

            <h2 className="text-3xl font-serif font-bold text-primary mb-8">
              {formType === 'inquiry' ? 'Send an Inquiry' : 'Schedule a Consultation'}
            </h2>
            {submitStatus === 'success' && (
              <div className="bg-green-50 text-green-800 p-6 rounded-2xl mb-8 border border-green-100 font-light italic">
                Thank you for reaching out. We have received your inquiry and will contact you shortly.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="bg-red-50 text-red-800 p-6 rounded-2xl mb-8 border border-red-100 font-light italic">
                There was an error submitting your inquiry. Please try again or contact us directly via email or phone.
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 flex flex-col flex-grow">
              <div className="space-y-8 flex-grow">
                <div>
                  <label htmlFor="name" className="block text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-3">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full bg-paper border border-accent/10 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-light"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-widest">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-3">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                    })}
                    className="w-full bg-paper border border-accent/10 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-light"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-widest">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="serviceInterest" className="block text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-3">Service of Interest</label>
                  <select
                    id="serviceInterest"
                    {...register('serviceInterest', { required: 'Please select a service' })}
                    className="w-full bg-paper border border-accent/10 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-light appearance-none"
                  >
                    <option value="">Select a service...</option>
                    <option value="Indian GST">Indian GST & Taxation</option>
                    <option value="Audit">Statutory & Internal Audit</option>
                    <option value="Corporate Advisory">Corporate Advisory & Incorporation</option>
                    <option value="International Bookkeeping">International Bookkeeping (UK/Canada)</option>
                    <option value="Payroll">International Payroll</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.serviceInterest && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-widest">{errors.serviceInterest.message}</p>}
                </div>

                {formType === 'appointment' && (
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="date" className="block text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-3">Preferred Date</label>
                      <input
                        type="date"
                        id="date"
                        {...register('date', { required: 'Date is required for appointments' })}
                        className="w-full bg-paper border border-accent/10 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-light"
                      />
                      {errors.date && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-widest">{errors.date.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-3">Preferred Time</label>
                      <select
                        id="time"
                        {...register('time', { required: 'Time is required for appointments' })}
                        className="w-full bg-paper border border-accent/10 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-light appearance-none"
                      >
                        <option value="">Select time...</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:30 AM">11:30 AM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="04:00 PM">04:00 PM</option>
                      </select>
                      {errors.time && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-widest">{errors.time.message}</p>}
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="message" className="block text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-3">
                    {formType === 'inquiry' ? 'Message' : 'Additional Details'}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register('message', { required: 'Message is required' })}
                    className="w-full bg-paper border border-accent/10 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-light resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-widest">{errors.message.message}</p>}
                </div>
              </div>

              <div className="mt-auto space-y-8">
                <div className="flex items-start space-x-4 p-6 bg-paper rounded-2xl border border-accent/10">
                  <input
                    type="checkbox"
                    id="disclaimer"
                    required
                    className="mt-1 w-4 h-4 rounded border-accent/20 text-accent focus:ring-accent/20"
                  />
                  <label htmlFor="disclaimer" className="text-[10px] text-gray-500 font-light leading-relaxed uppercase tracking-widest">
                    I understand that this inquiry does not create a professional-client relationship and that Kamal Batra & Associates will use my information solely to respond to this request in accordance with their <Link to="/privacy" className="text-accent hover:underline">Privacy Policy</Link>.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white font-bold text-[11px] uppercase tracking-[0.3em] px-8 py-5 rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center disabled:opacity-70 shadow-lg"
                >
                  {isSubmitting ? 'Processing...' : (
                    <>{formType === 'inquiry' ? 'Send Message' : 'Request Appointment'} <Send className="ml-3 w-5 h-5" /></>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Map */}
      <div className="h-96 w-full bg-gray-200">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3429.987654321098!2d76.7456789!3d30.7345678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed123456789%3A0x123456789abcdef!2s3355%2C%20Sector%2037-D%2C%20Chandigarh%2C%20160036!5e0!3m2!1sen!2sin!4v1683100000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location"
        ></iframe>
      </div>
    </div>
  );
}
