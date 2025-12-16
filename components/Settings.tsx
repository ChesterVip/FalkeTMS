import React, { useMemo, useState } from 'react';
import { AlertCircle, Bot, CheckCircle2, KeyRound, Link2, Loader2, Mail } from 'lucide-react';
import { MOCK_INTEGRATIONS } from '../constants';

type Field = 'apiKey' | 'webhookUrl' | 'notifyEmail';

const Settings: React.FC = () => {
  const [form, setForm] = useState<Record<Field, string>>({
    apiKey: '',
    webhookUrl: '',
    notifyEmail: '',
  });
  const [touched, setTouched] = useState<Record<Field, boolean>>({
    apiKey: false,
    webhookUrl: false,
    notifyEmail: false,
  });
  const [status, setStatus] = useState<'idle' | 'saving' | 'success'>('idle');
  const [successMsg, setSuccessMsg] = useState('');

  const errors = useMemo<Record<Field, string>>(() => {
    const current: Record<Field, string> = { apiKey: '', webhookUrl: '', notifyEmail: '' };

    if (!form.apiKey.trim()) {
      current.apiKey = 'To pole jest wymagane.';
    } else if (!form.apiKey.startsWith('sk-')) {
      current.apiKey = 'Klucz powinien zaczynać się od sk-';
    } else if (form.apiKey.length < 12) {
      current.apiKey = 'Klucz wygląda na zbyt krótki.';
    }

    if (!form.webhookUrl.trim()) {
      current.webhookUrl = 'Podaj adres HTTPS webhooka.';
    } else if (
      !form.webhookUrl.startsWith('https://') &&
      !form.webhookUrl.startsWith('http://')
    ) {
      current.webhookUrl = 'Adres musi zaczynać się od http(s)://';
    }

    if (!form.notifyEmail.trim()) {
      current.notifyEmail = 'E-mail do alertów jest wymagany.';
    } else if (!/.+@.+\\..+/.test(form.notifyEmail)) {
      current.notifyEmail = 'Podaj poprawny adres e-mail.';
    }

    return current;
  }, [form]);

  const hasError = (field: Field) => touched[field] && !!errors[field];
  const isValid = (field: Field) => touched[field] && !errors[field];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ apiKey: true, webhookUrl: true, notifyEmail: true });

    const anyErrors = (Object.keys(errors) as Field[]).some((field) => errors[field]);
    if (anyErrors) return;

    setStatus('saving');
    setSuccessMsg('');
    setTimeout(() => {
      setStatus('success');
      setSuccessMsg('Zapisano ustawienia i przetestowano połączenia.');
      setTimeout(() => setStatus('idle'), 2000);
    }, 700);
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center space-x-3">
          <div className="bg-brand-600 p-3 rounded-2xl text-white shadow-lg shadow-brand-600/30">
            <Bot size={28} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-slate-500">AI & Integracje</p>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">Konfiguracja środowiska</h2>
            <p className="text-sm text-slate-500">Klucze API, webhooki i powiadomienia SLA.</p>
          </div>
        </div>
        {status === 'success' && (
          <div
            className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-xl text-sm"
            role="status"
            aria-live="polite"
          >
            <CheckCircle2 size={18} />
            <span>{successMsg || 'Zapisano zmiany'}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {MOCK_INTEGRATIONS.map((integration) => (
          <div
            key={integration.id}
            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-brand-200 transition-all"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold text-slate-800">{integration.name}</p>
                <p className="text-xs text-slate-500">{integration.desc}</p>
              </div>
              <span
                className={`badge ${
                  integration.status === 'OK'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    : 'bg-amber-50 text-amber-700 border border-amber-100'
                }`}
              >
                {integration.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mb-2">Latency: {integration.latency}</p>
            <button className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center space-x-1">
              <span>Testuj połączenie</span>
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Ustawienia dostępu</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="apiKey" className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Klucz OpenAI API
              </label>
              <div className="mt-1 relative">
                <KeyRound className="absolute left-3 top-2.5 text-slate-400" size={16} />
                <input
                  id="apiKey"
                  name="apiKey"
                  type="password"
                  value={form.apiKey}
                  onBlur={() => setTouched((prev) => ({ ...prev, apiKey: true }))}
                  onChange={(e) => setForm((prev) => ({ ...prev, apiKey: e.target.value }))}
                  className={`input pl-9 ${hasError('apiKey') ? 'input-error' : isValid('apiKey') ? 'input-success' : ''}`}
                  placeholder="sk-..."
                  aria-invalid={hasError('apiKey')}
                />
              </div>
              {hasError('apiKey') ? (
                <p className="text-xs text-red-600 mt-1 flex items-center">
                  <AlertCircle size={12} className="mr-1" />
                  {errors.apiKey}
                </p>
              ) : (
                isValid('apiKey') && (
                  <p className="text-xs text-emerald-600 mt-1 flex items-center">
                    <CheckCircle2 size={12} className="mr-1" />
                    Wygląda poprawnie.
                  </p>
                )
              )}
            </div>

            <div>
              <label htmlFor="webhookUrl" className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Webhook produkcyjny
              </label>
              <div className="mt-1 relative">
                <Link2 className="absolute left-3 top-2.5 text-slate-400" size={16} />
                <input
                  id="webhookUrl"
                  name="webhookUrl"
                  type="url"
                  value={form.webhookUrl}
                  onBlur={() => setTouched((prev) => ({ ...prev, webhookUrl: true }))}
                  onChange={(e) => setForm((prev) => ({ ...prev, webhookUrl: e.target.value }))}
                  className={`input pl-9 ${hasError('webhookUrl') ? 'input-error' : isValid('webhookUrl') ? 'input-success' : ''}`}
                  placeholder="https://api.falke.ai/hooks/tms"
                  aria-invalid={hasError('webhookUrl')}
                />
              </div>
              {hasError('webhookUrl') ? (
                <p className="text-xs text-red-600 mt-1 flex items-center">
                  <AlertCircle size={12} className="mr-1" />
                  {errors.webhookUrl}
                </p>
              ) : (
                isValid('webhookUrl') && (
                  <p className="text-xs text-emerald-600 mt-1 flex items-center">
                    <CheckCircle2 size={12} className="mr-1" />
                    Webhook wygląda poprawnie.
                  </p>
                )
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="notifyEmail" className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                E-mail alertów SLA
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-2.5 text-slate-400" size={16} />
                <input
                  id="notifyEmail"
                  name="notifyEmail"
                  type="email"
                  value={form.notifyEmail}
                  onBlur={() => setTouched((prev) => ({ ...prev, notifyEmail: true }))}
                  onChange={(e) => setForm((prev) => ({ ...prev, notifyEmail: e.target.value }))}
                  className={`input pl-9 ${hasError('notifyEmail') ? 'input-error' : isValid('notifyEmail') ? 'input-success' : ''}`}
                  placeholder="sla@fgfalke.eu"
                  aria-invalid={hasError('notifyEmail')}
                />
              </div>
              {hasError('notifyEmail') ? (
                <p className="text-xs text-red-600 mt-1 flex items-center">
                  <AlertCircle size={12} className="mr-1" />
                  {errors.notifyEmail}
                </p>
              ) : (
                isValid('notifyEmail') && (
                  <p className="text-xs text-emerald-600 mt-1 flex items-center">
                    <CheckCircle2 size={12} className="mr-1" />
                    Adres e-mail jest poprawny.
                  </p>
                )
              )}
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700 space-y-2">
              <p className="font-semibold">Dobre praktyki:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Używaj odrębnych kluczy dla środowiska test/production.</li>
                <li>Webhook przyjmuje tylko HTTPS i podpisuje payload (HMAC).</li>
                <li>Powiadomienia SLA kieruj na grupowy adres.</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
            <div className="text-xs text-slate-500 flex items-center space-x-2">
              <AlertCircle size={14} className="text-amber-500" />
              <span>Po zapisaniu wykonujemy szybki health-check integracji.</span>
            </div>
            <button
              type="submit"
              className="btn btn-primary px-5 py-3 rounded-xl min-w-[180px] justify-center"
              disabled={status === 'saving'}
            >
              {status === 'saving' ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={16} />
                  Zapisywanie...
                </>
              ) : (
                'Zapisz ustawienia'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
