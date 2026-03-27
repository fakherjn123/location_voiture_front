import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Send, Building2 } from 'lucide-react';
import api from '../../../config/api.config';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    
    // Dynamic Contact Details state
    const [contactDetails, setContactDetails] = useState([]);
    const [loadingDetails, setLoadingDetails] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await api.get('/contacts/info');
                setContactDetails(res.data);
            } catch (error) {
                console.error("Erreur chargement détails de contact", error);
            } finally {
                setLoadingDetails(false);
            }
        };
        fetchDetails();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/contacts', formData);
            setSubmitted(true);
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            
            setTimeout(() => {
                setSubmitted(false);
            }, 5000);
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
            alert("Une erreur est survenue lors de l'envoi de votre message.");
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'address': return <MapPin size={24} />;
            case 'phone':
            case 'whatsapp': return <Phone size={24} />;
            case 'email': return <Mail size={24} />;
            default: return <Building2 size={24} />;
        }
    };

    // Split details into specific categories
    const standardDetails = contactDetails.filter(d => d.type !== 'description');
    const descriptions = contactDetails.filter(d => d.type === 'description');

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-6xl">
                
                {/* Page Header */}
                

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
                    
                    {/* Left Column: Contact Info */}
                    <div className="lg:w-1/2 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-100 flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-8 uppercase tracking-wide border-b border-slate-200 pb-2">
                                Contactez-Nous
                            </h2>

                            {loadingDetails ? (
                                <div className="animate-pulse space-y-6">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="flex gap-4">
                                            <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                                            <div className="flex-1 py-1 space-y-2">
                                                <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                                                <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {standardDetails.map((detail) => (
                                        <div key={detail.id} className="flex items-start gap-4">
                                            <div className="bg-slate-100 p-3 rounded-full text-slate-500 shrink-0">
                                                {getIcon(detail.type)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-900">{detail.label}:</p>
                                                {detail.type === 'email' ? (
                                                    <a href={`mailto:${detail.value}`} className="text-primary font-medium hover:underline">
                                                        {detail.value}
                                                    </a>
                                                ) : (
                                                    <p className={detail.type.includes('phone') || detail.type === 'whatsapp' ? "text-primary font-medium" : "text-slate-600"}>
                                                        {detail.value}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {descriptions.length > 0 && (
                                        <div className="pt-6 mt-6 border-t border-slate-100 text-slate-600 leading-relaxed text-sm">
                                            {descriptions.map(desc => (
                                                <div key={desc.id} className="mb-4">
                                                    {desc.label && <p className="font-semibold text-slate-900 mb-1">{desc.label}:</p>}
                                                    <p>{desc.value}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="lg:w-1/2 p-8 lg:p-12 bg-slate-50/50">
                        <h2 className="text-xl font-bold text-slate-900 mb-8 uppercase tracking-wide border-b border-slate-200 pb-2">
                            Envoyez Un Message
                        </h2>

                        {submitted ? (
                            <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl flex items-center gap-3">
                                <div className="bg-white p-2 rounded-full shadow-sm text-green-500 shrink-0">
                                    <Send size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold">Message envoyé !</h3>
                                    <p className="text-sm">Merci de nous avoir contactés, nous vous répondrons dans les plus brefs délais.</p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <input 
                                        type="text" 
                                        name="name"
                                        required
                                        placeholder="Votre nom" 
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400"
                                    />
                                </div>
                                <div>
                                    <input 
                                        type="email" 
                                        name="email"
                                        required
                                        placeholder="Email" 
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <input 
                                        type="tel" 
                                        name="phone"
                                        placeholder="Téléphone" 
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400"
                                    />
                                    <input 
                                        type="text" 
                                        name="subject"
                                        required
                                        placeholder="Sujet" 
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400"
                                    />
                                </div>
                                <div>
                                    <textarea 
                                        name="message"
                                        required
                                        placeholder="Votre message" 
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 resize-none"
                                    ></textarea>
                                </div>
                                <button 
                                    type="submit"
                                    className="w-full md:w-auto px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg shadow-lg shadow-slate-900/20 transition-all flex items-center justify-center gap-2"
                                >
                                    <Send size={18} />
                                    Envoyer le message
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
