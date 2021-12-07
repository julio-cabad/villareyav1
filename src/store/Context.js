import React, { createContext } from "react";

const StoreContext = createContext({
  dataStore: undefined,
  dataTravelManagement: undefined
});

export { StoreContext };
