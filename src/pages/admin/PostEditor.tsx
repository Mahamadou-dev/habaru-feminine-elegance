import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreatePost, useUpdatePost, usePost, useUploadImage } from '@/hooks/usePosts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/admin/ImageUpload';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const PostEditor: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { toast } = useToast();
    const isEditMode = !!id;

    // Hooks
    const { data: existingPost, isLoading: isLoadingPost } = usePost(id || '');
    const createPostMutation = useCreatePost();
    const updatePostMutation = useUpdatePost();
    const uploadImageMutation = useUploadImage();

    // Form state
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [featured, setFeatured] = useState(false);
    const [published, setPublished] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [currentImageUrl, setCurrentImageUrl] = useState<string>('');
    const [currentImageId, setCurrentImageId] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories = ['Investigation', 'Reportage', 'Actualité', 'Portrait', 'Brève', 'Filet', 'Sport', 'Société', 'Santé', 'Économie', 'Politique'];

    // Load existing post data
    useEffect(() => {
        if (existingPost) {
            setTitle(existingPost.title);
            setExcerpt(existingPost.excerpt);
            setContent(existingPost.content);
            setCategory(existingPost.category);
            setFeatured(existingPost.featured);
            setPublished(existingPost.published);
            setCurrentImageUrl(existingPost.imageUrl || '');
            setCurrentImageId(existingPost.imageId || '');
        }
    }, [existingPost]);

    const handleSubmit = async (e: React.FormEvent, shouldPublish: boolean) => {
        e.preventDefault();

        if (!title || !excerpt || !content || !category) {
            toast({
                title: 'Erreur',
                description: 'Veuillez remplir tous les champs obligatoires',
                variant: 'destructive',
            });
            return;
        }

        setIsSubmitting(true);

        try {
            let imageId = currentImageId;
            let imageUrl = currentImageUrl;

            // Upload new image if selected
            if (imageFile) {
                const uploadResult = await uploadImageMutation.mutateAsync(imageFile);
                imageId = uploadResult.fileId;
                imageUrl = uploadResult.fileUrl;
            }

            const postData = {
                title,
                excerpt,
                content,
                category,
                featured,
                published: shouldPublish,
                imageId: imageId || undefined,
                imageUrl: imageUrl || undefined,
            };

            if (isEditMode && id) {
                await updatePostMutation.mutateAsync({ postId: id, data: postData });
                toast({
                    title: 'Post mis à jour',
                    description: shouldPublish ? 'Le post a été publié' : 'Le post a été sauvegardé',
                });
            } else {
                await createPostMutation.mutateAsync(postData);
                toast({
                    title: 'Post créé',
                    description: shouldPublish ? 'Le post a été publié' : 'Le post a été sauvegardé en brouillon',
                });
            }

            // Attendre un peu pour que React Query invalide le cache
            setTimeout(() => {
                navigate('/admin/dashboard', { replace: true });
            }, 300);
        } catch (error) {
            toast({
                title: 'Erreur',
                description: 'Impossible de sauvegarder le post',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isEditMode && isLoadingPost) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Chargement du post...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <Button
                            onClick={() => navigate('/admin/dashboard')}
                            variant="outline"
                            size="sm"
                            className="rounded-xl flex-shrink-0"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Retour
                        </Button>
                        <h1 className="text-2xl sm:text-3xl font-display font-bold">
                            {isEditMode ? 'Modifier le post' : 'Nouveau post'}
                        </h1>
                    </div>
                </div>

                {/* Form */}
                <form className="space-y-8">
                    {/* Image Upload */}
                    <div className="glass-card rounded-3xl p-6 border border-glass-border shadow-soft">
                        <Label className="text-lg font-semibold mb-4 block">Image de couverture</Label>
                        <ImageUpload
                            onImageSelect={setImageFile}
                            currentImageUrl={currentImageUrl}
                            onImageRemove={() => {
                                setImageFile(null);
                                setCurrentImageUrl('');
                                setCurrentImageId('');
                            }}
                        />
                    </div>

                    {/* Basic Info */}
                    <div className="glass-card rounded-3xl p-6 border border-glass-border shadow-soft space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-sm font-medium">
                                Titre *
                            </Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Le titre de votre post"
                                className="rounded-2xl border-primary/20 focus:border-primary"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="excerpt" className="text-sm font-medium">
                                Extrait *
                            </Label>
                            <Textarea
                                id="excerpt"
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                placeholder="Un court résumé de votre post (max 500 caractères)"
                                className="rounded-2xl border-primary/20 focus:border-primary min-h-[100px]"
                                maxLength={500}
                                required
                            />
                            <p className="text-xs text-muted-foreground text-right">
                                {excerpt.length}/500 caractères
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-sm font-medium">
                                Catégorie *
                            </Label>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setCategory(cat)}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border-2 ${category === cat
                                            ? "gradient-primary text-white border-transparent shadow-soft"
                                            : "border-primary/20 text-muted-foreground hover:border-primary/40"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                            {/* Hidden input for validation if needed */}
                            <input type="hidden" name="category" value={category} required />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="glass-card rounded-3xl p-6 border border-glass-border shadow-soft space-y-4">
                        <Label htmlFor="content" className="text-lg font-semibold">
                            Contenu *
                        </Label>
                        <Textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Écrivez le contenu complet de votre post ici..."
                            className="rounded-2xl border-primary/20 focus:border-primary min-h-[400px] font-mono text-sm"
                            required
                        />
                        <p className="text-xs text-muted-foreground">
                            Vous pouvez utiliser du texte simple. Le formatage sera appliqué automatiquement.
                        </p>
                    </div>

                    {/* Settings */}
                    <div className="glass-card rounded-3xl p-6 border border-glass-border shadow-soft space-y-6">
                        <h3 className="text-lg font-semibold">Paramètres</h3>

                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label htmlFor="featured" className="text-sm font-medium">
                                    Mettre ce post à la une
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                    Afficher ce post dans le slider de la page d'accueil
                                </p>
                            </div>
                            <Switch
                                id="featured"
                                checked={featured}
                                onCheckedChange={setFeatured}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label htmlFor="published" className="text-sm font-medium">
                                    Publier immédiatement
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                    Rendre ce post visible au public
                                </p>
                            </div>
                            <Switch
                                id="published"
                                checked={published}
                                onCheckedChange={setPublished}
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-end">
                        <Button
                            type="button"
                            onClick={(e) => handleSubmit(e, false)}
                            variant="outline"
                            className="rounded-2xl w-full sm:w-auto order-2 sm:order-1"
                            disabled={isSubmitting}
                        >
                            <Save className="mr-2 h-4 w-4" />
                            <span className="flex-1 text-center">Sauvegarder en brouillon</span>
                        </Button>
                        <Button
                            type="button"
                            onClick={(e) => handleSubmit(e, true)}
                            className="gradient-primary text-white rounded-2xl shadow-soft w-full sm:w-auto order-1 sm:order-2"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center w-full">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    <span>Enregistrement...</span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center w-full">
                                    <Eye className="mr-2 h-4 w-4" />
                                    <span>Publier</span>
                                </div>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostEditor;
