import { type LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/BlogCard";
import { ArrowRight, Star, Users, TrendingUp, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { usePosts } from "@/hooks/usePosts";
import { subscriberService } from "@/services/subscriberService";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import heroImage from "@/assets/hero-home.jpg";


interface StatItem {
  icon: LucideIcon;
  number: string;
  label: string;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  featured: boolean;
}

const Home = (): JSX.Element => {
  // Récupérer les posts featured depuis Appwrite
  const { data: allPosts, isLoading } = usePosts({ published: true });

  const featuredPosts = allPosts?.filter(post => post.featured).slice(0, 3) || [];


  const stats: StatItem[] = [
    { icon: BookOpen, number: "150+", label: "Articles Publiés" },
    { icon: Users, number: "50K+", label: "Lecteurs Mensuels" },
    { icon: Star, number: "4.9", label: "Note Moyenne" },
    { icon: TrendingUp, number: "3+", label: "Années d'Expérience" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section améliorée */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/40 via-background/30 to-background/90" />

          {/* Effets de particules */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
          <div className="inline-flex items-center space-x-2 glass-card rounded-2xl px-6 py-3 mb-8 border border-glass-border shadow-soft">
            <Star className="h-5 w-5 text-primary" fill="currentColor" />
            <span className="text-sm font-semibold text-primary">Nouveaux articles chaque semaine</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-display font-bold mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
            Habaru Blog
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            Votre espace de <span className="text-primary font-semibold">douceur</span> dédié à la beauté, au bien-être et à l'inspiration au quotidien
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/blog">
              <Button className="gradient-primary text-white rounded-2xl px-10 py-7 text-lg font-semibold shadow-elegant hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Explorer les articles
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="rounded-2xl px-10 py-7 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
                Découvrir mon histoire
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator amélioré */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm text-primary font-semibold">Scroll</span>
            <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20 -mt-20 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass-card rounded-3xl p-8 text-center border border-glass-border shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-display font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Posts Section améliorée */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-12 h-1 gradient-primary rounded-full"></div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">À la Une</span>
            <div className="w-12 h-1 gradient-primary rounded-full"></div>
          </div>
          <h2 className="text-5xl font-display font-bold mb-6">
            Articles Populaires
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Découvrez mes dernières inspirations et conseils pour cultiver la beauté au quotidien
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card rounded-3xl overflow-hidden shadow-soft border border-glass-border animate-pulse">
                <div className="w-full h-64 bg-muted"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-20 bg-muted rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredPosts.map((post, index) => (
              <div
                key={post.$id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <BlogCard
                  id={parseInt(post.$id.substring(0, 8), 16)}
                  title={post.title}
                  excerpt={post.excerpt}
                  image={post.imageUrl || ''}
                  category={post.category}
                  date={new Date(post.$createdAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                  readTime="5 min"
                  featured={post.featured}
                />
              </div>
            ))}
          </div>
        )}


        <div className="text-center">
          <Link to="/blog">
            <Button variant="outline" className="rounded-2xl px-12 py-6 text-lg border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all group">
              Voir tous les articles
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section améliorée */}
      <section className="container mx-auto px-4 py-20">
        <NewsletterSection />
      </section>
    </div>
  );
};

// Newsletter Section Component
const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: 'Email invalide',
        description: 'Veuillez entrer une adresse email valide',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await subscriberService.subscribe(email);

      if (result.success) {
        toast({
          title: 'Inscription réussie !',
          description: result.message,
        });
        setEmail('');
      } else {
        toast({
          title: 'Erreur',
          description: result.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue. Veuillez réessayer.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative rounded-3xl p-16 gradient-secondary shadow-elegant overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10 text-center">
        <div className="inline-flex items-center space-x-2 glass-card rounded-2xl px-6 py-3 mb-8 border border-white/20">
          <Star className="h-5 w-5 text-white" fill="currentColor" />
          <span className="text-white font-semibold">Rejoignez-nous</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
          Rejoignez la Communauté Habaru
        </h2>
        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          Recevez chaque semaine des inspirations, des conseils beauté exclusifs et des moments de douceur directement dans votre boîte mail
        </p>

        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-2xl px-6 py-4 glass-card border-white/20 text-white placeholder-white/60 focus:border-white"
            disabled={isSubmitting}
            required
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-white text-primary hover:bg-white/90 rounded-2xl px-8 py-4 text-lg font-semibold shadow-soft hover:shadow-elegant transition-all"
          >
            {isSubmitting ? 'Inscription...' : "S'inscrire"}
          </Button>
        </form>

        <p className="text-white/70 text-sm mt-4">
          ✨ Sans spam, désinscription à tout moment
        </p>
      </div>
    </div>
  );
};

export default Home;
