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
    { number: "5+", label: "Années de journalisme" },
    { number: "1500+", label: "Articles publiés" },
    { number: "100K+", label: "Lecteurs mensuels" },
    { number: "50+", label: "Enquêtes réalisées" },
  ];

  const values: ValueItem[] = [
    {
      icon: Heart,
      title: "Intégrité",
      description: "Une information vérifiée, sourcée et traitée avec une totale indépendance",
      delay: "0.1s"
    },
    {
      icon: Sparkles,
      title: "Vérité",
      description: "Apporter la lumière sur les faits et les enjeux qui façonnent notre société",
      delay: "0.2s"
    },
    {
      icon: BookOpen,
      title: "Proximité",
      description: "Être au plus près des citoyens pour porter leur voix et leurs préoccupations",
      delay: "0.3s"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header avec effet parallax */}
        <div className="relative text-center mb-12 md:mb-20 animate-fade-in overflow-hidden rounded-3xl py-12 md:py-20 gradient-accent">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-1 gradient-primary rounded-full"></div>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              À propos
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              L'information au service du citoyen : investigation, reportage et décryptage indépendant
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Portrait Section améliorée */}
          <div className="glass-card rounded-3xl p-6 md:p-12 mb-12 md:mb-16 shadow-elegant animate-fade-in border border-glass-border">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative group">
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-soft">
                  <img
                    src={portrait}
                    alt="Portrait d'Habaru"
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
                  <span className="text-primary font-semibold text-sm uppercase tracking-wider">Média d'Information</span>
                  <h2 className="text-4xl font-display font-bold mt-2 mb-4">
                    À propos de <span className="text-primary">Habaru Media</span>
                  </h2>
                </div>

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p className="text-lg">
                    <strong className="text-foreground">Habaru Media</strong> est un organe de presse indépendant dédié à l'investigation, au grand reportage et à l'analyse approfondie de l'actualité.
                  </p>
                  <p>
                    Nous croyons fermement que l'accès à une information de qualité est le pilier d'une société démocratique. Notre équipe s'engage à traiter les sujets complexes avec rigueur, sans concession et avec une volonté constante de clarté.
                  </p>
                  <p>
                    De la politique à l'économie, en passant par les enjeux de société et le sport, Habaru Media explore tous les terrains pour vous apporter un regard neuf et documenté sur le monde qui vous entoure.
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
          <div className="relative rounded-3xl p-8 md:p-12 gradient-primary shadow-elegant animate-fade-in overflow-hidden">
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

              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 md:mb-8 text-white">
                Informer pour Éclairer
              </h2>

              <div className="space-y-6 text-white/90 leading-relaxed max-w-3xl mx-auto text-lg">
                <p>
                  Notre mission à <strong>Habaru Media</strong> est de fournir un journalisme d'explication et de terrain. Nous refusons la course à l'immédiateté au profit du temps long nécessaire à la compréhension réelle des enjeux.
                </p>
                <p>
                  Par nos enquêtes et nos dossiers, nous souhaitons donner à nos lecteurs les clés pour se forger une opinion éclairée et participer activement au débat public.
                </p>
                <p>
                  Merci de soutenir un journalisme indépendant et rigoureux. Ensemble, redonnons du sens à l'actualité.
                </p>
              </div>

              <div className="text-center mt-12">
                <p className="font-display text-4xl font-bold text-white">L'Équipe Habaru Media</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;