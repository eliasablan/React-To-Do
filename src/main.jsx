import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { Provider } from 'react-redux';
import { store } from './store.js';
import { CreateTodoSlide } from './components/CreateTodoSlide';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <CreateTodoSlide />
    </Provider>
  </React.StrictMode>,
);
