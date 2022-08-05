import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { history } from "../hook/history";

const PrivateRoute = ({ children }) => {
  const auth =
    useSelector(({ authData }) => authData.auth) ||
    JSON.parse(localStorage.getItem("user"));
  // console.log(auth);
  if (!auth && auth.auth) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" state={{ from: history.location }} />;
  }

  // authorized so return child components
  return children;
};
export default PrivateRoute;
