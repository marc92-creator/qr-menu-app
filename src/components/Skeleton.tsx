'use client';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
    />
  );
}

export function MenuItemSkeleton() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm ring-1 ring-gray-100">
      <div className="flex gap-4">
        {/* Image placeholder */}
        <Skeleton className="w-20 h-20 rounded-lg flex-shrink-0" />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-16" />
          </div>
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-4 w-2/3 mt-1" />
        </div>
      </div>
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-6 w-24" />
      <MenuItemSkeleton />
      <MenuItemSkeleton />
      <MenuItemSkeleton />
    </div>
  );
}

export function MenuViewSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header skeleton */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-200/60">
        <div className="px-4 pt-4 pb-3 md:px-6">
          <div className="flex items-center gap-3 max-w-2xl mx-auto">
            <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0" />
            <div className="flex-1">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-32 mt-1" />
            </div>
          </div>
        </div>

        {/* Category pills skeleton */}
        <div className="flex gap-2 px-4 pb-3 overflow-hidden">
          <Skeleton className="h-9 w-24 rounded-full flex-shrink-0" />
          <Skeleton className="h-9 w-20 rounded-full flex-shrink-0" />
          <Skeleton className="h-9 w-28 rounded-full flex-shrink-0" />
          <Skeleton className="h-9 w-24 rounded-full flex-shrink-0" />
        </div>
      </header>

      {/* Content skeleton */}
      <main className="px-4 md:px-6 pb-20">
        <div className="max-w-2xl mx-auto space-y-6 pt-4">
          <CategorySkeleton />
          <CategorySkeleton />
        </div>
      </main>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32 mt-2" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24 rounded-xl" />
          <Skeleton className="h-10 w-32 rounded-xl" />
        </div>
      </div>

      {/* Category card skeleton */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-gray-100">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <div>
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-3 w-16 mt-1" />
          </div>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48 mt-1" />
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-36 mt-1" />
            </div>
            <Skeleton className="h-6 w-14" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-gray-100">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <div>
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-3 w-20 mt-1" />
          </div>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-4 w-52 mt-1" />
            </div>
            <Skeleton className="h-6 w-12" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function RestaurantCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-gray-100">
      <div className="flex items-start gap-4">
        <Skeleton className="w-14 h-14 rounded-xl flex-shrink-0" />
        <div className="flex-1">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-48 mt-1" />
          <div className="flex gap-4 mt-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
