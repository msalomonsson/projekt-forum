import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

const useHttp = () => {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const dispatch = useDispatch();

  const request = useCallback(
    async (requestObj, dispatchFunc) => {
      setloading(true);
      seterror(null);
      console.log(requestObj);

      try {
        const response = await fetch(requestObj.url, {
          method: requestObj.method ? requestObj.method : "GET",
          headers: requestObj.headers ? requestObj.headers : {},
          body: requestObj.body ? JSON.stringify(requestObj.body) : null,
        });

        if (!response.ok) {
          throw new Error(`request failed ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        dispatch(dispatchFunc(data));
      } catch (error) {
        seterror(error.message || "Something went wrong");
      }

      setloading(false);
    },
    [dispatch]
  );

  return { loading, error, request };
};

export default useHttp;
