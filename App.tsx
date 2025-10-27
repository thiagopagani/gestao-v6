
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Companies from './pages/Companies';
import Clients from './pages/Clients';
import Employees from './pages/Employees';
import DailyRates from './pages/DailyRates';
import Users from './pages/Users';
import Reports from './pages/Reports';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

const AppRoutes: React.FC = () => {
    const { user } = useAuth();

    return (
        <HashRouter>
            <Routes>
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                <Route
                    path="/*"
                    element={
                        user ? (
                            <MainLayout>
                                <Routes>
                                    <Route path="/" element={<Dashboard />} />
                                    <Route path="/companies" element={<Companies />} />
                                    <Route path="/clients" element={<Clients />} />
                                    <Route path="/employees" element={<Employees />} />
                                    <Route path="/daily-rates" element={<DailyRates />} />
                                    <Route path="/reports" element={<Reports />} />
                                    <Route path="/users" element={<Users />} />
                                    <Route path="*" element={<Navigate to="/" />} />
                                </Routes>
                            </MainLayout>
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
            </Routes>
        </HashRouter>
    );
};

export default App;
