import { type LucideIcon } from "lucide-react";
import { Heart, Sparkles, BookOpen, Instagram, Mail, Star } from "lucide-react";
import portrait from "@/assets/portrait.jpg";

interface StatItem {
  number: string;
  label: string;
}

interface ValueItem {
  icon: LucideIcon;
  title: string;
  description: string;
  delay: string;
}

const About = (): JSX.Element => {
  const stats: StatItem[] = [
    { number: "3+", label: "Années d'expérience" },
    { number: "150+", label: "Articles publiés" },
    { number: "50K+", label: "Lecteurs mensuels" },
    { number: "100+", label: "Produits testés" },
  ];

  const values: ValueItem[] = [
    {
      icon: Heart,
      title: "Authenticité",
      description: "Je partage mes expériences réelles et mes recommandations sincères",
      delay: "0.1s"
    },
    {
      icon: Sparkles,
      title: "Inspiration",
      description: "Trouver la beauté dans les petits détails de la vie quotidienne",
      delay: "0.2s"
    },
    {
      icon: BookOpen,
      title: "Partage",
      description: "Créer une communauté bienveillante autour de nos passions communes",
      delay: "0.3s"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header avec effet parallax */}
        <div className="relative text-center mb-20 animate-fade-in overflow-hidden rounded-3xl py-20 gradient-accent">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-1 gradient-primary rounded-full"></div>
            </div>
            <h1 className="text-6xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              À propos
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Bienvenue dans mon univers de douceur et d'inspiration, où la beauté rencontre l'authenticité
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Portrait Section améliorée */}
          <div className="glass-card rounded-3xl p-8 md:p-12 mb-16 shadow-elegant animate-fade-in border border-glass-border">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative group">
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-soft">
                  <img
                    src={portrait}
                    alt="Portrait d'Emma"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
                </div>
                
                {/* Effets décoratifs */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 gradient-primary rounded-full blur-3xl opacity-30 animate-float"></div>
                <div className="absolute -top-4 -left-4 w-24 h-24 gradient-secondary rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
                
                {/* Badge flottant */}
                <div className="absolute -top-4 -right-4 glass-card rounded-2xl p-3 shadow-soft animate-bounce">
                  <Star className="h-6 w-6 text-primary" fill="currentColor" />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-primary font-semibold text-sm uppercase tracking-wider">Bienvenue</span>
                  <h2 className="text-4xl font-display font-bold mt-2 mb-4">
                    Bonjour, je suis <span className="text-primary">Emma</span>
                  </h2>
                </div>
                
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p className="text-lg">
                    Bienvenue sur <strong className="text-foreground">Habaru Blog</strong>, mon espace dédié à la beauté, au bien-être et à tout ce qui rend la vie plus douce et lumineuse.
                  </p>
                  <p>
                    Passionnée par l'univers de la beauté et du lifestyle depuis toujours, je crois fermement que prendre soin de soi est un acte d'amour essentiel qui rayonne dans tous les aspects de notre vie.
                  </p>
                  <p>
                    À travers ce blog, je partage mes découvertes, mes routines bien-être et mes inspirations pour vous accompagner dans votre propre voyage vers une vie plus douce et épanouie.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center p-4 rounded-2xl bg-primary/5 border border-primary/10">
                      <div className="text-2xl font-display font-bold text-primary">{stat.number}</div>
                      <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex space-x-4 pt-4">
                  <button 
                    className="p-3 rounded-2xl gradient-primary text-white shadow-soft hover:shadow-elegant transition-all hover:scale-105"
                    aria-label="Suivez-moi sur Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </button>
                  <button 
                    className="p-3 rounded-2xl glass-card border border-glass-border shadow-soft hover:shadow-elegant transition-all hover:scale-105"
                    aria-label="Contactez-moi par email"
                  >
                    <Mail className="h-5 w-5 text-primary" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section améliorée */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {values.map((value, index) => (
              <div 
                key={index}
                className="glass-card rounded-3xl p-8 text-center animate-fade-in hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 group border border-glass-border"
                style={{ animationDelay: value.delay }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mx-auto shadow-soft group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-2xl font-display font-semibold mb-3 group-hover:text-primary transition-colors">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

          {/* Mission Section améliorée */}
          <div className="relative rounded-3xl p-12 gradient-primary shadow-elegant animate-fade-in overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
            </div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center space-x-2 mb-6 px-6 py-3 rounded-full glass-card border border-white/20">
                <Star className="h-5 w-5 text-white" fill="currentColor" />
                <span className="text-white font-semibold">Notre Mission</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-white">
                Cultiver la Beauté Intérieure et Extérieure
              </h2>
              
              <div className="space-y-6 text-white/90 leading-relaxed max-w-3xl mx-auto text-lg">
                <p>
                  À travers <strong>Habaru Blog</strong>, je souhaite créer un espace où la beauté rime avec <strong>douceur</strong> et <strong>bienveillance</strong>. Mon objectif est de vous inspirer à cultiver une relation saine et joyeuse avec vous-même.
                </p>
                <p>
                  Je crois que la beauté véritable naît de l'équilibre entre prendre soin de son apparence et nourrir son bien-être intérieur. C'est cette philosophie qui guide chacun de mes articles et de mes recommandations.
                </p>
                <p>
                  Merci de faire partie de cette aventure. J'espère que vous trouverez ici inspiration, réconfort et de nouvelles idées pour embellir votre quotidien.
                </p>
              </div>
              
              <div className="text-center mt-12">
                <p className="font-display text-2xl text-white/80 mb-2">Avec tendresse,</p>
                <p className="font-display text-4xl font-bold text-white">Emma</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;