'use client';

interface LessonCardProps {
  title: string;
  description: string;
  onClick: () => void;
  isActive?: boolean;
}

export default function LessonCard({
  title,
  description,
  onClick,
  isActive = false,
}: LessonCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
        isActive
          ? 'border-indigo-500 bg-indigo-50 shadow-md'
          : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-sm'
      }`}
    >
      <h3
        className={`font-semibold mb-1 ${
          isActive ? 'text-indigo-700' : 'text-gray-900'
        }`}
      >
        {title}
      </h3>
      <p className="text-sm text-gray-600">{description}</p>
    </button>
  );
}
