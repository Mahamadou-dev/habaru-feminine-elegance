import { Heart, Sparkles, BookOpen } from "lucide-react";
import portrait from "@/assets/portrait.jpg";

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            À propos
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Bienvenue dans mon univers de douceur et d'inspiration
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Portrait Section */}
          <div className="glass-card rounded-3xl p-8 md:p-12 mb-12 shadow-elegant animate-fade-in">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-soft">
                  <img
                    src={portrait}
                    alt="Portrait"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 gradient-primary rounded-full blur-3xl opacity-30 animate-float" />
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-display font-bold">
                  Bonjour, je suis Emma
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Bienvenue sur Habaru Blog, mon espace dédié à la beauté, au bien-être et à tout ce qui rend la vie plus douce. J'ai créé ce blog pour partager avec vous mes inspirations, mes découvertes et mes petits bonheurs du quotidien.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Passionnée par l'univers de la beauté et du lifestyle depuis toujours, je crois fermement que prendre soin de soi est un acte d'amour essentiel qui rayonne dans tous les aspects de notre vie.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card rounded-2xl p-6 text-center animate-fade-in hover:shadow-elegant transition-all hover:-translate-y-1" style={{ animationDelay: "0.1s" }}>
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">
                Authenticité
              </h3>
              <p className="text-sm text-muted-foreground">
                Je partage mes expériences réelles et mes recommandations sincères
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 text-center animate-fade-in hover:shadow-elegant transition-all hover:-translate-y-1" style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">
                Inspiration
              </h3>
              <p className="text-sm text-muted-foreground">
                Trouver la beauté dans les petits détails de la vie quotidienne
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 text-center animate-fade-in hover:shadow-elegant transition-all hover:-translate-y-1" style={{ animationDelay: "0.3s" }}>
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">
                Partage
              </h3>
              <p className="text-sm text-muted-foreground">
                Créer une communauté bienveillante autour de nos passions communes
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="glass-card rounded-3xl p-8 md:p-12 gradient-accent shadow-elegant animate-fade-in">
            <h2 className="text-3xl font-display font-bold mb-6 text-center">
              Ma Mission
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                À travers Habaru Blog, je souhaite créer un espace où la beauté rime avec douceur et bienveillance. Mon objectif est de vous inspirer à cultiver une relation saine et joyeuse avec vous-même, à travers des rituels de beauté, des conseils lifestyle et des moments de partage authentiques.
              </p>
              <p>
                Je crois que la beauté véritable naît de l'équilibre entre prendre soin de son apparence et nourrir son bien-être intérieur. C'est cette philosophie qui guide chacun de mes articles et de mes recommandations.
              </p>
              <p>
                Merci de faire partie de cette aventure. J'espère que vous trouverez ici inspiration, réconfort et de nouvelles idées pour embellir votre quotidien. N'hésitez pas à me contacter sur les réseaux sociaux pour échanger et partager vos propres expériences !
              </p>
            </div>
            <div className="text-center mt-8">
              <p className="font-display text-2xl">Avec tendresse,</p>
              <p className="font-display text-3xl font-bold text-primary mt-2">Emma</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
