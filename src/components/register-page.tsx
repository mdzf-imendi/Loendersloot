import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Alert, AlertDescription } from "./ui/alert";
import { Progress } from "./ui/progress";
import { Eye, EyeOff, AlertCircle, CheckCircle, ArrowLeft, Users, Award, Zap, TrendingUp } from "lucide-react";
import logoImage from 'figma:asset/69eaccc699c7db7d440074854732978cd134262b.png';

interface RegisterPageProps {
  onRegister: (userData: any) => void;
  onSwitchToLogin: () => void;
  error?: string;
}

export function RegisterPage({ onRegister, onSwitchToLogin, error }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms || !acceptPrivacy) return;
    
    setIsLoading(true);
    setTimeout(() => {
      onRegister(formData);
      setIsLoading(false);
    }, 1500);
  };

  const isFormValid = Object.values(formData).every(value => value !== "") && 
                     passwordsMatch && 
                     acceptTerms && 
                     acceptPrivacy &&
                     passwordStrength >= 75;

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Left side - Registration Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative overflow-y-auto">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-3">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            <defs>
              <pattern id="dots" width="5" height="5" patternUnits="userSpaceOnUse">
                <circle cx="2.5" cy="2.5" r="1" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#dots)" />
          </svg>
        </div>

        <div className="w-full max-w-lg space-y-6 relative z-10 my-8">
          {/* Header */}
          <div className="text-center">
            <Button
              variant="ghost"
              onClick={onSwitchToLogin}
              className="absolute top-0 left-0 text-muted-foreground hover:text-foreground hover:bg-primary/10 mb-4"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Login
            </Button>
            
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-primary/10 mt-12">
              <img 
                src={logoImage} 
                alt="Loendersloot Global Logistics" 
                className="mx-auto h-10 mb-4"
              />
              <h1 className="text-2xl text-foreground mb-2">Join Our Network</h1>
              <p className="text-muted-foreground text-sm">
                Create your logistics management account
              </p>
            </div>
          </div>

          {error && (
            <Alert className="border-destructive/20 bg-destructive/5">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive">{error}</AlertDescription>
            </Alert>
          )}

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-primary/10">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Personal Information */}
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-11 bg-muted/30 border-primary/20 rounded-xl px-4 placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                />
                <Input
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-11 bg-muted/30 border-primary/20 rounded-xl px-4 placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                />
              </div>

              <Input
                type="email"
                placeholder="Business Email Address"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                required
                disabled={isLoading}
                className="h-11 bg-muted/30 border-primary/20 rounded-xl px-4 placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
              />

              <Input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                required
                disabled={isLoading}
                className="h-11 bg-muted/30 border-primary/20 rounded-xl px-4 placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
              />

              <Input
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) => updateFormData("company", e.target.value)}
                required
                disabled={isLoading}
                className="h-11 bg-muted/30 border-primary/20 rounded-xl px-4 placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
              />

              <Select 
                value={formData.role} 
                onValueChange={(value) => updateFormData("role", value)}
                disabled={isLoading}
              >
                <SelectTrigger className="h-11 bg-muted/30 border-primary/20 rounded-xl px-4 focus:border-primary focus:ring-primary/20">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="logistics-manager">Logistics Manager</SelectItem>
                  <SelectItem value="supply-chain-manager">Supply Chain Manager</SelectItem>
                  <SelectItem value="warehouse-manager">Warehouse Manager</SelectItem>
                  <SelectItem value="operations-manager">Operations Manager</SelectItem>
                  <SelectItem value="procurement-manager">Procurement Manager</SelectItem>
                  <SelectItem value="transport-coordinator">Transport Coordinator</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              {/* Password Fields */}
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create Password"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-11 bg-muted/30 border-primary/20 rounded-xl px-4 pr-12 placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-primary/10"
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

              {formData.password && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Password strength</span>
                    <span className={`${
                      passwordStrength >= 75 ? 'text-green-600' :
                      passwordStrength >= 50 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {passwordStrength >= 75 ? 'Strong' :
                       passwordStrength >= 50 ? 'Medium' :
                       'Weak'}
                    </span>
                  </div>
                  <Progress value={passwordStrength} className="h-2" />
                </div>
              )}

              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-11 bg-muted/30 border-primary/20 rounded-xl px-4 pr-12 placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-primary/10"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
                {formData.confirmPassword && (
                  <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                    {passwordsMatch ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-3 pt-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    disabled={isLoading}
                    className="mt-1"
                  />
                  <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed">
                    I agree to the{" "}
                    <Button variant="link" className="px-0 h-auto text-xs text-primary">
                      Terms of Service
                    </Button>
                    {" "}and{" "}
                    <Button variant="link" className="px-0 h-auto text-xs text-primary">
                      Service Level Agreement
                    </Button>
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="privacy"
                    checked={acceptPrivacy}
                    onCheckedChange={(checked) => setAcceptPrivacy(checked as boolean)}
                    disabled={isLoading}
                    className="mt-1"
                  />
                  <label htmlFor="privacy" className="text-xs text-muted-foreground leading-relaxed">
                    I agree to the{" "}
                    <Button variant="link" className="px-0 h-auto text-xs text-primary">
                      Privacy Policy
                    </Button>
                    {" "}and consent to data processing for logistics services
                  </label>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl mt-6"
                disabled={isLoading || !isFormValid}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="text-center mt-6">
              <p className="text-xs text-muted-foreground">
                Already have an account?{" "}
                <Button 
                  variant="link" 
                  className="text-primary hover:text-primary/80 p-0 h-auto text-xs font-medium"
                  onClick={onSwitchToLogin}
                  disabled={isLoading}
                >
                  Sign in
                </Button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Benefits */}
      <div className="flex-1 bg-gradient-to-br from-primary via-secondary to-accent relative overflow-hidden hidden lg:flex">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-16 right-16 w-40 h-40 border-2 border-white rounded-lg rotate-12 animate-pulse"></div>
          <div className="absolute bottom-20 left-16 w-24 h-24 border-2 border-white rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 border-2 border-white rounded-lg -rotate-12 animate-pulse delay-1000"></div>
          
          {/* Floating icons */}
          <div className="absolute top-1/3 left-1/4 animate-float">
            <Users className="w-6 h-6 text-white/30" />
          </div>
          <div className="absolute bottom-1/4 right-1/4 animate-float delay-700">
            <Award className="w-8 h-8 text-white/30" />
          </div>
          <div className="absolute top-1/4 right-1/3 animate-float delay-1400">
            <Zap className="w-7 h-7 text-white/30" />
          </div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center h-full p-12 text-white">
          <div className="max-w-lg text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">
              Power Your Supply Chain
            </h2>
            <p className="text-xl opacity-90 leading-relaxed">
              Join thousands of logistics professionals who trust our platform to manage their global operations.
            </p>
          </div>

          <div className="space-y-8 w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <TrendingUp className="w-8 h-8 mb-4 text-white/90" />
              <h3 className="text-lg font-semibold mb-2">Increase Efficiency</h3>
              <p className="text-sm opacity-80">Reduce operational costs by up to 30% with automated workflows</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Users className="w-8 h-8 mb-4 text-white/90" />
              <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
              <p className="text-sm opacity-80">24/7 dedicated support from logistics industry experts</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Award className="w-8 h-8 mb-4 text-white/90" />
              <h3 className="text-lg font-semibold mb-2">Proven Results</h3>
              <p className="text-sm opacity-80">Trusted by leading companies across 50+ countries</p>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 text-center">
            <p className="text-sm opacity-80 mb-4">Trusted by industry leaders</p>
            <div className="flex items-center justify-center space-x-8 text-white/60">
              <div className="text-xs">ISO 27001</div>
              <div className="w-1 h-1 bg-white/40 rounded-full"></div>
              <div className="text-xs">GDPR Compliant</div>
              <div className="w-1 h-1 bg-white/40 rounded-full"></div>
              <div className="text-xs">SOC 2 Type II</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}