import {
  QRCODE_GENERATE_REQUEST,
  QRCODE_GENERATE_SUCCESS,
  QRCODE_GENERATE_FAIL,
  QRCODE_GENERATE_RESET,
} from "./Constants"

export const qrCodeGenerateReducer = (state = {}, action) => {
  switch (action.type) {
    case QRCODE_GENERATE_REQUEST:
      return { loading: true }
    case QRCODE_GENERATE_SUCCESS:
      return { loading: false, qrcode: action.payload }
    case QRCODE_GENERATE_FAIL:
      return { loading: false, error: action.payload }
    case QRCODE_GENERATE_RESET:
      return {}
    default:
      return state
  }
}
