'use client';

import Link from 'next/link';
import { curriculum, Section } from '@/lib/data/curriculum';

export default function Navigation() {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'advanced':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'beginner':
        return '🌱';
      case 'intermediate':
        return '🚀';
      case 'advanced':
        return '⚡';
      default:
        return '📚';
    }
  };

  return (
    <nav className="w-80 bg-white border-r border-gray-200 overflow-y-auto h-screen sticky top-0">
      <div className="p-6">
        <Link href="/" className="block mb-6">
          <h1 className="text-2xl font-bold text-indigo-600">Playwright Academy</h1>
          <p className="text-sm text-gray-600 mt-1">Master browser automation</p>
        </Link>

        <div className="space-y-6">
          {curriculum.map((section: Section) => (
            <div key={section.id} className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{getLevelIcon(section.level)}</span>
                <h2 className="font-bold text-gray-900">{section.title}</h2>
              </div>
              <span
                className={`inline-block text-xs px-2 py-1 rounded-full border ${getLevelColor(
                  section.level
                )}`}
              >
                {section.level.toUpperCase()}
              </span>
              <p className="text-sm text-gray-600 mb-3">{section.description}</p>

              <div className="space-y-1 ml-4">
                {section.topics.map((topic) => (
                  <Link
                    key={topic.id}
                    href={`/learn/${section.id}/${topic.id}`}
                    className="block p-2 rounded hover:bg-indigo-50 text-sm text-gray-700 hover:text-indigo-600 transition-colors"
                  >
                    {topic.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
