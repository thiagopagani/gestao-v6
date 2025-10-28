import React, { useState, useEffect } from 'react';
import { Client, Status } from '../types/types';
import { Plus, Edit, Trash2, Loader, AlertTriangle } from 'lucide-react';

const Clients: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch('/api/clients');
                if (!response.ok) {
                    throw new Error('Failed to fetch data from the server.');
                }
                const data: Client[] = await response.json();
                setClients(data);
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

        fetchClients();
    }, []);

    const getStatusClass = (status: Status) => {
        return status === Status.Active 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex justify-center items-center p-10">
                    <Loader className="animate-spin mr-2" size={24} />
                    <span>Carregando clientes...</span>
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
                            <th scope="col" className="px-6 py-3">Nome do Cliente</th>
                            <th scope="col" className="px-6 py-3">Empresa Contratante</th>
                            <th scope="col" className="px-6 py-3">Contato</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client => (
                            <tr key={client.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{client.name}</td>
                                <td className="px-6 py-4">{client.companyName}</td>
                                <td className="px-6 py-4">{client.contact}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(client.status)}`}>
                                        {client.status}
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
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Clientes</h2>
                <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    <Plus size={20} className="mr-2" />
                    Adicionar Cliente
                </button>
            </div>
            {renderContent()}
        </div>
    );
};

export default Clients;