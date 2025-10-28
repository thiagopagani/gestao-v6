import React from 'react';
import StatCard from '../components/StatCard';
import { Building, Briefcase, Users, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const dailyRatesData = [
  { name: 'Seg', value: 4000 },
  { name: 'Ter', value: 3000 },
  { name: 'Qua', value: 2000 },
  { name: 'Qui', value: 2780 },
  { name: 'Sex', value: 1890 },
  { name: 'Sáb', value: 2390 },
  { name: 'Dom', value: 3490 },
];

const employeeTypeData = [
  { name: 'Autônomos', value: 40 },
  { name: 'Treinamento', value: 15 },
];

const COLORS = ['#0088FE', '#00C49F'];

const Dashboard: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<Building size={24}/>} title="Empresas Contratantes" value="12" />
                <StatCard icon={<Briefcase size={24}/>} title="Clientes Ativos" value="86" />
                <StatCard icon={<Users size={24}/>} title="Funcionários" value="55" />
                <StatCard icon={<DollarSign size={24}/>} title="Faturamento (Mês)" value="R$ 45.231,89" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                     <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Diárias na Semana</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dailyRatesData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)"/>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(30,41,59,0.9)', border: 'none' }}/>
                            <Legend />
                            <Bar dataKey="value" fill="#3b82f6" name="Valor (R$)"/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                     <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Tipos de Funcionários</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={employeeTypeData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${name} ${((Number(percent) || 0) * 100).toFixed(0)}%`}
                            >
                                {employeeTypeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                             <Tooltip contentStyle={{ backgroundColor: 'rgba(30,41,59,0.9)', border: 'none' }}/>
                             <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;