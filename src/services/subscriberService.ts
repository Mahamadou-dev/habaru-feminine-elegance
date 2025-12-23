import { databases, config } from '@/lib/appwrite';
import { ID, Query } from 'appwrite';

export interface Subscriber {
    $id: string;
    email: string;
    subscribedAt: string;
    active: boolean;
}

export interface MonthlySubscribers {
    month: string;
    subscribers: number;
}

/**
 * Service de gestion des abonnés newsletter
 */
class SubscriberService {
    /**
     * Ajouter un nouvel abonné
     */
    async subscribe(email: string): Promise<{ success: boolean; message: string }> {
        try {
            // Vérifier si l'email existe déjà
            const existing = await databases.listDocuments(
                config.databaseId,
                config.subscribersCollectionId,
                [Query.equal('email', email)]
            );

            if (existing.documents.length > 0) {
                const subscriber = existing.documents[0];

                if (subscriber.active) {
                    return {
                        success: false,
                        message: 'Cet email est déjà abonné à la newsletter',
                    };
                } else {
                    // Réactiver l'abonnement
                    await databases.updateDocument(
                        config.databaseId,
                        config.subscribersCollectionId,
                        subscriber.$id,
                        { active: true }
                    );

                    return {
                        success: true,
                        message: 'Votre abonnement a été réactivé avec succès !',
                    };
                }
            }

            // Créer un nouvel abonné
            await databases.createDocument(
                config.databaseId,
                config.subscribersCollectionId,
                ID.unique(),
                {
                    email,
                    subscribedAt: new Date().toISOString(),
                    active: true,
                }
            );

            return {
                success: true,
                message: 'Merci pour votre abonnement ! Vous recevrez nos prochaines newsletters.',
            };
        } catch (error) {
            console.error('Erreur lors de l\'abonnement:', error);
            return {
                success: false,
                message: 'Une erreur est survenue. Veuillez réessayer.',
            };
        }
    }

    /**
     * Récupérer tous les abonnés actifs
     */
    async getActiveSubscribers(): Promise<Subscriber[]> {
        try {
            const response = await databases.listDocuments(
                config.databaseId,
                config.subscribersCollectionId,
                [
                    Query.equal('active', true),
                    Query.orderDesc('subscribedAt'),
                    Query.limit(1000),
                ]
            );

            return response.documents as unknown as Subscriber[];
        } catch (error) {
            console.error('Erreur lors de la récupération des abonnés:', error);
            return [];
        }
    }

    /**
     * Récupérer le nombre total d'abonnés actifs
     */
    async getTotalSubscribers(): Promise<number> {
        try {
            const response = await databases.listDocuments(
                config.databaseId,
                config.subscribersCollectionId,
                [Query.equal('active', true), Query.limit(1)]
            );

            return response.total;
        } catch (error) {
            console.error('Erreur lors du comptage des abonnés:', error);
            return 0;
        }
    }

    /**
     * Récupérer les statistiques mensuelles pour une année
     */
    async getYearlyStats(year: number): Promise<MonthlySubscribers[]> {
        try {
            const startDate = new Date(year, 0, 1).toISOString();
            const endDate = new Date(year, 11, 31, 23, 59, 59).toISOString();

            const response = await databases.listDocuments(
                config.databaseId,
                config.subscribersCollectionId,
                [
                    Query.greaterThanEqual('subscribedAt', startDate),
                    Query.lessThanEqual('subscribedAt', endDate),
                    Query.orderAsc('subscribedAt'),
                    Query.limit(1000),
                ]
            );

            // Grouper par mois
            const monthlyData: { [key: string]: number } = {};

            response.documents.forEach((doc) => {
                const date = new Date(doc.subscribedAt as string);
                const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

                if (monthlyData[monthKey]) {
                    monthlyData[monthKey]++;
                } else {
                    monthlyData[monthKey] = 1;
                }
            });

            // Créer un tableau avec tous les mois de l'année
            const months = [
                'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
            ];

            const result: MonthlySubscribers[] = months.map((monthName, index) => {
                const monthKey = `${year}-${String(index + 1).padStart(2, '0')}`;
                return {
                    month: monthName,
                    subscribers: monthlyData[monthKey] || 0,
                };
            });

            return result;
        } catch (error) {
            console.error('Erreur lors de la récupération des stats:', error);
            return [];
        }
    }

    /**
     * Désabonner un utilisateur
     */
    async unsubscribe(subscriberId: string): Promise<boolean> {
        try {
            await databases.updateDocument(
                config.databaseId,
                config.subscribersCollectionId,
                subscriberId,
                { active: false }
            );
            return true;
        } catch (error) {
            console.error('Erreur lors de la désinscription:', error);
            return false;
        }
    }

    /**
     * Supprimer un abonné
     */
    async deleteSubscriber(subscriberId: string): Promise<boolean> {
        try {
            await databases.deleteDocument(
                config.databaseId,
                config.subscribersCollectionId,
                subscriberId
            );
            return true;
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            return false;
        }
    }

    /**
     * Récupérer les années disponibles
     */
    async getAvailableYears(): Promise<number[]> {
        try {
            const response = await databases.listDocuments(
                config.databaseId,
                config.subscribersCollectionId,
                [Query.orderDesc('subscribedAt'), Query.limit(1000)]
            );

            const years = new Set<number>();
            response.documents.forEach((doc) => {
                const year = new Date(doc.subscribedAt as string).getFullYear();
                years.add(year);
            });

            return Array.from(years).sort((a, b) => b - a);
        } catch (error) {
            console.error('Erreur lors de la récupération des années:', error);
            return [new Date().getFullYear()];
        }
    }
}

export const subscriberService = new SubscriberService();
