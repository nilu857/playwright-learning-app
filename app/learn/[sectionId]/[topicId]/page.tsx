'use client';

import { useState, use } from 'react';
import { curriculum, Lesson } from '@/lib/data/curriculum';
import Navigation from '@/components/Navigation';
import LessonCard from '@/components/LessonCard';
import LessonContent from '@/components/LessonContent';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    sectionId: string;
    topicId: string;
  }>;
}

export default function TopicPage({ params }: PageProps) {
  const { sectionId, topicId } = use(params);

  // Find the section and topic
  const section = curriculum.find((s) => s.id === sectionId);
  const topic = section?.topics.find((t) => t.id === topicId);

  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(
    topic?.lessons[0] || null
  );

  if (!section || !topic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Topic Not Found
          </h1>
          <Link
            href="/"
            className="text-indigo-600 hover:text-indigo-700 underline"
          >
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  const currentLessonIndex = topic.lessons.findIndex(
    (l) => l.id === selectedLesson?.id
  );
  const hasPrevious = currentLessonIndex > 0;
  const hasNext = currentLessonIndex < topic.lessons.length - 1;

  const goToPrevious = () => {
    if (hasPrevious) {
      setSelectedLesson(topic.lessons[currentLessonIndex - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNext = () => {
    if (hasNext) {
      setSelectedLesson(topic.lessons[currentLessonIndex + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Find next topic for "Complete Topic" button
  const currentSectionIndex = curriculum.findIndex((s) => s.id === sectionId);
  const currentTopicIndex = section.topics.findIndex((t) => t.id === topicId);
  let nextTopic = null;
  let nextSection = null;

  if (currentTopicIndex < section.topics.length - 1) {
    nextTopic = section.topics[currentTopicIndex + 1];
    nextSection = section;
  } else if (currentSectionIndex < curriculum.length - 1) {
    nextSection = curriculum[currentSectionIndex + 1];
    nextTopic = nextSection.topics[0];
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />

      <div className="flex-1 flex">
        {/* Lessons Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto p-6">
          <div className="mb-6">
            <Link
              href="/"
              className="text-sm text-indigo-600 hover:text-indigo-700 mb-4 inline-block"
            >
              ← Back to Home
            </Link>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {topic.title}
            </h2>
            <p className="text-sm text-gray-600 mb-4">{topic.description}</p>
            <div className="text-xs text-gray-500">
              {topic.lessons.length} lessons in this topic
            </div>
          </div>

          <div className="space-y-3">
            {topic.lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                title={lesson.title}
                description={lesson.description}
                onClick={() => {
                  setSelectedLesson(lesson);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                isActive={selectedLesson?.id === lesson.id}
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-8 py-12">
            {selectedLesson && <LessonContent lesson={selectedLesson} />}

            {/* Navigation Buttons */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <button
                  onClick={goToPrevious}
                  disabled={!hasPrevious}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    hasPrevious
                      ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  ← Previous Lesson
                </button>

                {hasNext ? (
                  <button
                    onClick={goToNext}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Next Lesson →
                  </button>
                ) : nextTopic && nextSection ? (
                  <Link
                    href={`/learn/${nextSection.id}/${nextTopic.id}`}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Complete Topic & Continue →
                  </Link>
                ) : (
                  <Link
                    href="/"
                    className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Complete Course! 🎉
                  </Link>
                )}
              </div>

              {/* Progress Indicator */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Lesson Progress</span>
                  <span>
                    {currentLessonIndex + 1} of {topic.lessons.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        ((currentLessonIndex + 1) / topic.lessons.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
