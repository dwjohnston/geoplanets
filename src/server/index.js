import React from 'react';
import ReactDOM from 'react-dom/server';
import Helmet from 'react-helmet';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { Provider } from 'react-redux';

import configureStore from '../shared/core/configure-store';
import createDocument from './document';
import { StaticRouter } from 'react-router';

import App from '../shared/App';
import { SheetsRegistry } from 'jss';

import JssProvider from 'react-jss/lib/JssProvider';
import {
    MuiThemeProvider,
    createMuiTheme,
    createGenerateClassName,
} from '@material-ui/core/styles';

import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

/**
 * Provides the server side rendered app. In development environment, this method is called by
 * `react-hot-server-middleware`.
 *
 * This method renders the ejs template `public/views/index.ejs`.
 *
 * @param clientStats Parameter passed by hot server middleware
 */
export default ({ clientStats }) => async (req, res) => {
    const preloadedState = {
        controlState: {

        },
        algorithm: {
            selectedAlgo: 0
        }
    };
    const store = configureStore(preloadedState);


    const sheetsRegistry = new SheetsRegistry();

    // Create a sheetsManager instance.
    const sheetsManager = new Map();

    // Create a theme instance.
    const theme = createMuiTheme({
        palette: {
            primary: green,
            accent: red,
            type: 'light',
        },
    });

    const generateClassName = createGenerateClassName();
    const context = {};


    const app = (
        <StaticRouter
            location={req.url}
            context={context}>
            <Provider store={store}>
                <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
                    <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>

                        <App />

                    </MuiThemeProvider>
                </JssProvider>
            </Provider>
        </StaticRouter>);


    // const app = (<StaticRouter
    //     location={req.url}
    //     context={context}>
    //     <App />
    // </StaticRouter>);



    const appString = ReactDOM.renderToString(app);
    const helmet = Helmet.renderStatic();
    const chunkNames = flushChunkNames();
    const { js, styles } = flushChunks(clientStats, { chunkNames });
    const jss = sheetsRegistry.toString();
    const document = createDocument({
        appString,
        js,
        styles,
        preloadedState: JSON.stringify(preloadedState),
        helmet,
        jss,

    });

    /*
     * See https://reacttraining.com/react-router/web/guides/server-rendering for details
     * on this configuration.
     */
    if (context.url) {
        res.writeHead(301, {
            Location: context.url
        });
        res.end();
    } else {

        res.set('Content-Type', 'text/html').end(document);
    }
};
