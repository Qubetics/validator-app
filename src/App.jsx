/* eslint-disable */
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { BrowserRouter } from 'react-router-dom';
import RoutePath from './routes';
import AppLogout from './components/SessionExpired/AutoLogout';
import axios from 'axios';
import { useEffect } from 'react';

function App() {
  Number.prototype.noExponents = function () {
    var data = String(this).split(/[eE]/);
    if (data.length == 1) return data[0];

    var z = '',
      sign = this < 0 ? '-' : '',
      str = data[0].replace('.', ''),
      mag = Number(data[1]) + 1;

    if (mag < 0) {
      z = sign + '0.';
      while (mag++) z += '0';
      return z + str.replace(/^\-/, '');
    }
    mag -= str.length;
    while (mag--) z += '0';
    return str + z;
  };


  return (
    <BrowserRouter>
      <RoutePath />
      <AppLogout />
      <NotificationContainer />
    </BrowserRouter>
  );
}

export default App;
