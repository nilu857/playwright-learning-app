'use client';

import { Lesson } from '@/lib/data/curriculum';
import CodeBlock from './CodeBlock';

interface LessonContentProps {
  lesson: Lesson;
}

export default function LessonContent({ lesson }: LessonContentProps) {
  // Convert markdown-style content to paragraphs
  const formatContent = (content: string) => {
    const sections = content.trim().split('\n\n');
    return sections.map((section, index) => {
      // Check if it's a heading
      if (section.startsWith('##')) {
        const text = section.replace(/^##\s*/, '');
        return (
          <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            {text}
          </h2>
        );
      }

      // Check if it's bold text (used for labels)
      if (section.includes('**')) {
        const parts = section.split('**');
        return (
          <p key={index} className="text-gray-700 leading-relaxed mb-4">
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <strong key={i} className="font-semibold text-gray-900">
                  {part}
                </strong>
              ) : (
                part
              )
            )}
          </p>
        );
      }

      // Check if it's a code block reference
      if (section.startsWith('```')) {
        return null; // Skip, will be handled separately
      }

      // Regular paragraph
      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-4">
          {section}
        </p>
      );
    });
  };

  return (
    <div className="prose prose-indigo max-w-none">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{lesson.title}</h1>
      <p className="text-xl text-gray-600 mb-8">{lesson.description}</p>

      <div className="space-y-4">{formatContent(lesson.content)}</div>

      {lesson.codeExamples && lesson.codeExamples.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Code Examples</h2>
          {lesson.codeExamples.map((example, index) => (
            <CodeBlock
              key={index}
              code={example.code}
              language={example.language}
              explanation={example.explanation}
            />
          ))}
        </div>
      )}

      {lesson.keyPoints && lesson.keyPoints.length > 0 && (
        <div className="mt-8 p-6 bg-indigo-50 rounded-lg border-2 border-indigo-200">
          <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
            <span>🎯</span> Key Points
          </h3>
          <ul className="space-y-2">
            {lesson.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">•</span>
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {lesson.tips && lesson.tips.length > 0 && (
        <div className="mt-6 p-6 bg-yellow-50 rounded-lg border-2 border-yellow-200">
          <h3 className="text-xl font-bold text-yellow-900 mb-4 flex items-center gap-2">
            <span>💡</span> Pro Tips
          </h3>
          <ul className="space-y-2">
            {lesson.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-yellow-600 mt-1">→</span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {lesson.exercises && lesson.exercises.length > 0 && (
        <div className="mt-6 p-6 bg-green-50 rounded-lg border-2 border-green-200">
          <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
            <span>✏️</span> Practice Exercises
          </h3>
          <ul className="space-y-2">
            {lesson.exercises.map((exercise, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 font-semibold">{index + 1}.</span>
                <span className="text-gray-700">{exercise}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
