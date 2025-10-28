import React, { useState, useEffect, FormEvent } from 'react';
import { Company, Status } from '../types/types';
import { Plus, Edit, Trash2, Loader, AlertTriangle, X } from 'lucide-react';

const Companies: React.FC = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCompany, setNewCompany] = useState({
        name: '',
        cnpj: '',
        contact: '',
        phone: '',
        status: Status.Active,
    });

    const fetchCompanies = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/companies');
            if (!response.ok) {
                throw new Error('Failed to fetch data from the server.');
            }
            const data: Company[] = await response.json();
            setCompanies(data);
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

    useEffect(() => {
        fetchCompanies();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewCompany(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddCompany = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/companies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCompany),
            });
            if (!response.ok) {
                throw new Error('Failed to create company.');
            }
            setIsModalOpen(false);
            fetchCompanies(); // Refresh the list
        } catch (error) {
            console.error("Error creating company:", error);
            // Here you could set an error message for the modal
        }
    };

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
                    <span>Carregando empresas...</span>
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

        if (companies.length === 0) {
            return <p className="text-center text-gray-500 py-10">Nenhuma empresa encontrada. Adicione uma para começar.</p>;
        }

        return (
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Nome da Empresa</th>
                            <th scope="col" className="px-6 py-3">CNPJ</th>
                            <th scope="col" className="px-6 py-3">Contato</th>
                            <th scope="col" className="px-6 py-3">Telefone</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map(company => (
                            <tr key={company.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{company.name}</td>
                                <td className="px-6 py-4">{company.cnpj}</td>
                                <td className="px-6 py-4">{company.contact}</td>
                                <td className="px-6 py-4">{company.phone}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(company.status)}`}>
                                        {company.status}
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
        <>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Empresas Contratantes</h2>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                        <Plus size={20} className="mr-2" />
                        Adicionar Empresa
                    </button>
                </div>
                {renderContent()}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg m-4">
                        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                            <h3 className="text-xl font-semibold">Adicionar Nova Empresa</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleAddCompany}>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-1">Nome da Empresa</label>
                                    <input type="text" name="name" id="name" value={newCompany.name} onChange={handleInputChange} required className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
                                </div>
                                <div>
                                    <label htmlFor="cnpj" className="block text-sm font-medium mb-1">CNPJ</label>
                                    <input type="text" name="cnpj" id="cnpj" value={newCompany.cnpj} onChange={handleInputChange} required className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
                                </div>
                                <div>
                                    <label htmlFor="contact" className="block text-sm font-medium mb-1">Contato</label>
                                    <input type="text" name="contact" id="contact" value={newCompany.contact} onChange={handleInputChange} className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium mb-1">Telefone</label>
                                    <input type="text" name="phone" id="phone" value={newCompany.phone} onChange={handleInputChange} className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
                                </div>
                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium mb-1">Status</label>
                                    <select name="status" id="status" value={newCompany.status} onChange={handleInputChange} className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                        <option value={Status.Active}>Ativo</option>
                                        <option value={Status.Inactive}>Inativo</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end p-4 border-t dark:border-gray-700">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 mr-3 rounded-md border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600">Cancelar</button>
                                <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Companies;
