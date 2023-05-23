import React from "react";
import { IconContext } from "@phosphor-icons/react";

export const IconProvider = ({ children }) => {
  return (
    <IconContext.Provider
      value={{
        color: "currentColor",
        size: "2.5rem",
      }}
    >
    { children }
    </IconContext.Provider>
  );
};
