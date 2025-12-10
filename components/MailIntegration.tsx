
import React, { useState } from 'react';
import { MOCK_EMAILS } from '../constants';
import { Email } from '../types';
import { Mail, RefreshCw, FileText, CheckCircle, AlertCircle, Bot, ArrowRight, Paperclip, Truck, DollarSign } from 'lucide-react';

const MailIntegration: React.FC = () => {
    const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
    const [emails, setEmails] = useState<Email[]>(MOCK_EMAILS);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleEmailClick = (email: Email) => {
        const updatedEmails = emails.map(e => e.id === email.id ? {...e, isRead: true} : e);
        setEmails(updatedEmails);
        setSelectedEmail(email);
    };

    const handleProcessAI = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            if (selectedEmail) {
                const updatedEmails = emails.map(e => e.id === selectedEmail.id ? {...e, status: 'PROCESSED' as const} : e);
                setEmails(updatedEmails);
                setSelectedEmail({...selectedEmail, status: 'PROCESSED'});
            }
        }, 1500);
    };

    return (
        <div className="flex h-full bg-slate-50 border-t border-slate-200">
            {/* Sidebar / Inbox List */}
            <div className="w-full md:w-80 bg-white border-r border-slate-200 flex flex-col">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                    <h2 className="font-bold text-slate-800 flex items-center">
                        <Mail className="mr-2 text-blue-600" size={20}/> Skrzynka Odbiorcza
                    </h2>
                    <button className="p-2 hover:bg-slate-200 rounded-full text-slate-500">
                        <RefreshCw size={16}/>
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {emails.map(email => (
                        <div 
                            key={email.id} 
                            onClick={() => handleEmailClick(email)}
                            className={`p-4 border-b border-slate-100 cursor-pointer transition-colors hover:bg-blue-50 relative ${selectedEmail?.id === email.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'bg-white border-l-4 border-l-transparent'}`}
                        >
                            {!email.isRead && (
                                <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                            <div className="flex justify-between items-start mb-1">
                                <span className={`text-xs px-2 py-0.5 rounded font-bold ${email.mailbox.includes('order') ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-700'}`}>
                                    {email.mailbox.includes('order') ? 'Zlecenia' : 'Faktury'}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                    {new Date(email.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </span>
                            </div>
                            <h4 className={`text-sm mb-1 text-slate-800 truncate ${!email.isRead ? 'font-bold' : 'font-medium'}`}>
                                {email.subject}
                            </h4>
                            <p className="text-xs text-slate-500 truncate">{email.snippet}</p>
                            {email.status === 'PROCESSED' && (
                                <div className="mt-2 flex items-center text-[10px] font-bold text-emerald-600">
                                    <CheckCircle size={10} className="mr-1"/> Przetworzono
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content / Email Preview */}
            <div className="flex-1 flex flex-col bg-white md:bg-slate-50 overflow-hidden relative">
                {selectedEmail ? (
                    <div className="flex flex-col h-full">
                        {/* Email Header */}
                        <div className="p-6 bg-white border-b border-slate-200 shadow-sm">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800 mb-2">{selectedEmail.subject}</h2>
                                    <div className="flex items-center space-x-3 text-sm text-slate-600">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 mr-2">
                                                {selectedEmail.from.charAt(0).toUpperCase()}
                                            </div>
                                            <span>{selectedEmail.from}</span>
                                        </div>
                                        <span className="text-slate-300">|</span>
                                        <span className="text-slate-400">{new Date(selectedEmail.date).toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    {selectedEmail.status === 'PENDING' ? (
                                        <button 
                                            onClick={handleProcessAI}
                                            disabled={isProcessing}
                                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-bold shadow-md hover:shadow-lg transition-all flex items-center disabled:opacity-70"
                                        >
                                            {isProcessing ? (
                                                <RefreshCw className="animate-spin mr-2" size={18}/> 
                                            ) : (
                                                <Bot className="mr-2" size={18}/>
                                            )}
                                            {isProcessing ? 'Analizowanie...' : selectedEmail.type === 'ORDER_REQUEST' ? 'Utwórz Zlecenie (AI)' : 'Zaksięguj Fakturę (OCR)'}
                                        </button>
                                    ) : (
                                        <button disabled className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-4 py-2 rounded-lg font-bold flex items-center cursor-default">
                                            <CheckCircle className="mr-2" size={18}/> Wykonano
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Email Body & AI Analysis */}
                        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Email Content */}
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
                                <h3 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-4 border-b pb-2">Treść Wiadomości</h3>
                                <div className="text-slate-700 whitespace-pre-wrap leading-relaxed font-sans">
                                    {selectedEmail.fullBody}
                                </div>
                                {selectedEmail.attachments && (
                                    <div className="mt-6 pt-4 border-t border-dashed border-slate-200">
                                        <span className="text-xs font-bold text-slate-400 uppercase block mb-2">Załączniki</span>
                                        {selectedEmail.attachments.map((att, idx) => (
                                            <div key={idx} className="flex items-center p-3 bg-slate-50 rounded-lg border border-slate-200 text-sm font-medium text-slate-700">
                                                <FileText className="mr-3 text-red-500" size={20}/>
                                                {att}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* AI Extraction Panel */}
                            <div className={`transition-all duration-500 ${isProcessing || selectedEmail.status === 'PROCESSED' ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'}`}>
                                <div className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl border border-slate-800 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <Bot size={120} />
                                    </div>
                                    <h3 className="font-bold text-blue-400 text-xs uppercase tracking-wider mb-4 flex items-center">
                                        <Bot className="mr-2" size={16}/> OpenAI Extraction Engine
                                    </h3>
                                    
                                    {isProcessing ? (
                                        <div className="h-64 flex flex-col items-center justify-center space-y-4">
                                            <RefreshCw className="animate-spin text-blue-500" size={32}/>
                                            <p className="text-sm font-mono text-blue-300">Przetwarzanie języka naturalnego...</p>
                                        </div>
                                    ) : selectedEmail.status === 'PROCESSED' ? (
                                        <div className="space-y-4 font-mono text-sm">
                                            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                                                <span className="text-slate-500 block text-xs mb-1">Intencja</span>
                                                <span className="text-white font-bold">{selectedEmail.type === 'ORDER_REQUEST' ? 'NOWE ZLECENIE' : 'FAKTURA KOSZTOWA'}</span>
                                            </div>
                                            
                                            {selectedEmail.type === 'ORDER_REQUEST' ? (
                                                <>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                                                            <span className="text-slate-500 block text-xs mb-1">Trasa</span>
                                                            <span className="text-emerald-400">Berlin → Zurich</span>
                                                        </div>
                                                        <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                                                            <span className="text-slate-500 block text-xs mb-1">Fracht</span>
                                                            <span className="text-emerald-400">1800 EUR</span>
                                                        </div>
                                                    </div>
                                                    <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                                                        <span className="text-slate-500 block text-xs mb-1">Ładunek</span>
                                                        <span className="text-slate-300">Części maszyn, 22t, 33 pal</span>
                                                    </div>
                                                    <div className="flex items-center text-xs text-blue-400 mt-4">
                                                        <ArrowRight size={14} className="mr-2"/> Utworzono rekord ID: ORD-2024-AUTO-01
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                                                            <span className="text-slate-500 block text-xs mb-1">Kategoria</span>
                                                            <span className="text-amber-400">Paliwo (Shell)</span>
                                                        </div>
                                                        <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                                                            <span className="text-slate-500 block text-xs mb-1">Kwota Netto</span>
                                                            <span className="text-amber-400">10 162.60 PLN</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center text-xs text-blue-400 mt-4">
                                                        <ArrowRight size={14} className="mr-2"/> Zaksięgowano w WFirma (ID: EXP-992)
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="h-64 flex flex-col items-center justify-center text-slate-600">
                                            <Bot size={48} className="mb-2 opacity-20"/>
                                            <p className="text-sm">Oczekiwanie na analizę...</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                        <Mail size={64} className="mb-4 text-slate-200" />
                        <p className="font-medium">Wybierz wiadomość aby przetworzyć</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MailIntegration;
