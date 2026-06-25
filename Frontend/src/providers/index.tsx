import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProviderProps } from "typescript/interface";

const AppProvider_Wrappers = ({ children }: AppProviderProps) => {
  const queryClient = new QueryClient();
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default AppProvider_Wrappers;
