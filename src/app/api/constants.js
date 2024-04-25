// const { BASE_URL } = process.env;

// const BASE_URL = 'http://localhost:3001';
const BASE_URL = 'http://192.168.1.4:3000';
// const BASE_URL = 'https://iptv.skylink.net.in/apis';
// const BASE_URL = 'https://103.50.148.2/apis';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = '55d0d2f057c00a9ba62a3403d8a2aa22';

const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/api/adminlogin`,

  GET_DASHBOARD: `${BASE_URL}/admin/dashboard/all`,
  GET_GENERAL_SETTINGS: `${BASE_URL}/admin/generalsettings`,
  EDIT_GENERAL_SETTINGS: `${BASE_URL}/admin/generalsettings`,
  GET_SYTEM_INFO: `${BASE_URL}/admin/generalsettings/info`,

  ADD_ADMIN_USER: `${BASE_URL}/api/adminsignup`,

  ADD_CATEGORY: `${BASE_URL}/api/category/insert`,
  EDIT_CATEGORY: `${BASE_URL}/api/category/update`,
  GET_CATEGORY: `${BASE_URL}/api/category`,
  DELETE_CATEGORY: `${BASE_URL}/api/category/delete`,

  ADD_STATE: `${BASE_URL}/api/state`,
  GET_STATE: `${BASE_URL}/api/state`,
  EDIT_STATE: `${BASE_URL}/api/state`,
  DELETE_STATE: `${BASE_URL}/api/state`,

  ADD_DISTRICT: `${BASE_URL}/api/district`,
  GET_DISTRICT: `${BASE_URL}/api/district`,
  EDIT_DISTRICT: `${BASE_URL}/api/district`,
  DELETE_DISTRICT: `${BASE_URL}/api/district`,

  ADD_CITY: `${BASE_URL}/api/city`,
  GET_CITY: `${BASE_URL}/api/city`,
  EDIT_CITY: `${BASE_URL}/api/city`,
  DELETE_CITY: `${BASE_URL}/api/city`,

  ACCEPT_VENDORS: `${BASE_URL}/api/vendor/aproval`,
  REJECT_VENDORS: `${BASE_URL}/api/vendor/reject`,

  GET_ALL_VENDORS: `${BASE_URL}/api/vendor/allVendorList`,
  GET_VERIFIED_VENDOR: `${BASE_URL}/api/vendor/verifiedVendorList`,
  GET_PENDING_VENDOR: `${BASE_URL}/api/vendor/pendingVendorList`,
  GET_REJECTED_VENDOR: `${BASE_URL}/api/vendor/rejectedVendorList`,

  GET_OFFER_TAGS:`${BASE_URL}/api/offerTags`,
  POST_OFFER_TAGS:`${BASE_URL}/api/offerTags/insert`,
  EDIT_OFFER_TAGS:`${BASE_URL}/api/offerTags/update`,
  DELETE_OFFER_TAGS:`${BASE_URL}/api/offerTags/delete`,

  GET_PRODUCT_TAGS:`${BASE_URL}/api/productTags`,
  POST_PRODUCT_TAGS:`${BASE_URL}/api/productTags/insert`,
  EDIT_PRODUCT_TAGS:`${BASE_URL}/api/productTags/update`,
  DELETE_PRODUCT_TAGS:`${BASE_URL}/api/productTags/delete`,

};

// const EXTERNAL_API_ENDPOINTS = {
//   SEARCH_TMDB_MOVIES: `${TMDB_BASE_URL}/search/movie`,
//   GET_TMDB_MOVIE_DETAILS: `${TMDB_BASE_URL}/movie`,
//   SEARCH_TMDB_TV: `${TMDB_BASE_URL}/search/tv`,
//   GET_TMDB_TV_DETAILS: `${TMDB_BASE_URL}/tv`,
//   GET_TMDB_MOVIE_DETAILS_ID: `${TMDB_BASE_URL}/movie`,
//   GET_TMDB_TV_DETAILS_ID: `${TMDB_BASE_URL}/tv`,
//   FLUSONIC_STREAMS: 'http://117.216.44.13:8080/flussonic/api/v3/streams/',
// };

const HEADERS = {
  CONTENT_TYPE: 'Content-Type',
  MULTIPART: 'multipart/form-data',
};

export { API_ENDPOINTS, HEADERS, TMDB_API_KEY };
