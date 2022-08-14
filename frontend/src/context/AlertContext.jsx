import { createContext, useMemo, useState } from "react";

const AlertContext = createContext(null);

function AlertContextProvider({ children }) {
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ type: "", text: "" });

  const alertMode = useMemo(
    () => ({
      toggleAlert: (alertType, alertText) => {
        setAlert(true);
        setAlertMessage({ text: alertText, type: alertType });
        setTimeout(() => {
          setAlert(false);
        }, 3500);
      },
    }),
    []
  );

  return (
    <AlertContext.Provider value={{ alert, alertMessage, alertMode }}>
      {children}
    </AlertContext.Provider>
  );
}

export { AlertContext, AlertContextProvider };
