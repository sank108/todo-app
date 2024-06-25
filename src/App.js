import { Toaster } from 'react-hot-toast';
import './App.css';
import AppContent from './component/AppContent';
import AppHeader from './component/AppHeader';
import PageTitle from './component/PageTitle';
import style from "./styles/modules/app.module.scss";

function App() {
  return (
    <>
    <div className="">
      <PageTitle>TODO LIST</PageTitle>
      <div className={style.app__wrapper}>
        <AppHeader/>
        <AppContent/> 
      </div>

    </div>
    <Toaster
    position='bottom-right'
    toastOptions={{
      style:{
        fontSize:'1.4rem'
      }
    }}></Toaster>
    </>
  );
}

export default App;
