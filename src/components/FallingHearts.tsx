
import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  size: number;
  left: number;
  delay: number;
  offset: number;
  rotate: number;
  type: string;
}

const FallingHearts = ({ enabled = true }: { enabled?: boolean }) => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  
  useEffect(() => {
    if (!enabled) return;
    
    // Generate initial hearts
    const initialHearts = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      size: Math.random() * 25 + 15, // 15-40px
      left: Math.random() * 100, // 0-100%
      delay: Math.random() * 5, // 0-5s
      offset: Math.random() * 30 - 15, // -15 to 15
      rotate: Math.random() * 360, // 0-360deg
      type: Math.random() > 0.3 ? '❤️' : '💖' // Mix of heart types
    }));
    
    setHearts(initialHearts);
    
    // Add new hearts periodically
    const interval = setInterval(() => {
      setHearts(prev => [
        ...prev.slice(-60), // Keep max 60 hearts
        {
          id: Date.now(),
          size: Math.random() * 25 + 15,
          left: Math.random() * 100,
          delay: 0,
          offset: Math.random() * 30 - 15,
          rotate: Math.random() * 360,
          type: Math.random() > 0.3 ? '❤️' : '💖'
        }
      ]);
    }, 200); // More frequent hearts
    
    return () => clearInterval(interval);
  }, [enabled]);
  
  if (!enabled) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute animate-heart-fall"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDelay: `${heart.delay}s`,
            '--offset': heart.offset,
            '--rotate': heart.rotate,
          } as React.CSSProperties}
        >
          {heart.type}
        </div>
      ))}
    </div>
  );
};

export default FallingHearts;
