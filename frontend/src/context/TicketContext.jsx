import { createContext, useState } from "react";

export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <TicketContext.Provider value={{ refreshKey, triggerRefresh }}>
      {children}
    </TicketContext.Provider>
  );
};
