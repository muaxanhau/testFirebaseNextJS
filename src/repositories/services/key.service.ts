export enum KeyService {
  // auth
  LOGIN = "LOGIN",
  SIGN_UP = "SIGN_UP",
  LOGOUT = "LOGOUT",
  LOGIN_WITH_PHONE = "LOGIN_WITH_PHONE",
  CONFIRM_OTP = "CONFIRM_OTP",

  // users
  GET_USER_SELF = "GET_USER_SELF",
  CREATE_USER = "CREATE_USER",

  // categories
  GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES",
  GET_ALL_CATEGORY_WITH_ALL_ITEMS = "GET_ALL_CATEGORY_WITH_ALL_ITEMS",
  GET_ALL_CATEGORIES_WITH_ITEMS = "GET_ALL_CATEGORIES_WITH_ITEMS",
  ADD_CATEGORY = "ADD_CATEGORY",
  DELETE_CATEGORY = "DELETE_CATEGORY",
  EDIT_CATEGORY = "EDIT_CATEGORY",
  GET_CATEGORY = "GET_CATEGORY",

  // items
  GET_ALL_ITEMS = "GET_ALL_ITEMS",
  ADD_ITEM = "ADD_ITEM",
  DELETE_ITEM = "DELETE_ITEM",

  // cart
  ADD_CART = "ADD_CART",
  GET_ALL_USER_CARTS = "GET_ALL_USER_CARTS",
}
