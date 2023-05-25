import { IconContext } from "@phosphor-icons/react";
import React from "react";

export const IconProvider = ({ children }) => {
  return (
    <IconContext.Provider
      value={{
        color: "currentColor",
        size: "2.5rem",
        className: "icon",
      }}
    >
    { children }
    </IconContext.Provider>
  );
};
