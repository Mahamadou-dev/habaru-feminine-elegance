import BlogCard from "@/components/BlogCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import blog4 from "@/assets/blog-4.jpg";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");

  const categories = ["Tous", "Beauté", "Mode", "Lifestyle", "Bien-être"];

  const allPosts = [
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
    {
      id: 4,
      title: "Routine bien-être : prendre soin de soi au quotidien",
      excerpt: "Des petits gestes simples pour cultiver la douceur et l'équilibre dans votre vie.",
      image: blog4,
      category: "Bien-être",
      date: "5 Mars 2025",
    },
    {
      id: 5,
      title: "Maquillage naturel : sublimer sa beauté avec délicatesse",
      excerpt: "Le secret d'un maquillage frais et lumineux qui met en valeur votre beauté naturelle.",
      image: blog1,
      category: "Beauté",
      date: "1 Mars 2025",
    },
    {
      id: 6,
      title: "Garde-robe capsule : l'art de la simplicité élégante",
      excerpt: "Comment créer une garde-robe minimaliste et intemporelle qui simplifie votre quotidien.",
      image: blog2,
      category: "Mode",
      date: "28 Février 2025",
    },
  ];

  const filteredPosts =
    selectedCategory === "Tous"
      ? allPosts
      : allPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Explorez mes articles sur la beauté, la mode et le bien-être
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Rechercher un article..."
              className="pl-12 rounded-full border-primary/20 focus:border-primary glass-card"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`cursor-pointer px-6 py-2 rounded-full transition-all ${
                selectedCategory === category
                  ? "gradient-primary text-white shadow-soft"
                  : "border-primary/30 hover:border-primary hover:bg-primary/10"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <div
              key={post.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BlogCard {...post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
