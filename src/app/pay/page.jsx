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
import { useRouter } from "next/navigation";

export default function Pay() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const jobIds = JSON.parse(searchParams.get("jobIds") || "[]");
  const jobTitles = JSON.parse(searchParams.get("jobTitles") || "[]");
  const jobCompanies = JSON.parse(searchParams.get("jobCompanies") || "[]");

  const totalCost = jobIds.length * 100;
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
          // use the "body" param to optionally pass additional order information
          // like product ids and quantities
          body: JSON.stringify({
            jobIds,
            price: totalCost.toString(),
          }),
        }
      );

      const orderData = await response.json();
      console.log(orderData);

      if (orderData.orderId) {
        return orderData.orderId;
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

  async function onApprove(data, actions) {
    try {
      console.log("1", data);
      console.log(actions);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_MAIN}/api/v1/verify-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            jobIds,
            orderId: data.orderID,
          }),
        }
      );

      const orderData = await response.json();
      // Three cases to handle:
      //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
      //   (2) Other non-recoverable errors -> Show a failure message
      //   (3) Successful transaction -> Show confirmation or thank you  message

      if (orderData.msg == true) {
        toast.success("Payment successful!");
        console.log(
          "Capture result",
          orderData,
          JSON.stringify(orderData, null, 2)
        );
        router.push(
          `/afterpay?success=true&jobId=${jobId}&orderId=${data.orderID}`
        );
        return `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`;
      } else {
        // (3) Successful transaction -> Show confirmation or thank you message
        // Or go to another URL:  actions.redirect('thank_you.html');
        router.push(
          `/afterpay?success=false&jobId=${jobId}&orderId=${data.orderID}`
        );
      }
    } catch (error) {
      return `Sorry, your transaction could not be processed...${error}`;
    }
  }

  function onError(error) {
    // Do something with the error from the  SDK
  }

  return (
    <div className="flex max-w-[64rem] mx-auto p-[1rem] min-h-screen lg:py-12">
      <div className=" rounded-[1rem]">
        <div className="max-w-3xl mx-auto bg-zinc-100 rounded-[1rem] shadow-sm border-[1px] border-zinc-200">
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold text-gray-800">Invoice</h1>
              <div className="text-sm text-gray-500">
                <div>Date: {new Date().toLocaleDateString()}</div>
                <div>
                  Invoice #: INV-{Math.random().toString(36).substr(2, 9)}
                </div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="px-8 py-6">
            {/* Table Header */}
            <div className="grid grid-cols-12 text-xs uppercase font-medium text-gray-500 border-b border-gray-200 pb-4">
              <div className="col-span-2">Job ID</div>
              <div className="col-span-4">Job Title</div>
              <div className="col-span-3 text-right">Company</div>
              <div className="col-span-3 text-right">Amount</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {jobIds.map((id, index) => (
                <div key={id} className="grid grid-cols-12 py-4 text-sm">
                  <div className="col-span-2 text-gray-500">{id}</div>
                  <div className="col-span-4 text-gray-800 font-medium">
                    {jobTitles[index]}
                  </div>
                  <div className="col-span-3 text-gray-600 text-right">
                    {jobCompanies[index]}
                  </div>
                  <div className="col-span-3 text-right text-gray-800">
                    $100.00
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className=" px-8 py-6 rounded-b-lg">
            <div className="flex flex-col gap-3 items-end">
              <div className="flex justify-between w-48 text-sm text-gray-600">
                <span>Subtotal</span>
                <span>${totalCost}.00</span>
              </div>
              <div className="flex justify-between w-48 text-sm text-gray-600">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between w-48 font-medium text-gray-800 pt-3 border-t border-gray-200">
                <span>Total</span>
                <span>${totalCost}.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card_container max-w-[24rem] mx-auto h-screen w-[100%]">
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
