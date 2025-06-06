import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app';
import { store } from './services/store';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
