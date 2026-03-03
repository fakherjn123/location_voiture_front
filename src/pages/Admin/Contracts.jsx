import React from 'react';

const Contracts = () => {
    return (
        <section className="flex-1 overflow-y-auto max-w-5xl mx-auto w-full py-4 px-2 lg:px-6">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-100">Informations du Client</h2>
                <p className="text-slate-400 mt-1">Veuillez saisir les coordonnées du locataire principal.</p>
            </div>

            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>

                {/* Customer Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-300">Nom de famille</label>
                        <input className="bg-neutral-dark border-border-dark rounded-lg p-3 text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-[#1e2433] border border-[#2a3142]" placeholder="ex: Martin" type="text" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-300">Prénom</label>
                        <input className="bg-neutral-dark border-border-dark rounded-lg p-3 text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-[#1e2433] border border-[#2a3142]" placeholder="ex: Jean" type="text" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-300">E-mail</label>
                        <input className="bg-neutral-dark border-border-dark rounded-lg p-3 text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-[#1e2433] border border-[#2a3142]" placeholder="jean.martin@example.com" type="email" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-300">Numéro de téléphone</label>
                        <input className="bg-neutral-dark border-border-dark rounded-lg p-3 text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-[#1e2433] border border-[#2a3142]" placeholder="+33 6 12 34 56 78" type="tel" />
                    </div>
                </div>

                <hr className="border-[#2a3142]" />

                {/* Vehicle & Rental Info Section */}
                <div>
                    <h3 className="text-xl font-bold text-slate-100 mb-6">Détails de la Location</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-300">Sélection du véhicule</label>
                            <div className="relative">
                                <select className="w-full bg-[#1e2433] border border-[#2a3142] rounded-lg p-3 text-slate-100 appearance-none focus:ring-2 focus:ring-primary focus:border-transparent outline-none cursor-pointer">
                                    <option>Peugeot 208 - AB-123-CD (60DT/j)</option>
                                    <option>Tesla Model 3 - EV-999-ZZ (120DT/j)</option>
                                    <option>Volkswagen Golf - GH-456-IJ (85DT/j)</option>
                                    <option>BMW Série 3 - KL-789-MN (150DT/j)</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-3 top-3 text-slate-400 pointer-events-none">expand_more</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-300">Assurance</label>
                            <div className="relative">
                                <select className="w-full bg-[#1e2433] border border-[#2a3142] rounded-lg p-3 text-slate-100 appearance-none focus:ring-2 focus:ring-primary focus:border-transparent outline-none cursor-pointer">
                                    <option>Standard (Franchise 1500DT)</option>
                                    <option>Premium (Franchise 500DT) +15DT/j</option>
                                    <option>Sérénité Totale (0DT Franchise) +30DT/j</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-3 top-3 text-slate-400 pointer-events-none">expand_more</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-300">Date de début</label>
                            <input className="w-full bg-[#1e2433] border border-[#2a3142] rounded-lg p-3 text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" type="date" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-300">Date de fin</label>
                            <input className="w-full bg-[#1e2433] border border-[#2a3142] rounded-lg p-3 text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" type="date" />
                        </div>
                    </div>
                </div>

                {/* Price Calculation Preview */}
                <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                    <div className="flex gap-4 items-center">
                        <div className="bg-primary p-3 rounded-lg text-white">
                            <span className="material-symbols-outlined text-2xl">calculate</span>
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm font-medium">Estimation du Total</p>
                            <h4 className="text-3xl font-bold text-slate-100">420,00 DT <span className="text-sm font-normal text-slate-400">TTC</span></h4>
                        </div>
                    </div>
                    <div className="text-sm text-slate-400 max-w-xs text-center md:text-right">
                        Basé sur 7 jours de location avec assurance Standard. Hors options supplémentaires.
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col-reverse sm:flex-row items-center justify-between pt-4 gap-4">
                    <button className="w-full sm:w-auto px-6 py-3 rounded-lg border border-[#2a3142] text-slate-300 font-bold hover:bg-[#1e2433] transition-colors cursor-pointer" type="button">
                        Annuler
                    </button>
                    <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                        <button className="px-6 py-3 rounded-lg bg-[#1e2433] border border-[#2a3142] text-slate-100 font-bold hover:bg-[#2a3142] transition-colors cursor-pointer" type="button">
                            Sauvegarder en brouillon
                        </button>
                        <button className="px-8 py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary/80 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 cursor-pointer" type="submit">
                            Étape Suivante
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>
                </div>

            </form>

            {/* Sticky Summary Bar for Mobile (Optional) */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#1e2433] border-t border-[#2a3142] p-4 flex justify-between items-center z-50">
                <div className="flex flex-col">
                    <span className="text-xs text-slate-400">Total estimé</span>
                    <span className="text-lg font-bold text-slate-100">420,00 DT</span>
                </div>
                <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm cursor-pointer shadow-sm">Suivant</button>
            </div>

        </section>
    );
};

export default Contracts;
