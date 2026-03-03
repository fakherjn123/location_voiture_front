import React from 'react';

const Cars = () => {
    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Gestion du Parc</h2>
                    <p className="text-slate-500">Vue d'ensemble de vos 42 véhicules actifs.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-sm transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-sm">filter_list</span>
                        Filtres avancés
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium text-sm transition-colors shadow-sm shadow-primary/20 cursor-pointer">
                        <span className="material-symbols-outlined text-sm">add</span>
                        Ajouter un véhicule
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <button className="px-4 py-1.5 bg-primary text-white rounded-full text-sm font-medium whitespace-nowrap cursor-pointer">Tous</button>
                <button className="px-4 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-medium whitespace-nowrap hover:border-primary transition-colors cursor-pointer">Disponible</button>
                <button className="px-4 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-medium whitespace-nowrap hover:border-primary transition-colors cursor-pointer">Loué</button>
                <button className="px-4 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-medium whitespace-nowrap hover:border-primary transition-colors cursor-pointer">Maintenance</button>
                <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2"></div>
                <button className="px-4 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-medium whitespace-nowrap hover:border-primary transition-colors cursor-pointer">SUV</button>
                <button className="px-4 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-medium whitespace-nowrap hover:border-primary transition-colors cursor-pointer">Berline</button>
                <button className="px-4 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-medium whitespace-nowrap hover:border-primary transition-colors cursor-pointer">Électrique</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {/* Car Card 1 */}
                <div className="bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                    <div className="relative h-48 bg-slate-100 dark:bg-slate-900 overflow-hidden">
                        <img alt="Tesla Model Y" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Modern white SUV parked in studio" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQSljViVfUO4O5xnL3H7WkLABtwnaWzr1Q2u3L98jyrPPaYVKQCuD3pGGFzOjyDdvBbPmWBndCrfBjT15gt7v6Lou2qSu3p-6taJ1lx454f7CixdPdU9hwL6YeVgDQja8dbxpCRFuKMatnE8umC06jhoOGpBMxHGaiITj4iJldRy9EsACqyCv57ENOUY5L-gGBF5tHYrE-jFvJdTGEKxZxwgt_K7FU6SVlBN6uBGJKk499aYiY4PnOD2eE5bR-Aozob1Wmafj8j6vj" />
                        <div className="absolute top-4 left-4">
                            <span className="px-2.5 py-1 bg-green-500 text-white text-[10px] font-bold uppercase rounded-md">Disponible</span>
                        </div>
                        <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                            <p className="text-xs text-slate-500 font-medium">Tarif journalier</p>
                            <p className="font-bold text-primary">85DT / jour</p>
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg">Tesla Model Y</h3>
                                <p className="text-sm text-slate-500">SUV DT Électrique</p>
                            </div>
                            <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 uppercase">EV-742-TY</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-5 text-sm">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <span className="material-symbols-outlined text-lg">speed</span>
                                <span>12,450 km</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <span className="material-symbols-outlined text-lg">battery_charging_full</span>
                                <span>82%</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm font-semibold transition-colors cursor-pointer">Détails</button>
                            <button className="flex-1 py-2 bg-primary text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer">Réserver</button>
                        </div>
                    </div>
                </div>

                {/* Car Card 2 */}
                <div className="bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                    <div className="relative h-48 bg-slate-100 dark:bg-slate-900 overflow-hidden">
                        <img alt="Mercedes Benz C-Class" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Black luxury sedan outdoors" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlWZbtXaHvfElVV6Shzg1eGXqTc5J1MhhHuw41twA2jTiiJSqlLDyvEBEQJ9maj7dMbWCQ2ovZR5n9cpKmZCXnMQ2wG6dp8jGFtSjqu8ByYG83cIsSO5z2iqoKxO-QSSqGAK8BKlrUZsxVBXFNEsecvY9KHHvw9Ta02j11yxCwFkSes84flWbysKjf0R9MaKUHyuAAbvCnBnc3lz35sOwpzFXqw7idCcrJnH4rOey5LXRhBcJTQQKS3OnCI58ARn5WJQA8DISGsNd9" />
                        <div className="absolute top-4 left-4">
                            <span className="px-2.5 py-1 bg-amber-500 text-white text-[10px] font-bold uppercase rounded-md">Loué</span>
                        </div>
                        <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                            <p className="text-xs text-slate-500 font-medium">Tarif journalier</p>
                            <p className="font-bold text-primary">110DT / jour</p>
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg">Mercedes Classe C</h3>
                                <p className="text-sm text-slate-500">Berline DT Hybride</p>
                            </div>
                            <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 uppercase">AA-908-BC</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-5 text-sm">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <span className="material-symbols-outlined text-lg">speed</span>
                                <span>24,800 km</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <span className="material-symbols-outlined text-lg">person</span>
                                <span>Marie Laurent</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm font-semibold transition-colors cursor-pointer">Détails</button>
                            <button className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed rounded-lg text-sm font-semibold">Gérer Location</button>
                        </div>
                    </div>
                </div>

                {/* Car Card 3 */}
                <div className="bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                    <div className="relative h-48 bg-slate-100 dark:bg-slate-900 overflow-hidden">
                        <img alt="Ford Transit" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="White cargo van on industrial street" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4J-gOuzPXhKSB0yi2DnULUQAwFSpjqMQgRvK-3Lq81rECkSLZLBVW9HVMvkr0ofl7oIU9w0gBWOzhJ39a0IyU_ICZI7OQ7lVY-6d9DZYdLWXvp4MZ1kjQccl2Owfdrz--w8Ej8YAFY7SyVbquAPuNgJ-Jc6_NJjPyYa3VjEnFVDZrTi6iI68GEllPPeHHGdNeOgQpXAEi_T1TX7HA_xPodPAcG4XKVbpVRkdnKKElj4xAkvI0eRdg8MSQdvf7AFjZI3B1EycsdwYY" />
                        <div className="absolute top-4 left-4">
                            <span className="px-2.5 py-1 bg-red-500 text-white text-[10px] font-bold uppercase rounded-md">Maintenance</span>
                        </div>
                        <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                            <p className="text-xs text-slate-500 font-medium">Tarif journalier</p>
                            <p className="font-bold text-primary">65DT / jour</p>
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg">Ford Transit</h3>
                                <p className="text-sm text-slate-500">Utilitaire DT Diesel</p>
                            </div>
                            <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 uppercase">FR-512-ZZ</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-5 text-sm">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <span className="material-symbols-outlined text-lg">speed</span>
                                <span>89,120 km</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <span className="material-symbols-outlined text-lg">build</span>
                                <span>Vidange + Freins</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm font-semibold transition-colors cursor-pointer">Rapport Atelier</button>
                            <button className="flex-1 py-2 border border-primary text-primary rounded-lg text-sm font-semibold hover:bg-primary/5 transition-colors cursor-pointer">Terminer</button>
                        </div>
                    </div>
                </div>

                {/* Car Card 4 */}
                <div className="bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                    <div className="relative h-48 bg-slate-100 dark:bg-slate-900 overflow-hidden">
                        <img alt="Porsche Taycan" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Blue luxury sports car on road" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB50FuBwSSjaZfW09tSKuHgL48ky3ZiUn4dcbkXc1UnIWln4jhdHzw82hN3zYL9wtfIwspUAA-XnUELYQrwIklu4E1afcUTuSZUWnPO1GbIMqBypZbf0L68aFqKu0srFK0kZbeSemOCRwIDTFHC-XlT8W4mk_i8jsV3WnxSzxDOhkaFv3GG4PlmUrAs1THZdvJwzUJ26_PFOc4FIqwLkG2E09V8Mlda6afiJHTmhvkc0gOj1LTh4GbbRozKYBPIFp0GnZ_QNoahPBID" />
                        <div className="absolute top-4 left-4">
                            <span className="px-2.5 py-1 bg-green-500 text-white text-[10px] font-bold uppercase rounded-md">Disponible</span>
                        </div>
                        <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                            <p className="text-xs text-slate-500 font-medium">Tarif journalier</p>
                            <p className="font-bold text-primary">245DT / jour</p>
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg">Porsche Taycan</h3>
                                <p className="text-sm text-slate-500">Sportive DT Électrique</p>
                            </div>
                            <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 uppercase">PR-911-EV</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-5 text-sm">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <span className="material-symbols-outlined text-lg">speed</span>
                                <span>5,200 km</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <span className="material-symbols-outlined text-lg">battery_charging_full</span>
                                <span>95%</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm font-semibold transition-colors cursor-pointer">Détails</button>
                            <button className="flex-1 py-2 bg-primary text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer">Réserver</button>
                        </div>
                    </div>
                </div>

                {/* Car Card 5 */}
                <div className="bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                    <div className="relative h-48 bg-slate-100 dark:bg-slate-900 overflow-hidden">
                        <img alt="Audi Q5" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Silver SUV parked in city" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4_zMk2vSskqcp30QKYdW0fAvNpwM_HEpolr_bycik8S8TvUh6Gz8tKiBkx5yGjKO8gTnjqcWRgimnetMYh1QYrDo7IERAMHSb8MvlbcKAnnLiWmFCfh09blpyQUOtyeMCuIQaPAJGJkM_cyVnRTs5I0ciMQ_2rYlCk2oHPfv1f1ynLpHQuamcN3rv0YZXJJ-IK4MOzfh6_eVDCRYL62cYGkNaiEAvtEkKVnl6QyIgn2dshI5fABLiW2m_kYg1ZP8jmm82McNyJY01" />
                        <div className="absolute top-4 left-4">
                            <span className="px-2.5 py-1 bg-amber-500 text-white text-[10px] font-bold uppercase rounded-md">Loué</span>
                        </div>
                        <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                            <p className="text-xs text-slate-500 font-medium">Tarif journalier</p>
                            <p className="font-bold text-primary">95DT / jour</p>
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg">Audi Q5</h3>
                                <p className="text-sm text-slate-500">SUV DT Essence</p>
                            </div>
                            <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 uppercase">AU-300-QQ</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-5 text-sm">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <span className="material-symbols-outlined text-lg">speed</span>
                                <span>36,400 km</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <span className="material-symbols-outlined text-lg">person</span>
                                <span>Thomas Martin</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm font-semibold transition-colors cursor-pointer">Détails</button>
                            <button className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed rounded-lg text-sm font-semibold">Gérer Location</button>
                        </div>
                    </div>
                </div>

                {/* Add New Car Card */}
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center p-8 text-slate-500 hover:border-primary/50 transition-colors cursor-pointer group">
                    <div className="h-16 w-16 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">add_circle</span>
                    </div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">Nouveau Véhicule</p>
                    <p className="text-xs text-center mt-1">Ajouter un nouveau modèle à la flotte</p>
                </div>

            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-between pt-4 pb-8">
                <p className="text-sm text-slate-500">Affichage de 1-5 sur 42 véhicules</p>
                <div className="flex gap-2">
                    <button className="h-10 w-10 flex items-center justify-center border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button className="h-10 w-10 flex items-center justify-center bg-primary text-white rounded-lg cursor-pointer">1</button>
                    <button className="h-10 w-10 flex items-center justify-center border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">2</button>
                    <button className="h-10 w-10 flex items-center justify-center border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">3</button>
                    <button className="h-10 w-10 flex items-center justify-center border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Cars;
