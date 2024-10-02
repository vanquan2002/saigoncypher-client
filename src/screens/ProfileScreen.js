import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../redux/actions/UserActions";
import { listMyOrders } from "../redux/actions/OrderActions";
import moment from "moment";
import ProfileTabs from "../components/profileComponents/ProfileTabs";
import Loading from "./../components/loadingError/Loading";
import Orders from "../components/profileComponents/Orders";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading } = userDetails;
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrderListMy, orders, error } = orderListMy;
  const [tabSelected, setTabSelected] = useState(1);

  useEffect(() => {
    dispatch(listMyOrders());
    dispatch(getUserDetails());
  }, [userInfo, dispatch, navigate]);

  return (
    <div>
      <Header />
      {loading && <Loading />}
      <div className="border-2 border-indigo-600 m-2 p-2">
        <div className="border-2 border-indigo-600 m-2 p-2">Avatar-img</div>
        <div className="border-2 border-indigo-600 m-2 p-2">
          <p>{userInfo?.name}</p>
          <p>Joined {moment(userInfo?.createdAt).format("LL")}</p>
        </div>

        <div className="border-2 border-indigo-600 m-2 p-2">
          <p onClick={() => setTabSelected(1)}>PROFILE SETTINGS</p>
          <p onClick={() => setTabSelected(2)}>ORDER LIST - {orders?.length}</p>
        </div>
      </div>
      {tabSelected === 1 ? (
        <ProfileTabs />
      ) : (
        <Orders
          orders={orders}
          loadingOrderListMy={loadingOrderListMy}
          error={error}
        />
      )}
    </div>
  );
};

export default ProfileScreen;
