
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Heart, Music, Volume2, VolumeX, ArrowDown, Sparkles } from "lucide-react";
import FallingHearts from './FallingHearts';
import PhotoGallery from './PhotoGallery';
import DateTimeline from './DateTimeline';
import LoveNote from './LoveNote';
import { useIsMobile } from '@/hooks/use-mobile';

const Proposal = () => {
  const [showProposal, setShowProposal] = useState(false);
  const [showReasons, setShowReasons] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);
  const [audio] = useState(new Audio('https://cdn.pixabay.com/download/audio/2022/10/30/audio_85e10bbdc3.mp3?filename=autumn-leaves-version-2-187963.mp3'));
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (localStorage.getItem('isAuthenticated') !== 'true') {
      navigate('/');
    }
  }, [navigate]);
  
  // Set up audio
  useEffect(() => {
    audio.loop = true;
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);
  
  // Toggle audio
  const toggleAudio = () => {
    if (audioPlaying) {
      audio.pause();
    } else {
      audio.play().catch(e => console.error("Audio playback failed:", e));
    }
    setAudioPlaying(!audioPlaying);
  };
  
  // Custom reasons - change these to your own reasons!
  const reasons = [
    "Você me faz sorrir todos os dias",
    "Seu jeito carinhoso me conquista",
    "Nossos momentos juntos são perfeitos",
    "Você me entende como ninguém",
    "Seu sorriso ilumina meu dia",
    "Amo seu senso de humor",
    "Você me faz querer ser melhor"
  ];

  // Love letter content - customize this!
  const loveLetterContent = `Querida,

Desde o primeiro momento que te vi, senti algo especial. A cada dia que passa, meu coração se enche mais de carinho e admiração por você. 

Adoro como você ri, como você fala, como você me olha. Mesmo nos momentos difíceis, você sempre faz tudo parecer melhor.

Quero fazer parte da sua vida de uma forma especial, criar memórias incríveis juntos e estar ao seu lado em todos os momentos.

Com todo meu carinho e amor.`;
  
  const handleYesClick = () => {
    toast.success("Eu sabia que você diria sim! ❤️", {
      duration: 5000,
    });
    setShowReasons(true);
  };
  
  const handleProposeClick = () => {
    setShowProposal(true);
  };
  
  const handleNextSection = () => {
    setCurrentSection(prev => Math.min(prev + 1, 4));
  };
  
  const handlePrevSection = () => {
    setCurrentSection(prev => Math.max(prev - 1, 1));
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4 overflow-x-hidden bg-gradient-to-br from-[#1A1F2C] to-[#121420]">
      <FallingHearts enabled={true} />
      
      {/* Audio control */}
      <Button 
        variant="outline" 
        size="icon" 
        className="fixed top-4 right-4 z-50 rounded-full bg-black/30 backdrop-blur-sm border border-purple-400/30 text-white hover:bg-purple-800/50"
        onClick={toggleAudio}
      >
        {audioPlaying ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </Button>
      
      <div className="w-full max-w-3xl animate-fade-in">
        <div className="relative mb-6 text-center">
          <Heart className="inline-block text-love w-12 h-12 animate-pulse-scale mb-2" fill="#ff6b8b" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 animate-glow">
            Para Meu Grande Amor
          </h1>
        </div>
        
        <Card className="relative overflow-hidden bg-black/40 backdrop-blur-lg border border-purple-400/30 text-center shadow-xl">          
          <CardContent className="pt-6 px-4 md:px-8 lg:px-12 py-8">
            {!showProposal ? (
              <div className="space-y-8">
                {currentSection === 1 && (
                  <div className="animate-fade-in max-w-2xl mx-auto">
                    <LoveNote 
                      title="Minha Carta para Você" 
                      content={loveLetterContent} 
                    />
                    <Button 
                      onClick={handleNextSection}
                      className="love-button bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 mt-6 text-lg py-6 px-8"
                    >
                      Ver Nossos Momentos <ArrowDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
                
                {currentSection === 2 && (
                  <div className="animate-fade-in">
                    <PhotoGallery />
                    <div className="flex justify-between gap-4 mt-6">
                      <Button 
                        variant="outline"
                        onClick={handlePrevSection}
                        className="flex-1 bg-black/40 border-purple-400/30 text-white hover:bg-purple-800/50 text-lg py-6"
                      >
                        Voltar
                      </Button>
                      <Button 
                        onClick={handleNextSection}
                        className="flex-1 love-button bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-lg py-6"
                      >
                        Ver Datas Especiais
                      </Button>
                    </div>
                  </div>
                )}
                
                {currentSection === 3 && (
                  <div className="animate-fade-in">
                    <DateTimeline />
                    <div className="flex justify-between gap-4 mt-6">
                      <Button 
                        variant="outline"
                        onClick={handlePrevSection}
                        className="flex-1 bg-black/40 border-purple-400/30 text-white hover:bg-purple-800/50 text-lg py-6"
                      >
                        Voltar
                      </Button>
                      <Button 
                        onClick={handleProposeClick}
                        className="flex-1 love-button bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 animate-pulse-scale text-lg py-6"
                      >
                        <Sparkles className="mr-2 h-4 w-4" /> Clique Aqui
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-8 animate-fade-in py-8">
                <div className="py-4">
                  <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-8 animate-float">
                    Quer namorar comigo?
                  </h2>
                  
                  <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} justify-center gap-6 mt-8`}>
                    <Button 
                      className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 border-none text-xl py-8"
                      onClick={handleYesClick}
                    >
                      Sim
                    </Button>
                    
                    <Button 
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 border-none text-xl py-8"
                      onClick={handleYesClick}
                    >
                      Com certeza!
                    </Button>
                  </div>
                </div>
                
                {showReasons && (
                  <div className="pt-4 animate-fade-in">
                    <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-6">
                      Motivos pelos quais eu te amo:
                    </h3>
                    
                    <ul className="space-y-3 text-left max-w-2xl mx-auto">
                      {reasons.map((reason, index) => (
                        <li 
                          key={index} 
                          className="flex items-start gap-3 animate-fade-in bg-black/20 p-3 rounded-md backdrop-blur-sm"
                          style={{ animationDelay: `${index * 0.2}s` }}
                        >
                          <span className="text-pink-500 mt-1">❤️</span>
                          <span className="text-gray-200 text-lg">{reason}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-12 text-center">
                      <p className="text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 animate-glow">
                        Você é o amor da minha vida!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Additional decorative elements for desktop */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 -right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default Proposal;
