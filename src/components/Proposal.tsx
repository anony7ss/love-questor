
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Heart, Music, Volume2, VolumeX } from "lucide-react";
import FallingHearts from './FallingHearts';

const Proposal = () => {
  const [showProposal, setShowProposal] = useState(false);
  const [showReasons, setShowReasons] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
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
  
  const handleYesClick = () => {
    toast.success("Eu sabia que você diria sim! ❤️", {
      duration: 5000,
    });
    setShowReasons(true);
  };
  
  const handleProposeClick = () => {
    setShowProposal(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-cream-light to-cream pb-20">
      <FallingHearts enabled={showProposal} />
      
      {/* Audio control */}
      <Button 
        variant="outline" 
        size="icon" 
        className="fixed top-4 right-4 z-50 rounded-full bg-white/70 backdrop-blur-sm"
        onClick={toggleAudio}
      >
        {audioPlaying ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </Button>
      
      <div className="w-full max-w-md px-4 pt-10 pb-6 animate-fade-in">
        <Card className="card-love text-center relative overflow-hidden">
          <CardContent className="pt-6 px-3">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-love w-12 h-12 rounded-full flex items-center justify-center">
              <Heart className="text-white" />
            </div>
            
            <h1 className="text-2xl font-bold text-love mt-4 mb-3">
              Olá meu amor
            </h1>
            
            <p className="text-gray-600 mb-6">
              Você é o brilho nos meus olhos, o sorriso no meu rosto, e o amor no meu coração.
              Cada momento ao seu lado é especial e quero muito te contar algo...
            </p>
            
            {!showProposal ? (
              <Button 
                className="love-button animate-pulse-scale"
                onClick={handleProposeClick}
              >
                Clique Aqui
              </Button>
            ) : (
              <div className="space-y-8 animate-fade-in">
                <div className="py-4">
                  <h2 className="text-3xl font-bold text-love mb-6 animate-float">
                    Quer namorar comigo?
                  </h2>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                    <Button 
                      className="love-button flex-1"
                      onClick={handleYesClick}
                    >
                      Sim
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="border-love text-love hover:bg-love/10 flex-1"
                      onClick={handleYesClick}
                    >
                      Com certeza!
                    </Button>
                  </div>
                </div>
                
                {showReasons && (
                  <div className="pt-4 animate-fade-in">
                    <h3 className="text-xl font-semibold text-love mb-4">
                      Motivos pelos quais eu te amo:
                    </h3>
                    
                    <ul className="space-y-2 text-left">
                      {reasons.map((reason, index) => (
                        <li 
                          key={index} 
                          className="flex items-start gap-2 animate-fade-in"
                          style={{ animationDelay: `${index * 0.2}s` }}
                        >
                          <span className="text-love mt-1">❤️</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-8 text-center">
                      <p className="text-lg font-medium text-love">
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
