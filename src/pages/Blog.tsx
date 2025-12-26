import { useState } from "react";
import { type LucideIcon } from "lucide-react";
import { Search, Filter, Grid3X3, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import BlogCard from "@/components/BlogCard";
import { usePosts } from "@/hooks/usePosts";


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

  const categories = ["Tous", 'Investigation', 'Reportage', 'Actualité', 'Portrait', 'Brève', 'Filet', 'Sport', 'Société', 'Santé', 'Économie', 'Politique'];

  // Récupérer les posts depuis Appwrite
  const { data: allPosts, isLoading } = usePosts({ published: true });

  // Filtrage côté client
  const filteredPosts = (allPosts || []).filter(post => {
    const matchesCategory = selectedCategory === "Tous" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = (allPosts || []).filter(post => post.featured);


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
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Le Blog
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Découvrez nos enquêtes, reportages et analyses sur les enjeux qui façonnent notre monde
            </p>
          </div>
        </div>

        {/* Featured Posts */}
        {selectedCategory === "Tous" && searchQuery === "" && !isLoading && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-display font-bold">Articles Populaires</h2>
              <div className="w-12 h-1 gradient-primary rounded-full"></div>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <div key={post.$id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <BlogCard
                    id={post.$id}
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
                    featured={true}
                  />
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
                  className={`p-2 rounded-xl transition-all ${viewMode === "grid" ? "gradient-primary text-white shadow-soft" : "text-muted-foreground hover:text-primary"
                    }`}
                  aria-label="Vue grille"
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-xl transition-all ${viewMode === "list" ? "gradient-primary text-white shadow-soft" : "text-muted-foreground hover:text-primary"
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
                className={`cursor-pointer px-4 sm:px-6 py-2 sm:py-3 rounded-2xl transition-all text-xs sm:text-sm font-medium ${selectedCategory === category
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
          {isLoading ? (
            [1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass-card rounded-3xl overflow-hidden shadow-soft border border-glass-border animate-pulse">
                <div className="w-full h-64 bg-muted"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-20 bg-muted rounded"></div>
                </div>
              </div>
            ))
          ) : (
            filteredPosts.map((post, index) => (
              <div
                key={post.$id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <BlogCard
                  id={post.$id}
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
                  layout={viewMode === "list" ? "horizontal" : "vertical"}
                />
              </div>
            ))
          )}
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