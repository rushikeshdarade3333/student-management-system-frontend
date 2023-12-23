// ValidationContext.js
import { createContext, useContext } from "react";
import { studentValidationSchema } from "./validationSchema";

const ValidationContext = createContext();

export const useValidation = () => {
  const context = useContext(ValidationContext);
  if (!context) {
    throw new Error("useValidation must be used within a ValidationProvider");
  }
  return context;
};

export const ValidationProvider = ({ children }) => {
  return (
    <ValidationContext.Provider value={studentValidationSchema}>
      {children}
    </ValidationContext.Provider>
  );
};
