
import React from 'react';

interface StatCardProps {
    icon: React.ReactElement;
    title: string;
    value: string;
    change?: string;
    changeType?: 'increase' | 'decrease';
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change, changeType }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center space-x-4">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
                 {change && (
                    <p className={`text-xs ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                        {change}
                    </p>
                )}
            </div>
        </div>
    );
};

export default StatCard;
