export interface Post {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    imageId?: string;
    imageUrl?: string;
    featured: boolean;
    published: boolean;
}

export interface CreatePostData {
    title: string;
    excerpt: string;
    content: string;
    category: string;
    imageId?: string;
    imageUrl?: string;
    featured?: boolean;
    published?: boolean;
}

export interface UpdatePostData {
    title?: string;
    excerpt?: string;
    content?: string;
    category?: string;
    imageId?: string;
    imageUrl?: string;
    featured?: boolean;
    published?: boolean;
}

export interface PostFilters {
    category?: string;
    featured?: boolean;
    published?: boolean;
    search?: string;
}
