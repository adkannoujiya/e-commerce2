import React from "react";
import { useSearchParams } from "react-router-dom";

const PaymentSuccessfull = () => {
  const searchQuery = useSearchParams()[0];

  const referenceNum = searchQuery.get("reference");
  return (
    <div>
      <h1>Payment Successfull</h1>
      <br />
      <h4>Payment Id : {referenceNum}</h4>
    </div>
  );
};

export default PaymentSuccessfull;
