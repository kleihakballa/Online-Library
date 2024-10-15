import React from 'react';
import { Amplify } from "aws-amplify";
import { withAuthenticator, Authenticator, ThemeProvider, Theme, useTheme } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import awsExports from "../../aws-exports";
import { useHistory } from "react-router-dom";
import Navbar from '../layout/Navbar';  // Import your Navbar component

Amplify.configure(awsExports);

const customTheme = {
    name: 'custom-theme',
    tokens: {
        colors: {
            background: {
                primary: { value: '#e9f7ef' },
                secondary: { value: '#fff' },
            },
            font: {
                primary: { value: '#28a745' },
                secondary: { value: '#155724' },
                danger: { value: '#dc3545' },
            },
            border: {
                primary: { value: '#ced4da' },
                focus: { value: '#28a745' },
            },
            button: {
                primary: {
                    backgroundColor: { value: '#28a745' },
                    color: { value: '#fff' },
                    _hover: { backgroundColor: { value: '#218838' } },
                },
                link: {
                    color: { value: '#28a745' },
                    _hover: { color: { value: '#218838' } },
                },
                google: {
                    backgroundColor: { value: '#28a745' },
                    color: { value: '#fff' },
                    _hover: { backgroundColor: { value: '#218838' } },
                },
            },
        },
        components: {
            container: {
                big: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '89vh',
                    overflow: 'hidden',
                },
                log: {
                    backgroundColor: { value: '#fff' },
                    padding: '2rem',
                    borderRadius: '0.75rem',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    maxWidth: '400px',
                    textAlign: 'center',
                },
            },
            form: {
                group: {
                    marginBottom: '1rem',
                    textAlign: 'left',
                },
                label: {
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: { value: '#155724' },
                },
                control: {
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    border: '1px solid #ced4da',
                    borderRadius: '0.5rem',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    _focus: {
                        borderColor: { value: '#28a745' },
                        boxShadow: '0 0 0 0.2rem rgba(40, 167, 69, 0.25)',
                        outline: 'none',
                    },
                },
            },
            alert: {
                marginBottom: '1rem',
                color: { value: '#dc3545' },
            },
            password: {
                group: {
                    position: 'relative',
                },
                icon: {
                    position: 'absolute',
                    right: '10px',
                    top: '70%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                },
            },
            loader: {
                scale: {
                    margin: 'auto',
                    display: 'block',
                },
            },
        },
    },
};

function AmplifyApp({ children }) {
    const history = useHistory();

    return (
        <ThemeProvider theme={customTheme}>
            <Authenticator.Provider>
                <Navbar/>
                <main>
                    {children}
                </main>
            </Authenticator.Provider>
        </ThemeProvider>
    );
}

export default withAuthenticator(AmplifyApp);
