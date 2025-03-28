
import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  size: number;
  left: number;
  delay: number;
  offset: number;
  rotate: number;
}

const FallingHearts = ({ enabled = true }: { enabled?: boolean }) => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  
  useEffect(() => {
    if (!enabled) return;
    
    // Generate initial hearts
    const initialHearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 20 + 15, // 15-35px
      left: Math.random() * 100, // 0-100%
      delay: Math.random() * 5, // 0-5s
      offset: Math.random() * 20 - 10, // -10 to 10
      rotate: Math.random() * 360, // 0-360deg
    }));
    
    setHearts(initialHearts);
    
    // Add new hearts periodically
    const interval = setInterval(() => {
      setHearts(prev => [
        ...prev.slice(-40), // Keep max 40 hearts
        {
          id: Date.now(),
          size: Math.random() * 20 + 15,
          left: Math.random() * 100,
          delay: 0,
          offset: Math.random() * 20 - 10,
          rotate: Math.random() * 360,
        }
      ]);
    }, 300);
    
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
          ❤️
        </div>
      ))}
    </div>
  );
};

export default FallingHearts;
