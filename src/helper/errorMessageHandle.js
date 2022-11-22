const errorMessageHandle = (err) => {
  let message = err.toString().replace("AxiosError: ", "");
  if (err.response) {
    if ("data" in err.response)
      if ("message" in err.response.data) message = err.response.data.message;
  }
  return message;
};
export default errorMessageHandle;