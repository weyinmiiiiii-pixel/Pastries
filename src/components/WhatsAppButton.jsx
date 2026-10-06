import React from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const phoneNumber = "2348000000000"; // Sample WhatsApp contact
  const defaultMessage = "Hello Mamana Cakes & Pastries! I would like to make an inquiry / place an order.";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[#25D366] text-white shadow-2xl hover:bg-[#20BA5A] transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center group"
      title="Chat with Mamana Cakes & Pastries on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-extrabold text-xs pl-0 group-hover:pl-2">
        Chat with Us
      </span>
    </button>
  );
}
