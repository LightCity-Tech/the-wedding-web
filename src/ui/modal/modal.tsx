import React, { useState } from "react";
import { Input } from "../input/input";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { makeAWishSchema } from "./components/makeAWishSchema";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const methods = useForm<z.infer<typeof makeAWishSchema>>({
    resolver: zodResolver(makeAWishSchema),
    mode: "onChange",
  });

  const { watch, handleSubmit, formState } = methods;
  const { isValid } = formState;  

  // Watch the value of the 'amount' field
  const amountValue = watch("amount", 0);

  const makeWish = async (data: z.infer<typeof makeAWishSchema>) => {
    
    setSubmitting(true);
    console.log(data);
    setTimeout(() => {
      setSubmitting(false);
    }, 2000);

  };

  if (!isOpen) return null;

  console.log(methods.formState.errors); // Check for validation errors
  console.log(methods.formState.isValid); // Check if the form is valid


  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black bg-opacity-50" >
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-lg mx-auto py-5 px-7">
        <div className="flex flex-col">
          <div className="w-full flex justify-between">
            <h3 className="text-xl font-semibold">{title}</h3>
            <button onClick={onClose} className="relative w-6 h-6 flex justify-center items-center">
              <span className="absolute w-4 h-0.5 bg-pastor-blue transform rotate-45"></span>
              <span className="absolute w-4 h-0.5 bg-pastor-blue transform -rotate-45"></span>
            </button>
          </div>
          <p>We completely appreciate every contribution you give to us.</p>
        </div>

        <div className="mt-6">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(makeWish)}>
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                name="fullname"
                type="text"
              />
              <Input
                label="Email"
                placeholder="yourexample@gmail.com"
                name="email"
                type="email"
              />
              <Input
                label="Phone Number"
                placeholder="+23490XXXXXXX"
                name="phone"
                type="number"
              />
              <Input
                label="Amount"
                placeholder="10000"
                name="amount"
                type="number"
              />
              <button
                type="submit"
                disabled={!isValid || submitting}
                className={`${
                   !isValid || submitting ? "bg-[#e0b80780]" : "bg-[#E0B807]"
                } w-full p-4 rounded-[2.5rem] text-white font-[500] text-xl`}
              >
                {!submitting
                  ? "Send" 
                  : `Sending ${amountValue ? `$${amountValue}` : ''}...`}
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export { Modal };
