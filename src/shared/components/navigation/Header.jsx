import React from 'react';

const Header = ({ title = "Tableau de bord" }) => {
    return (
        <header className="h-16 border-b border-primary/10 px-8 flex items-center justify-between sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-10 shrink-0">
            <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{title}</h2>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative max-w-md hidden md:block">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-custom-600 text-lg leading-none">search</span>
                    <input
                        className="bg-slate-custom-100 dark:bg-slate-custom-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary w-64 outline-none"
                        placeholder="Rechercher..."
                        type="text"
                    />
                </div>

                <button className="p-2 rounded-lg bg-slate-custom-100 dark:bg-slate-custom-800 text-slate-custom-600 hover:text-primary transition-colors flex items-center justify-center">
                    <span className="material-symbols-outlined">notifications</span>
                </button>

                <button className="p-2 rounded-lg bg-slate-custom-100 dark:bg-slate-custom-800 text-slate-custom-600 hover:text-primary transition-colors flex items-center justify-center">
                    <span className="material-symbols-outlined">settings</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
