"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import {
    PayPalScriptProvider,
    usePayPalCardFields,
    PayPalCardFieldsProvider,
    PayPalButtons,
    PayPalCardFieldsForm,
  } from "@paypal/react-paypal-js";

export default function Pay() {
  const searchParams = useSearchParams();

  const jobId = searchParams.get("jobId");
  const [isPaying, setIsPaying] = useState(false);
  const [message, setMessage] = useState("");
const initialOptions = {
    "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    "enable-funding": "venmo",
    currency: "USD",
    components: "buttons,card-fields",
};

  const [billingAddress, setBillingAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    adminArea1: "",
    adminArea2: "",
    countryCode: "",
    postalCode: "",
  });

  function handleBillingAddressChange(field, value) {
    setBillingAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function createOrder() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/create-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            jobId: jobId,
            price: "100",
          }),
        }
      );
  
      const orderData = await response.json();
      console.log(orderData);
  
      if (orderData.orderId) {
        return orderData.orderId; // This orderId will be used as PayPal's orderID
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);
  
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      return `Could not initiate PayPal Checkout...${error}`;
    }
  }
  
  async function onApprove(data) {
    try {
      // The data parameter includes the orderID
      const { orderID } = data;
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/verify-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            jobId: jobId,
            orderId: orderID, // Use the orderID received from PayPal
          }),
        }
      );
  
      const orderData = await response.json();
      const transaction =
        orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
        orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
      const errorDetail = orderData?.details?.[0];
  
      if (errorDetail || !transaction || transaction.status === "DECLINED") {
        let errorMessage;
        if (transaction) {
          errorMessage = `Transaction ${transaction.status}: ${transaction.id}`;
        } else if (errorDetail) {
          errorMessage = `${errorDetail.description} (${orderData.debug_id})`;
        } else {
          errorMessage = JSON.stringify(orderData);
        }
  
        throw new Error(errorMessage);
      } else {
        toast.success("Payment successful!");
        console.log(
          "Capture result",
          orderData,
          JSON.stringify(orderData, null, 2)
        );
        return `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`;
      }
    } catch (error) {
      return `Sorry, your transaction could not be processed...${error}`;
    }
  }
  

  
  function onError(error) {
    // Do something with the error from the SDK
  }

  return (
    <div className="card_container">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          createOrder={createOrder}
          onApprove={async (data) => setMessage(await onApprove(data))}
          onError={onError}
          style={{
            shape: "rect",
            layout: "vertical",
            color: "gold",
            label: "paypal",
          }}
        />

        <PayPalCardFieldsProvider
          createOrder={createOrder}
          onApprove={async (data) => setMessage(await onApprove(data))}
        >
          <PayPalCardFieldsForm />
          <input
            type="text"
            id="card-billing-address-line-2"
            name="card-billing-address-line-2"
            placeholder="Address line 1"
            onChange={(e) =>
              handleBillingAddressChange("addressLine1", e.target.value)
            }
          />
          <input
            type="text"
            id="card-billing-address-line-2"
            name="card-billing-address-line-2"
            placeholder="Address line 2"
            onChange={(e) =>
              handleBillingAddressChange("addressLine2", e.target.value)
            }
          />
          <input
            type="text"
            id="card-billing-address-admin-area-line-1"
            name="card-billing-address-admin-area-line-1"
            placeholder="Admin area line 1"
            onChange={(e) =>
              handleBillingAddressChange("adminArea1", e.target.value)
            }
          />
          <input
            type="text"
            id="card-billing-address-admin-area-line-2"
            name="card-billing-address-admin-area-line-2"
            placeholder="Admin area line 2"
            onChange={(e) =>
              handleBillingAddressChange("adminArea2", e.target.value)
            }
          />
          <input
            type="text"
            id="card-billing-address-country-code"
            name="card-billing-address-country-code"
            placeholder="Country code"
            onChange={(e) =>
              handleBillingAddressChange("countryCode", e.target.value)
            }
          />
          <input
            type="text"
            id="card-billing-address-postal-code"
            name="card-billing-address-postal-code"
            placeholder="Postal/zip code"
            onChange={(e) =>
              handleBillingAddressChange("postalCode", e.target.value)
            }
          />
          {/* Custom client component to handle card fields submission */}
          <SubmitPayment
            isPaying={isPaying}
            setIsPaying={setIsPaying}
            billingAddress={billingAddress}
          />
        </PayPalCardFieldsProvider>
      </PayPalScriptProvider>
      <Message content={message} />
    </div>
  );
}

const SubmitPayment = ({ isPaying, setIsPaying, billingAddress }) => {
    const { cardFieldsForm, fields } = usePayPalCardFields();
  
    const handleClick = async () => {
      if (!cardFieldsForm) {
        const childErrorMessage =
          "Unable to find any child components in the <PayPalCardFieldsProvider />";
  
        throw new Error(childErrorMessage);
      }
      const formState = await cardFieldsForm.getState();
  
      if (!formState.isFormValid) {
        return alert("The payment form is invalid");
      }
      setIsPaying(true);
  
      cardFieldsForm.submit({ billingAddress }).finally((err) => {
        setIsPaying(false);
      });
    };
  
    return (
      <button
        className={isPaying ? "btn" : "btn btn-primary"}
        onClick={handleClick}
      >
        {isPaying ? <div className="spinner tiny" /> : "Pay"}
      </button>
    );
  };
  
  const Message = ({ content }) => {
    return <p>{content}</p>;
  };
