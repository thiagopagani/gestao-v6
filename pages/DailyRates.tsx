
import React, { useState } from 'react';
import { DailyRate, DailyRateStatus } from '../types/types';
import { Plus, Edit, Trash2 } from 'lucide-react';

const mockDailyRates: DailyRate[] = [
    { id: 1, employeeId: 1, employeeName: 'Fernando Alves', clientId: 1, clientName: 'Projeto Alpha', companyName: 'Tech Solutions Ltda', date: '2024-07-28', value: 150.00, status: DailyRateStatus.Paid },
    { id: 2, employeeId: 2, employeeName: 'Beatriz Costa', clientId: 2, clientName: 'Unidade Rio', companyName: 'Inova Corp', date: '2024-07-28', value: 200.50, status: DailyRateStatus.Paid },
    { id: 3, employeeId: 3, employeeName: 'Lucas Martins', clientId: 1, clientName: 'Projeto Alpha', companyName: 'Tech Solutions Ltda', date: '2024-07-29', value: 120.00, status: DailyRateStatus.Pending },
    { id: 4, employeeId: 1, employeeName: 'Fernando Alves', clientId: 2, clientName: 'Unidade Rio', companyName: 'Inova Corp', date: '2024-07-30', value: 150.00, status: DailyRateStatus.Pending },
    { id: 5, employeeId: 1, employeeName: 'Fernando Alves', clientId: 2, clientName: 'Unidade Rio', companyName: 'Inova Corp', date: '2024-07-27', value: 150.00, status: DailyRateStatus.Canceled },
];


const DailyRates: React.FC = () => {
    const [dailyRates, setDailyRates] = useState<DailyRate[]>(mockDailyRates);

    const getStatusClass = (status: DailyRateStatus) => {
        switch (status) {
            case DailyRateStatus.Paid: return 'bg-green-100 text-green-800';
            case DailyRateStatus.Pending: return 'bg-yellow-100 text-yellow-800';
            case DailyRateStatus.Canceled: return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
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
                                <td className="px-6 py-4">{new Date(rate.date).toLocaleDateString('pt-BR')}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{rate.employeeName}</td>
                                <td className="px-6 py-4">{rate.clientName}</td>
                                <td className="px-6 py-4">{rate.companyName}</td>
                                <td className="px-6 py-4 text-right">{rate.value.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(rate.status)}`}>
                                        {rate.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                     <div className="flex justify-end space-x-2">
                                        <button className="p-2 text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                                        <button className="p-2 text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DailyRates;
