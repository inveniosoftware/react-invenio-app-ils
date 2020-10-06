import { SearchBarElement } from '@components/SearchBar';
import { MenuBucketAggregationValueElementOverrides } from '@modules/SearchControls/overridden/MenuBucketAggregationElement';
import { AvailableLoanBucketAggregationValues } from './overridden/AvailableLoanBucketAggregationValues';
import { AvailableLoanBucketAggregationElement } from './overridden/AvailableLoanBucketAggregationElement';
import { SearchSortOrderElement } from './overridden/SearchSortOrderElement';
import { SearchSortOrderElementMobile } from './overridden/SearchSortOrderElementMobile';
import { SortByElement } from './overridden/SearchSortByElement';
import { SortByElementMobile } from './overridden/SearchSortByElementMobile';
import SearchResultsList from './SearchResultsList';
import SearchEmptyResults from './SearchEmptyResults';
import { CardBucketAggregationValueElementOverrides } from './overridden/CardBucketAggregationValueElement';
import { SearchError } from '@modules/SearchControls/SearchError';

export const SearchControlsOverridesMap = {
  'BucketAggregationValues.element.card': CardBucketAggregationValueElementOverrides,
  'BucketAggregation.element.menu': MenuBucketAggregationValueElementOverrides,
  'BucketAggregation.element.available-for-loan': AvailableLoanBucketAggregationElement,
  'BucketAggregationValues.element.available-for-loan': AvailableLoanBucketAggregationValues,
  'SearchBar.element': SearchBarElement,
  'EmptyResults.element': SearchEmptyResults,
  'Error.element': SearchError,
  ResultsList: SearchResultsList,
  'SortBy.element.mobile': SortByElementMobile,
  'SortBy.element.desktop': SortByElement,
  'SortOrder.element.mobile': SearchSortOrderElementMobile,
  'SortOrder.element.desktop': SearchSortOrderElement,
};
