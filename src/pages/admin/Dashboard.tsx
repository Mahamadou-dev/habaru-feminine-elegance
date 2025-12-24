import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { usePosts, useDeletePost } from '@/hooks/usePosts';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
    PlusCircle,
    LogOut,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    Star,
    Calendar,
    Sparkles,
    TrendingUp,
} from 'lucide-react';
import { Post } from '@/types/post';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';

const AdminDashboard: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [postToDelete, setPostToDelete] = useState<string | null>(null);

    // Récupérer tous les posts (publiés et brouillons)
    const { data: posts, isLoading, error } = usePosts();
    const deletePostMutation = useDeletePost();

    const handleLogout = async () => {
        await logout();
        navigate('/');
        toast({
            title: 'Déconnexion réussie',
            description: 'À bientôt !',
        });
    };

    const handleDeletePost = async () => {
        if (!postToDelete) return;

        try {
            await deletePostMutation.mutateAsync(postToDelete);
            toast({
                title: 'Post supprimé',
                description: 'Le post a été supprimé avec succès',
            });
            setPostToDelete(null);
        } catch (error) {
            toast({
                title: 'Erreur',
                description: 'Impossible de supprimer le post',
                variant: 'destructive',
            });
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Chargement des posts...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">Erreur lors du chargement des posts</p>
                    <Button onClick={() => window.location.reload()}>Réessayer</Button>
                </div>
            </div>
        );
    }

    const publishedPosts = posts?.filter((post) => post.published) || [];
    const draftPosts = posts?.filter((post) => !post.published) || [];

    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
                            Tableau de bord
                        </h1>
                        <p className="text-muted-foreground">
                            Bienvenue, <span className="text-primary font-semibold">{user?.name || user?.email}</span>
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Button
                            onClick={() => navigate('/admin/analytics')}
                            variant="outline"
                            className="rounded-2xl border-2 border-primary/30 hover:bg-primary/10 flex-1 sm:flex-none"
                        >
                            <TrendingUp className="mr-2 h-5 w-5" />
                            Statistiques
                        </Button>
                        <Button
                            onClick={() => navigate('/admin/post/new')}
                            className="gradient-primary text-white rounded-2xl shadow-soft hover:shadow-elegant transition-all flex-1 sm:flex-none"
                        >
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Nouveau post
                        </Button>
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="rounded-2xl border-2 flex-1 sm:flex-none"
                        >
                            <LogOut className="mr-2 h-5 w-5" />
                            <span className="hidden sm:inline">Déconnexion</span>
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="glass-card rounded-3xl p-6 border border-glass-border shadow-soft">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Total des posts</p>
                                <p className="text-3xl font-display font-bold text-primary">
                                    {posts?.length || 0}
                                </p>
                            </div>
                            <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center">
                                <Sparkles className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="glass-card rounded-3xl p-6 border border-glass-border shadow-soft">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Publiés</p>
                                <p className="text-3xl font-display font-bold text-green-600">
                                    {publishedPosts.length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                                <Eye className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="glass-card rounded-3xl p-6 border border-glass-border shadow-soft">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Brouillons</p>
                                <p className="text-3xl font-display font-bold text-orange-600">
                                    {draftPosts.length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                                <EyeOff className="h-6 w-6 text-orange-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Posts List */}
                <div className="space-y-8">
                    {/* Published Posts */}
                    {publishedPosts.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-display font-bold mb-6 flex items-center">
                                <Eye className="mr-2 h-6 w-6 text-green-600" />
                                Posts publiés ({publishedPosts.length})
                            </h2>
                            <div className="grid gap-4">
                                {publishedPosts.map((post) => (
                                    <PostCard
                                        key={post.$id}
                                        post={post}
                                        onEdit={() => navigate(`/admin/post/edit/${post.$id}`)}
                                        onDelete={() => setPostToDelete(post.$id)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Draft Posts */}
                    {draftPosts.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-display font-bold mb-6 flex items-center">
                                <EyeOff className="mr-2 h-6 w-6 text-orange-600" />
                                Brouillons ({draftPosts.length})
                            </h2>
                            <div className="grid gap-4">
                                {draftPosts.map((post) => (
                                    <PostCard
                                        key={post.$id}
                                        post={post}
                                        onEdit={() => navigate(`/admin/post/edit/${post.$id}`)}
                                        onDelete={() => setPostToDelete(post.$id)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Empty State */}
                    {posts?.length === 0 && (
                        <div className="text-center py-20">
                            <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft">
                                <Sparkles className="h-12 w-12 text-white" />
                            </div>
                            <h3 className="text-2xl font-display font-bold mb-4">
                                Aucun post pour le moment
                            </h3>
                            <p className="text-muted-foreground mb-8">
                                Commencez par créer votre premier post
                            </p>
                            <Button
                                onClick={() => navigate('/admin/post/new')}
                                className="gradient-primary text-white rounded-2xl shadow-soft"
                            >
                                <PlusCircle className="mr-2 h-5 w-5" />
                                Créer un post
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!postToDelete} onOpenChange={() => setPostToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                        <AlertDialogDescription>
                            Êtes-vous sûr de vouloir supprimer ce post ? Cette action est irréversible.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeletePost}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Supprimer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

// Post Card Component
interface PostCardProps {
    post: Post;
    onEdit: () => void;
    onDelete: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onEdit, onDelete }) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <div className="glass-card rounded-3xl p-4 sm:p-6 border border-glass-border shadow-soft hover:shadow-elegant transition-all group">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                {/* Image */}
                {post.imageUrl && (
                    <div className="flex-shrink-0 w-full sm:w-32 h-48 sm:h-32 rounded-2xl overflow-hidden">
                        <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                            <h3 className="text-xl font-display font-bold mb-2 line-clamp-1">
                                {post.title}
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-2">
                                {post.excerpt}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <Badge className="gradient-primary text-white border-0">
                            {post.category}
                        </Badge>
                        {post.featured && (
                            <Badge variant="outline" className="border-primary/30 text-primary">
                                <Star className="h-3 w-3 mr-1" fill="currentColor" />
                                Featured
                            </Badge>
                        )}
                        <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(post.$createdAt)}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                        <Button
                            onClick={onEdit}
                            size="sm"
                            variant="outline"
                            className="rounded-xl flex-1 sm:flex-none"
                        >
                            <Edit className="h-4 w-4 mr-1" />
                            Modifier
                        </Button>
                        <Button
                            onClick={onDelete}
                            size="sm"
                            variant="outline"
                            className="rounded-xl text-red-600 border-red-200 hover:bg-red-50 flex-1 sm:flex-none"
                        >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Supprimer
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
