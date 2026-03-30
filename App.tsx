import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Mic, MicOff, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI, Modality } from '@google/genai';
import { cn } from '../lib/utils';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Hello! I am the Kamal Batra & Associates AI assistant. How can I help you with your financial, tax, or corporate advisory needs today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceResponding, setIsVoiceResponding] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Voice state
  const [session, setSession] = useState<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    const newMessages = [...messages, { role: 'user' as const, text: userMessage }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
      
      const contents = newMessages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: contents,
        config: {
          systemInstruction: 'You are a helpful, professional, and knowledgeable AI assistant for Kamal Batra & Associates, a premium Chartered Accountant firm in Chandigarh, India. You help users understand the firm\'s services (Indian GST, Income Tax, Audit, Corporate Advisory, International Bookkeeping, Payroll, UK/Canada tax). Be concise, polite, and authoritative. Do not give specific legal or financial advice, but rather guide them to contact the firm for a consultation.',
        }
      });
      
      setMessages(prev => [...prev, { role: 'model', text: response.text || 'I apologize, I am unable to process that request right now.' }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I encountered an error. Please try again later or contact us directly.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVoiceMode = async () => {
    if (isVoiceMode) {
      // Stop voice mode
      setIsVoiceMode(false);
      setIsRecording(false);
      if (session) {
        session.close();
        setSession(null);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    } else {
      // Start voice mode
      setIsVoiceMode(true);
      setIsRecording(true);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
        
        const sessionPromise = ai.live.connect({
          model: "gemini-2.5-flash-native-audio-preview-12-2025",
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: { prebuiltVoiceConfig: { voiceName: "Puck" } },
            },
            systemInstruction: "You are a helpful, professional, and knowledgeable AI assistant for Kamal Batra & Associates, a premium Chartered Accountant firm in Chandigarh, India. You help users understand the firm's services (Indian GST, Income Tax, Audit, Corporate Advisory, International Bookkeeping, Payroll, UK/Canada tax). Be concise, polite, and authoritative. Answer the user's questions directly. Do not give specific legal or financial advice, but rather guide them to contact the firm for a consultation.",
            outputAudioTranscription: {},
            inputAudioTranscription: {},
          },
          callbacks: {
            onopen: () => {
              setIsRecording(true);
              // Setup audio processing
              const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
              audioContextRef.current = audioCtx;
              const source = audioCtx.createMediaStreamSource(stream);
              const processor = audioCtx.createScriptProcessor(4096, 1, 1);
              
              processor.onaudioprocess = (e) => {
                const inputData = e.inputBuffer.getChannelData(0);
                const pcm16 = new Int16Array(inputData.length);
                for (let i = 0; i < inputData.length; i++) {
                  pcm16[i] = Math.max(-32768, Math.min(32767, inputData[i] * 32768));
                }
                
                // Convert to base64
                const buffer = new Uint8Array(pcm16.buffer);
                let binary = '';
                for (let i = 0; i < buffer.byteLength; i++) {
                  binary += String.fromCharCode(buffer[i]);
                }
                const base64Data = btoa(binary);
                
                sessionPromise.then((s) => {
                  s.sendRealtimeInput({
                    audio: { data: base64Data, mimeType: 'audio/pcm;rate=16000' }
                  });
                });
              };
              
              source.connect(processor);
              processor.connect(audioCtx.destination);
            },
            onmessage: async (message: any) => {
              // Handle audio output
              const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
              if (base64Audio && audioContextRef.current) {
                setIsVoiceResponding(true);
                // Decode and play audio
                const binaryString = atob(base64Audio);
                const bytes = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                  bytes[i] = binaryString.charCodeAt(i);
                }
                const audioBuffer = await audioContextRef.current.decodeAudioData(bytes.buffer);
                const source = audioContextRef.current.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(audioContextRef.current.destination);
                source.onended = () => setIsVoiceResponding(false);
                source.start();
              }

              // Handle transcription to update message history
              if (message.serverContent?.modelTurn?.parts[0]?.text) {
                const text = message.serverContent.modelTurn.parts[0].text;
                setMessages(prev => [...prev, { role: 'model', text }]);
              }

              if (message.serverContent?.userTurn?.parts[0]?.text) {
                const text = message.serverContent.userTurn.parts[0].text;
                setMessages(prev => [...prev, { role: 'user', text }]);
              }
              
              if (message.serverContent?.interrupted) {
                setIsVoiceResponding(false);
              }
            },
            onclose: () => {
              setIsRecording(false);
              setIsVoiceMode(false);
            }
          }
        });
        
        sessionPromise.then(s => setSession(s));
      } catch (error) {
        console.error("Voice error:", error);
        setIsVoiceMode(false);
        setIsRecording(false);
        alert("Could not access microphone or connect to voice service.");
      }
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 p-4 rounded-full shadow-2xl text-white transition-all hover:scale-110 z-50 group",
          "bg-primary hover:bg-primary-light border border-accent/20"
        )}
        aria-label="Open Chat"
      >
        <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-primary animate-pulse" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 40, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-accent/10 overflow-hidden z-50 flex flex-col h-[600px] max-h-[85vh] bg-grain"
          >
            {/* Header */}
            <div className="bg-primary text-white p-6 flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-accent/5 pointer-events-none" />
              <div className="flex items-center space-x-3 relative z-10">
                <div className="bg-accent/20 p-2 rounded-xl">
                  <Bot className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg leading-none mb-1">KB&A Assistant</h3>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest text-accent font-bold">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 relative z-10">
                <button 
                  onClick={toggleVoiceMode}
                  className={cn(
                    "p-2 rounded-xl transition-all duration-300", 
                    isVoiceMode 
                      ? "bg-red-500/20 text-red-500 border border-red-500/30" 
                      : "text-white/40 hover:text-accent hover:bg-white/5"
                  )}
                  title={isVoiceMode ? "Stop Voice" : "Start Voice"}
                >
                  {isVoiceMode ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="text-white/40 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-xl"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {isVoiceMode ? (
              <div className="flex-1 flex flex-col items-center justify-center bg-paper/30 p-8 text-center">
                <div className="w-32 h-32 rounded-full bg-primary/5 flex items-center justify-center mb-8 relative">
                  {(isRecording || isVoiceResponding) && (
                    <motion.div 
                      animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
                      transition={{ repeat: Infinity, duration: 2.5 }}
                      className={cn(
                        "absolute inset-0 rounded-full border-2",
                        isVoiceResponding ? "border-accent/40" : "border-primary/30"
                      )}
                    />
                  )}
                  <div className={cn(
                    "w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500",
                    isVoiceResponding ? "bg-accent/20 scale-110" : "bg-primary/10"
                  )}>
                    {isVoiceResponding ? (
                      <Loader2 className="w-10 h-10 text-accent animate-spin" />
                    ) : (
                      <Mic className={cn("w-10 h-10", isRecording ? "text-primary" : "text-gray-400")} />
                    )}
                  </div>
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-3">
                  {isVoiceResponding ? "AI Responding" : "Voice Assistant"}
                </h3>
                <p className="text-sm text-gray-500 h-4 font-light italic">
                  {isVoiceResponding ? "Listening to response..." : isRecording ? "Listening... Speak now." : "Connecting..."}
                </p>
                <button 
                  onClick={toggleVoiceMode}
                  className="mt-12 bg-red-50 text-red-600 px-8 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-red-100 transition-all border border-red-100 shadow-sm"
                >
                  End Conversation
                </button>
              </div>
            ) : (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-paper/20">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                      <div className={cn(
                        "max-w-[85%] rounded-3xl p-4 text-sm leading-relaxed",
                        msg.role === 'user' 
                          ? "bg-primary text-white rounded-tr-none shadow-lg shadow-primary/10" 
                          : "bg-white border border-accent/10 text-gray-800 rounded-tl-none shadow-sm font-light"
                      )}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-accent/10 text-accent rounded-3xl rounded-tl-none p-4 text-sm shadow-sm flex space-x-1.5">
                        <span className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-accent/60 rounded-full animate-bounce delay-100" />
                        <span className="w-1.5 h-1.5 bg-accent/80 rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-accent/5">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex items-center space-x-3"
                  >
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about our services..."
                      className="flex-1 border border-accent/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/5 transition-all bg-paper/10 font-light"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="bg-primary text-white p-3 rounded-2xl hover:bg-primary-light disabled:opacity-50 transition-all shadow-lg shadow-primary/10 group"
                    >
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
