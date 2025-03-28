
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

// Edit these events with your own special dates!
const timelineEvents: TimelineEvent[] = [
  {
    date: "01/01/2023",
    title: "Nosso primeiro encontro",
    description: "Aquele dia especial em que nos conhecemos e tudo começou."
  },
  {
    date: "14/02/2023",
    title: "Primeiro beijo",
    description: "Um momento mágico que nunca vou esquecer."
  },
  {
    date: "15/03/2023",
    title: "Primeira viagem juntos",
    description: "Nossa escapada para a praia foi incrível."
  },
  {
    date: "20/05/2023",
    title: "Conheceu minha família",
    description: "O dia em que te apresentei para as pessoas mais importantes da minha vida."
  }
];

const DateTimeline = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-5 my-4">
      <h3 className="text-xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
        Nossas Datas Especiais
      </h3>
      
      <div className={`space-y-4 ${isMobile ? 'max-h-[280px]' : 'max-h-[350px]'} overflow-y-auto pr-2 timeline-scroll`}>
        {timelineEvents.map((event, index) => (
          <TimelineItem 
            key={index}
            event={event}
            isLast={index === timelineEvents.length - 1}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
};

const TimelineItem = ({ 
  event, 
  isLast,
  isMobile 
}: { 
  event: TimelineEvent;
  isLast: boolean;
  isMobile: boolean;
}) => {
  return (
    <div className="relative">
      {/* Timeline connector */}
      {!isLast && (
        <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500" />
      )}
      
      <Card className="relative bg-black/30 backdrop-blur-sm border border-purple-500/20 overflow-hidden">
        <div className="absolute -left-3 top-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg z-10">
          <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        </div>
        
        <CardContent className={`${isMobile ? 'pl-8 py-3' : 'pl-10 pt-4 pb-4'}`}>
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-medium text-purple-300">{event.date}</p>
            <h4 className="text-sm sm:text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300">
              {event.title}
            </h4>
            <p className="text-xs sm:text-sm text-gray-300">{event.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DateTimeline;
