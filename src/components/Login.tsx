
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import FallingHearts from './FallingHearts';

const Login = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Change this to your actual password (the answer to your question)
  const correctPassword = '01';
  
  // Change this to your actual question
  const loginQuestion = 'Quando a gente se conheceu?';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      if (password === correctPassword) {
        toast.success('Login correto! ❤️');
        
        // Store in localStorage to remember the user is logged in
        localStorage.setItem('isAuthenticated', 'true');
        
        // Redirect to the main page
        navigate('/proposal');
      } else {
        toast.error('Senha incorreta, tente novamente...');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-[#121420] to-[#1A1F2C]">
      <FallingHearts enabled={true} />
      
      <div className="z-10 relative w-full max-w-md md:max-w-lg animate-fade-in">
        <Heart className="absolute -top-14 left-1/2 -translate-x-1/2 text-love w-14 h-14 animate-pulse-scale" fill="#ff6b8b" />
        
        <Card className="card-love border-love/20 w-full">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 glow-text">Olá, meu amor</CardTitle>
            <CardDescription className="text-muted-foreground text-lg">
              Por favor, responda a pergunta abaixo
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="grid gap-6">
                <div className="space-y-4">
                  <Label htmlFor="password" className="text-center w-full block text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">
                    {loginQuestion}
                  </Label>
                  <Input
                    id="password"
                    type="text"
                    placeholder="Sua resposta..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="futuristic-input text-lg py-6"
                    autoComplete="off"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="love-button bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 py-6 text-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Verificando..." : "Entrar"}
                </Button>
              </div>
            </form>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <p className="text-lg text-muted-foreground">
              Pense com carinho... ❤️
            </p>
          </CardFooter>
        </Card>
      </div>
      
      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 -right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default Login;
