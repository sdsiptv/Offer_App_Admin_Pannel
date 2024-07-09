// const { BASE_URL } = process.env;

// const BASE_URL = 'http://localhost:3001';
const BASE_URL = 'http://192.168.1.14:3000';
// const BASE_URL = 'https://iptv.skylink.net.in/apis';
// const BASE_URL = 'https://192.168.1.11/offerapp';

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
  RETRIEVE_VENDORS: `${BASE_URL}/api/vendor/retrive`,

  GET_ALL_VENDORS: `${BASE_URL}/api/vendor/allVendorList`,
  GET_VERIFIED_VENDOR: `${BASE_URL}/api/vendor/verifiedVendorList`,
  GET_PENDING_VENDOR: `${BASE_URL}/api/vendor/pendingVendorList`,
  GET_REJECTED_VENDOR: `${BASE_URL}/api/vendor/rejectedVendorList`,

  POST_VENDOR_PUSH_NOTIFICATION: `${BASE_URL}/api/notification`,

  GET_OFFER_TAGS: `${BASE_URL}/api/offerTags`,
  POST_OFFER_TAGS: `${BASE_URL}/api/offerTags/insert`,
  EDIT_OFFER_TAGS: `${BASE_URL}/api/offerTags/update`,
  DELETE_OFFER_TAGS: `${BASE_URL}/api/offerTags/delete`,

  GET_PRODUCT_TAGS: `${BASE_URL}/api/productTags`,
  POST_PRODUCT_TAGS: `${BASE_URL}/api/productTags/insert`,
  EDIT_PRODUCT_TAGS: `${BASE_URL}/api/productTags/update`,
  DELETE_PRODUCT_TAGS: `${BASE_URL}/api/productTags/delete`,

  GET_CUSTOMER_SUPPORT: `${BASE_URL}/api/customerSupport`,
  POST_CUSTOMER_SUPPORT: `${BASE_URL}/api/customerSupport/insert`,
  EDIT_CUSTOMER_SUPPORT: `${BASE_URL}/api/customerSupport/update`,
  DELETE_CUSTOMER_SUPPORT: `${BASE_URL}/api/customerSupport/delete`,

  GET_VENDOR_TAGS: `${BASE_URL}/api/vendorTags`,
  POST_VENDOR_TAGS: `${BASE_URL}/api/vendorTags/insert`,
  EDIT_VENDOR_TAGS: `${BASE_URL}/api/vendorTags/update`,
  DELETE_VENDOR_TAGS: `${BASE_URL}/api/vendorTags/delete`,

  GET_USERS: `${BASE_URL}/api/users`,
  GET_BLOCK_USERS: `${BASE_URL}/api/users/getblockedusers`,

  BLOCK_USERS: `${BASE_URL}/api/users/block`,
  UNBLOCK_USERS: `${BASE_URL}/api/users/unblock`,

  GET_EVENTS: `${BASE_URL}/api/event`,
  POST_EVENTS: `${BASE_URL}/api/event/insert`,
  EDIT_EVENTS: `${BASE_URL}/api/event/update`,
  DELETE_EVENTS: `${BASE_URL}/api/event/delete`,

};

const HEADERS = {
  CONTENT_TYPE: 'Content-Type',
  MULTIPART: 'multipart/form-data',
};

export { API_ENDPOINTS, HEADERS };
