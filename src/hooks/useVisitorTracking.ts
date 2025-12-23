import { useEffect } from 'react';
import { visitorService } from '@/services/visitorService';

/**
 * Hook pour tracker automatiquement les visiteurs
 * À utiliser dans App.tsx ou dans chaque page
 */
export const useVisitorTracking = () => {
    useEffect(() => {
        // Tracker la visite au montage du composant
        visitorService.trackVisit();
    }, []);
};
