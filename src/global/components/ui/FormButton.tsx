"use client";

import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import Loader from "./Loader";

const FormButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} {...props}>
      {pending ? (
        <>
          <Loader className="mr-2" /> {props.children}
        </>
      ) : (
        props.children
      )}
    </button>
  );
};

export default FormButton;
