
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

const Proposal = () => {
  const [showProposal, setShowProposal] = useState(false);
  const [showReasons, setShowReasons] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);
  const [audio] = useState(new Audio('https://cdn.pixabay.com/download/audio/2022/10/30/audio_85e10bbdc3.mp3?filename=autumn-leaves-version-2-187963.mp3'));
  const navigate = useNavigate();
  
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
    <div className="min-h-screen flex flex-col items-center justify-center py-10 overflow-x-hidden bg-gradient-to-br from-[#1A1F2C] to-[#121420]">
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
      
      <div className="w-full max-w-md px-4 py-6 animate-fade-in">
        <Card className="relative overflow-hidden bg-black/40 backdrop-blur-lg border border-purple-400/30 text-center shadow-xl">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-br from-pink-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10">
            <Heart className="text-white" />
          </div>
          
          <CardContent className="pt-10 px-4">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mt-4 mb-3 animate-float">
              Olá meu amor
            </h1>
            
            <p className="text-gray-300 mb-6">
              Você é o brilho nos meus olhos, o sorriso no meu rosto, e o amor no meu coração.
              Cada momento ao seu lado é especial e quero muito te contar algo...
            </p>
            
            {!showProposal ? (
              <div className="space-y-6">
                {currentSection === 1 && (
                  <div className="animate-fade-in">
                    <LoveNote 
                      title="Minha Carta para Você" 
                      content={loveLetterContent} 
                    />
                    <Button 
                      onClick={handleNextSection}
                      className="love-button bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                    >
                      Ver Nossos Momentos <ArrowDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
                
                {currentSection === 2 && (
                  <div className="animate-fade-in">
                    <PhotoGallery />
                    <div className="flex justify-between gap-2">
                      <Button 
                        variant="outline"
                        onClick={handlePrevSection}
                        className="flex-1 bg-black/40 border-purple-400/30 text-white hover:bg-purple-800/50"
                      >
                        Voltar
                      </Button>
                      <Button 
                        onClick={handleNextSection}
                        className="flex-1 love-button bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                      >
                        Ver Datas Especiais
                      </Button>
                    </div>
                  </div>
                )}
                
                {currentSection === 3 && (
                  <div className="animate-fade-in">
                    <DateTimeline />
                    <div className="flex justify-between gap-2">
                      <Button 
                        variant="outline"
                        onClick={handlePrevSection}
                        className="flex-1 bg-black/40 border-purple-400/30 text-white hover:bg-purple-800/50"
                      >
                        Voltar
                      </Button>
                      <Button 
                        onClick={handleProposeClick}
                        className="flex-1 love-button bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 animate-pulse-scale"
                      >
                        <Sparkles className="mr-2 h-4 w-4" /> Clique Aqui
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-8 animate-fade-in">
                <div className="py-4">
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-6 animate-float">
                    Quer namorar comigo?
                  </h2>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 border-none"
                      onClick={handleYesClick}
                    >
                      Sim
                    </Button>
                    
                    <Button 
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 border-none"
                      onClick={handleYesClick}
                    >
                      Com certeza!
                    </Button>
                  </div>
                </div>
                
                {showReasons && (
                  <div className="pt-4 animate-fade-in">
                    <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-4">
                      Motivos pelos quais eu te amo:
                    </h3>
                    
                    <ul className="space-y-2 text-left">
                      {reasons.map((reason, index) => (
                        <li 
                          key={index} 
                          className="flex items-start gap-2 animate-fade-in bg-black/20 p-2 rounded-md backdrop-blur-sm"
                          style={{ animationDelay: `${index * 0.2}s` }}
                        >
                          <span className="text-pink-500 mt-1">❤️</span>
                          <span className="text-gray-200">{reason}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-8 text-center">
                      <p className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
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
    </div>
  );
};

export default Proposal;
