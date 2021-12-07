import React from "react";
import { useLocalObservable } from "mobx-react-lite";
import { StoreContext } from "./Context";
import { DataStore } from "./DataStore";

const StoreProvider = ({ children }) => {

  const dataStore = useLocalObservable(() => new DataStore());

  return (
    <StoreContext.Provider value={{ dataStore}}>
      {children}
    </StoreContext.Provider>
  );
};
export { StoreProvider };
