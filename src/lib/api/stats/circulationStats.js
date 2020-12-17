import { apiConfig, http } from '@api/base';
import { documentApi } from '@api/documents';
import { invenioConfig } from '@config';

const circulationStatsURL = '/circulation/stats/';
const mostLoanedURL = `${circulationStatsURL}most-loaned`;
const apiMostLoanedURL = `${apiConfig.baseURL}${mostLoanedURL}`;

const getMostLoanedDocumentsParams = (
  fromDate,
  toDate,
  size = null,
  format = null
) => {
  const params = {};
  if (fromDate) {
    params.from_date = fromDate;
  }
  if (toDate) {
    params.to_date = toDate;
  }
  if (size) {
    params.size = size;
  }
  if (format) {
    const formatArgName = invenioConfig.APP.REST_MIME_TYPE_QUERY_ARG_NAME;
    params[formatArgName] = format;
  }
  return params;
};

const getMostLoanedDocuments = async (fromDate, toDate) => {
  const params = {
    params: getMostLoanedDocumentsParams(fromDate, toDate),
  };
  const response = await http.get(mostLoanedURL, params);
  response.data.total = response.data.hits.total;
  response.data.hits = response.data.hits.hits.map((hit) =>
    documentApi.serializer.fromJSON(hit)
  );
  return response;
};

export const circulationStatsApi = {
  getMostLoanedDocumentsParams: getMostLoanedDocumentsParams,
  getMostLoanedDocuments: getMostLoanedDocuments,
  mostLoanedUrl: apiMostLoanedURL,
};
