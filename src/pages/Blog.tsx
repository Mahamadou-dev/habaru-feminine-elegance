import { useState } from "react";
import { type LucideIcon } from "lucide-react";
import { Search, Filter, Grid3X3, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import BlogCard from "@/components/BlogCard";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import blog4 from "@/assets/blog-4.jpg";

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

type ViewMode = "grid" | "list";

const Blog = (): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const categories: string[] = ["Tous", "Beauté", "Mode", "Lifestyle", "Bien-être", "Conseils"];

  const allPosts: BlogPost[] = [
    {
      id: 1,
      title: "Les rituels de beauté pour une peau rayonnante",
      excerpt: "Découvrez mes secrets pour une routine de soin douce et efficace, adaptée aux peaux sensibles. Des produits naturels aux techniques ancestrales.",
      image: blog1,
      category: "Beauté",
      date: "15 Mars 2025",
      readTime: "5 min",
      featured: true
    },
    {
      id: 2,
      title: "Mode printemps : les tendances qui nous font rêver",
      excerpt: "Cette saison, on mise sur la douceur avec des tons pastel et des matières fluides. Découvrez comment adopter ces tendances avec élégance.",
      image: blog2,
      category: "Mode",
      date: "12 Mars 2025",
      readTime: "4 min",
      featured: true
    },
    {
      id: 3,
      title: "Créer un espace cocooning chez soi",
      excerpt: "Transformez votre intérieur en havre de paix avec ces astuces déco minimalistes. Ambiance douce et chaleureuse garantie.",
      image: blog3,
      category: "Lifestyle",
      date: "8 Mars 2025",
      readTime: "6 min",
      featured: false
    },
    {
      id: 4,
      title: "Routine bien-être : prendre soin de soi au quotidien",
      excerpt: "Des petits gestes simples pour cultiver la douceur et l'équilibre dans votre vie. Méditation, yoga et auto-massage.",
      image: blog4,
      category: "Bien-être",
      date: "5 Mars 2025",
      readTime: "7 min",
      featured: true
    },
    {
      id: 5,
      title: "Maquillage naturel : sublimer sa beauté avec délicatesse",
      excerpt: "Le secret d'un maquillage frais et lumineux qui met en valeur votre beauté naturelle. Produits clean et techniques simples.",
      image: blog1,
      category: "Beauté",
      date: "1 Mars 2025",
      readTime: "5 min",
      featured: false
    },
    {
      id: 6,
      title: "Garde-robe capsule : l'art de la simplicité élégante",
      excerpt: "Comment créer une garde-robe minimaliste et intemporelle qui simplifie votre quotidien tout en restant stylée.",
      image: blog2,
      category: "Mode",
      date: "28 Février 2025",
      readTime: "8 min",
      featured: false
    },
  ];

  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = selectedCategory === "Tous" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = allPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header avec hero */}
        <div className="relative rounded-3xl gradient-accent p-12 mb-16 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          <div className="relative z-10">
            <h1 className="text-6xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Le Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explorez mes articles sur la beauté, la mode, le bien-être et bien plus encore
            </p>
          </div>
        </div>

        {/* Featured Posts */}
        {selectedCategory === "Tous" && searchQuery === "" && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-display font-bold">Articles Populaires</h2>
              <div className="w-12 h-1 gradient-primary rounded-full"></div>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <div key={post.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <BlogCard {...post} featured={true} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Controls Section */}
        <div className="glass-card rounded-3xl p-6 mb-12 shadow-soft border border-glass-border">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 rounded-2xl border-primary/20 focus:border-primary glass-card"
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 glass-card rounded-2xl p-1 border border-glass-border">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-xl transition-all ${
                    viewMode === "grid" ? "gradient-primary text-white shadow-soft" : "text-muted-foreground hover:text-primary"
                  }`}
                  aria-label="Vue grille"
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-xl transition-all ${
                    viewMode === "list" ? "gradient-primary text-white shadow-soft" : "text-muted-foreground hover:text-primary"
                  }`}
                  aria-label="Vue liste"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              <div className="hidden sm:flex items-center space-x-2 text-muted-foreground">
                <Filter className="h-4 w-4" />
                <span className="text-sm">Filtres</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mt-6 pt-6 border-t border-glass-border">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer px-6 py-3 rounded-2xl transition-all text-sm font-medium ${
                  selectedCategory === category
                    ? "gradient-primary text-white shadow-soft"
                    : "border-primary/30 hover:border-primary hover:bg-primary/10 hover:shadow-soft"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-muted-foreground">
            {filteredPosts.length} article{filteredPosts.length > 1 ? 's' : ''} trouvé{filteredPosts.length > 1 ? 's' : ''}
          </p>
          <div className="text-sm text-muted-foreground">
            Tri: <span className="text-primary font-medium">Plus récent</span>
          </div>
        </div>

        {/* Blog Posts Grid/List */}
        <div className={
          viewMode === "grid" 
            ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            : "grid gap-6 max-w-4xl mx-auto"
        }>
          {filteredPosts.map((post, index) => (
            <div
              key={post.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BlogCard 
                {...post} 
                layout={viewMode === "list" ? "horizontal" : "vertical"}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft">
              <Search className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-4">Aucun article trouvé</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Essayez de modifier vos critères de recherche ou explorez une autre catégorie
            </p>
          </div>
        )}

        {/* Load More */}
        {filteredPosts.length > 0 && (
          <div className="text-center mt-16">
            <button className="glass-card border border-glass-border rounded-2xl px-8 py-4 hover:shadow-elegant transition-all hover:-translate-y-1 text-primary font-semibold">
              Charger plus d'articles
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;