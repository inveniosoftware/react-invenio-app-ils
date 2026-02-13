import { vocabularyApi } from './vocabulary';

/**
 * Resolves identifier scheme keys (e.g. "CALL_NUMBER") to their
 * human-readable titles from the vocabulary API.
 *
 * @param {Array<string>} identifiers
 * @param {string} identifierScheme
 * @returns {Promise<Array<{key: string, text: string}>>}
 */
export const fetchIdentifierTitles = async (identifiers, identifierScheme) => {
  const query = vocabularyApi.query().withType(identifierScheme);
  const response = await vocabularyApi.list(query.qs());

  return identifiers.map((scheme) => {
    const vocabEntry = response.data.hits.find(
      (entry) => entry.metadata.key === scheme
    );
    return {
      key: scheme,
      text: vocabEntry ? vocabEntry.metadata.text : scheme,
    };
  });
};
