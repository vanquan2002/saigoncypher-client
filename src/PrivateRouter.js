import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

function PrivateRouter({ navig, comp }) {
  const { id } = useParams();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return userInfo ? (
    comp
  ) : (
    <Navigate
      to={`/login?redirect=${navig === "order" && id ? `order/${id}` : navig}`}
    />
  );
}

export default PrivateRouter;
