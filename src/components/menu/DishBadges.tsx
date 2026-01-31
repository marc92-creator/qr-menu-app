import { Star, ChefHat, Sparkles } from 'lucide-react';

interface DishBadgesProps {
  isPopular?: boolean;
  isRecommended?: boolean;
  isNew?: boolean;
}

export function DishBadges({ isPopular, isRecommended, isNew }: DishBadgesProps) {
  if (!isPopular && !isRecommended && !isNew) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {isPopular && (
        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-medium px-2 py-0.5 rounded-full">
          <Star size={12} fill="currentColor" />
          Beliebt
        </span>
      )}
      {isRecommended && (
        <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 text-xs font-medium px-2 py-0.5 rounded-full">
          <ChefHat size={12} />
          Empfehlung
        </span>
      )}
      {isNew && (
        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-0.5 rounded-full">
          <Sparkles size={12} />
          Neu
        </span>
      )}
    </div>
  );
}
