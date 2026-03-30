import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Users, Image as ImageIcon, LogOut, CheckCircle2, Loader2, FileText, Plus, LayoutTemplate, Trash2, Edit2 } from 'lucide-react';
import { auth, db, signOut, collection, query, onSnapshot, orderBy, addDoc, doc, getDoc, signInWithEmailAndPassword, updateDoc, deleteDoc } from '../firebase';
import { GoogleGenAI } from '@google/genai';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [leads, setLeads] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [heroSlides, setHeroSlides] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'leads' | 'marketing' | 'blog' | 'hero'>('leads');
  
  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Image Generation State
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16'>('16:9');

  // Blog State
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  // Hero Slide State
  const [slideTitle, setSlideTitle] = useState('');
  const [slideSubtitle, setSlideSubtitle] = useState('');
  const [slideDescription, setSlideDescription] = useState('');
  const [slideImageUrl, setSlideImageUrl] = useState('');
  const [slideLink, setSlideLink] = useState('');
  const [slideLinkText, setSlideLinkText] = useState('');
  const [slideOrder, setSlideOrder] = useState(0);
  const [isSavingSlide, setIsSavingSlide] = useState(false);
  const [editingSlideId, setEditingSlideId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists() && userDoc.data().role === 'admin') {
            setIsAdmin(true);
          } else if (user.email === 'harshluthra420@gmail.com') {
            // Fallback for the default admin
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setIsLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    
    const leadsQuery = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    const unsubscribeLeads = onSnapshot(leadsQuery, (snapshot) => {
      const leadsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLeads(leadsData);
    });

    const postsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribePosts = onSnapshot(postsQuery, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
    });
    
    const slidesQuery = query(collection(db, 'heroSlides'), orderBy('order', 'asc'));
    const unsubscribeSlides = onSnapshot(slidesQuery, (snapshot) => {
      const slidesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHeroSlides(slidesData);
    });

    return () => {
      unsubscribeLeads();
      unsubscribePosts();
      unsubscribeSlides();
    };
  }, [isAdmin]);

  const handleUpdateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'leads', leadId), {
        status: newStatus
      });
    } catch (error) {
      console.error('Error updating lead status:', error);
      alert('Failed to update lead status.');
    }
  };

  const handleSaveSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slideTitle.trim() || !slideImageUrl.trim() || !isAdmin) return;
    
    setIsSavingSlide(true);
    try {
      const slideData = {
        title: slideTitle,
        subtitle: slideSubtitle,
        description: slideDescription,
        imageUrl: slideImageUrl,
        link: slideLink,
        linkText: slideLinkText,
        order: Number(slideOrder),
        createdAt: new Date().toISOString()
      };

      if (editingSlideId) {
        await updateDoc(doc(db, 'heroSlides', editingSlideId), slideData);
        alert('Slide updated successfully!');
      } else {
        await addDoc(collection(db, 'heroSlides'), slideData);
        alert('Slide created successfully!');
      }
      
      // Reset form
      setSlideTitle('');
      setSlideSubtitle('');
      setSlideDescription('');
      setSlideImageUrl('');
      setSlideLink('');
      setSlideLinkText('');
      setSlideOrder(0);
      setEditingSlideId(null);
    } catch (error) {
      console.error('Error saving slide:', error);
      alert('Failed to save slide.');
    } finally {
      setIsSavingSlide(false);
    }
  };

  const handleEditSlide = (slide: any) => {
    setSlideTitle(slide.title);
    setSlideSubtitle(slide.subtitle);
    setSlideDescription(slide.description);
    setSlideImageUrl(slide.imageUrl);
    setSlideLink(slide.link);
    setSlideLinkText(slide.linkText);
    setSlideOrder(slide.order || 0);
    setEditingSlideId(slide.id);
    setActiveTab('hero');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteSlide = async (slideId: string) => {
    if (!window.confirm('Are you sure you want to delete this slide?')) return;
    try {
      await deleteDoc(doc(db, 'heroSlides', slideId));
    } catch (error) {
      console.error('Error deleting slide:', error);
      alert('Failed to delete slide.');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error('Login error:', error);
      setLoginError('Invalid email or password. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle.trim() || !blogContent.trim() || !isAdmin) return;
    
    setIsPosting(true);
    try {
      await addDoc(collection(db, 'posts'), {
        title: blogTitle,
        content: blogContent,
        authorId: user.uid,
        authorName: user.displayName || user.email,
        createdAt: new Date().toISOString()
      });
      setBlogTitle('');
      setBlogContent('');
      alert('Blog post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post.');
    } finally {
      setIsPosting(false);
    }
  };

  const handleGenerateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !isAdmin) return;

    // Check for API key selection
    if ((window as any).aistudio && !(await (window as any).aistudio.hasSelectedApiKey())) {
      try {
        await (window as any).aistudio.openSelectKey();
      } catch (err) {
        console.error('Failed to select API key:', err);
        alert('You must select an API key from a paid Google Cloud project to generate images.');
        return;
      }
    }

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      // Create a new GoogleGenAI instance right before making an API call
      // to ensure it always uses the most up-to-date API key from the dialog.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || process.env.GEMINI_API_KEY as string });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio,
            imageSize: imageSize
          }
        }
      });

      // Find the image part
      let base64Image = null;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          base64Image = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (base64Image) {
        setGeneratedImage(base64Image);
        
        // Save to Firestore
        await addDoc(collection(db, 'marketingAssets'), {
          adminId: user.uid,
          prompt,
          imageUrl: base64Image,
          createdAt: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Image generation error:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoadingAuth) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center py-32 px-4 bg-grain">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white/80 backdrop-blur-sm p-16 rounded-[3rem] shadow-2xl border border-accent/10 max-w-xl w-full relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-accent" />
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-primary/5 rounded-3xl flex items-center justify-center text-accent mx-auto mb-8 shadow-inner">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <span className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Administrator</span>
          <h1 className="text-5xl font-serif font-bold text-primary mb-4 leading-tight">Admin Login</h1>
          <p className="text-gray-500 font-light italic text-lg leading-relaxed">Enter your credentials to access the secure dashboard.</p>
        </div>
        
        {loginError && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 text-red-700 p-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest mb-8 border border-red-100">
            {loginError}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] ml-4">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-paper/30 border border-accent/10 rounded-2xl px-8 py-5 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-primary font-medium"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] ml-4">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-paper/30 border border-accent/10 rounded-2xl px-8 py-5 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-primary font-medium"
              required
            />
          </div>
          <button 
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-primary text-white font-bold text-xs uppercase tracking-[0.3em] px-8 py-6 rounded-2xl hover:bg-accent hover:text-primary transition-all flex items-center justify-center shadow-xl shadow-primary/10 group"
          >
            {isLoggingIn ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
          </button>
        </form>
        <p className="text-[9px] text-center text-gray-400 mt-10 uppercase tracking-widest font-bold">
          Secure Environment • Kamal Batra & Associates
        </p>
      </motion.div>
    </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-white rounded-xl shadow-sm border border-red-100">
          <ShieldCheck className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">You do not have administrator privileges to view this page.</p>
          <button onClick={handleLogout} className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-light">
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-32 bg-grain">
      {/* Header */}
      <div className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B68D40_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative z-10">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-accent mr-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-1 block">Management Console</span>
              <h1 className="text-3xl font-serif font-bold">Admin Dashboard</h1>
            </div>
          </div>
          <button onClick={handleLogout} className="bg-white/5 text-white border border-white/10 font-bold text-[10px] uppercase tracking-[0.2em] px-6 py-3 rounded-xl hover:bg-accent hover:text-primary transition-all flex items-center shadow-lg">
            <LogOut className="w-4 h-4 mr-3" /> Sign Out
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white/80 backdrop-blur-md border-b border-accent/10 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-12">
            {[
              { id: 'leads', icon: Users, label: 'Leads & Inquiries' },
              { id: 'blog', icon: FileText, label: 'Blog Management' },
              { id: 'marketing', icon: ImageIcon, label: 'Marketing Assets' },
              { id: 'hero', icon: LayoutTemplate, label: 'Hero Slides' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-6 px-1 border-b-2 font-bold text-[11px] uppercase tracking-[0.2em] flex items-center transition-all ${
                  activeTab === tab.id ? 'border-accent text-primary' : 'border-transparent text-gray-400 hover:text-primary hover:border-accent/30'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-3" /> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {activeTab === 'leads' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/80 backdrop-blur-sm rounded-[2.5rem] shadow-sm border border-accent/10 overflow-hidden">
            <div className="p-10 border-b border-accent/5 flex justify-between items-center bg-paper/30">
              <h2 className="text-2xl font-serif font-bold text-primary">Recent Inquiries</h2>
              <span className="bg-accent/10 text-accent text-[10px] font-bold px-4 py-1.5 rounded-full border border-accent/20 uppercase tracking-widest">
                {leads.length} Total Leads
              </span>
            </div>
            
            {leads.length === 0 ? (
              <div className="p-20 text-center text-gray-400 font-light italic">No leads found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-paper/20 text-accent text-[10px] uppercase tracking-[0.2em] font-bold">
                      <th className="p-6 font-bold">Date</th>
                      <th className="p-6 font-bold">Client Information</th>
                      <th className="p-6 font-bold">Service Interest</th>
                      <th className="p-6 font-bold">Message</th>
                      <th className="p-6 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-accent/5">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-paper/10 transition-colors group">
                        <td className="p-6 text-[11px] text-gray-500 font-medium uppercase tracking-wider">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-6">
                          <div className="text-sm font-bold text-primary mb-1">{lead.name}</div>
                          <div className="text-[11px] text-accent font-medium mb-1">{lead.email}</div>
                          {lead.date && lead.time && (
                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-2 bg-paper/50 inline-block px-2 py-1 rounded-md border border-accent/10">
                              Appointment: {lead.date} at {lead.time}
                            </div>
                          )}
                        </td>
                        <td className="p-6">
                          <span className="bg-primary/5 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-primary/10">{lead.serviceInterest}</span>
                        </td>
                        <td className="p-6 text-sm text-gray-500 max-w-xs truncate font-light italic" title={lead.message}>
                          {lead.message}
                        </td>
                        <td className="p-6">
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                            className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] border outline-none cursor-pointer appearance-none ${
                              lead.status === 'new' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                              lead.status === 'contacted' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' : 
                              'bg-green-50 text-green-700 border-green-100'
                            }`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'blog' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm p-10 rounded-[2.5rem] shadow-sm border border-accent/10 sticky top-44">
                <h2 className="text-2xl font-serif font-bold text-primary mb-8">Create Post</h2>
                <form onSubmit={handleCreatePost} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] ml-4">Title</label>
                    <input
                      type="text"
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      className="w-full bg-paper/30 border border-accent/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-sm font-medium"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] ml-4">Content</label>
                    <div className="bg-white rounded-2xl overflow-hidden border border-accent/10">
                      <ReactQuill 
                        theme="snow" 
                        value={blogContent} 
                        onChange={setBlogContent} 
                        className="h-64"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isPosting || !blogTitle.trim() || !blogContent.trim() || blogContent === '<p><br></p>'}
                    className="w-full bg-primary text-white font-bold text-xs uppercase tracking-[0.3em] px-8 py-5 rounded-2xl hover:bg-accent hover:text-primary transition-all flex items-center justify-center disabled:opacity-70 group mt-12"
                  >
                    {isPosting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus className="w-4 h-4 mr-3 group-hover:rotate-90 transition-transform"/> Publish Post</>}
                  </button>
                </form>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-[2.5rem] shadow-sm border border-accent/10 overflow-hidden">
                <div className="p-10 border-b border-accent/5 bg-paper/30">
                  <h2 className="text-2xl font-serif font-bold text-primary">Published Posts</h2>
                </div>
                {posts.length === 0 ? (
                  <div className="p-20 text-center text-gray-400 font-light italic">No posts found.</div>
                ) : (
                  <div className="divide-y divide-accent/5">
                    {posts.map(post => (
                      <div key={post.id} className="p-10 hover:bg-paper/10 transition-all group">
                        <h3 className="text-2xl font-serif font-bold text-primary mb-3 group-hover:text-accent transition-colors">{post.title}</h3>
                        <div className="flex items-center text-[10px] font-bold text-accent uppercase tracking-widest mb-6">
                          <span className="bg-accent/10 px-3 py-1 rounded-full mr-4">By {post.authorName}</span>
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div 
                          className="text-gray-500 font-light leading-relaxed line-clamp-3 italic prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'marketing' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm p-10 rounded-[2.5rem] shadow-sm border border-accent/10 sticky top-44">
                <h2 className="text-2xl font-serif font-bold text-primary mb-6">Generate Image</h2>
                <p className="text-sm text-gray-500 mb-8 font-light leading-relaxed">
                  Use Gemini AI to generate high-quality images for blog posts, social media, or website banners.
                </p>
                
                <form onSubmit={handleGenerateImage} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] ml-4">Visual Prompt</label>
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={5}
                      className="w-full bg-paper/30 border border-accent/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-sm font-light leading-relaxed"
                      placeholder="A modern accounting office with a laptop showing financial charts, deep navy and gold colors..."
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] ml-4">Resolution</label>
                      <select 
                        value={imageSize} 
                        onChange={(e) => setImageSize(e.target.value as any)}
                        className="w-full bg-paper/30 border border-accent/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-[11px] font-bold uppercase tracking-widest appearance-none"
                      >
                        <option value="1K">1K Standard</option>
                        <option value="2K">2K High</option>
                        <option value="4K">4K Ultra</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] ml-4">Format</label>
                      <select 
                        value={aspectRatio} 
                        onChange={(e) => setAspectRatio(e.target.value as any)}
                        className="w-full bg-paper/30 border border-accent/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-[11px] font-bold uppercase tracking-widest appearance-none"
                      >
                        <option value="16:9">Landscape</option>
                        <option value="1:1">Square</option>
                        <option value="9:16">Portrait</option>
                      </select>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isGenerating || !prompt.trim()}
                    className="w-full bg-primary text-white font-bold text-xs uppercase tracking-[0.3em] px-8 py-5 rounded-2xl hover:bg-accent hover:text-primary transition-all flex items-center justify-center disabled:opacity-70 mt-4 shadow-xl shadow-primary/10"
                  >
                    {isGenerating ? (
                      <><Loader2 className="w-4 h-4 mr-3 animate-spin" /> Creating...</>
                    ) : (
                      <><ImageIcon className="w-4 h-4 mr-3" /> Generate Asset</>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm p-10 rounded-[2.5rem] shadow-sm border border-accent/10 min-h-[600px] flex flex-col">
                <h2 className="text-2xl font-serif font-bold text-primary mb-8">Visual Result</h2>
                
                <div className="flex-grow flex items-center justify-center bg-paper/30 rounded-[2rem] border border-accent/5 overflow-hidden relative group">
                  {isGenerating ? (
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-accent mx-auto mb-6 shadow-sm animate-pulse">
                        <Loader2 className="w-10 h-10 animate-spin" />
                      </div>
                      <p className="text-[10px] font-bold text-accent uppercase tracking-[0.3em]">Creating your masterpiece...</p>
                    </div>
                  ) : generatedImage ? (
                    <motion.img 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      src={generatedImage} 
                      alt="Generated Asset" 
                      className="max-w-full max-h-[600px] object-contain shadow-2xl rounded-xl" 
                    />
                  ) : (
                    <div className="text-center text-gray-400">
                      <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-accent/20 mx-auto mb-6 shadow-inner">
                        <ImageIcon className="w-10 h-10" />
                      </div>
                      <p className="text-[10px] font-bold text-accent/40 uppercase tracking-[0.3em]">Visual preview will appear here</p>
                    </div>
                  )}
                </div>
                
                {generatedImage && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex justify-end">
                    <a 
                      href={generatedImage} 
                      download="marketing-asset.png"
                      className="bg-accent text-primary font-bold text-[10px] uppercase tracking-[0.2em] px-8 py-4 rounded-xl hover:bg-primary hover:text-white transition-all shadow-lg"
                    >
                      Download High-Res Asset
                    </a>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
        {activeTab === 'hero' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm p-10 rounded-[2.5rem] shadow-sm border border-accent/10 sticky top-44">
                <h2 className="text-2xl font-serif font-bold text-primary mb-8">{editingSlideId ? 'Edit Slide' : 'Create Slide'}</h2>
                <form onSubmit={handleSaveSlide} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] ml-4">Title</label>
                    <input
                      type="text"
                      value={slideTitle}
                      onChange={(e) => setSlideTitle(e.target.value)}
                      className="w-full bg-paper/30 border border-accent/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-sm font-medium"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] ml-4">Subtitle</label>
                    <input
                      type="text"
                      value={slideSubtitle}
                      onChange={(e) => setSlideSubtitle(e.target.value)}
                      className="w-full bg-paper/30 border border-accent/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-sm font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] ml-4">Description</label>
                    <textarea
                      value={slideDescription}
                      onChange={(e) => setSlideDescription(e.target.value)}
                      rows={3}
                      className="w-full bg-paper/30 border border-accent/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-sm font-light leading-relaxed"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] ml-4">Image URL</label>
                    <input
                      type="url"
                      value={slideImageUrl}
                      onChange={(e) => setSlideImageUrl(e.target.value)}
                      className="w-full bg-paper/30 border border-accent/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-sm font-medium"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] ml-4">Link URL</label>
                      <input
                        type="text"
                        value={slideLink}
                        onChange={(e) => setSlideLink(e.target.value)}
                        className="w-full bg-paper/30 border border-accent/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-sm font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] ml-4">Link Text</label>
                      <input
                        type="text"
                        value={slideLinkText}
                        onChange={(e) => setSlideLinkText(e.target.value)}
                        className="w-full bg-paper/30 border border-accent/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-sm font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] ml-4">Order</label>
                    <input
                      type="number"
                      value={slideOrder}
                      onChange={(e) => setSlideOrder(parseInt(e.target.value))}
                      className="w-full bg-paper/30 border border-accent/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-sm font-medium"
                    />
                  </div>
                  <div className="flex space-x-4 mt-12">
                    <button
                      type="submit"
                      disabled={isSavingSlide || !slideTitle.trim() || !slideImageUrl.trim()}
                      className="flex-1 bg-primary text-white font-bold text-xs uppercase tracking-[0.3em] px-8 py-5 rounded-2xl hover:bg-accent hover:text-primary transition-all flex items-center justify-center disabled:opacity-70 group"
                    >
                      {isSavingSlide ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus className="w-4 h-4 mr-3 group-hover:rotate-90 transition-transform"/> {editingSlideId ? 'Update' : 'Save'}</>}
                    </button>
                    {editingSlideId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingSlideId(null);
                          setSlideTitle('');
                          setSlideSubtitle('');
                          setSlideDescription('');
                          setSlideImageUrl('');
                          setSlideLink('');
                          setSlideLinkText('');
                          setSlideOrder(0);
                        }}
                        className="bg-paper text-gray-500 font-bold text-xs uppercase tracking-[0.3em] px-6 py-5 rounded-2xl hover:bg-gray-200 transition-all"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-[2.5rem] shadow-sm border border-accent/10 overflow-hidden">
                <div className="p-10 border-b border-accent/5 bg-paper/30 flex justify-between items-center">
                  <h2 className="text-2xl font-serif font-bold text-primary">Active Slides</h2>
                  <span className="bg-accent/10 text-accent text-[10px] font-bold px-4 py-1.5 rounded-full border border-accent/20 uppercase tracking-widest">
                    {heroSlides.length} Slides
                  </span>
                </div>
                {heroSlides.length === 0 ? (
                  <div className="p-20 text-center text-gray-400 font-light italic">No slides found.</div>
                ) : (
                  <div className="divide-y divide-accent/5">
                    {heroSlides.map(slide => (
                      <div key={slide.id} className="p-10 hover:bg-paper/10 transition-all group flex flex-col md:flex-row gap-8 items-center">
                        <div className="w-full md:w-1/3 h-32 rounded-xl overflow-hidden relative">
                          <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-primary/20" />
                        </div>
                        <div className="w-full md:w-2/3 flex flex-col justify-between h-full">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl font-serif font-bold text-primary group-hover:text-accent transition-colors">{slide.title}</h3>
                              <span className="bg-paper px-3 py-1 rounded-full text-[10px] font-bold text-gray-500 uppercase tracking-widest">Order: {slide.order}</span>
                            </div>
                            <p className="text-accent text-sm italic mb-2">{slide.subtitle}</p>
                            <p className="text-gray-500 font-light text-sm line-clamp-2 mb-4">{slide.description}</p>
                          </div>
                          <div className="flex space-x-4">
                            <button
                              onClick={() => handleEditSlide(slide)}
                              className="flex items-center text-[10px] font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors"
                            >
                              <Edit2 className="w-3 h-3 mr-2" /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteSlide(slide.id)}
                              className="flex items-center text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="w-3 h-3 mr-2" /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
