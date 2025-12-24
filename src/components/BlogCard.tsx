import { type FC } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime?: string;
  featured?: boolean;
  layout?: "vertical" | "horizontal";
}

const BlogCard: FC<BlogCardProps> = ({
  id,
  title,
  excerpt,
  image,
  category,
  date,
  readTime = "5 min",
  featured = false,
  layout = "vertical"
}) => {
  if (layout === "horizontal") {
    return (
      <div className="glass-card rounded-3xl p-6 shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 border border-glass-border group animate-fade-in">
        <div className="flex gap-6">
          <div className="flex-shrink-0 w-48 h-48 rounded-2xl overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <div className="flex-1 flex flex-col justify-between py-2">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge className="gradient-primary text-white border-0 shadow-soft">
                  {category}
                </Badge>
                {featured && (
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    Populaire
                  </Badge>
                )}
              </div>

              <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {title}
              </h3>

              <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                {excerpt}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {readTime}
                </div>
              </div>

              <Link to={`/post/${id}`}>
                <Button variant="ghost" size="sm" className="rounded-full group-hover:bg-primary group-hover:text-white transition-all">
                  Lire
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 border border-glass-border group animate-fade-in">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <Badge className="gradient-primary text-white border-0 shadow-soft">
            {category}
          </Badge>
        </div>
        {featured && (
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="border-primary/30 text-primary bg-background/80 backdrop-blur-sm">
              Populaire
            </Badge>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {date}
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {readTime}
          </div>
        </div>

        <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>

        <Link to={`/post/${id}`}>
          <Button variant="ghost" className="w-full rounded-2xl group-hover:bg-primary group-hover:text-white transition-all">
            Lire l'article
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;