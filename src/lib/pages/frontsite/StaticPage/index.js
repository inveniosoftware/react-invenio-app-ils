/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import { connect } from 'react-redux';
import { fetchStaticPageDetails } from './state/actions';
import StaticPageComponent from './StaticPage';

const mapDispatchToProps = (dispatch) => ({
  fetchStaticPageDetails: (pageID) => dispatch(fetchStaticPageDetails(pageID)),
});

const mapStateToProps = (state) => ({
  isLoading: state.staticPage.isLoading,
  data: state.staticPage.data,
  hasError: state.staticPage.hasError,
});

export const StaticPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(StaticPageComponent);
