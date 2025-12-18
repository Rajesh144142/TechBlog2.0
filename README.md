# TechBlog 2.0 🚀

A modern technical blogging platform built with React, FastAPI, and MongoDB.

## Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite
- Material UI + Tailwind CSS
- Redux Toolkit + React Query
- React Router + React Hook Form

**Backend:**
- FastAPI (Python)
- MongoDB + Motor (async)
- JWT Authentication

## Features ✅

- [x] User authentication (Login/Signup)
- [x] Create, Read, Delete blogs
- [x] Markdown support with syntax highlighting
- [x] Dark/Light theme toggle
- [x] Responsive design
- [x] Tag-based categorization

---

## Roadmap 🗺️

### Phase 2: AI & Search (Next)

- [ ] **AI Blog Summarizer** - Auto-generate summaries using LLM agents
- [ ] **Smart Search** - Full-text search with filters (tags, date, author)
- [ ] **Auto Suggestions** - Tag suggestions while creating blogs
- [ ] **Related Blogs** - AI-powered recommendations

### Phase 3: User Experience

- [ ] **Rich Text Editor** - WYSIWYG editor with markdown preview
- [ ] **Comments System** - Discussions on blogs
- [ ] **User Profiles** - Author pages with bio and blogs
- [ ] **Bookmarks** - Save blogs for later
- [ ] **Reading Time** - Estimated read time

### Phase 4: Social & Analytics

- [ ] **Likes & Reactions** - Engage with content
- [ ] **Share to Social** - Twitter, LinkedIn integration
- [ ] **View Analytics** - Track blog views
- [ ] **Newsletter** - Email subscriptions
- [ ] **RSS Feed** - Subscribe to new posts

### Phase 5: Advanced Features

- [ ] **Blog Series** - Multi-part tutorials
- [ ] **Code Playground** - Run code snippets in browser
- [ ] **AI Writing Assistant** - Help write and improve content
- [ ] **SEO Optimization** - Meta tags, sitemap
- [ ] **PWA Support** - Offline reading

---

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- MongoDB

### Backend Setup
```bash
cd server
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
uvicorn app:app --reload --port 5000
```

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

### Seed Sample Blogs
```bash
cd server
python seed_blogs.py
```

---

## Environment Variables

Create `.env` in `/server`:
```
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=techblog
SECRET_KEY=your-secret-key
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | No | Register |
| POST | `/api/auth/login` | No | Login |
| GET | `/api/blogs` | No | Get all blogs |
| GET | `/api/blogs/:id` | No | Get blog |
| POST | `/api/blogs` | Yes | Create blog |
| DELETE | `/api/blogs/:id` | Yes | Delete blog |

---

## CI/CD 🚀

This project uses **GitHub Actions** for Continuous Integration. The workflows are configured with **Path Filtering** to optimize build times:

- **Frontend CI:** Triggered only on changes within the `client/` directory. Builds the React application.
- **Backend CI:** Triggered only on changes within the `server/` directory. Runs linting and dependency checks.

The workflow files are located in `.github/workflows/`.

---

## Contributing

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing`)
5. Open Pull Request

---

## License

MIT License

