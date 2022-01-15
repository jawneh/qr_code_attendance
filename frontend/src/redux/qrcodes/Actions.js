import axios from "axios"
import { QRCODE_GENERATE_REQUEST, QRCODE_GENERATE_SUCCESS, QRCODE_GENERATE_FAIL } from "./Constants"

export const generateQRCodeAction = qr_code_data => async (dispatch, getState) => {
  try {
    dispatch({ type: QRCODE_GENERATE_REQUEST })
    const {
      qrCodeUserLogin: { user_info },
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user_info.token}`,
      },
    }

    let { data } = await axios.post("/attendance", qr_code_data, config)
    dispatch({ type: QRCODE_GENERATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: QRCODE_GENERATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
