import { type LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/BlogCard";
import { ArrowRight, Star, Users, TrendingUp, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { usePosts } from "@/hooks/usePosts";
import { subscriberService } from "@/services/subscriberService";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-home.jpg";
import { Badge } from "@/components/ui/badge";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from "react";


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

  const featuredPosts = allPosts?.filter(post => post.featured) || [];


  const stats: StatItem[] = [
    { icon: BookOpen, number: "150+", label: "Articles Publiés" },
    { icon: Users, number: "50K+", label: "Lecteurs Mensuels" },
    { icon: Star, number: "45+", label: "Sources Vérifiées" },
    { icon: TrendingUp, number: "5+", label: "Prix Media" },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [emblaApi, featuredPosts.length]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  return (
    <div className="min-h-screen">
      {/* Premium Hero Slider Section */}
      <section className="relative h-[85vh] sm:h-screen min-h-[600px] overflow-hidden bg-black">
        {isLoading ? (
          <div className="w-full h-full bg-muted animate-pulse" />
        ) : (
          <div className="embla h-full overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex h-full">
              {featuredPosts.map((post) => (
                <div key={post.$id} className="embla__slide relative flex-[0_0_100%] h-full">
                  {/* Backdrop Image */}
                  <img
                    src={post.imageUrl || heroImage}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* High-end Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 z-10" />

                  {/* Decorative Glass Overlay for Content */}
                  <div className="absolute inset-0 z-20 flex items-center pt-16 md:pt-0">
                    <div className="container mx-auto px-4 sm:px-6">
                      <div className="max-w-[95%] sm:max-w-4xl animate-fade-in-up">
                        <div className="inline-flex items-center space-x-2 glass-card rounded-full px-4 py-1.5 mb-6 border border-white/10 shadow-soft backdrop-blur-md">
                          <TrendingUp className="h-3.5 w-3.5 text-primary" fill="currentColor" />
                          <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-[0.2em]">À la Une</span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-white mb-6 leading-[1.15] text-shadow-elegant">
                          {post.title}
                        </h1>

                        <p className="text-base sm:text-lg md:text-xl text-white/70 mb-8 sm:mb-10 max-w-2xl leading-relaxed font-light line-clamp-2 sm:line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6">
                          <Link to={`/post/${post.$id}`}>
                            <Button className="group relative overflow-hidden gradient-primary text-white rounded-xl px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg font-bold shadow-elegant hover:shadow-2xl hover:scale-105 transition-all duration-500">
                              <span className="relative z-10 flex items-center">
                                Lire l'article
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                              </span>
                              {/* Hover Glow Effect */}
                              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            </Button>
                          </Link>

                          <div className="flex items-center gap-3 text-white/50 text-xs sm:text-sm font-medium">
                            <Badge className="bg-white/5 text-white border-white/10 backdrop-blur-sm px-3 py-1 text-[10px] sm:text-xs">
                              {post.category}
                            </Badge>
                            <span className="hidden sm:inline opacity-30">|</span>
                            <span>{new Date(post.$createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Navigation Indicators */}
        <div className="absolute bottom-12 left-0 right-0 z-30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 sm:gap-3">
                {featuredPosts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className="group relative h-1 transition-all duration-300"
                    style={{ width: selectedIndex === index ? '48px' : '24px' }}
                  >
                    <div className={`absolute inset-0 rounded-full transition-colors duration-500 ${selectedIndex === index ? 'bg-primary' : 'bg-white/10 group-hover:bg-white/30'}`} />
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className="text-white/30 font-display text-[10px] sm:text-xs tracking-[0.2em]">
                  <span className="text-white font-bold">{String(selectedIndex + 1).padStart(2, '0')}</span>
                  <span className="mx-2">/</span>
                  <span>{String(featuredPosts.length).padStart(2, '0')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section below Hero */}
      <section className="relative z-20 py-20 bg-background overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="container mx-auto px-4">
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
        </div>
      </section>

      {/* Removed Redundant Featured Posts Section as it's now in Hero */}

      {/* CTA Section améliorée */}
      <section id="newsletter" className="container mx-auto px-4 py-12 md:py-20">
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
    <div className="relative rounded-3xl p-8 sm:p-16 gradient-secondary shadow-elegant overflow-hidden">
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

        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 md:mb-6 text-white text-balance">
          Restez informé avec Habaru
        </h2>
        <p className="text-lg md:text-xl text-white/90 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
          Recevez nos décryptages, enquêtes exclusives et l'essentiel de l'actualité directement dans votre boîte mail chaque matin
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
