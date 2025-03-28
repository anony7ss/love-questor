
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Heart } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-cream to-cream-dark">
      <div className="z-10 relative w-full max-w-md animate-fade-in">
        <Heart className="absolute -top-14 left-1/2 -translate-x-1/2 text-love w-10 h-10 animate-pulse-scale" />
        
        <Card className="card-love border-love/20">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-love">Olá, meu amor</CardTitle>
            <CardDescription className="text-muted-foreground">
              Por favor, responda a pergunta abaixo
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-center w-full block text-base">
                    {loginQuestion}
                  </Label>
                  <Input
                    id="password"
                    type="text"
                    placeholder="Sua resposta..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-love/30 focus:border-love"
                    autoComplete="off"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="love-button" 
                  disabled={isLoading}
                >
                  {isLoading ? "Verificando..." : "Entrar"}
                </Button>
              </div>
            </form>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Pense com carinho... ❤️
            </p>
          </CardFooter>
        </Card>
      </div>
      
      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-love/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/4 -right-4 w-32 h-32 bg-love/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 -left-10 w-40 h-40 bg-love/10 rounded-full blur-xl"></div>
      </div>
    </div>
  );
};

export default Login;
