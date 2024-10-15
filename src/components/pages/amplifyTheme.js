import { createTheme } from '@aws-amplify/ui-react';

const theme = createTheme({
    name: 'custom-theme',
    tokens: {
        colors: {
            background: {
                primary: { value: '#e9f7ef' },
                secondary: { value: '#ffffff' },
            },
            font: {
                primary: { value: '#28a745' },
                secondary: { value: '#19692c' },
                danger: { value: '#c82333' },
            },
            border: {
                primary: { value: '#ced4da' },
                focus: { value: '#28a745' },
            },
            button: {
                primary: {
                    backgroundColor: { value: '#28a745' },
                    color: { value: '#ffffff' },
                    _hover: {
                        backgroundColor: { value: '#218838' },
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    },
                },
                link: {
                    color: { value: '#28a745' },
                    _hover: {
                        color: { value: '#218838' },
                        textDecoration: 'underline',
                    },
                },
                google: {
                    backgroundColor: { value: '#28a745' },
                    color: { value: '#ffffff' },
                    _hover: {
                        backgroundColor: { value: '#218838' },
                    },
                },
            },
        },
        components: {
            container: {
                big: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '90vh',
                    padding: '1rem',
                },
                log: {
                    backgroundColor: { value: '#ffffff' },
                    padding: '2rem',
                    borderRadius: '1rem',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    maxWidth: '450px',
                    textAlign: 'center',
                },
            },
            form: {
                group: {
                    marginBottom: '1.5rem',
                },
                label: {
                    color: { value: '#19692c' },
                    fontWeight: '600',
                },
                control: {
                    border: '1px solid #ced4da',
                    borderRadius: '0.5rem',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    width: '100%',
                    _focus: {
                        borderColor: { value: '#28a745' },
                        boxShadow: '0 0 0 0.2rem rgba(40, 167, 69, 0.25)',
                    },
                },
            },
            alert: {
                color: { value: '#c82333' },
                marginBottom: '1rem',
                padding: '1rem',
                borderRadius: '0.5rem',
                backgroundColor: { value: '#f8d7da' },
            },
            password: {
                group: {
                    position: 'relative',
                },
                icon: {
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
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
});

export default theme;
