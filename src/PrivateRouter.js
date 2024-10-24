import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRouter({ navig, comp }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return userInfo ? comp : <Navigate to={`/login?redirect=${navig}`} />;
}

export default PrivateRouter;
