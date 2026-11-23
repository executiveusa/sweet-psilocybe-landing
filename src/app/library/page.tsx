"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  LIBRARY_DATA,
  LIBRARY_LANGUAGES,
  type LibraryLanguage,
  type LibraryTab,
} from "@/data/libraryItems";
import {
  LibraryWrapper,
  LibraryHero,
  TabsContainer,
  TabButton,
  FilterControls,
  SearchInput,
  LanguageRow,
  LanguagePill,
  EmptyState,
  MediaGrid,
  MediaCard,
  MediaMeta,
  MediaDescription,
  ViewLink,
} from "./styles";

const Library3DScene = dynamic(
  () => import("@/gateway-kit/components/Library3DScene"),
  { ssr: false }
);

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<LibraryTab>("books");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLanguage, setActiveLanguage] = useState<LibraryLanguage | "All">(
    "All"
  );

  const tabItems = LIBRARY_DATA[activeTab];

  const availableLanguages = useMemo(() => {
    const present = new Set(tabItems.map((item) => item.language));
    return LIBRARY_LANGUAGES.filter((lang) => present.has(lang));
  }, [tabItems]);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return tabItems.filter((item) => {
      const matchesLanguage =
        activeLanguage === "All" || item.language === activeLanguage;
      if (!matchesLanguage) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.creator.toLowerCase().includes(q) ||
        item.year.includes(q) ||
        item.language.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    });
  }, [tabItems, activeLanguage, searchQuery]);

  const handleTabChange = (nextTab: LibraryTab) => {
    setActiveTab(nextTab);
    setActiveLanguage("All");
  };

  return (
    <LibraryWrapper>
      <LibraryHero
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>The 3D Library</h1>
        <p>
          The world&apos;s mushroom knowledge, curated in an interactive PNW
          conservatory
        </p>
      </LibraryHero>

      <Library3DScene activeTab={activeTab} onSelectTab={handleTabChange} />

      <TabsContainer role="tablist" aria-label="Library collections">
        <TabButton
          role="tab"
          aria-selected={activeTab === "books"}
          $active={activeTab === "books"}
          onClick={() => handleTabChange("books")}
        >
          Books ({LIBRARY_DATA.books.length})
        </TabButton>
        <TabButton
          role="tab"
          aria-selected={activeTab === "documentaries"}
          $active={activeTab === "documentaries"}
          onClick={() => handleTabChange("documentaries")}
        >
          Documentaries ({LIBRARY_DATA.documentaries.length})
        </TabButton>
        <TabButton
          role="tab"
          aria-selected={activeTab === "movies"}
          $active={activeTab === "movies"}
          onClick={() => handleTabChange("movies")}
        >
          Movies &amp; Media ({LIBRARY_DATA.movies.length})
        </TabButton>
      </TabsContainer>

      <FilterControls>
        <SearchInput
          type="search"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          placeholder={`Search ${activeTab} by title, creator, year, or topic...`}
          aria-label="Search library catalog"
        />

        {availableLanguages.length > 1 && (
          <LanguageRow role="group" aria-label="Filter by language">
            <LanguagePill
              type="button"
              $active={activeLanguage === "All"}
              onClick={() => setActiveLanguage("All")}
            >
              All Languages
            </LanguagePill>
            {availableLanguages.map((lang) => (
              <LanguagePill
                key={lang}
                type="button"
                $active={activeLanguage === lang}
                onClick={() => setActiveLanguage(lang)}
              >
                {lang}
              </LanguagePill>
            ))}
          </LanguageRow>
        )}
      </FilterControls>

      <AnimatePresence mode="wait">
        {filteredItems.length === 0 ? (
          <EmptyState key="empty">
            <p>
              No {activeTab} matched &ldquo;{searchQuery}&rdquo;
              {activeLanguage !== "All" ? ` in ${activeLanguage}` : ""}.
            </p>
            <TabButton
              type="button"
              $active
              onClick={() => {
                setSearchQuery("");
                setActiveLanguage("All");
              }}
            >
              Reset Filters
            </TabButton>
          </EmptyState>
        ) : (
          <MediaGrid
            as={motion.div}
            key={`${activeTab}-${activeLanguage}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            {filteredItems.map((item, i) => (
              <MediaCard
                key={item.id}
                as={motion.article}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
              >
                <h2>{item.title}</h2>
                <MediaMeta>
                  <span className="highlight">{item.creator}</span>
                  <span>&bull;</span>
                  <span>{item.year}</span>
                  <span>&bull;</span>
                  <span>{item.language}</span>
                </MediaMeta>
                <MediaDescription>{item.description}</MediaDescription>
                <div>
                  <ViewLink
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ minHeight: "44px" }}
                  >
                    {activeTab === "books"
                      ? `Explore on ${item.sourceLabel}`
                      : `Watch on ${item.sourceLabel}`}
                  </ViewLink>
                </div>
              </MediaCard>
            ))}
          </MediaGrid>
        )}
      </AnimatePresence>
    </LibraryWrapper>
  );
}
