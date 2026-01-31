import { Shield, Server, Headphones, CreditCard, Clock } from 'lucide-react';

export function TrustBar() {
  const trustItems = [
    { icon: Shield, text: "DSGVO-konform" },
    { icon: Server, text: "Hosting in Deutschland" },
    { icon: Headphones, text: "Deutscher Support" },
    { icon: CreditCard, text: "Keine versteckten Kosten" },
    { icon: Clock, text: "In 10 Min. online" },
  ];

  return (
    <div className="py-6 bg-gray-50 border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-gray-600">
          {trustItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <item.icon size={18} className="text-emerald-500 flex-shrink-0" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
