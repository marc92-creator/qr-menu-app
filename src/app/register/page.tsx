'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmailSent, setShowEmailSent] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  // Map Supabase errors to German user-friendly messages
  const getErrorMessage = (error: string): string => {
    if (error.includes('sending confirmation email') || error.includes('email')) {
      return 'E-Mail konnte nicht gesendet werden. Bitte versuche es in einigen Minuten erneut oder kontaktiere support@menuapp.de';
    }
    if (error.includes('already registered') || error.includes('already exists')) {
      return 'Diese E-Mail ist bereits registriert. Bitte melde dich an oder nutze "Passwort vergessen".';
    }
    if (error.includes('invalid email')) {
      return 'Bitte gib eine gültige E-Mail-Adresse ein.';
    }
    if (error.includes('rate limit') || error.includes('too many')) {
      return 'Zu viele Versuche. Bitte warte einige Minuten und versuche es erneut.';
    }
    if (error.includes('weak password')) {
      return 'Passwort ist zu schwach. Nutze mindestens 6 Zeichen mit Buchstaben und Zahlen.';
    }
    return error;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwörter stimmen nicht überein');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Passwort muss mindestens 6 Zeichen lang sein');
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();

      // Try to sign up
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // Don't require email confirmation for faster onboarding
          // Email confirmation can be done later in settings
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (error) {
        console.error('Supabase signup error:', error);
        setError(getErrorMessage(error.message));
        setLoading(false);
        return;
      }

      // Check if user was created and session exists (no email confirmation required)
      if (data.session) {
        // User is logged in directly - redirect to dashboard
        router.push('/dashboard');
        router.refresh();
      } else if (data.user && !data.session) {
        // Email confirmation is required
        setRegisteredEmail(email);
        setShowEmailSent(true);
        setLoading(false);
      } else {
        // Unexpected state - still try to proceed
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (!registeredEmail) return;

    setLoading(true);
    setError('');

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: registeredEmail,
      });

      if (error) {
        setError(getErrorMessage(error.message));
      } else {
        setError('');
        alert('Bestätigungs-E-Mail wurde erneut gesendet!');
      }
    } catch (err) {
      console.error('Resend error:', err);
      setError('E-Mail konnte nicht gesendet werden.');
    } finally {
      setLoading(false);
    }
  };

  // Show email sent confirmation
  if (showEmailSent) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="container mx-auto px-4 py-6">
          <Link href="/">
            <Logo />
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Überprüfe deine E-Mails</h1>
              <p className="text-gray-600 mb-6">
                Wir haben eine Bestätigungs-E-Mail an<br />
                <strong className="text-gray-900">{registeredEmail}</strong><br />
                gesendet. Klicke auf den Link in der E-Mail, um dein Konto zu aktivieren.
              </p>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleResendEmail}
                  loading={loading}
                >
                  E-Mail erneut senden
                </Button>

                <p className="text-sm text-gray-500">
                  Keine E-Mail erhalten? Prüfe deinen Spam-Ordner oder{' '}
                  <button
                    onClick={() => {
                      setShowEmailSent(false);
                      setEmail(registeredEmail);
                    }}
                    className="text-emerald-600 hover:underline"
                  >
                    versuche eine andere E-Mail
                  </button>
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-3">
                  Probleme bei der Registrierung?
                </p>
                <a
                  href="mailto:support@menuapp.de?subject=Registrierung funktioniert nicht"
                  className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                >
                  support@menuapp.de kontaktieren
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="container mx-auto px-4 py-6">
        <Link href="/">
          <Logo />
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h1 className="text-2xl font-bold text-center mb-2">Registrieren</h1>
            <p className="text-gray-500 text-center mb-6 text-sm">
              14 Tage kostenlos testen · Keine Kreditkarte nötig
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="email"
                type="email"
                label="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="deine@email.de"
              />

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  label="Passwort"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder="Mindestens 6 Zeichen"
                  className="pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={showPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="space-y-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((level) => {
                      const strength =
                        (password.length >= 6 ? 1 : 0) +
                        (/[A-Z]/.test(password) ? 1 : 0) +
                        (/[0-9]/.test(password) ? 1 : 0) +
                        (/[^A-Za-z0-9]/.test(password) ? 1 : 0);
                      const color = strength >= level
                        ? strength <= 1 ? 'bg-red-500'
                          : strength === 2 ? 'bg-orange-500'
                          : strength === 3 ? 'bg-yellow-500'
                          : 'bg-emerald-500'
                        : 'bg-gray-200';
                      return <div key={level} className={`h-1 flex-1 rounded-full ${color} transition-colors`} />;
                    })}
                  </div>
                  <p className="text-xs text-gray-500">
                    {password.length < 6 ? 'Mindestens 6 Zeichen' :
                     !/[A-Z]/.test(password) ? 'Füge einen Großbuchstaben hinzu' :
                     !/[0-9]/.test(password) ? 'Füge eine Zahl hinzu' :
                     !/[^A-Za-z0-9]/.test(password) ? 'Füge ein Sonderzeichen hinzu' :
                     '✓ Starkes Passwort'}
                  </p>
                </div>
              )}

              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  label="Passwort bestätigen"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder="Passwort wiederholen"
                  className="pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={showConfirmPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                  {error}
                  {error.includes('support@menuapp.de') && (
                    <a
                      href="mailto:support@menuapp.de?subject=Registrierung funktioniert nicht"
                      className="block mt-2 text-red-700 underline font-medium"
                    >
                      Jetzt Support kontaktieren
                    </a>
                  )}
                </div>
              )}

              <Button type="submit" className="w-full" loading={loading}>
                Kostenlos registrieren
              </Button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              Bereits registriert?{' '}
              <Link href="/login" className="text-emerald-500 hover:underline font-medium">
                Anmelden
              </Link>
            </p>

            <p className="text-center text-xs text-gray-400 mt-4">
              Mit der Registrierung akzeptierst du unsere{' '}
              <Link href="/agb" className="underline">AGB</Link> und{' '}
              <Link href="/datenschutz" className="underline">Datenschutzerklärung</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
