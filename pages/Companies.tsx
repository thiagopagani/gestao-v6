
import React, { useState } from 'react';
import { Company, Status } from '../types/types';
import { Plus, Edit, Trash2 } from 'lucide-react';

const mockCompanies: Company[] = [
    { id: 1, name: 'Tech Solutions Ltda', cnpj: '12.345.678/0001-90', contact: 'Carlos Silva', phone: '(11) 98765-4321', status: Status.Active },
    { id: 2, name: 'Inova Corp', cnpj: '98.765.432/0001-10', contact: 'Ana Pereira', phone: '(21) 91234-5678', status: Status.Active },
    { id: 3, name: 'Future Systems', cnpj: '54.321.678/0001-20', contact: 'Roberto Lima', phone: '(31) 95555-4444', status: Status.Inactive },
];

const Companies: React.FC = () => {
    const [companies, setCompanies] = useState<Company[]>(mockCompanies);
    // Add modal state and handlers here in a real app

    const getStatusClass = (status: Status) => {
        return status === Status.Active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Empresas Contratantes</h2>
                <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    <Plus size={20} className="mr-2" />
                    Adicionar Empresa
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Nome</th>
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

export default Companies;
