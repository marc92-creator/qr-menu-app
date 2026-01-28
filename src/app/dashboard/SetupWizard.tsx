'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Logo } from '@/components/Logo';
import { generateSlug } from '@/lib/utils';
import { RESTAURANT_TEMPLATES, getTemplateById } from '@/lib/restaurantTemplates';

interface SetupWizardProps {
  onComplete: () => void;
}

export function SetupWizard({ onComplete }: SetupWizardProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Step 1: Restaurant info
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  // Step 2: Logo
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Step 3: Template (null = not selected, 'empty' = no template, or template ID)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    setError('');

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setError('Nicht angemeldet');
        setLoading(false);
        return;
      }

      let logoUrl = null;

      // Upload logo if provided
      if (logoFile) {
        const fileExt = logoFile.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('logos')
          .upload(fileName, logoFile);

        if (uploadError) {
          console.error('Logo upload error:', uploadError);
        } else {
          const { data: urlData } = supabase.storage
            .from('logos')
            .getPublicUrl(fileName);
          logoUrl = urlData.publicUrl;
        }
      }

      // Generate unique slug
      let slug = generateSlug(name);
      const { data: existingSlug } = await supabase
        .from('restaurants')
        .select('slug')
        .eq('slug', slug)
        .single();

      if (existingSlug) {
        slug = `${slug}-${Date.now().toString(36)}`;
      }

      // Calculate trial end date (14 days from now)
      const trialEndsAt = new Date();
      trialEndsAt.setDate(trialEndsAt.getDate() + 14);

      // Create restaurant
      const { data: restaurant, error: restaurantError } = await supabase
        .from('restaurants')
        .insert({
          owner_id: user.id,
          name,
          slug,
          address: address || null,
          logo_url: logoUrl,
          trial_ends_at: trialEndsAt.toISOString(),
        })
        .select()
        .single();

      if (restaurantError) {
        setError('Fehler beim Erstellen des Restaurants');
        setLoading(false);
        return;
      }

      // Create free subscription
      await supabase.from('subscriptions').insert({
        user_id: user.id,
        plan: 'free',
        status: 'active',
      });

      // Add template menu if selected
      if (selectedTemplate && selectedTemplate !== 'empty' && restaurant) {
        const template = getTemplateById(selectedTemplate);
        if (template) {
          for (let i = 0; i < template.categories.length; i++) {
            const category = template.categories[i];

            const { data: categoryData } = await supabase
              .from('menu_categories')
              .insert({
                restaurant_id: restaurant.id,
                name: category.name,
                name_en: category.name_en || null,
                position: i,
              })
              .select()
              .single();

            if (categoryData) {
              for (let j = 0; j < category.items.length; j++) {
                const item = category.items[j];
                await supabase.from('menu_items').insert({
                  category_id: categoryData.id,
                  name: item.name,
                  name_en: item.name_en || null,
                  description: item.description || null,
                  description_en: item.description_en || null,
                  price: item.price,
                  position: j,
                  is_vegetarian: item.is_vegetarian || false,
                  is_vegan: item.is_vegan || false,
                  tags: item.tags || [],
                });
              }
            }
          }
        }
      }

      onComplete();
    } catch {
      setError('Ein Fehler ist aufgetreten');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="container mx-auto px-4 py-6">
        <Logo />
      </header>

      <main className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-lg">
          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-3 h-3 rounded-full transition-colors ${
                  s === step
                    ? 'bg-emerald-500'
                    : s < step
                    ? 'bg-emerald-300'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            {/* Step 1: Restaurant Info */}
            {step === 1 && (
              <>
                <h1 className="text-2xl font-bold text-center mb-2">
                  Willkommen bei MenuApp!
                </h1>
                <p className="text-gray-600 text-center mb-8">
                  Erzähl uns von deinem Restaurant
                </p>

                <div className="space-y-4">
                  <Input
                    id="name"
                    label="Restaurant-Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="z.B. Mustafa Döner"
                    required
                  />

                  <Input
                    id="address"
                    label="Adresse (optional)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="z.B. Musterstraße 123, 12345 Berlin"
                  />

                  <Button
                    className="w-full"
                    onClick={() => setStep(2)}
                    disabled={!name.trim()}
                  >
                    Weiter
                  </Button>
                </div>
              </>
            )}

            {/* Step 2: Logo */}
            {step === 2 && (
              <>
                <h1 className="text-2xl font-bold text-center mb-2">
                  Logo hochladen
                </h1>
                <p className="text-gray-600 text-center mb-8">
                  Optional - du kannst das später ändern
                </p>

                <div className="space-y-4">
                  <div className="flex flex-col items-center gap-4">
                    {logoPreview ? (
                      <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={logoPreview}
                          alt="Logo Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-32 h-32 rounded-xl bg-gray-100 flex items-center justify-center">
                        <svg
                          className="w-12 h-12 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}

                    <label className="cursor-pointer">
                      <span className="text-emerald-500 hover:underline font-medium">
                        {logoPreview ? 'Anderes Bild wählen' : 'Bild auswählen'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                      Zurück
                    </Button>
                    <Button className="flex-1" onClick={() => setStep(3)}>
                      {logoPreview ? 'Weiter' : 'Überspringen'}
                    </Button>
                  </div>
                </div>
              </>
            )}

            {/* Step 3: Template */}
            {step === 3 && (
              <>
                <h1 className="text-2xl font-bold text-center mb-2">
                  Vorlage wählen
                </h1>
                <p className="text-gray-600 text-center mb-6">
                  Starte mit einer Vorlage oder leer
                </p>

                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                  {/* Restaurant Templates */}
                  {RESTAURANT_TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                        selectedTemplate === template.id
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold mb-1">
                        {template.icon} {template.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {template.description}
                      </div>
                    </button>
                  ))}

                  {/* Empty option */}
                  <button
                    onClick={() => setSelectedTemplate('empty')}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                      selectedTemplate === 'empty'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold mb-1">📝 Leer starten</div>
                    <div className="text-sm text-gray-600">
                      Erstelle dein Menü komplett selbst
                    </div>
                  </button>
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center mt-4">{error}</p>
                )}

                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                    Zurück
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleComplete}
                    disabled={selectedTemplate === null}
                    loading={loading}
                  >
                    Fertig
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
