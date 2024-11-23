import axios from "axios";
import {
  PROVINCE_DATA_REQUEST,
  PROVINCE_DATA_SUCCESS,
  PROVINCE_DATA_FAIL,
  DISTRICT_DATA_REQUEST,
  DISTRICT_DATA_SUCCESS,
  DISTRICT_DATA_FAIL,
  WARD_DATA_REQUEST,
  WARD_DATA_SUCCESS,
  WARD_DATA_FAIL,
} from "./../constants/FormConstants";

export const listProvince = () => async (dispatch) => {
  try {
    dispatch({
      type: PROVINCE_DATA_REQUEST,
    });
    const { data } = await axios.get("https://provinces.open-api.vn/api/p/");
    dispatch({
      type: PROVINCE_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROVINCE_DATA_FAIL,
      payload: "API is having problems!",
    });
  }
};

export const listDistrict = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DISTRICT_DATA_REQUEST,
    });
    const { data } = await axios.get(
      `https://provinces.open-api.vn/api/p/${id}?depth=2`
    );
    dispatch({
      type: DISTRICT_DATA_SUCCESS,
      payload: data.districts,
    });
  } catch (error) {
    dispatch({
      type: DISTRICT_DATA_FAIL,
      payload: "API is having problems!",
    });
  }
};

export const listWard = (id) => async (dispatch) => {
  try {
    dispatch({
      type: WARD_DATA_REQUEST,
    });
    const { data } = await axios.get(
      `https://provinces.open-api.vn/api/d/${id}?depth=2`
    );
    dispatch({
      type: WARD_DATA_SUCCESS,
      payload: data.wards,
    });
  } catch (error) {
    dispatch({
      type: WARD_DATA_FAIL,
      payload: "API is having problems!",
    });
  }
};
