import axios, { AxiosError } from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3003",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout:5000
});

apiClient.interceptors.request.use( 
  (response) => {
    console.log("request API_SUS",response);
    return response
  },
  (error:AxiosError) => {
    console.log("request API_ERR",error)

    return Promise.reject(error);
  }
)

apiClient.interceptors.response.use(
  (response) => {
    console.log("response API_SUS",response);

    if(response.status == 200) {
      window.dispatchEvent(
        new CustomEvent("status:completed")
      )
    }
    
    
    return response},

  (error: AxiosError) => {
    console.log("response API_ERR",error);
    
    if (error.response?.status === 401) {

      
      window.dispatchEvent(
        new CustomEvent("auth:unauthorized")
      );
    }

    return Promise.reject(error);
  }
);