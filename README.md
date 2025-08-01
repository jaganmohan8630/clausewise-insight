# 📄 ClauseWise – AI-Powered Legal Document Analyzer

ClauseWise is a full-stack AI-powered web app that simplifies legal document review by extracting, classifying, summarizing, and analyzing contract clauses using IBM Watson and Granite LLMs. Designed with a sleek and responsive UI, it helps users understand, compare, and evaluate legal documents with ease.

---

## 🚀 Features

- 📥 **Document Ingestion**: Upload PDF or DOCX files via a clean UI.
- 🧠 **Clause Extraction & Classification**: Breaks down contracts into meaningful clauses with categories.
- ✍️ **Clause Simplification**: Converts complex legal text into layman-friendly language.
- ⚖️ **Risk Scoring & Justification**: Identifies and explains potentially risky or missing clauses.
- 🔎 **Smart Search**: Search clauses using natural language queries (e.g., "termination clause").
- 🆚 **Version Comparison**: Highlights added/removed/modified clauses across document versions.
- 🧑‍⚖️ **AI Legal Assistant**: Chat with your contract using contextual Q&A.
- 📊 **Dashboard & Visuals**: Real-time insights using graphs and filters.

---

## 🛠 Tech Stack

**Frontend**
- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- React Router + React Query
- Lucide Icons + Recharts

**Backend**
- Supabase (Auth, DB, Storage, Edge Functions)
- IBM Watson NLU (NER)
- IBM Granite LLM (Summarization & Classification)
- HuggingFace Transformers (Fallback NLP)

---
