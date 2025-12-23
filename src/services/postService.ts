import { databases, storage, config } from '@/lib/appwrite';
import { Post, CreatePostData, UpdatePostData, PostFilters } from '@/types/post';
import { ID, Query } from 'appwrite';

/**
 * Service de gestion des posts (CRUD complet)
 */
class PostService {
    /**
     * Récupérer tous les posts avec filtres optionnels
     */
    async getPosts(filters?: PostFilters): Promise<Post[]> {
        try {
            const queries: string[] = [];

            // Filtrer par catégorie
            if (filters?.category) {
                queries.push(Query.equal('category', filters.category));
            }

            // Filtrer par featured
            if (filters?.featured !== undefined) {
                queries.push(Query.equal('featured', filters.featured));
            }

            // Filtrer par published (par défaut, on affiche uniquement les posts publiés pour le public)
            if (filters?.published !== undefined) {
                queries.push(Query.equal('published', filters.published));
            }

            // Recherche textuelle (dans le titre ou l'extrait)
            if (filters?.search) {
                queries.push(Query.search('title', filters.search));
            }

            // Trier par date de création (plus récent en premier)
            queries.push(Query.orderDesc('$createdAt'));

            const response = await databases.listDocuments(
                config.databaseId,
                config.postsCollectionId,
                queries
            );

            return response.documents as Post[];
        } catch (error) {
            console.error('Erreur lors de la récupération des posts:', error);
            throw new Error('Impossible de récupérer les posts');
        }
    }

    /**
     * Récupérer un post par son ID
     */
    async getPostById(postId: string): Promise<Post> {
        try {
            const post = await databases.getDocument(
                config.databaseId,
                config.postsCollectionId,
                postId
            );

            return post as Post;
        } catch (error) {
            console.error('Erreur lors de la récupération du post:', error);
            throw new Error('Post introuvable');
        }
    }

    /**
     * Créer un nouveau post
     */
    async createPost(data: CreatePostData): Promise<Post> {
        try {
            const post = await databases.createDocument(
                config.databaseId,
                config.postsCollectionId,
                ID.unique(),
                {
                    title: data.title,
                    excerpt: data.excerpt,
                    content: data.content,
                    category: data.category,
                    imageId: data.imageId || null,
                    imageUrl: data.imageUrl || null,
                    featured: data.featured || false,
                    published: data.published || false,
                }
            );

            return post as Post;
        } catch (error) {
            console.error('Erreur lors de la création du post:', error);
            throw new Error('Impossible de créer le post');
        }
    }

    /**
     * Mettre à jour un post existant
     */
    async updatePost(postId: string, data: UpdatePostData): Promise<Post> {
        try {
            const post = await databases.updateDocument(
                config.databaseId,
                config.postsCollectionId,
                postId,
                data
            );

            return post as Post;
        } catch (error) {
            console.error('Erreur lors de la mise à jour du post:', error);
            throw new Error('Impossible de mettre à jour le post');
        }
    }

    /**
     * Supprimer un post
     */
    async deletePost(postId: string): Promise<void> {
        try {
            // Récupérer le post pour obtenir l'imageId
            const post = await this.getPostById(postId);

            // Supprimer l'image associée si elle existe
            if (post.imageId) {
                await this.deleteImage(post.imageId);
            }

            // Supprimer le post
            await databases.deleteDocument(
                config.databaseId,
                config.postsCollectionId,
                postId
            );
        } catch (error) {
            console.error('Erreur lors de la suppression du post:', error);
            throw new Error('Impossible de supprimer le post');
        }
    }

    /**
     * Upload une image vers Appwrite Storage
     */
    async uploadImage(file: File): Promise<{ fileId: string; fileUrl: string }> {
        try {
            const fileId = ID.unique();

            // Upload le fichier
            const uploadedFile = await storage.createFile(
                config.storageBucketId,
                fileId,
                file
            );

            // Générer l'URL publique de l'image
            const fileUrl = this.getImageUrl(uploadedFile.$id);

            return {
                fileId: uploadedFile.$id,
                fileUrl,
            };
        } catch (error) {
            console.error('Erreur lors de l\'upload de l\'image:', error);
            throw new Error('Impossible d\'uploader l\'image');
        }
    }

    /**
     * Obtenir l'URL publique d'une image
     */
    getImageUrl(fileId: string): string {
        return storage.getFileView(config.storageBucketId, fileId).toString();
    }

    /**
     * Supprimer une image du storage
     */
    async deleteImage(fileId: string): Promise<void> {
        try {
            await storage.deleteFile(config.storageBucketId, fileId);
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'image:', error);
            // Ne pas throw ici pour ne pas bloquer la suppression du post
        }
    }

    /**
     * Récupérer les catégories uniques
     */
    async getCategories(): Promise<string[]> {
        try {
            const posts = await this.getPosts({ published: true });
            const categories = [...new Set(posts.map(post => post.category))];
            return categories.sort();
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories:', error);
            return [];
        }
    }
}

export const postService = new PostService();
