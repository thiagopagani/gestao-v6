
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Building, Briefcase, Users, User, DollarSign, BarChart2, X } from 'lucide-react';

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
    const location = useLocation();

    const menuItems = [
        { icon: LayoutDashboard, text: 'Dashboard', path: '/' },
        { icon: Building, text: 'Empresas', path: '/companies' },
        { icon: Briefcase, text: 'Clientes', path: '/clients' },
        { icon: Users, text: 'Funcionários', path: '/employees' },
        { icon: DollarSign, text: 'Diárias', path: '/daily-rates' },
        { icon: BarChart2, text: 'Relatórios', path: '/reports' },
        { icon: User, text: 'Usuários', path: '/users' },
    ];

    const linkClasses = (path: string) => 
        `flex items-center p-3 my-1 rounded-lg transition-colors duration-200 ${
            location.pathname === path
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`;

    return (
        <>
            <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex-shrink-0`}>
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                    <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Serviços</h1>
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-500 hover:text-gray-700">
                       <X size={24} />
                    </button>
                </div>
                <nav className="p-4">
                    {menuItems.map((item, index) => (
                        <NavLink key={index} to={item.path} className={linkClasses(item.path)} onClick={() => setSidebarOpen(false)}>
                            <item.icon className="mr-3" size={20} />
                            <span>{item.text}</span>
                        </NavLink>
                    ))}
                </nav>
            </aside>
             {sidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-20 md:hidden" onClick={() => setSidebarOpen(false)}></div>}
        </>
    );
};

export default Sidebar;
