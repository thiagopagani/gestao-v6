
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Menu, User, LogOut } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
    setSidebarOpen: (open: boolean) => void;
}

const getPageTitle = (pathname: string): string => {
    switch (pathname) {
        case '/': return 'Dashboard';
        case '/companies': return 'Empresas Contratantes';
        case '/clients': return 'Clientes';
        case '/employees': return 'Funcionários';
        case '/daily-rates': return 'Lançamento de Diárias';
        case '/reports': return 'Relatórios Gerais';
        case '/users': return 'Usuários do Sistema';
        default: return 'Gestão de Serviços';
    }
};


const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const pageTitle = getPageTitle(location.pathname);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
            <div className="flex items-center">
                <button onClick={() => setSidebarOpen(true)} className="text-gray-500 dark:text-gray-400 focus:outline-none md:hidden mr-4">
                   <Menu size={24}/>
                </button>
                <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{pageTitle}</h1>
            </div>

            <div className="relative" ref={dropdownRef}>
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 focus:outline-none">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                       {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="hidden sm:block">
                        <p className="font-medium text-sm text-gray-800 dark:text-gray-200">{user?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role}</p>
                    </div>
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20">
                        <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">
                            <p className="font-semibold">{user?.name}</p>
                            <p className="text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                        </div>
                        <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <User size={16} className="mr-2" /> Perfil
                        </a>
                        <button onClick={logout} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <LogOut size={16} className="mr-2" /> Sair
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
