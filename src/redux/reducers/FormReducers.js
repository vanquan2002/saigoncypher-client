import {
  PROVINCE_DATA_REQUEST,
  PROVINCE_DATA_SUCCESS,
  PROVINCE_DATA_FAIL,
  PROVINCE_DATA_RESET,
  DISTRICT_DATA_REQUEST,
  DISTRICT_DATA_SUCCESS,
  DISTRICT_DATA_FAIL,
  DISTRICT_DATA_RESET,
  WARD_DATA_REQUEST,
  WARD_DATA_SUCCESS,
  WARD_DATA_FAIL,
  WARD_DATA_RESET,
} from "./../constants/FormConstants";

export const provincesReducer = (state = { provinces: [] }, action) => {
  switch (action.type) {
    case PROVINCE_DATA_REQUEST:
      return { ...state, loading: true };
    case PROVINCE_DATA_SUCCESS:
      return { loading: false, provinces: action.payload };
    case PROVINCE_DATA_FAIL:
      return { loading: false, error: action.payload };
    case PROVINCE_DATA_RESET:
      return { provinces: [] };
    default:
      return state;
  }
};

export const districtsReducer = (state = { districts: [] }, action) => {
  switch (action.type) {
    case DISTRICT_DATA_REQUEST:
      return { ...state, loading: true };
    case DISTRICT_DATA_SUCCESS:
      return { loading: false, districts: action.payload };
    case DISTRICT_DATA_FAIL:
      return { loading: false, error: action.payload };
    case DISTRICT_DATA_RESET:
      return { districts: [] };
    default:
      return state;
  }
};

export const wardsReducer = (state = { wards: [] }, action) => {
  switch (action.type) {
    case WARD_DATA_REQUEST:
      return { ...state, loading: true };
    case WARD_DATA_SUCCESS:
      return { loading: false, wards: action.payload };
    case WARD_DATA_FAIL:
      return { loading: false, error: action.payload };
    case WARD_DATA_RESET:
      return { wards: [] };
    default:
      return state;
  }
};
