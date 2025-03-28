import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, HeartHandshake } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface SpecialDate {
  date: Date;
  title: string;
  description: string;
}

// Change these to your important dates
const specialDates: SpecialDate[] = [
  {
    date: new Date(2023, 5, 15), // June 15, 2023
    title: "Nosso primeiro encontro",
    description: "O dia em que nos conhecemos e tudo começou"
  },
  {
    date: new Date(2023, 8, 22), // September 22, 2023
    title: "Nosso primeiro beijo",
    description: "Um momento mágico que nunca vou esquecer"
  },
  {
    date: new Date(2023, 11, 24), // December 24, 2023
    title: "Festa de Natal",
    description: "Quando apresentei você para minha família"
  },
  {
    date: new Date(2024, 1, 14), // February 14, 2024
    title: "Dia dos Namorados",
    description: "Nosso primeiro Dia dos Namorados juntos"
  }
];

const DateTimeline = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [openPopover, setOpenPopover] = useState(false);
  
  const specialDatesArray = specialDates.map(d => d.date);
  
  const findSpecialDateInfo = (date: Date): SpecialDate | undefined => {
    return specialDates.find(sd => 
      sd.date.getDate() === date.getDate() && 
      sd.date.getMonth() === date.getMonth() && 
      sd.date.getFullYear() === date.getFullYear()
    );
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date && findSpecialDateInfo(date)) {
      // Keep popover open if it's a special date
    } else {
      setOpenPopover(false);
    }
  };
  
  const isSpecialDate = (date: Date): boolean => {
    return specialDatesArray.some(specialDate => 
      specialDate.getDate() === date.getDate() && 
      specialDate.getMonth() === date.getMonth() && 
      specialDate.getFullYear() === date.getFullYear()
    );
  };
  
  return (
    <div className="w-full mb-8">
      <h3 className="text-xl font-semibold text-center mb-4 text-white">
        Nossas Datas Especiais
      </h3>
      
      <Card className="bg-black/30 backdrop-blur-md border border-purple-400/30">
        <CardContent className="pt-6 text-center">
          <div className="flex flex-col items-center space-y-4">
            <Popover open={openPopover} onOpenChange={setOpenPopover}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-[280px] justify-start text-left bg-black/30 border-purple-400/30 text-white"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-purple-400" />
                  {selectedDate ? (
                    format(selectedDate, "PPP", { locale: ptBR })
                  ) : (
                    <span>Selecione uma data especial</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-black/50 backdrop-blur-xl border border-purple-400/30" align="center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  modifiers={{ special: specialDatesArray }}
                  modifiersStyles={{
                    special: { 
                      backgroundColor: "rgba(147, 51, 234, 0.3)", 
                      borderRadius: "100%",
                      color: "white"
                    }
                  }}
                  className="p-3 pointer-events-auto bg-transparent text-white"
                  styles={{
                    selected: { backgroundColor: "#8B5CF6", color: "white" },
                    today: { borderColor: "#8B5CF6", color: "white" },
                    day: { color: "white" }
                  }}
                />
              </PopoverContent>
            </Popover>
            
            {selectedDate && isSpecialDate(selectedDate) && (
              <div className="animate-fade-in mt-4 text-white">
                <div className="flex items-center justify-center mb-2">
                  <HeartHandshake className="text-purple-400 mr-2" />
                  <h4 className="text-lg font-medium">{findSpecialDateInfo(selectedDate)?.title}</h4>
                </div>
                <p className="text-gray-200">{findSpecialDateInfo(selectedDate)?.description}</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full mt-2">
              {specialDates.map((specialDate, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="bg-purple-800/30 text-white hover:bg-purple-600/50 border border-purple-400/30"
                  onClick={() => {
                    setSelectedDate(specialDate.date);
                    setOpenPopover(true);
                  }}
                >
                  {format(specialDate.date, "dd/MM/yyyy")}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DateTimeline;
