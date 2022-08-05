import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { history } from "../hook/history";

const PrivateRoute = ({ children }) => {
  const { accessToken } = useSelector(({ authData }) => authData.auth);
  if (accessToken) {
    return children;
  }
  return <Navigate to="/error" state={{ from: history.location }} />;
};
export default PrivateRoute;
