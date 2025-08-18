import React from 'react';
import { Volume2 } from 'lucide-react';
import './updates.css';

const Updates = () => {
  const updates = [
    'Yukti 2025 registrations are open!',
    'Participate in NINADA (Singing Competition)!',
    'Tech events from July 10–12.',
    'Last date for registration: July 5!',
  ];

  return (
    <section className="w-full bg-yellow-100 border-y-2 border-yellow-400 py-2 px-4">
      <div className="flex items-center gap-4 overflow-hidden">
        <Volume2 className="text-blue-600 animate-pulse" />
        <div className="w-full overflow-hidden">
          <div className="whitespace-nowrap animate-scroll bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-medium text-sm sm:text-base">
            {updates.map((u, i) => (
              <span key={i}>• {u} &nbsp;&nbsp;&nbsp; </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Updates;
