'use client';

import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language: string;
  explanation?: string;
}

export default function CodeBlock({ code, language, explanation }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4">
      <div className="relative group">
        <div className="flex items-center justify-between bg-gray-800 text-gray-300 px-4 py-2 rounded-t-lg border-b border-gray-700">
          <span className="text-sm font-mono">{language}</span>
          <button
            onClick={copyToClipboard}
            className="text-xs px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto">
          <code className="text-sm font-mono">{code}</code>
        </pre>
      </div>
      {explanation && (
        <div className="mt-2 p-3 bg-blue-50 border-l-4 border-blue-400 text-sm text-gray-700">
          <span className="font-semibold text-blue-800">💡 </span>
          {explanation}
        </div>
      )}
    </div>
  );
}
