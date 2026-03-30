import { motion } from 'motion/react';

export default function Privacy() {
  return (
    <div className="bg-background min-h-screen py-32 bg-grain">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-sm p-16 rounded-3xl shadow-sm border border-accent/10"
        >
          <h1 className="text-5xl font-serif font-bold text-primary mb-12">Privacy Policy</h1>
          
          <div className="space-y-10 text-gray-600 leading-relaxed font-light text-lg">
            <p className="italic">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section>
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">1. Information We Collect</h2>
              <p>We collect information that you provide directly to us when you use our services, including when you fill out a contact form, register for our client portal, or communicate with us. This may include your name, email address, phone number, and any other information you choose to provide.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-8 mt-4 space-y-3">
                <li>Provide, maintain, and improve our services</li>
                <li>Communicate with you about our services, including responding to your inquiries</li>
                <li>Comply with legal and regulatory obligations</li>
                <li>Protect against, identify, and prevent fraud and other illegal activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">3. Confidentiality of Financial Data</h2>
              <p>As a Chartered Accountancy firm, we adhere to strict professional ethics and confidentiality standards. All financial documents, tax records, and business information shared with us through the client portal or other means are treated with the highest level of confidentiality and are only accessible to authorized personnel directly involved in providing services to you.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">4. Data Security</h2>
              <p>We implement appropriate technical and organizational measures to protect the security of your personal information. Our client portal uses industry-standard encryption to ensure that your sensitive financial documents are protected during transmission and storage.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">5. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
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
