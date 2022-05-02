import React, { useEffect, useReducer, useRef, useState } from 'react';
import { adminApi } from "../../../utils/admin.api";

import classes from './Login.module.css';
const emailReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === 'BLUR') {
    return { value: state.value, isValid: state.value.includes('@') }
  }
  return { value: '', isValid: false };
}

const passReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === 'BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
  return { value: '', isValid: false };
}


const Login = (props) => {

  const [isLogin, setIsLogin] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, emailDispacher] = useReducer(emailReducer, { value: '', isValid: null });
  const [passState, passDispacher] = useReducer(passReducer, { value: '', isValid: null });

  const { isValid: isEmailValid } = emailState;
  const { isValid: isPassValid } = passState;

  const fname = useRef();
  const lname = useRef();

  useEffect(() => {
    const id = setTimeout(() => {
      setFormIsValid(isEmailValid && isPassValid);
    }, 500);

    return () => {
      clearTimeout(id);
    }
  }, [isEmailValid, isPassValid]);

  const emailChangeHandler = (event) => {
    emailDispacher({ type: 'INPUT', val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    passDispacher({ type: 'INPUT', val: event.target.value });
  };

  const validateEmailHandler = () => {
    emailDispacher({ type: 'BLUR' });
  };

  const validatePasswordHandler = () => {
    passDispacher({ type: 'BLUR' });
  };

  const clearValues = () => {
    emailDispacher({ value: '', isValid: null });
    passDispacher({ value: '', isValid: null });
  }


  const submitHandler = (event) => {
    event.preventDefault();
    if (isLogin) {
      loginHandler(emailState.value, passState.value);
    } else {
      registerHandler({
        firstname: fname.current.value,
        lastname: lname.current.value,
        email: emailState.value,
        password: passState.value,
      });
    }

  };

  //apis

  const loginHandler = async (email, password) => {
    try {
      const res = await adminApi.login({ email, password });
      if (res.data.isSuccess) {
        props.onSetLoggedIn(true);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userName", res.data.Data.userName);
        clearValues();
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const registerHandler = async (userData) => {
    try {
      const res = await adminApi.register(userData);
      console.log(res);
      if (res.data.isSuccess) {
        clearValues();
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      <img src='noteImg.svg' alt='notesLogo' className={classes.noteImg} />
      <div className={classes.border}>
        <div className={classes.loginDiv}>
          <p className={`${isLogin ? classes.toggleBtnActive : classes.toggleBtn}`} onClick={() => { setIsLogin(true); clearValues() }}>Log In</p>
          <p className={`${!isLogin ? classes.toggleBtnActive : classes.toggleBtn}`} onClick={() => { setIsLogin(false); clearValues() }}>Sign up</p>
        </div>
        {isLogin ? (<form onSubmit={submitHandler} className={classes.form}>

          <div
            className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
              }`}
          >
            <h2>To Continue</h2>
            <p style={{ color: '#999999' }}>We need your Name & Email </p>
            <input
              type="email"
              id="email"
              placeholder='Email'
              value={emailState.value}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
            />
          </div>
          <div
            className={`${classes.control} ${passState.isValid === false ? classes.invalid : ''
              }`}
          >
            <input
              type="password"
              id="password"
              placeholder='Password'
              value={passState.value}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
          </div>
          <div className={classes.actions}>
            <button type="submit" className={classes.btn} disabled={!formIsValid}>
              Login
            </button>
          </div>
        </form>) :
          (<form onSubmit={submitHandler} className={classes.form}>
            <div className={classes.control} >
              <input placeholder='First Name' type="name" id="fname" ref={fname} />
            </div>
            <div className={classes.control}>
              <input placeholder='Last Name' type="name" id="lname" ref={lname} />
            </div>
            <div className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ""}`}>
              <input placeholder='Email' type="email" id="email" value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} />
            </div>
            <div className={`${classes.control} ${passState.isValid === false ? classes.invalid : ""}`}>
              <input placeholder='Password' type="password" id="password" value={passState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} />
            </div>
            <div className={classes.actions}>
              <button type="submit" className={classes.btn} disabled={!formIsValid}>
                Sign Up
              </button>
            </div>
          </form>)}
      </div>
    </div>
  );
};

export default Login;
