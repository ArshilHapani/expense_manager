import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { Provider } from './context/context.js';
import { SpeechProvider } from '@speechly/react-client';

ReactDOM.render(
    <SpeechProvider appId='c9ffbc07-d798-4766-aef3-caf9b10fa4b0' language='en-US'>
        <Provider>
            <App />
        </Provider>
    </SpeechProvider>
    ,
    document.getElementById('root')
);