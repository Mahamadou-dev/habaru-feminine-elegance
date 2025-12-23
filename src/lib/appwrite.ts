import { Client, Account, Databases, Storage } from 'appwrite';

// Configuration Appwrite
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID || '';
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || '694aca8d000809ce02f6';
const APPWRITE_POSTS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID || 'posts';
const APPWRITE_STORAGE_BUCKET_ID = import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID || '694ad1fc001e6e67ca5d';
const APPWRITE_VISITORS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_VISITORS_COLLECTION_ID || 'visitors';
const APPWRITE_SUBSCRIBERS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_SUBSCRIBERS_COLLECTION_ID || 'subscribers';

// Initialisation du client Appwrite
const client = new Client();

client
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

// Instances des services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Export des IDs de configuration
export const config = {
  databaseId: APPWRITE_DATABASE_ID,
  postsCollectionId: APPWRITE_POSTS_COLLECTION_ID,
  storageBucketId: APPWRITE_STORAGE_BUCKET_ID,
  visitorsCollectionId: APPWRITE_VISITORS_COLLECTION_ID,
  subscribersCollectionId: APPWRITE_SUBSCRIBERS_COLLECTION_ID,
};

export default client;
