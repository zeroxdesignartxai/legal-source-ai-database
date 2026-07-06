CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS legal_sources (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  source_type TEXT NOT NULL,
  base_url TEXT,
  is_official BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS legal_documents (
  id UUID PRIMARY KEY,
  source_id UUID REFERENCES legal_sources(id),
  title TEXT NOT NULL,
  citation TEXT,
  jurisdiction TEXT,
  court_or_agency TEXT,
  document_type TEXT,
  publication_date DATE,
  effective_date DATE,
  source_url TEXT,
  source_type TEXT,
  is_official BOOLEAN DEFAULT FALSE,
  raw_text TEXT NOT NULL,
  checksum TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS legal_chunks (
  id UUID PRIMARY KEY,
  document_id UUID NOT NULL REFERENCES legal_documents(id) ON DELETE CASCADE,
  chunk_index INTEGER NOT NULL,
  text TEXT NOT NULL,
  page_start INTEGER,
  page_end INTEGER,
  section_label TEXT,
  embedding VECTOR(1536),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS legal_citations (
  id UUID PRIMARY KEY,
  document_id UUID NOT NULL REFERENCES legal_documents(id) ON DELETE CASCADE,
  cited_text TEXT NOT NULL,
  normalized_citation TEXT,
  citation_type TEXT,
  target_document_id UUID REFERENCES legal_documents(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS legal_answers (
  id UUID PRIMARY KEY,
  user_question TEXT NOT NULL,
  answer TEXT NOT NULL,
  jurisdiction TEXT,
  topic TEXT,
  confidence_level TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS answer_sources (
  id UUID PRIMARY KEY,
  answer_id UUID NOT NULL REFERENCES legal_answers(id) ON DELETE CASCADE,
  chunk_id UUID NOT NULL REFERENCES legal_chunks(id) ON DELETE CASCADE,
  relevance_score FLOAT,
  used_in_answer BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS verification_runs (
  id UUID PRIMARY KEY,
  answer_id UUID NOT NULL REFERENCES legal_answers(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  issues JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS attorney_packets (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS packet_documents (
  id UUID PRIMARY KEY,
  packet_id UUID NOT NULL REFERENCES attorney_packets(id) ON DELETE CASCADE,
  document_id UUID NOT NULL REFERENCES legal_documents(id) ON DELETE CASCADE,
  added_at TIMESTAMP DEFAULT NOW()
);
