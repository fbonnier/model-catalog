import React from 'react';
import ReactDOM from 'react-dom';
import initAuth from './auth';
import { datastore } from "./datastore";
import { ContextMainProvider } from "./ContextMain";
import { SnackbarProvider } from "notistack";
import ValidationFramework from "./ValidationFramework";

function renderApp(auth) {
    datastore.auth = auth;
    ReactDOM.createRoot(document.getElementById("root")).render(
        <ContextMainProvider>
            <SnackbarProvider maxSnack={3}>
                <ValidationFramework auth={auth} />
            </SnackbarProvider>
        </ContextMainProvider>
    );
};

// window.addEventListener("DOMContentLoaded", () => initAuth(renderApp));

// -- for development, comment out the previous line and uncomment the following ones

const auth = {
  token: "token here"
};
window.addEventListener('DOMContentLoaded', () => renderApp(auth));
