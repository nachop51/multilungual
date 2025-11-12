CREATE TABLE IF NOT EXISTS translations (
  id SERIAL PRIMARY KEY,
  sourceText TEXT NOT NULL,
  translatedText TEXT NOT NULL,
  sourceLanguage VARCHAR(32) NOT NULL,
  targetLanguage VARCHAR(32) NOT NULL,

  UNIQUE (sourceText, sourceLanguage, targetLanguage)
);

CREATE INDEX IF NOT EXISTS idx_sourceLanguage ON translations (sourceLanguage);
CREATE INDEX IF NOT EXISTS idx_targetLanguage ON translations (targetLanguage);

