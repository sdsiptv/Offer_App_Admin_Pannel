import axios from 'axios';
import API from 'utils/config/axiosConfig';
import {
  API_ENDPOINTS,
  HEADERS,
  EXTERNAL_API_ENDPOINTS,
  TMDB_API_KEY,
} from './constants';

const apis = {
  login: (emailid, password) => {
    return API.post(API_ENDPOINTS.LOGIN, {
      emailid: emailid,
      password: password,
    });
  },

  //--------------- ADD ADMIN --------------//


  addAdmin: formData => {
    return API.post(API_ENDPOINTS.ADD_ADMIN_USER, formData, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  //--------------- CATEGORY --------------//

  getCategory: () => {
    return API.get(API_ENDPOINTS.GET_CATEGORY);
  },

  addCategory: formData => {
    return API.post(API_ENDPOINTS.ADD_CATEGORY, formData, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  editCategory: (id, formData) => {
    return API.put(API_ENDPOINTS.EDIT_CATEGORY + "/" + id, formData, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  deleteCategory: id => {
    return API.delete(
      API_ENDPOINTS.DELETE_CATEGORY + '?id=' + id,
      {
        [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
      },
    );
  },

  //--------------- STATES --------------//

  getState: () => {
    return API.get(API_ENDPOINTS.GET_STATE);
  },

  addState: (state_name) => {
    return API.post(API_ENDPOINTS.ADD_STATE + "?state_name=" + state_name, {
    });
  },

  editState: (id, state_name) => {
    return API.patch(API_ENDPOINTS.EDIT_STATE + "?state_name=" + state_name + "&id=" + id, {
    });
  },

  deleteState: (id) => {
    return API.delete(API_ENDPOINTS.DELETE_STATE + "?id=" + id, {
    });
  },

  //--------------- DISTRICT --------------//

  getDistrict: (id) => {
    return API.get(API_ENDPOINTS.GET_DISTRICT + "/" + id);
  },

  addDistrict: (state_id, district_name) => {
    return API.post(API_ENDPOINTS.ADD_DISTRICT + "?state_id=" + state_id + "&district_name=" + district_name, {
    });
  },

  editDistrict: (district_id, district_name) => {
    return API.patch(API_ENDPOINTS.EDIT_DISTRICT + "?district_id=" + district_id + "&district_name=" + district_name, {
    });
  },

  deleteDistrict: (district_id) => {
    return API.delete(API_ENDPOINTS.DELETE_DISTRICT + "?district_id=" + district_id, {
    });
  },

  //--------------- CITY --------------//


  getCities: (id) => {
    return API.get(API_ENDPOINTS.GET_CITY + "/" + id);
  },

  addCities: (district_id, city_name) => {
    return API.post(API_ENDPOINTS.ADD_CITY + "?district_id=" + district_id + "&city_name=" + city_name, {
    });
  },

  editCities: (city_id, city_name) => {
    return API.patch(API_ENDPOINTS.EDIT_CITY + "?city_id=" + city_id + "&city_name=" + city_name, {
    });
  },

  deleteCities: (city_id) => {
    return API.delete(API_ENDPOINTS.DELETE_CITY + "?city_id=" + city_id, {
    });
  },

  //--------------- VENDORS --------------//

  getAllVendors: () => {
    return API.get(API_ENDPOINTS.GET_ALL_VENDORS);
  },

  getVerifedVendors: () => {
    return API.get(API_ENDPOINTS.GET_VERIFIED_VENDOR);
  },

  getPendingVendors: () => {
    return API.get(API_ENDPOINTS.GET_PENDING_VENDOR);
  },

  getRejectedVendors: () => {
    return API.get(API_ENDPOINTS.GET_REJECTED_VENDOR);
  },

  //--------------- ACCEPT & REJECT & Retrieve--------------//

  addAcceptVendors: (vendor_id) => {
    return API.post(API_ENDPOINTS.ACCEPT_VENDORS + "/" + vendor_id)
  },

  addRejectVendors: (vendor_id) => {
    return API.post(API_ENDPOINTS.REJECT_VENDORS + "/" + vendor_id)
  },

  addRetrieveVendors: (vendor_id) => {
    return API.post(API_ENDPOINTS.RETRIEVE_VENDORS + "/" + vendor_id)
  },

  //--------------- OFFERS TAGS --------------//

  getOfferTags: () => {
    return API.get(API_ENDPOINTS.GET_OFFER_TAGS);
  },

  addOfferTags: (name) => {
    return API.post(API_ENDPOINTS.POST_OFFER_TAGS + "?name=" + name, {
    });
  },

  editOfferTags: (id, name) => {
    return API.put(API_ENDPOINTS.EDIT_OFFER_TAGS + "?name=" + name + "&id=" + id, {
    });
  },

  deleteOfferTags: (id) => {
    return API.delete(API_ENDPOINTS.DELETE_OFFER_TAGS + "?id=" + id, {
    });
  },

  //--------------- PRODUCT TAGS --------------//

  getProductTags: () => {
    return API.get(API_ENDPOINTS.GET_PRODUCT_TAGS);
  },

  addProductTags: formData => {
    return API.post(API_ENDPOINTS.POST_PRODUCT_TAGS, formData, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  editProductTags: (id, formData) => {
    return API.put(API_ENDPOINTS.EDIT_PRODUCT_TAGS, formData, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  deleteProductTags: id => {
    return API.delete(
      API_ENDPOINTS.DELETE_PRODUCT_TAGS + '?id=' + id,
      {
        [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
      },
    );
  },

  //--------------- CUSTOMER SUPPORT --------------//

  getCustomerSupport: () => {
    return API.get(API_ENDPOINTS.GET_CUSTOMER_SUPPORT);
  },

  addCustomerSupport: formData => {
    return API.post(API_ENDPOINTS.POST_CUSTOMER_SUPPORT, formData, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  editCustomerSupport: (id, formData) => {
    return API.put(API_ENDPOINTS.EDIT_CUSTOMER_SUPPORT + "/" + id, formData, {
      [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
    });
  },

  deleteCustomerSupport: id => {
    return API.delete(
      API_ENDPOINTS.DELETE_CUSTOMER_SUPPORT + '/' + id,
      {
        [HEADERS.CONTENT_TYPE]: [HEADERS.MULTIPART],
      },
    );
  },

  //--------------- VENDOR TAGS --------------//

  getVendorTags: (id) => {
    return API.get(API_ENDPOINTS.GET_VENDOR_TAGS + "/" + id);
  },

  addVendorTags: (name, category_id) => {
    return API.post(API_ENDPOINTS.POST_VENDOR_TAGS + "?name=" + name + "&category_id=" + category_id, {
    });
  },

  editVendorTags: (name, category_id, id) => {
    return API.put(API_ENDPOINTS.EDIT_VENDOR_TAGS + "?name=" + name + "&category_id=" + category_id + "&id=" + id, {
    });
  },

  deleteVendorTags: (id) => {
    return API.delete(API_ENDPOINTS.DELETE_VENDOR_TAGS + "?id=" + id, {
    });
  },

  //--------------- USERS --------------//

  getAllUsers: () => {
    return API.get(API_ENDPOINTS.GET_USERS);
  },

  getBlockUsers: () => {
    return API.get(API_ENDPOINTS.GET_BLOCK_USERS);
  },

  //--------------- USER BLOCK & UNBLOCK --------------//

  addUserBlock: (vendor_id) => {
    return API.put(API_ENDPOINTS.BLOCK_USERS + "/" + vendor_id)
  },

  addUserUnBlock: (vendor_id) => {
    return API.put(API_ENDPOINTS.UNBLOCK_USERS + "/" + vendor_id)
  },

  
};

export default apis;
