import React from "react";
import styled from "styled-components";
import ProfileTabs from "./ProfileTabs";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const ContainerStyled = styled.div``;

const Orders = ({ orders, loadingOrderListMy, error }) => {
  const navigate = useNavigate();

  return (
    <div className="border-2 border-indigo-600 m-2 p-2">
      {/* {
        loadingOrderListMy ? (
          <Loading/>
        ) : error ? (<Message/>)  :(
          <p>123</p>
        )
      } */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((item, i) => (
            <tr key={i} className="hover:bg-gray-100">
              <td
                onClick={() => navigate(`/order/${item._id}`)}
                className="px-6 py-4 whitespace-no-wrap"
              >
                {item._id}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {item.isPaid ? "Paid" : "Not Paid"}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {item.isPaid
                  ? moment(item.paidAt).calendar()
                  : moment(item.createdAt).calendar()}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                ${item.totalPrice}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
