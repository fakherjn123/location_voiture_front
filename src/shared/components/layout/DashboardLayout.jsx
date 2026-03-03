import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../navigation/Sidebar';
import Header from '../navigation/Header';

const DashboardLayout = () => {
    // Apply dark mode class to HTML root (as in the generated design)
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    return (
        <div className="flex min-h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
            {/* Side Navigation */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                <Header title="Tableau de bord" />

                {/* Dynamic Nested Route Content */}
                <div className="p-8 space-y-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
