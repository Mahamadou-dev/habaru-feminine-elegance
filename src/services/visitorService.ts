import { databases, config } from '@/lib/appwrite';
import { ID, Query } from 'appwrite';

export interface VisitorStats {
    date: string;
    count: number;
}

export interface MonthlyStats {
    month: string;
    visitors: number;
}

/**
 * Service de tracking des visiteurs
 */
class VisitorService {
    /**
     * Enregistrer une visite (appelé à chaque chargement de page)
     */
    async trackVisit(): Promise<void> {
        try {
            const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

            // Vérifier si une entrée existe déjà pour aujourd'hui
            const response = await databases.listDocuments(
                config.databaseId,
                config.visitorsCollectionId,
                [Query.equal('date', today)]
            );

            if (response.documents.length > 0) {
                // Incrémenter le compteur existant
                const doc = response.documents[0];
                await databases.updateDocument(
                    config.databaseId,
                    config.visitorsCollectionId,
                    doc.$id,
                    { count: (doc.count as number) + 1 }
                );
            } else {
                // Créer une nouvelle entrée pour aujourd'hui
                await databases.createDocument(
                    config.databaseId,
                    config.visitorsCollectionId,
                    ID.unique(),
                    {
                        date: today,
                        count: 1,
                    }
                );
            }
        } catch (error) {
            console.error('Erreur lors du tracking de visite:', error);
            // Ne pas bloquer l'application si le tracking échoue
        }
    }

    /**
     * Récupérer les statistiques de visiteurs pour une année donnée
     */
    async getYearlyStats(year: number): Promise<MonthlyStats[]> {
        try {
            const startDate = `${year}-01-01`;
            const endDate = `${year}-12-31`;

            const response = await databases.listDocuments(
                config.databaseId,
                config.visitorsCollectionId,
                [
                    Query.greaterThanEqual('date', startDate),
                    Query.lessThanEqual('date', endDate),
                    Query.orderAsc('date'),
                    Query.limit(366), // Maximum de jours dans une année
                ]
            );

            // Grouper par mois
            const monthlyData: { [key: string]: number } = {};

            response.documents.forEach((doc) => {
                const date = doc.date as string;
                const month = date.substring(0, 7); // YYYY-MM
                const count = doc.count as number;

                if (monthlyData[month]) {
                    monthlyData[month] += count;
                } else {
                    monthlyData[month] = count;
                }
            });

            // Créer un tableau avec tous les mois de l'année
            const months = [
                'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
            ];

            const result: MonthlyStats[] = months.map((monthName, index) => {
                const monthKey = `${year}-${String(index + 1).padStart(2, '0')}`;
                return {
                    month: monthName,
                    visitors: monthlyData[monthKey] || 0,
                };
            });

            return result;
        } catch (error) {
            console.error('Erreur lors de la récupération des stats:', error);
            return [];
        }
    }

    /**
     * Récupérer le nombre total de visiteurs
     */
    async getTotalVisitors(): Promise<number> {
        try {
            const response = await databases.listDocuments(
                config.databaseId,
                config.visitorsCollectionId,
                [Query.limit(1000)] // Augmenter si nécessaire
            );

            return response.documents.reduce((total, doc) => total + (doc.count as number), 0);
        } catch (error) {
            console.error('Erreur lors du calcul du total:', error);
            return 0;
        }
    }

    /**
     * Récupérer les visiteurs d'aujourd'hui
     */
    async getTodayVisitors(): Promise<number> {
        try {
            const today = new Date().toISOString().split('T')[0];

            const response = await databases.listDocuments(
                config.databaseId,
                config.visitorsCollectionId,
                [Query.equal('date', today)]
            );

            return response.documents.length > 0 ? (response.documents[0].count as number) : 0;
        } catch (error) {
            console.error('Erreur lors de la récupération des visiteurs du jour:', error);
            return 0;
        }
    }

    /**
     * Récupérer les années disponibles
     */
    async getAvailableYears(): Promise<number[]> {
        try {
            const response = await databases.listDocuments(
                config.databaseId,
                config.visitorsCollectionId,
                [Query.orderDesc('date'), Query.limit(1000)]
            );

            const years = new Set<number>();
            response.documents.forEach((doc) => {
                const year = parseInt((doc.date as string).substring(0, 4));
                years.add(year);
            });

            return Array.from(years).sort((a, b) => b - a);
        } catch (error) {
            console.error('Erreur lors de la récupération des années:', error);
            return [new Date().getFullYear()];
        }
    }
}

export const visitorService = new VisitorService();
