import React from "react";

const OrdersTab = ({ result }) => {
  return (
    <section className={`${result ? "block" : "hidden"}`}>OrdersTab</section>
  );
};

export default OrdersTab;
