import React from "react";
import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ text }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <button
      type="submit"
      className="btn btn-accent btn-block hover:scale-105 duration-300 text-white bg-slate-300 hover:bg-slate-400 border-none"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <span className="loading loading-spinner"> sending...</span>
        </>
      ) : (
        text || "submit"
      )}
    </button>
  );
};

export default SubmitBtn;
