import { account } from '@/lib/appwrite';
import { LoginCredentials, User } from '@/types/auth';
import { ID } from 'appwrite';

/**
 * Service d'authentification pour gérer la connexion admin
 */
class AuthService {
    /**
     * Connexion avec email et mot de passe
     */
    async login(credentials: LoginCredentials): Promise<User> {
        try {
            // Vérifier s'il y a déjà une session active et la supprimer
            try {
                await account.deleteSession('current');
            } catch (error) {
                // Pas de session active, continuer
            }

            // Créer une nouvelle session email
            await account.createEmailPasswordSession(
                credentials.email,
                credentials.password
            );

            // Récupérer les informations de l'utilisateur
            const user = await account.get();
            return user as User;
        } catch (error) {
            console.error('Erreur de connexion:', error);
            throw new Error('Email ou mot de passe incorrect');
        }
    }

    /**
     * Déconnexion
     */
    async logout(): Promise<void> {
        try {
            await account.deleteSession('current');
        } catch (error) {
            console.error('Erreur de déconnexion:', error);
            throw error;
        }
    }

    /**
     * Récupérer l'utilisateur actuellement connecté
     */
    async getCurrentUser(): Promise<User | null> {
        try {
            const user = await account.get();
            return user as User;
        } catch (error) {
            return null;
        }
    }

    /**
     * Vérifier si une session est active
     */
    async checkSession(): Promise<boolean> {
        try {
            await account.get();
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Créer un compte admin (à utiliser une seule fois)
     * Cette méthode est utile pour créer le premier compte admin
     */
    async createAdminAccount(email: string, password: string, name: string): Promise<User> {
        try {
            const user = await account.create(
                ID.unique(),
                email,
                password,
                name
            );

            // Se connecter automatiquement après la création
            await this.login({ email, password });

            return user as User;
        } catch (error) {
            console.error('Erreur de création de compte:', error);
            throw new Error('Impossible de créer le compte admin');
        }
    }
}

export const authService = new AuthService();
