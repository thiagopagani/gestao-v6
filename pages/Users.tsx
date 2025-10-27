
import React, { useState } from 'react';
import { User, UserRole, Status } from '../types/types';
import { Plus, Edit, Trash2 } from 'lucide-react';

const mockUsers: User[] = [
    { id: 1, name: 'Admin User', email: 'admin@example.com', role: UserRole.Admin, status: Status.Active },
    { id: 2, name: 'Operator User', email: 'operator@example.com', role: UserRole.Operator, status: Status.Active },
    { id: 3, name: 'Inactive Operator', email: 'inactive@example.com', role: UserRole.Operator, status: Status.Inactive },
];

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>(mockUsers);
    
    const getStatusClass = (status: Status) => {
        return status === Status.Active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    };

    const getRoleClass = (role: UserRole) => {
        return role === UserRole.Admin ? 'bg-purple-100 text-purple-800' : 'bg-indigo-100 text-indigo-800';
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Usuários do Sistema</h2>
                 <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    <Plus size={20} className="mr-2" />
                    Adicionar Usuário
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Nome</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Papel</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">
                                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleClass(user.role)}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(user.status)}`}>
                                        {user.status}
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

export default Users;
