import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Topbar from '../components/topbar';
import store from '../redux/store';

const RootLayout = () => {
  return (
    <Provider store={store}>
      <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col gap-4 p-2">
        <Topbar />
        <Outlet />
      </div>
    </Provider>
  );
};

export default RootLayout;
