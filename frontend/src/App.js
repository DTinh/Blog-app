import NavHeader from './components/Navigation/NavHeader';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';
import AppRoutes from './routes/AppRoutes';
import Footer from './components/Navigation/Footer';
function App() {
  return (
    <>
      <Router>
        <>
          <div className='app-header'>
            <NavHeader />
          </div>
          <div className='app-container'>
            <AppRoutes />
          </div>
          <div className='app-footer'>
            <Footer />
          </div>
        </>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>

  );
}

export default App;
