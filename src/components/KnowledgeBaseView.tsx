'use client';

import React, { useState } from 'react';
import { KNOWLEDGE_BASE_DOCS, searchKnowledgeBase, SearchResult } from '@/lib/rag/knowledgeBase';
import { BookOpen, Search, FileText, CheckCircle2 } from 'lucide-react';

export function KnowledgeBaseView() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = (q: string) => {
    setQuery(q);
    if (!q.trim()) {
      setResults([]);
      return;
    }
    const matches = searchKnowledgeBase(q, 3);
    setResults(matches);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-md bg-white border border-[#E4E7E5] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-[#0B8063] flex items-center justify-center text-white shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#111918]">RAG Knowledge & Policy System</h2>
            <p className="text-xs text-[#66706F]">Grounded knowledge base utilized by Support & Troubleshooting Agents</p>
          </div>
        </div>

        <span className="text-xs text-[#0B8063] font-mono font-semibold bg-[#0B8063]/10 px-3 py-1 rounded border border-[#0B8063]/20">
          {KNOWLEDGE_BASE_DOCS.length} Grounded Modules
        </span>
      </div>

      {/* RAG Search Engine */}
      <div className="p-5 rounded-md bg-white border border-[#E4E7E5] space-y-4 shadow-xs">
        <span className="text-[10px] font-bold text-[#66706F] uppercase tracking-wider block font-mono">
          TEST VECTOR RAG SEARCH
        </span>

        <div className="relative max-w-2xl">
          <Search className="w-4 h-4 text-[#8E9897] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search knowledge repository (e.g. WhatsApp OTP timeout, before/after creative policy)..."
            value={query}
            onChange={e => handleSearch(e.target.value)}
            className="w-full bg-[#F8F8F5] border border-[#E4E7E5] rounded-md pl-10 pr-4 py-2 text-xs text-[#111918] placeholder-[#8E9897] focus:outline-none focus:border-[#0B8063]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-[#66706F] font-medium shrink-0">Presets:</span>
          {['WhatsApp OTP timeout', 'Creative policy rules', 'Escalation SLA', 'Meta account connection error'].map(preset => (
            <button
              key={preset}
              onClick={() => handleSearch(preset)}
              className="px-2.5 py-1 rounded bg-[#F8F8F5] text-[#111918] border border-[#E4E7E5] hover:border-[#0B8063] transition-colors"
            >
              {preset}
            </button>
          ))}
        </div>

        {results.length > 0 && (
          <div className="space-y-3 pt-2 border-t border-[#E4E7E5]">
            <span className="text-xs font-semibold text-[#111918]">Matching Documents ({results.length}):</span>
            {results.map(res => (
              <div key={res.doc.id} className="p-4 rounded bg-[#F8F8F5] border border-[#E4E7E5] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0B8063] flex items-center gap-1.5 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16835B]" /> Source: {res.doc.title} ({res.doc.id})
                  </span>
                  <span className="text-[10px] text-[#16835B] font-mono font-bold">
                    Relevance Score: {res.score}
                  </span>
                </div>
                <p className="text-[#111918] leading-relaxed font-mono text-[11px] bg-white p-3 rounded border border-[#E4E7E5]">
                  {res.doc.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Document Directory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {KNOWLEDGE_BASE_DOCS.map(doc => (
          <div key={doc.id} className="p-5 rounded-md bg-white border border-[#E4E7E5] space-y-3 flex flex-col justify-between shadow-xs">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-[#0B8063] bg-[#0B8063]/10 px-2 py-0.5 rounded border border-[#0B8063]/20">
                  {doc.category}
                </span>
                <span className="text-[10px] text-[#8E9897] font-mono">{doc.id}</span>
              </div>
              <h3 className="text-xs font-bold text-[#111918]">{doc.title}</h3>
              <p className="text-xs text-[#66706F] leading-relaxed font-mono text-[11px] bg-[#F8F8F5] p-3 rounded border border-[#E4E7E5]">
                {doc.content}
              </p>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap pt-2">
              {doc.tags.map(t => (
                <span key={t} className="text-[9px] text-[#66706F] bg-[#F1F3F2] px-2 py-0.5 rounded border border-[#E4E7E5]">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
