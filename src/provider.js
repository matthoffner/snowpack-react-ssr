import React, { useEffect } from 'react';
import { node } from 'prop-types';
import { ThemeProvider } from '@material-ui/styles';
import { muiTheme } from './theme';

export default function Provider({ children }) {
    useEffect(() => {
        const jssStyles = document.querySelector('#mui-ssr');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);
    return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
}
Provider.propTypes = {
    children: node.isRequired
};
