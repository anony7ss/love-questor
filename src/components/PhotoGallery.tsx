
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Card } from './ui/card';

interface Photo {
  id: number;
  url: string;
  caption: string;
}

// Mock data - replace with your own photos and captions
const photos: Photo[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1522098543979-ffc7f79a56c4?q=80&w=1000",
    caption: "Nosso primeiro encontro"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1000",
    caption: "Aquele dia no parque"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1543499459-d1460946bdc6?q=80&w=1000",
    caption: "Nossa primeira viagem juntos"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1537204319445-90a2c1c9e9e6?q=80&w=1000",
    caption: "Comemorando seu aniversário"
  }
];

const PhotoGallery = () => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  
  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };
  
  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };
  
  const openFullscreen = () => {
    setShowFullscreen(true);
  };
  
  const closeFullscreen = () => {
    setShowFullscreen(false);
  };
  
  return (
    <div className="w-full mb-8 relative">
      <h3 className="text-xl font-semibold text-center mb-4 text-white">
        Nossos Momentos Especiais
      </h3>
      
      <Card className="overflow-hidden bg-black/30 backdrop-blur-md border border-purple-400/30">
        <div className="relative aspect-video overflow-hidden" onClick={openFullscreen}>
          <img 
            src={photos[currentPhoto].url} 
            alt={photos[currentPhoto].caption}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="text-white text-center">{photos[currentPhoto].caption}</p>
          </div>
        </div>
        
        <div className="flex justify-between p-2">
          <button
            className="p-2 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-purple-600/50 transition-colors"
            onClick={prevPhoto}
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex gap-1 items-center">
            {photos.map((_, index) => (
              <span 
                key={index} 
                className={`block w-2 h-2 rounded-full ${
                  index === currentPhoto ? 'bg-purple-500' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
          
          <button
            className="p-2 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-purple-600/50 transition-colors"
            onClick={nextPhoto}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </Card>
      
      {showFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button 
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white"
            onClick={closeFullscreen}
          >
            <X size={24} />
          </button>
          
          <img 
            src={photos[currentPhoto].url} 
            alt={photos[currentPhoto].caption}
            className="max-w-full max-h-[80vh] object-contain"
          />
          
          <button
            className="absolute left-4 p-4 rounded-full bg-black/30 text-white hover:bg-purple-600/50 transition-colors"
            onClick={prevPhoto}
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            className="absolute right-4 p-4 rounded-full bg-black/30 text-white hover:bg-purple-600/50 transition-colors"
            onClick={nextPhoto}
          >
            <ChevronRight size={24} />
          </button>
          
          <div className="absolute bottom-8 left-0 right-0">
            <p className="text-white text-center text-xl">{photos[currentPhoto].caption}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
