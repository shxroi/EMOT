import React from 'react';

type StepCardProps = {
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
};

const StepCard: React.FC<StepCardProps> = ({ 
  title, 
  description,
  bgColor,
  textColor 
}) => {
  return (
    <div 
      className={`${bgColor} ${textColor} p-6 rounded-lg text-center flex flex-col h-full`}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default StepCard;