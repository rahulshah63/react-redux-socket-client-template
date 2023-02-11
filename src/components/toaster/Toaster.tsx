import React, { FC } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Toaster: FC = () => {
  //   useEffect(() => {

  //   }, []);
  return <ToastContainer theme="dark" draggable position="top-right" limit={5} />;
};
