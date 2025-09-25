import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Alert, AlertDescription } from "./ui/alert";
import { Eye, EyeOff, AlertCircle, Truck, Globe2, Shield, Clock, BarChart3, Users } from "lucide-react";
import logoImage from 'figma:asset/69eaccc699c7db7d440074854732978cd134262b.png';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
  onSwitchToRegister: () => void;
  error?: string;
}

export function LoginPage({ onLogin, onSwitchToRegister, error }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading(true);
    setTimeout(() => {
      onLogin(email, password);
      setIsLoading(false);
    }, 1000);
  };

  const features = [
    {
      icon: Truck,
      title: "Real-time Tracking",
      description: "Monitor your shipments across the global supply chain"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Data-driven insights for optimized logistics operations"
    },
    {
      icon: Globe2,
      title: "Global Network",
      description: "Connect with partners across 50+ countries"
    },
    {
      icon: Shield,
      title: "Secure Operations",
      description: "Enterprise-grade security and compliance"
    }
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="w-full max-w-md space-y-8 relative z-10">
          {/* Logo and Header */}
          <div className="text-center">
            <div className="bg-white rounded-2xl p-6 shadow-xl mb-8 border border-primary/10">
              <img 
                src={logoImage} 
                alt="Loendersloot Global Logistics" 
                className="mx-auto h-12 mb-4"
              />
              <h1 className="text-2xl text-foreground mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">
                Sign in to your logistics management portal
              </p>
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-primary/10">
            {error && (
              <Alert className="mb-6 border-destructive/20 bg-destructive/5">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <AlertDescription className="text-destructive">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-12 bg-muted/30 border-primary/20 rounded-xl px-4 placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                  />
                </div>

                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-12 bg-muted/30 border-primary/20 rounded-xl px-4 pr-12 placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-primary/10"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-4">
              <Button 
                variant="link" 
                className="text-primary hover:text-primary/80 text-sm"
              >
                Forgot your password?
              </Button>
              
              <div className="text-muted-foreground text-sm">
                New to Loendersloot?{" "}
                <Button 
                  variant="link" 
                  className="text-primary hover:text-primary/80 p-0 h-auto text-sm font-medium"
                  onClick={onSwitchToRegister}
                  disabled={isLoading}
                >
                  Create an account
                </Button>
              </div>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
            <p className="text-sm text-center text-muted-foreground mb-2">Demo Access:</p>
            <p className="text-sm text-center font-mono text-foreground">
              demo@loendersloot.com / demo123
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Company Features */}
      <div className="flex-1 bg-gradient-to-br from-primary via-secondary to-accent relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 border border-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-32 h-32 border border-white rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-32 left-40 w-48 h-48 border border-white rounded-full animate-pulse delay-700"></div>
          
          {/* Floating logistics icons */}
          <div className="absolute top-1/4 right-1/4 animate-bounce delay-1000">
            <Truck className="w-8 h-8 text-white/30" />
          </div>
          <div className="absolute bottom-1/3 left-1/3 animate-bounce delay-1500">
            <Globe2 className="w-6 h-6 text-white/30" />
          </div>
          <div className="absolute top-1/2 left-1/4 animate-bounce delay-2000">
            <BarChart3 className="w-7 h-7 text-white/30" />
          </div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center h-full p-12 text-white">
          <div className="max-w-lg text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">
              Streamline Your Global Logistics
            </h2>
            <p className="text-xl opacity-90 leading-relaxed">
              Connect, track, and optimize your supply chain operations with our comprehensive logistics management platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
              >
                <feature.icon className="w-8 h-8 mb-4 text-white/90" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm opacity-80">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Statistics */}
          <div className="mt-12 grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm opacity-80">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold">99.9%</div>
              <div className="text-sm opacity-80">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm opacity-80">Support</div>
            </div>
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" className="w-full h-24 fill-white/10">
            <path d="M0,60 C300,90 600,30 900,60 C1050,80 1150,40 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}