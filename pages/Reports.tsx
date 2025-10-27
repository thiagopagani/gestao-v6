
import React from 'react';
import { FileDown } from 'lucide-react';

const Reports: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Relatórios Gerais</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Data Início</label>
                        <input type="date" id="startDate" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-white dark:bg-gray-700" />
                    </div>
                    <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Data Fim</label>
                        <input type="date" id="endDate" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-white dark:bg-gray-700" />
                    </div>
                    <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Empresa</label>
                        <select id="company" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-white dark:bg-gray-700">
                            <option>Todas</option>
                            <option>Tech Solutions Ltda</option>
                            <option>Inova Corp</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="employee" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Funcionário</label>
                        <select id="employee" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-white dark:bg-gray-700">
                            <option>Todos</option>
                            <option>Fernando Alves</option>
                            <option>Beatriz Costa</option>
                        </select>
                    </div>
                </div>
                 <div className="mt-6 flex justify-end space-x-3">
                     <button className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
                        Filtrar
                    </button>
                    <button className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                        <FileDown size={20} className="mr-2" />
                        Exportar Excel
                    </button>
                     <button className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                        <FileDown size={20} className="mr-2" />
                        Exportar PDF
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Resultados</h3>
                <p className="text-gray-600 dark:text-gray-400">Os resultados do relatório filtrado aparecerão aqui.</p>
                {/* A table with report data would be rendered here */}
            </div>
        </div>
    );
};

export default Reports;
