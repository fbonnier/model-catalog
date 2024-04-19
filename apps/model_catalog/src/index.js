import React from 'react';
import ReactDOM from 'react-dom';
// import initAuth from './auth';
import initAuth from './auth2';
import { datastore } from "./datastore";
import { ContextMainProvider } from "./ContextMain";
import { SnackbarProvider } from "notistack";
import ValidationFramework from "./ValidationFramework";

function renderApp(auth) {
    datastore.auth = auth;
    datastore.auth.token = process.env.REACT_APP_TOKEN
    ReactDOM.render(
        <ContextMainProvider>
            <SnackbarProvider maxSnack={3}>
                <ValidationFramework auth={auth} />
            </SnackbarProvider>
        </ContextMainProvider>,
        document.getElementById('root')
    );
};

window.addEventListener('DOMContentLoaded', () => initAuth(renderApp));
