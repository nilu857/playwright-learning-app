# 🎭 Playwright Academy

A modern, interactive web application for learning Playwright browser automation from basics to advanced concepts.

## ✨ Features

- **📚 Comprehensive Curriculum**: From installation to advanced patterns
- **💻 Interactive Code Examples**: Real-world examples with copy-paste functionality
- **🎯 TypeScript Focused**: Detailed TypeScript explanations for Playwright
- **🚀 Progressive Learning**: Structured path from beginner to advanced
- **🎨 Modern UI**: Beautiful, responsive interface built with Next.js and Tailwind CSS
- **📱 Mobile Friendly**: Learn on any device

## 🏗️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Geist Sans & Geist Mono

## 📋 Prerequisites

- Node.js 16 or higher
- npm, yarn, or pnpm

## 🚀 Getting Started

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd playwright-learning-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## 📖 Learning Path

The curriculum is organized into four main sections:

### 🌱 Getting Started (Beginner)
- Introduction to Playwright
- Installation & Setup
- Writing Your First Test
- Running Tests
- Project Structure

### 🚀 Core Concepts (Intermediate)
- **Locators & Selectors**
  - Understanding Locators
  - Advanced Locator Techniques
  - CSS and XPath Selectors

- **Actions & Interactions**
  - Basic Actions (click, fill, type)
  - Form Interactions
  - Keyboard & Mouse Events

- **Assertions & Verification**
  - Web-First Assertions
  - Generic Assertions
  - Soft Assertions

### ⚡ Advanced Topics (Advanced)
- **Test Fixtures**
  - Built-in Fixtures
  - Custom Fixtures

- **API Testing**
  - API Testing Basics
  - API Authentication

- **Configuration & Best Practices**
  - Playwright Configuration
  - Page Object Model
  - Parallel Execution & Sharding

- **Debugging & Troubleshooting**
  - Debugging Tools
  - Trace Viewer

### 💡 TypeScript for Playwright (Intermediate)
- **TypeScript Fundamentals**
  - Types and Interfaces
  - Async/Await & Promises
  - Generics

- **Advanced TypeScript**
  - Type Guards & Narrowing
  - Utility Types

## 🎯 Key Concepts Covered

- ✅ Cross-browser testing (Chromium, Firefox, WebKit)
- ✅ Auto-waiting and web-first assertions
- ✅ Page Object Model pattern
- ✅ API testing with Playwright
- ✅ Test fixtures and hooks
- ✅ Parallel execution and sharding
- ✅ Debugging with Inspector and Trace Viewer
- ✅ Network interception and mocking
- ✅ Screenshots and video recording
- ✅ TypeScript best practices

## 📂 Project Structure

```
playwright-learning-app/
├── app/                      # Next.js app directory
│   ├── learn/               # Learning pages
│   │   └── [sectionId]/
│   │       └── [topicId]/
│   │           └── page.tsx
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── CodeBlock.tsx        # Code example component
│   ├── LessonCard.tsx       # Lesson card component
│   ├── LessonContent.tsx    # Lesson content renderer
│   └── Navigation.tsx       # Navigation sidebar
├── lib/                     # Utilities and data
│   └── data/
│       └── curriculum.ts    # Learning content
├── public/                  # Static assets
└── README.md
```

## 🎨 Features in Detail

### Interactive Code Examples
- Syntax-highlighted code blocks
- Copy-to-clipboard functionality
- Explanations for each example
- Support for multiple languages (TypeScript, JavaScript, Bash)

### Progressive Navigation
- Side navigation for easy topic browsing
- Lesson-by-lesson progression
- Progress tracking
- Previous/Next lesson navigation

### Comprehensive Content
- Detailed explanations for every concept
- Key points summary for each lesson
- Pro tips from experienced developers
- Practice exercises (where applicable)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new lessons or topics
- Improve existing content
- Fix typos or errors
- Enhance UI/UX
- Add new features

## 📝 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- [Playwright](https://playwright.dev/) - The amazing browser automation framework
- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - The utility-first CSS framework

## 📞 Support

If you have questions or need help:
1. Check the lessons in the app
2. Visit [Playwright Documentation](https://playwright.dev/docs/intro)
3. Open an issue in the repository

## 🎓 Learning Tips

1. **Start from the beginning**: Even if you have some experience, the basics section covers important concepts
2. **Practice with code examples**: Copy the examples and try them in your own projects
3. **Take your time**: Don't rush through the lessons
4. **Experiment**: Modify the code examples to see what happens
5. **Build projects**: Apply what you learn in real-world projects

---

**Happy Learning! 🚀**

Master Playwright and become a browser automation expert!
