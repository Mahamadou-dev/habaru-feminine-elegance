import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { visitorService, MonthlyStats } from '@/services/visitorService';
import { subscriberService, MonthlySubscribers, Subscriber } from '@/services/subscriberService';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, TrendingUp, Users, Mail, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const AnalyticsDashboard: React.FC = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const currentYear = new Date().getFullYear();

    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [availableYears, setAvailableYears] = useState<number[]>([currentYear]);
    const [visitorStats, setVisitorStats] = useState<MonthlyStats[]>([]);
    const [subscriberStats, setSubscriberStats] = useState<MonthlySubscribers[]>([]);
    const [totalVisitors, setTotalVisitors] = useState(0);
    const [todayVisitors, setTodayVisitors] = useState(0);
    const [totalSubscribers, setTotalSubscribers] = useState(0);
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, [selectedYear]);

    const loadData = async () => {
        setIsLoading(true);
        try {
            // Charger les années disponibles
            const [visitorYears, subscriberYears] = await Promise.all([
                visitorService.getAvailableYears(),
                subscriberService.getAvailableYears(),
            ]);

            const allYears = Array.from(new Set([...visitorYears, ...subscriberYears])).sort((a, b) => b - a);
            setAvailableYears(allYears.length > 0 ? allYears : [currentYear]);

            // Charger les statistiques
            const [visitors, subs, total, today, totalSubs, subsList] = await Promise.all([
                visitorService.getYearlyStats(selectedYear),
                subscriberService.getYearlyStats(selectedYear),
                visitorService.getTotalVisitors(),
                visitorService.getTodayVisitors(),
                subscriberService.getTotalSubscribers(),
                subscriberService.getActiveSubscribers(),
            ]);

            setVisitorStats(visitors);
            setSubscriberStats(subs);
            setTotalVisitors(total);
            setTodayVisitors(today);
            setTotalSubscribers(totalSubs);
            setSubscribers(subsList);
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fonction pour copier les emails dans le presse-papier
    const handleCopyEmails = async () => {
        const emails = subscribers.map(sub => sub.email).join(', ');
        try {
            await navigator.clipboard.writeText(emails);
            toast({
                title: 'Emails copiés !',
                description: `${subscribers.length} emails copiés dans le presse-papier`,
            });
        } catch (error) {
            toast({
                title: 'Erreur',
                description: 'Impossible de copier les emails',
                variant: 'destructive',
            });
        }
    };

    // Fonction pour exporter en CSV
    const handleExportCSV = () => {
        const csvContent = [
            ['Email', 'Date d\'inscription', 'Statut'].join(','),
            ...subscribers.map(sub => [
                sub.email,
                new Date(sub.subscribedAt).toLocaleDateString('fr-FR'),
                sub.active ? 'Actif' : 'Inactif'
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', `abonnes_newsletter_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
            title: 'Export réussi !',
            description: `${subscribers.length} abonnés exportés en CSV`,
        });
    };

    // Combiner les données pour le graphique
    const chartData = visitorStats.map((stat, index) => ({
        month: stat.month,
        visiteurs: stat.visitors,
        abonnés: subscriberStats[index]?.subscribers || 0,
    }));

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Chargement des statistiques...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Button
                            onClick={() => navigate('/admin/dashboard')}
                            variant="outline"
                            size="sm"
                            className="rounded-xl"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Retour
                        </Button>
                        <h1 className="text-4xl font-display font-bold">Statistiques</h1>
                    </div>

                    {/* Sélecteur d'année */}
                    <div className="flex gap-2">
                        {availableYears.map((year) => (
                            <Button
                                key={year}
                                onClick={() => setSelectedYear(year)}
                                variant={selectedYear === year ? 'default' : 'outline'}
                                className="rounded-xl"
                            >
                                {year}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="glass-card rounded-3xl p-6 border border-glass-border shadow-soft">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Total Visiteurs</p>
                                <p className="text-3xl font-display font-bold text-primary">{totalVisitors.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center">
                                <TrendingUp className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="glass-card rounded-3xl p-6 border border-glass-border shadow-soft">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Aujourd'hui</p>
                                <p className="text-3xl font-display font-bold text-green-600">{todayVisitors}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                                <Users className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="glass-card rounded-3xl p-6 border border-glass-border shadow-soft">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Abonnés Newsletter</p>
                                <p className="text-3xl font-display font-bold text-purple-600">{totalSubscribers}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                                <Mail className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Graphique */}
                <div className="glass-card rounded-3xl p-8 border border-glass-border shadow-soft mb-12">
                    <h2 className="text-2xl font-display font-bold mb-6">Évolution {selectedYear}</h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis
                                dataKey="month"
                                tick={{ fontSize: 12 }}
                                angle={-45}
                                textAnchor="end"
                                height={80}
                            />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '12px',
                                    padding: '12px'
                                }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="visiteurs"
                                stroke="#8b5cf6"
                                strokeWidth={3}
                                dot={{ fill: '#8b5cf6', r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="abonnés"
                                stroke="#10b981"
                                strokeWidth={3}
                                dot={{ fill: '#10b981', r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Liste des abonnés */}
                <div className="glass-card rounded-3xl p-8 border border-glass-border shadow-soft">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-display font-bold">Abonnés Newsletter ({subscribers.length})</h2>

                        {subscribers.length > 0 && (
                            <div className="flex gap-2">
                                <Button
                                    onClick={handleCopyEmails}
                                    variant="outline"
                                    className="rounded-xl"
                                    size="sm"
                                >
                                    <Mail className="h-4 w-4 mr-2" />
                                    Copier les emails
                                </Button>
                                <Button
                                    onClick={handleExportCSV}
                                    className="gradient-primary text-white rounded-xl"
                                    size="sm"
                                >
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Exporter CSV
                                </Button>
                            </div>
                        )}
                    </div>

                    {subscribers.length === 0 ? (
                        <div className="text-center py-12">
                            <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">Aucun abonné pour le moment</p>
                        </div>
                    ) : (
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {subscribers.map((subscriber) => (
                                <div
                                    key={subscriber.$id}
                                    className="flex items-center justify-between p-4 rounded-2xl border border-glass-border hover:shadow-soft transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Mail className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{subscriber.email}</p>
                                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(subscriber.subscribedAt).toLocaleDateString('fr-FR', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {subscriber.active && (
                                            <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
                                                Actif
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
