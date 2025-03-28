
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Mail, ChevronDown, ChevronUp } from 'lucide-react';

interface LoveNoteProps {
  title: string;
  content: string;
}

const LoveNote = ({ title, content }: LoveNoteProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <Card className="bg-black/30 backdrop-blur-md border border-purple-400/30 overflow-hidden mb-8">
      <CardContent className="pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Mail className="text-pink-400 mr-2" />
            <h3 className="text-xl font-semibold text-white">{title}</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-purple-900/40 text-white hover:bg-purple-600/50"
            onClick={toggleExpand}
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </Button>
        </div>
        
        <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[500px]' : 'max-h-24'}`}>
          <div className="whitespace-pre-wrap text-gray-100 leading-relaxed">
            {content}
          </div>
        </div>
        
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
        )}
        
        <div className="flex justify-center mt-4">
          <Heart className={`text-pink-500 transition-transform duration-500 ${isExpanded ? 'scale-125' : 'scale-100'}`} />
        </div>
      </CardContent>
    </Card>
  );
};

export default LoveNote;
