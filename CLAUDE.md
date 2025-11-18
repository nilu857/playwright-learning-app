# CLAUDE.md - AI Assistant Guide

This document provides comprehensive guidance for AI assistants working with the Playwright Academy codebase.

## Project Overview

**Playwright Academy** is an educational web application designed to teach Playwright browser automation from beginner to advanced levels. It's a static, content-driven learning platform built with modern web technologies.

### Purpose
- Provide comprehensive, structured learning content about Playwright
- Offer interactive code examples with copy-paste functionality
- Present progressive learning path from basics to advanced concepts
- Focus on TypeScript implementation of Playwright

### Current State
- **Status**: Active development
- **Deployment**: Not yet deployed (development only)
- **Content**: 70KB+ of comprehensive educational content
- **Structure**: 4 sections, multiple topics, numerous lessons

## Tech Stack

### Core Technologies
- **Next.js 16.0.3** - React framework with App Router
- **React 19.2.0** - Latest with React Server Components
- **TypeScript 5** - Strict mode enabled
- **Tailwind CSS 4** - Utility-first CSS framework

### Development Tools
- **ESLint 9** - Linting with Next.js config
- **PostCSS** - CSS processing for Tailwind
- **Node.js** - Runtime environment (v16+ required)

### Key Dependencies
```json
{
  "next": "16.0.3",
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "tailwindcss": "^4",
  "typescript": "^5"
}
```

## Directory Structure

```
/home/user/playwright-learning-app/
├── app/                              # Next.js App Router directory
│   ├── learn/[sectionId]/[topicId]/ # Dynamic learning routes
│   │   └── page.tsx                 # Topic page with lesson navigation
│   ├── favicon.ico                  # Site favicon
│   ├── globals.css                  # Global styles + custom CSS
│   ├── layout.tsx                   # Root layout with metadata
│   └── page.tsx                     # Homepage (hero + features)
│
├── components/                       # Reusable React components
│   ├── CodeBlock.tsx                # Syntax-highlighted code with copy
│   ├── LessonCard.tsx               # Interactive lesson selection cards
│   ├── LessonContent.tsx            # Lesson content renderer
│   └── Navigation.tsx               # Sidebar navigation
│
├── lib/                             # Utilities and data
│   └── data/
│       └── curriculum.ts            # Complete curriculum (2,371 lines)
│
├── public/                          # Static assets (SVG icons)
├── .gitignore                       # Git ignore patterns
├── eslint.config.mjs                # ESLint configuration
├── next.config.ts                   # Next.js configuration
├── package.json                     # Dependencies and scripts
├── postcss.config.mjs               # PostCSS configuration
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # User-facing documentation
```

## Configuration Files

### TypeScript (tsconfig.json)
- **Target**: ES2017
- **Strict mode**: Enabled
- **Path aliases**: `@/*` maps to project root
- **Module resolution**: bundler
- **JSX**: react-jsx (React 17+ transform)

### Next.js (next.config.ts)
- Minimal configuration using Next.js defaults
- No custom webpack, redirects, or environment variables
- App Router enabled by default

### ESLint (eslint.config.mjs)
- Next.js recommended configurations
- Core Web Vitals preset
- TypeScript support
- Ignores: `.next/`, `out/`, `build/`

## Code Conventions and Patterns

### TypeScript Patterns

**Strong Typing**
```typescript
// Always define interfaces for data structures
export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  codeExamples?: CodeExample[];
  keyPoints?: string[];
  exercises?: string[];
  tips?: string[];
}
```

**Component Props**
```typescript
// Define props interfaces for all components
interface ComponentNameProps {
  prop1: string;
  prop2?: number; // Optional props marked with ?
}

export default function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  // ...
}
```

**Async Operations**
```typescript
// Use React 19's use() hook for async params
import { use } from 'react';

const params = await props.params;
// or
const params = use(props.params);
```

### React Patterns

**Client vs Server Components**
```typescript
// Client component (interactivity needed)
'use client';
import { useState } from 'react';
// ...

// Server component (default - no 'use client')
export default function ServerComponent() {
  // ...
}
```

**Component Structure**
```typescript
'use client'; // Only if needed

import { ComponentType } from 'react';
import { dependency } from 'package';

interface ComponentProps {
  // typed props
}

export default function Component({ prop }: ComponentProps) {
  // 1. Hooks
  const [state, setState] = useState();

  // 2. Functions
  const handleAction = () => {
    // ...
  };

  // 3. JSX
  return (
    <div className="tailwind-classes">
      {/* content */}
    </div>
  );
}
```

### Styling Conventions

**Tailwind CSS**
- Use utility classes exclusively for styling
- Responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Color scheme: Indigo (primary), Green/Yellow/Red (difficulty levels)
- Consistent spacing: `p-4`, `p-6`, `p-8`, `gap-4`, `gap-6`

**Color Usage**
```typescript
// Beginner: Green
className="bg-green-100 text-green-800"

// Intermediate: Yellow
className="bg-yellow-100 text-yellow-800"

// Advanced: Red
className="bg-red-100 text-red-800"

// Primary actions: Indigo
className="bg-indigo-600 hover:bg-indigo-700 text-white"
```

**Custom CSS**
- Only in `app/globals.css` for special cases
- Current custom: scrollbar styling, font declarations, code block styling

### Naming Conventions

- **Files**: PascalCase for components (`CodeBlock.tsx`)
- **Components**: PascalCase (`LessonCard`)
- **Interfaces**: PascalCase (`LessonContentProps`)
- **Functions**: camelCase (`formatContent`, `getLevelColor`)
- **Variables**: camelCase (`currentLesson`, `lessonIndex`)
- **IDs in curriculum**: kebab-case (`'what-is-playwright'`, `'api-testing'`)
- **CSS classes**: Tailwind utilities (kebab-case by default)

## Data Architecture

### Curriculum Structure

```
Section (4 total)
  ├── id: string (kebab-case)
  ├── title: string
  ├── level: 'beginner' | 'intermediate' | 'advanced'
  ├── description: string
  └── topics: Topic[]
        ├── id: string (kebab-case)
        ├── title: string
        ├── description: string
        └── lessons: Lesson[]
              ├── id: string (kebab-case)
              ├── title: string
              ├── description: string
              ├── content: string (markdown-style)
              ├── codeExamples?: CodeExample[]
              ├── keyPoints?: string[]
              ├── exercises?: string[]
              └── tips?: string[]
```

### Routing Structure

- **Homepage**: `/` (app/page.tsx)
- **Learning pages**: `/learn/[sectionId]/[topicId]` (app/learn/[sectionId]/[topicId]/page.tsx)
- **Dynamic params**: Both sectionId and topicId are kebab-case strings matching curriculum IDs

### State Management

- **No global state** - Pure React local state
- **Navigation state**: Managed in topic pages with `currentLessonIndex`
- **Progress tracking**: Visual only (no persistence)

## Development Workflows

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:3000
```

### Build Process
```bash
# Create production build
npm run build

# Serve production build
npm run start

# Run linter
npm run lint
```

### No Testing Infrastructure
Currently NO testing is set up:
- No test files exist
- No testing frameworks installed (Jest, Vitest, Playwright, etc.)
- No test scripts in package.json
- **Irony**: This is a Playwright learning app without Playwright tests

## Common Tasks for AI Assistants

### 1. Adding New Content

**Adding a New Lesson**
1. Open `/home/user/playwright-learning-app/lib/data/curriculum.ts`
2. Find the appropriate section and topic
3. Add a new lesson object to the `lessons` array:

```typescript
{
  id: 'unique-kebab-case-id',
  title: 'Lesson Title',
  description: 'Brief description for lesson cards',
  content: `
Markdown-style content here.

## Subheadings allowed

**Bold text** for emphasis.

- Bullet points
- Work great
  `,
  codeExamples: [
    {
      language: 'typescript', // or 'javascript', 'bash', etc.
      code: 'const example = "code here";',
      explanation: 'What this code does'
    }
  ],
  keyPoints: [
    'Important takeaway 1',
    'Important takeaway 2'
  ],
  tips: [
    'Pro tip for learners'
  ],
  exercises: [
    'Practice exercise 1'
  ]
}
```

**Adding a New Topic**
1. Add to the `topics` array in the appropriate section
2. Follow the Topic interface structure
3. Include at least one lesson

**Adding a New Section**
1. Add to the `curriculum` array in curriculum.ts
2. Set appropriate level: 'beginner', 'intermediate', or 'advanced'
3. Include topics and lessons

### 2. Modifying Components

**When to create client components**:
- Component uses hooks (useState, useEffect, etc.)
- Component handles user interactions (onClick, onChange)
- Component needs browser APIs

**When to use server components**:
- Static content display
- Data fetching (if we add it)
- SEO-critical content

### 3. Styling Changes

**Prefer**:
- Tailwind utility classes
- Existing color schemes
- Responsive design patterns

**Avoid**:
- Inline styles
- New CSS files
- Custom CSS unless absolutely necessary

### 4. Adding New Features

**Before implementing**:
1. Check if it fits the learning platform purpose
2. Consider mobile responsiveness
3. Ensure TypeScript type safety
4. Follow existing patterns

**Common feature requests**:
- Search functionality: Would need client-side search implementation
- Progress tracking: Would need localStorage or backend
- Interactive code editor: Would need code execution environment
- User accounts: Would need authentication system

## Important Constraints

### What This App Does NOT Have

1. **No Backend**: Pure static application
2. **No Database**: All content hardcoded in curriculum.ts
3. **No User Accounts**: No authentication/authorization
4. **No Persistence**: No localStorage or cookies currently
5. **No API Routes**: No Next.js API routes defined
6. **No Testing**: No test infrastructure
7. **No CI/CD**: No deployment pipelines
8. **No Analytics**: No tracking/monitoring
9. **No CMS**: Content must be edited in code
10. **No Search**: No search functionality yet

### SEO Considerations

- Metadata defined in `app/layout.tsx`
- Static generation makes it SEO-friendly
- All content is crawlable
- Consider adding per-page metadata if needed

### Performance Considerations

- Static site = fast load times
- Code splitting handled by Next.js
- Consider lazy loading for large curriculum
- SVG icons are optimized

## File-Specific Guidance

### /home/user/playwright-learning-app/lib/data/curriculum.ts
- **Size**: 2,371 lines (large file)
- **Purpose**: Complete learning content database
- **Editing**: Use specific line numbers when editing
- **Testing**: Always verify JSON structure remains valid
- **IDs**: Must be unique within their scope (topic IDs unique within section, lesson IDs unique within topic)

### /home/user/playwright-learning-app/components/CodeBlock.tsx
- **Purpose**: Display code with syntax highlighting
- **Features**: Copy-to-clipboard functionality
- **Languages**: Supports multiple via language prop
- **Styling**: Custom CSS in globals.css for code blocks

### /home/user/playwright-learning-app/components/Navigation.tsx
- **Purpose**: Sidebar navigation showing all content
- **Mobile**: Collapsible on small screens
- **Active state**: Shows current section/topic
- **Data source**: Imports curriculum directly

### /home/user/playwright-learning-app/app/learn/[sectionId]/[topicId]/page.tsx
- **Purpose**: Main learning interface
- **Features**: Lesson navigation, progress bar, prev/next buttons
- **State**: Manages current lesson index
- **Client component**: Uses useState for interactivity

### /home/user/playwright-learning-app/app/page.tsx
- **Purpose**: Homepage with hero and features
- **Sections**: Hero, Features, Learning Path preview
- **Links**: Dynamic links to first lesson of each section
- **Client component**: Interactive navigation

## Best Practices for AI Assistants

### Before Making Changes

1. **Read relevant files first**: Always use Read tool before editing
2. **Understand context**: Check related components/files
3. **Verify imports**: Ensure path aliases work (`@/*`)
4. **Check TypeScript**: Ensure types are correct

### When Adding Content

1. **Follow existing patterns**: Match the style of existing lessons
2. **Use proper markdown**: Content field supports markdown-style formatting
3. **Include examples**: Code examples make lessons better
4. **Add key points**: Help learners remember important concepts
5. **Validate structure**: Ensure all required fields are present

### When Modifying Components

1. **Preserve functionality**: Don't break existing features
2. **Maintain accessibility**: Keep ARIA labels and semantic HTML
3. **Test responsiveness**: Consider mobile, tablet, desktop
4. **Keep it consistent**: Match existing component patterns
5. **Type everything**: No `any` types unless absolutely necessary

### When Debugging

1. **Check browser console**: Many issues show up there
2. **Verify imports**: Path issues are common
3. **Check TypeScript errors**: Run `npm run lint`
4. **Test in dev mode**: Use `npm run dev` for hot reload
5. **Verify data structure**: Ensure curriculum.ts is valid

### Code Quality Standards

- **TypeScript**: Strict mode, no implicit any
- **ESLint**: Must pass `npm run lint`
- **Formatting**: Consistent indentation (2 spaces)
- **Comments**: Add JSDoc for complex functions
- **Naming**: Clear, descriptive names

## Git Workflow

### Branch Strategy
- Main branch: `main` (default)
- Feature branches: `claude/feature-name-sessionid`
- Always work on designated feature branch
- Never push to main without permission

### Commit Messages
```bash
# Good commit messages
feat: Add new lesson on API authentication
fix: Resolve navigation issue on mobile
docs: Update README with new learning path
refactor: Simplify lesson content renderer

# Bad commit messages
update stuff
fixes
changes
wip
```

### Before Committing
1. Verify changes with `git diff`
2. Check for unintended files
3. Ensure build succeeds (`npm run build`)
4. Write clear commit message

## Common Pitfalls to Avoid

1. **Don't break TypeScript**: Always check types
2. **Don't add dependencies without reason**: Keep it lean
3. **Don't skip reading files**: Always read before editing
4. **Don't ignore mobile**: Test responsive design
5. **Don't use inline styles**: Use Tailwind classes
6. **Don't create unnecessary files**: Prefer editing existing
7. **Don't forget path aliases**: Use `@/*` for imports
8. **Don't mix client/server**: Mark client components properly
9. **Don't hardcode values**: Use constants or config
10. **Don't skip validation**: Ensure data structure integrity

## Helpful Commands

```bash
# Development
npm run dev              # Start dev server (port 3000)
npm run build            # Build for production
npm run start            # Serve production build
npm run lint             # Run ESLint

# Git
git status               # Check current status
git diff                 # See changes
git log --oneline -10    # Recent commits
git branch               # List branches

# File operations
ls -la                   # List all files
find . -name "*.tsx"     # Find TypeScript React files
grep -r "search term"    # Search in files

# Node/npm
node --version           # Check Node version
npm list --depth=0       # List installed packages
```

## Resources

### Official Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Playwright Docs](https://playwright.dev/docs/intro)

### Project Documentation
- `README.md` - User-facing documentation
- This file (`CLAUDE.md`) - AI assistant guidance
- Inline comments in complex files

## Future Considerations

### Potential Enhancements
- Add actual Playwright tests (dogfooding)
- Implement search functionality
- Add progress tracking with localStorage
- Create interactive code playgrounds
- Add video tutorials
- Implement user authentication
- Add community features (comments, ratings)
- Create mobile app version
- Add print-friendly lesson views
- Implement dark mode

### Technical Debt
- No testing infrastructure
- Large curriculum.ts file could be split
- No error boundaries
- Limited accessibility features
- No analytics/monitoring
- No performance monitoring

## Questions to Ask When Uncertain

1. **"Should I create a new file or modify an existing one?"**
   → Always prefer modifying existing files

2. **"Is this a client or server component?"**
   → Client if interactive, server otherwise

3. **"Where should this content go in the curriculum?"**
   → Match the difficulty level and topic area

4. **"Do I need to install a new package?"**
   → Ask the user first, prefer built-in solutions

5. **"Should I commit these changes?"**
   → Only if user explicitly requests it

6. **"How do I test this?"**
   → Run `npm run dev` and manually test in browser

---

**Last Updated**: 2025-11-18
**Maintainer**: AI-assisted development
**Version**: 1.0.0

This document should be updated whenever significant architectural changes are made to the codebase.
