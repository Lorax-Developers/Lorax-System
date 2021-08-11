import { useEffect } from "react";
import store from "../redux/store";
import { loadUser } from "../actions/auth";
import setAuthToken from "../utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const Hook = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return null;
};

export default Hook;
