import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postService } from '@/services/postService';
import { Post, CreatePostData, UpdatePostData, PostFilters } from '@/types/post';

/**
 * Hook personnalisé pour récupérer les posts avec React Query
 */
export const usePosts = (filters?: PostFilters) => {
    return useQuery({
        queryKey: ['posts', filters],
        queryFn: () => postService.getPosts(filters),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

/**
 * Hook pour récupérer un post par son ID
 */
export const usePost = (postId: string) => {
    return useQuery({
        queryKey: ['post', postId],
        queryFn: () => postService.getPostById(postId),
        enabled: !!postId,
    });
};

/**
 * Hook pour créer un post
 */
export const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreatePostData) => postService.createPost(data),
        onSuccess: () => {
            // Invalider le cache des posts pour forcer un refresh
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });
};

/**
 * Hook pour mettre à jour un post
 */
export const useUpdatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ postId, data }: { postId: string; data: UpdatePostData }) =>
            postService.updatePost(postId, data),
        onSuccess: (_, variables) => {
            // Invalider le cache du post spécifique et de la liste
            queryClient.invalidateQueries({ queryKey: ['post', variables.postId] });
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });
};

/**
 * Hook pour supprimer un post
 */
export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (postId: string) => postService.deletePost(postId),
        onSuccess: () => {
            // Invalider le cache des posts
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });
};

/**
 * Hook pour uploader une image
 */
export const useUploadImage = () => {
    return useMutation({
        mutationFn: (file: File) => postService.uploadImage(file),
    });
};
