import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-home.jpg";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const Home = () => {
  const featuredPosts = [
    {
      id: 1,
      title: "Les rituels de beauté pour une peau rayonnante",
      excerpt: "Découvrez mes secrets pour une routine de soin douce et efficace, adaptée aux peaux sensibles.",
      image: blog1,
      category: "Beauté",
      date: "15 Mars 2025",
    },
    {
      id: 2,
      title: "Mode printemps : les tendances qui nous font rêver",
      excerpt: "Cette saison, on mise sur la douceur avec des tons pastel et des matières fluides.",
      image: blog2,
      category: "Mode",
      date: "12 Mars 2025",
    },
    {
      id: 3,
      title: "Créer un espace cocooning chez soi",
      excerpt: "Transformez votre intérieur en havre de paix avec ces astuces déco minimalistes.",
      image: blog3,
      category: "Lifestyle",
      date: "8 Mars 2025",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background/90" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Bienvenue sur Habaru Blog
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Un espace de douceur dédié à la beauté, au bien-être et à l'inspiration au quotidien
          </p>
          <Link to="/blog">
            <Button className="gradient-primary text-white rounded-full px-8 py-6 text-lg shadow-elegant hover:scale-105 transition-transform">
              Découvrir les articles
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-display font-bold mb-4">
            Articles à la Une
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez mes dernières inspirations et conseils pour cultiver la beauté au quotidien
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <div
              key={post.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BlogCard {...post} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/blog">
            <Button variant="outline" className="rounded-full px-8 border-primary text-primary hover:bg-primary hover:text-white transition-all">
              Voir tous les articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="glass-card rounded-3xl p-12 text-center gradient-secondary shadow-elegant">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">
            Rejoignez la communauté Habaru
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Recevez chaque semaine des inspirations, des conseils beauté et des moments de douceur directement dans votre boîte mail
          </p>
          <Button className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-lg shadow-soft">
            S'inscrire à la newsletter
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
