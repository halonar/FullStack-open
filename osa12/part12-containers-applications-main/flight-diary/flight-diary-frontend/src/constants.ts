//export const apiBaseUrl = "http://localhost:80/api";
//export const apiBaseUrl = "http://localhost:3000/api";

export const getApiBaseUrl = () => {
  const backendUrl =
    import.meta.env.MODE === "development"
      ? import.meta.env.VITE_DEV_BACKEND_URL
      : "http://localhost:80/api"; //import.meta.env.VITE_PROD_BACKEND_URL;

  console.log("backendUrl", backendUrl);
  return backendUrl;
};
