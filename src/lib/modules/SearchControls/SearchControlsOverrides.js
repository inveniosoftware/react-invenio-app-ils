import SearchBar from '@components/SearchBar/SearchBar';
import SearchResultsList from './SearchResultsList';
import SearchEmptyResults from './SearchEmptyResults';
import { Error as IlsError } from '@components/Error';
import { CardBucketAggregationValueElementOverrides } from './overridden/BucketAggregationValuesOverrides';

export const SearchControlsOverridesMap = {
  'BucketAggregationValues.element.card': CardBucketAggregationValueElementOverrides,
  SearchBar: SearchBar,
  'EmptyResults.element': SearchEmptyResults,
  'Error.element': IlsError,
  ResultsList: SearchResultsList,
};
