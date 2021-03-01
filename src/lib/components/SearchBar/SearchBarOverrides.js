import { parametrize } from 'react-overridable';
import { screenIsWiderThan } from '@components/utils';
import { Breakpoints } from '@components/Media';
import { SearchBar } from 'react-searchkit';

const ParametrizedSearchBar = parametrize(SearchBar, {
  autofocus: screenIsWiderThan(Breakpoints.computer),
});

export const SearchBarOverridesMap = {
  SearchBar: ParametrizedSearchBar,
};
