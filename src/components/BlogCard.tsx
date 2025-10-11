import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface BlogCardProps {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
}

const BlogCard = ({ title, excerpt, image, category, date }: BlogCardProps) => {
  return (
    <Card className="overflow-hidden group cursor-pointer glass-card shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden aspect-video">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-3">
        <div className="flex items-center justify-between">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
            {category}
          </Badge>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
        <h3 className="text-xl font-display font-semibold line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground line-clamp-3 text-sm">
          {excerpt}
        </p>
      </CardContent>
      <CardFooter className="px-6 pb-6">
        <span className="text-sm text-primary font-medium group-hover:underline">
          Lire la suite →
        </span>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
