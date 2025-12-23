import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Lock, Mail, Sparkles } from 'lucide-react';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast({
                title: 'Erreur',
                description: 'Veuillez remplir tous les champs',
                variant: 'destructive',
            });
            return;
        }

        setIsLoading(true);

        try {
            await login({ email, password });
            toast({
                title: 'Connexion réussie',
                description: 'Bienvenue dans votre espace admin',
            });
            navigate('/admin/dashboard');
        } catch (error) {
            toast({
                title: 'Erreur de connexion',
                description: error instanceof Error ? error.message : 'Email ou mot de passe incorrect',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="inline-flex items-center justify-center w-16 h-16 gradient-primary rounded-2xl mb-4 shadow-soft">
                        <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-display font-bold mb-2">
                        Espace Admin
                    </h1>
                    <p className="text-muted-foreground">
                        Connectez-vous pour gérer votre blog
                    </p>
                </div>

                {/* Login Form */}
                <div className="glass-card rounded-3xl p-8 shadow-elegant border border-glass-border animate-fade-in">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                                Email
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="votre@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 rounded-2xl border-primary/20 focus:border-primary"
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium">
                                Mot de passe
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 rounded-2xl border-primary/20 focus:border-primary"
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full gradient-primary text-white rounded-2xl py-6 text-lg font-semibold shadow-soft hover:shadow-elegant transition-all"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Connexion...
                                </div>
                            ) : (
                                'Se connecter'
                            )}
                        </Button>
                    </form>
                </div>

                {/* Back to home */}
                <div className="text-center mt-6">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/')}
                        className="text-muted-foreground hover:text-primary"
                    >
                        ← Retour au blog
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Login;
