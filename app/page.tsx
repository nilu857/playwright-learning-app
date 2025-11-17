import Link from 'next/link';
import { curriculum } from '@/lib/data/curriculum';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Master <span className="text-indigo-600">Playwright</span>
          </h1>
          <p className="text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Learn browser automation from basics to advanced with our comprehensive, interactive curriculum
          </p>
          <Link
            href="/learn/basics/introduction"
            className="inline-block px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Start Learning Now
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Comprehensive Content
            </h3>
            <p className="text-gray-600">
              From basic setup to advanced patterns, covering all Playwright concepts with detailed explanations and examples.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">💻</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Interactive Code Examples
            </h3>
            <p className="text-gray-600">
              Real-world code examples with explanations. Copy, paste, and experiment with every concept.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              TypeScript Focused
            </h3>
            <p className="text-gray-600">
              Learn TypeScript concepts essential for Playwright with detailed explanations and practical examples.
            </p>
          </div>
        </div>

        {/* Learning Path */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Your Learning Path
          </h2>

          <div className="space-y-6">
            {curriculum.map((section, index) => {
              const levelColors = {
                beginner: 'from-green-400 to-emerald-500',
                intermediate: 'from-yellow-400 to-orange-500',
                advanced: 'from-red-400 to-pink-500',
              };

              const levelIcons = {
                beginner: '🌱',
                intermediate: '🚀',
                advanced: '⚡',
              };

              return (
                <div
                  key={section.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`h-2 bg-gradient-to-r ${
                      levelColors[section.level]
                    }`}
                  ></div>
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">
                        {levelIcons[section.level]}
                      </span>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {section.title}
                        </h3>
                        <span className="inline-block mt-1 text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-semibold uppercase">
                          {section.level}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6">{section.description}</p>

                    <div className="grid md:grid-cols-2 gap-4">
                      {section.topics.map((topic) => (
                        <Link
                          key={topic.id}
                          href={`/learn/${section.id}/${topic.id}`}
                          className="p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-all group"
                        >
                          <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 mb-1">
                            {topic.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {topic.description}
                          </p>
                          <div className="mt-2 text-sm text-gray-500">
                            {topic.lessons.length} lessons
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Begin your journey to becoming a Playwright expert today!
          </p>
          <Link
            href="/learn/basics/introduction"
            className="inline-block px-8 py-4 bg-white text-indigo-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Start with the Basics
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-2">
            Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
          </p>
          <p className="text-sm text-gray-500">
            Learn Playwright • Master Browser Automation • Build Better Tests
          </p>
        </div>
      </footer>
    </div>
  );
}
