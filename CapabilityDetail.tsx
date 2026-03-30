import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Lock, LogIn, Upload, FileText, LogOut, CheckCircle2 } from 'lucide-react';
import { auth, db, signInWithPopup, googleProvider, signOut, collection, addDoc, query, where, onSnapshot, orderBy, doc, getDoc, setDoc } from '../firebase';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

export default function Portal() {
  const [user, setUser] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        // Ensure user exists in Firestore
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            name: user.displayName || 'Client',
            role: 'client',
            createdAt: new Date().toISOString()
          });
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    
    const q = query(
      collection(db, 'documents'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDocuments(docsData);
    });
    
    return () => unsubscribe();
  }, [user]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
        // User closed the popup, ignore the error
        return;
      }
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setIsUploading(true);
    setUploadStatus('idle');

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        const mimeType = file.type;

        // Analyze with Gemini
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
        const response = await ai.models.generateContent({
          model: 'gemini-3.1-pro-preview',
          contents: {
            parts: [
              {
                inlineData: {
                  data: base64Data,
                  mimeType: mimeType,
                },
              },
              {
                text: 'Analyze this financial document (invoice, receipt, or tax form). Extract key information such as Date, Total Amount, Vendor/Client Name, and a brief summary of what it is. Format the output clearly.',
              },
            ],
          },
          config: {
            thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH }
          }
        });

        const analysisResult = response.text;

        // Save to Firestore
        await addDoc(collection(db, 'documents'), {
          userId: user.uid,
          title: file.name,
          analysisResult: analysisResult,
          createdAt: new Date().toISOString()
        });

        setIsUploading(false);
        setUploadStatus('success');
        setTimeout(() => setUploadStatus('idle'), 3000);
      };
    } catch (error) {
      console.error('Upload error:', error);
      setIsUploading(false);
      setUploadStatus('error');
    }
  };

  if (!user) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center py-32 px-4 bg-grain">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/80 backdrop-blur-sm p-16 rounded-[3rem] shadow-2xl border border-accent/10 max-w-xl w-full text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-accent" />
        <div className="w-24 h-24 bg-primary/5 rounded-3xl flex items-center justify-center text-accent mx-auto mb-10 shadow-inner">
          <Lock className="w-10 h-10" />
        </div>
        <span className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Secure Access</span>
        <h1 className="text-5xl font-serif font-bold text-primary mb-4 leading-tight">Client Portal</h1>
        <p className="text-gray-500 mb-12 font-light italic text-lg leading-relaxed">Secure access to your financial documents and AI analysis tools.</p>
        
        <button 
          onClick={handleLogin}
          className="w-full bg-primary text-white font-bold text-xs uppercase tracking-[0.3em] px-8 py-6 rounded-2xl hover:bg-accent hover:text-primary transition-all flex items-center justify-center shadow-xl shadow-primary/10 group"
        >
          <LogIn className="w-5 h-5 mr-4 group-hover:translate-x-1 transition-transform" /> Sign in with Google
        </button>
        
        <p className="text-[10px] text-gray-400 mt-10 uppercase tracking-widest font-bold">
          By signing in, you agree to our <Link to="/terms" className="text-accent hover:underline">Terms</Link> and <Link to="/privacy" className="text-accent hover:underline">Privacy</Link>.
        </p>
      </motion.div>
    </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-32 bg-grain">
      {/* Dashboard Header */}
      <div className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B68D40_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center relative z-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <span className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Client Dashboard</span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 leading-tight">Welcome, <span className="italic text-accent">{user.displayName}</span></h1>
            <p className="text-gray-400 font-light italic text-lg">Manage your documents and view AI insights.</p>
          </motion.div>
          <button 
            onClick={handleLogout}
            className="mt-8 md:mt-0 bg-white/5 text-white border border-white/10 font-bold text-[10px] uppercase tracking-[0.2em] px-8 py-4 rounded-2xl hover:bg-accent hover:text-primary transition-all flex items-center shadow-lg"
          >
            <LogOut className="w-4 h-4 mr-3" /> Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Upload Section */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-sm p-10 rounded-[2.5rem] shadow-sm border border-accent/10 sticky top-28">
            <h2 className="text-2xl font-serif font-bold text-primary mb-6">Upload Document</h2>
            <p className="text-sm text-gray-500 mb-8 font-light leading-relaxed">
              Upload an invoice, receipt, or tax document. Our AI will automatically analyze it and extract key financial data.
            </p>
            
            <div className="border-2 border-dashed border-accent/20 rounded-3xl p-12 text-center hover:border-accent transition-all relative group bg-paper/30">
              <input 
                type="file" 
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-accent mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8" />
              </div>
              <p className="text-xs font-bold text-primary mb-2 uppercase tracking-widest">
                {isUploading ? 'Analyzing...' : 'Drop file here'}
              </p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">JPG, PNG, PDF</p>
            </div>

            {uploadStatus === 'success' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-green-50 text-green-700 rounded-2xl text-[11px] font-bold uppercase tracking-widest flex items-center border border-green-100">
                <CheckCircle2 className="w-4 h-4 mr-3" /> Analysis Complete
              </motion.div>
            )}
            {uploadStatus === 'error' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-red-50 text-red-700 rounded-2xl text-[11px] font-bold uppercase tracking-widest border border-red-100">
                Error analyzing document.
              </motion.div>
            )}
          </div>
        </div>

        {/* Documents List */}
        <div className="lg:col-span-2 space-y-10">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-serif font-bold text-primary">Your Documents</h2>
            <span className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">{documents.length} Items</span>
          </div>
          
          {documents.length === 0 ? (
            <div className="bg-white/50 backdrop-blur-sm p-20 rounded-[3rem] border border-dashed border-accent/20 text-center">
              <div className="w-20 h-20 bg-paper rounded-3xl flex items-center justify-center text-accent mx-auto mb-8">
                <FileText className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-3">No documents yet</h3>
              <p className="text-gray-500 font-light italic">Upload your first document to see AI analysis here.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {documents.map((doc, idx) => (
                <motion.div 
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm p-10 rounded-[2.5rem] shadow-sm border border-accent/10 group hover:shadow-xl transition-all duration-500"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center">
                      <div className="w-14 h-14 bg-paper rounded-2xl flex items-center justify-center text-primary mr-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif font-bold text-primary mb-1">{doc.title}</h3>
                        <p className="text-[10px] text-accent font-bold uppercase tracking-widest">{new Date(doc.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-paper/30 p-8 rounded-3xl border border-accent/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full -mr-12 -mt-12" />
                    <h4 className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-6 flex items-center">
                      <span className="w-8 h-px bg-accent/30 mr-4"></span> AI Insights
                    </h4>
                    <div className="text-sm text-gray-700 whitespace-pre-wrap font-light leading-relaxed">
                      {doc.analysisResult}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
