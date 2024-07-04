import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { NotificationContextProvider } from "./hooks/NotificationContext";
import { InformationContextProvider } from "./hooks/InformationContext";
import { AuthenticationContextProvider } from "./hooks/AuthenticationContext";
import { UserContextProvider } from "./hooks/UserContext";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import store from "./reducers/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <AuthenticationContextProvider>
      <UserContextProvider>
        <NotificationContextProvider>
          <InformationContextProvider>
            {/* <Provider store={store}> */}
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
            {/* </Provider> */}
          </InformationContextProvider>
        </NotificationContextProvider>
      </UserContextProvider>
    </AuthenticationContextProvider>
  </Router>
);
