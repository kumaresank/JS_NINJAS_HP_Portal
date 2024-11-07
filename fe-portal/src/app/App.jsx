import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';
import Home from '../pages/home/Home';
import ProviderDashboard from '../pages/providerDashboard/ProviderDashboard';

function App() {
  return (
    <Provider store={store}>
      <ProviderDashboard />
    </Provider>
  );
}

export default App;
