import React from 'react';
import { QrCode, History, BookOpen } from 'lucide-react';

type ServiceCardProps = {
  type: 'qrcode' | 'history' | 'education';
  title: string;
  description: string;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ type, title, description }) => {
  const getIcon = () => {
    switch (type) {
      case 'qrcode':
        return <QrCode className="w-16 h-16 text-[#2F6844]" />;
      case 'history':
        return <History className="w-16 h-16 text-[#2F6844]" />;
      case 'education':
        return <BookOpen className="w-16 h-16 text-[#2F6844]" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center border border-gray-100 h-full">
      <div className="mb-4">
        {getIcon()}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-[#2F6844]">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
      <div className="mt-auto pt-4">
        <div className="w-8 h-8 bg-[#E9F1EA] rounded-full flex items-center justify-center text-[#2F6844] mx-auto">
          <span>&rarr;</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;