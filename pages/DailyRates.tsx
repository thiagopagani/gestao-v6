import React, { useState, useEffect } from 'react';
import { DailyRate, DailyRateStatus } from '../types/types';
import { Plus, Edit, Trash2, Loader, AlertTriangle } from 'lucide-react';

const DailyRates: React.FC = () => {
    const [dailyRates, setDailyRates] = useState<DailyRate[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDailyRates = async () => {
            try {
                const response = await fetch('/api/daily-rates');
                if (!response.ok) {
                    throw new Error('Failed to fetch data from the server.');
                }
                const data: DailyRate[] = await response.json();
                setDailyRates(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDailyRates();
    }, []);

    const getStatusClass = (status: DailyRateStatus) => {
        switch (status) {
            case DailyRateStatus.Paid: return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case DailyRateStatus.Pending: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case DailyRateStatus.Canceled: return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };
    
    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex justify-center items-center p-10">
                    <Loader className="animate-spin mr-2" size={24} />
                    <span>Carregando diárias...</span>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex justify-center items-center p-10 text-red-500">
                    <AlertTriangle className="mr-2" size={24} />
                    <span>Erro ao carregar dados: {error}</span>
                </div>
            );
        }

        return (
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Data</th>
                            <th scope="col" className="px-6 py-3">Funcionário</th>
                            <th scope="col" className="px-6 py-3">Cliente</th>
                            <th scope="col" className="px-6 py-3">Empresa</th>
                            <th scope="col" className="px-6 py-3">Valor (R$)</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dailyRates.map(rate => (
                            <tr key={rate.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">{new Date(rate.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{rate.employeeName}</td>
                                <td className="px-6 py-4">{rate.clientName}</td>
                                <td className="px-6 py-4">{rate.companyName}</td>
                                <td className="px-6 py-4 text-right">{rate.value.toFixed(2).replace('.',',')}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(rate.status)}`}>
                                        {rate.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                     <div className="flex justify-end space-x-2">
                                        <button className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"><Edit size={18} /></button>
                                        <button className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Lançamento de Diárias</h2>
                 <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    <Plus size={20} className="mr-2" />
                    Lançar Diária
                </button>
            </div>
            {renderContent()}
        </div>
    );
};

export default DailyRates;