import { motion } from 'motion/react';

export default function Terms() {
  return (
    <div className="bg-background min-h-screen py-32 bg-grain">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-sm p-16 rounded-3xl shadow-sm border border-accent/10"
        >
          <h1 className="text-5xl font-serif font-bold text-primary mb-12">Terms of Service</h1>
          
          <div className="space-y-10 text-gray-600 leading-relaxed font-light text-lg">
            <p className="italic">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section>
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">1. Acceptance of Terms</h2>
              <p>By accessing or using the website and services provided by Kamal Batra & Associates, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">2. Description of Services & No Professional Advice</h2>
              <p>Kamal Batra & Associates provides professional accounting, tax, audit, and corporate advisory services. The information provided on this website is for general informational purposes only and does not constitute professional advice. Transmission, receipt, or use of this site does not create a Chartered Accountant-Client relationship.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">3. Formal Engagement</h2>
              <p>A formal professional relationship is only established once a written engagement letter has been signed by both the client and a partner of Kamal Batra & Associates. Until such an agreement is in place, any information shared with us is for preliminary assessment purposes only.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">4. User Responsibilities</h2>
              <p>When using our services or client portal, you agree to:</p>
              <ul className="list-disc pl-8 mt-4 space-y-3">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Promptly update any information you provide to us</li>
                <li>Accept responsibility for all activities that occur under your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">4. Limitation of Liability</h2>
              <p>To the fullest extent permitted by applicable law, Kamal Batra & Associates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your access to or use of our services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">5. Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us at:</p>
              <div className="mt-6 p-8 bg-paper rounded-2xl border border-accent/10">
                <p className="font-serif font-bold text-primary mb-2">Kamal Batra & Associates</p>
                <p><strong>Email:</strong> cakamalbatra@gmail.com</p>
                <p><strong>Phone:</strong> +91 99152 16636</p>
                <p><strong>Address:</strong> House No 3355, Top Floor, Sector 37-D, Chandigarh, India 160036</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
