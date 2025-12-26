import { useParams, Link } from "react-router-dom";
import { usePost } from "@/hooks/usePosts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, Share2, Bookmark } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const PostDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { toast } = useToast();
    // We need to handle the conversion of id if necessary, 
    // but usePost expects the Appwrite document ID (string)
    const { data: post, isLoading, error } = usePost(id || "");

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: post?.title,
                    text: post?.excerpt,
                    url: window.location.href,
                });
            } catch (error) {
                console.error("Error sharing:", error);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            toast({
                title: "Lien copié !",
                description: "Le lien de l'article a été copié dans votre presse-papier.",
            });
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen pt-24 pb-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <Skeleton className="w-24 h-10 mb-8 rounded-2xl" />
                    <Skeleton className="w-full h-[400px] mb-8 rounded-3xl" />
                    <div className="space-y-4">
                        <Skeleton className="w-3/4 h-12" />
                        <Skeleton className="w-1/2 h-6" />
                        <div className="space-y-2 pt-8">
                            <Skeleton className="w-full h-4" />
                            <Skeleton className="w-full h-4" />
                            <Skeleton className="w-full h-4" />
                            <Skeleton className="w-3/4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center">
                    <h2 className="text-3xl font-display font-bold mb-4">Article introuvable</h2>
                    <p className="text-muted-foreground mb-8">Désolé, l'article que vous recherchez n'existe pas ou a été déplacé.</p>
                    <Link to="/blog">
                        <Button className="gradient-primary text-white rounded-2xl px-8 py-4">
                            Retour au blog
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12">
            <article className="container mx-auto px-4 max-w-4xl">
                {/* Navigation & Actions */}
                <div className="flex items-center justify-between mb-8 animate-fade-in">
                    <Link to="/blog">
                        <Button variant="ghost" className="rounded-2xl hover:bg-primary/10 text-primary group">
                            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Retour au blog
                        </Button>
                    </Link>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full border-primary/20 text-primary hover:bg-primary/10"
                            onClick={handleShare}
                        >
                            <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full border-primary/20 text-primary hover:bg-primary/10">
                            <Bookmark className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="relative h-[250px] sm:h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-8 md:mb-12 shadow-elegant animate-fade-in">
                    <img
                        src={post.imageUrl || ""}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8">
                        <Badge className="gradient-primary text-white border-0 shadow-soft px-4 py-1.5 text-sm mb-4">
                            {post.category}
                        </Badge>
                    </div>
                </div>

                {/* Post Info */}
                <div className="mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            {new Date(post.$createdAt).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            5 min de lecture
                        </div>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-6 md:mb-8 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-4 py-6 border-y border-glass-border">
                        <div className="w-12 h-12 rounded-full gradient-secondary flex items-center justify-center text-white font-bold text-lg">
                            H
                        </div>
                        <div>
                            <div className="font-semibold">Habaru Team</div>
                            <div className="text-sm text-muted-foreground">Journaliste Reporter / Enquêteur</div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div
                    className="prose prose-lg dark:prose-invert max-w-none animate-fade-in post-content break-words overflow-hidden"
                    style={{ animationDelay: "0.2s" }}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Footer Actions */}
                <div className="mt-16 pt-8 border-t border-glass-border flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
                    <h3 className="text-2xl font-display font-bold mb-4 text-primary">Cet article vous a plu ?</h3>
                    <p className="text-muted-foreground mb-8 max-w-md"> Partagez-le avec vos amis ou sauvegardez-le pour plus tard !</p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                        <Button
                            className="w-full sm:w-auto gradient-primary text-white rounded-2xl px-10 py-6 font-semibold shadow-elegant hover:scale-105 transition-all"
                            onClick={handleShare}
                        >
                            Partager l'article
                        </Button>
                        <Link to="/#newsletter" className="w-full sm:w-auto">
                            <Button variant="outline" className="w-full rounded-2xl px-10 py-6 font-semibold border-2 border-primary text-primary hover:bg-primary/5 transition-all">
                                S'abonner à la newsletter
                            </Button>
                        </Link>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default PostDetail;
