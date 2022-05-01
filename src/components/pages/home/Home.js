import { useState } from 'react';
import Navigation from '../../common/Navigation/Navigation';
import LogoutPopup from '../../common/UI/LogoutPopup/LogoutPopup';
import NotesList from '../notes/NotesList';
// import InputNotes from '../notes/InputNotes';

import classes from './Home.module.css';

const Home = (props) => {
  const [show,setShow] = useState(false);   
  return (
    <>
      <div className={classes.mainBody}>
        <Navigation onLogout={() => setShow(true)}/>
        <NotesList/>
        <LogoutPopup show={show} handleClose={() => setShow(false)} onLogout={props.onLogout} />
      </div>
    </>
  );
};

export default Home;
