import axios from "axios";
import { toast } from "react-toastify";


const ApiHandle = async (endPoint, payload, method, logData, handleLoader) => {
  if (handleLoader) handleLoader();
  let baseURL = `${process.env.REACT_APP_PUBLIC_API_URL}`;
  const token = sessionStorage.getItem("auth");
//   token && logData && LogApiModule(logData);

  let header = {
    Authorization: "",
  };
  if (token) {
    header = {
      Authorization: `Bearer ${token}`,
    };
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  try {
    // setLoader(true);
    const response = await axios({
      method,
      url: `${baseURL}${endPoint}`,
      data: payload,
    });
    return {
      statusCode: response?.status,
      responsePayload: response?.data,
    };
  } catch (err) {
    let errorPayload = {
      statusCode: 500,
      responsePayload: {
        error: [],
        message: "Something went wrong.",
        status: false,
      },
    };
    if (axios.isAxiosError(err)) {
      if (err.response?.data) {
        if (err.response !== undefined && err.response.status === 401) {
          if (err.response.data.status === 3) {
            sessionStorage.removeItem("auth");
            sessionStorage.removeItem("limit");
            window.location.href = "/login";
            return;
          }
        }
        const { error, message, status } = err.response.data;
        errorPayload = {
          statusCode: err.response?.status || 500,
          responsePayload: {
            error: error || [],
            message: message || "Something went wrong.",
            status: status || false,
          },
        };
      }
    } else if (err instanceof Error) {
      errorPayload = {
        statusCode: 500,
        responsePayload: {
          error: [],
          message: err.message,
          status: false,
        },
      };
    }
    toast.error(errorPayload.responsePayload.message);
    return errorPayload;
  } finally {
    if (handleLoader) handleLoader();
  }
};

export default ApiHandle;
