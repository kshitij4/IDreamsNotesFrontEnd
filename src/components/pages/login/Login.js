import React, { useEffect, useReducer, useRef, useState } from 'react';

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

const phoneReducer = (state, action) => {
  let re = new RegExp(/^[+]*[0-9]{10,}$/);
  if (action.type === "INPUT") {
    return { value: action.val, isValid: re.test(action.val) };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isValid: re.test(state.value) };
  }
  return { value: "", isValid: false };
};


const Login = (props) => {

  const [isLogin, setIsLogin] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, emailDispacher] = useReducer(emailReducer, { value: '', isValid: null });
  const [passState, passDispacher] = useReducer(passReducer, { value: '', isValid: null });
  const [phoneState, phoneDispacher] = useReducer(phoneReducer, { value: "", isValid: null });

  const { isValid: isEmailValid } = emailState;
  const { isValid: isPassValid } = passState;
  const { isValid: isPhoneValid } = phoneState;

  const fname = useRef();
  const lname = useRef();

  useEffect(() => {
    const id = setTimeout(() => {
      setFormIsValid(isEmailValid && isPassValid && isPhoneValid);
    }, 500);

    return () => {
      clearTimeout(id);
    }
  }, [isEmailValid, isPassValid, isPhoneValid]);

  const emailChangeHandler = (event) => {
    emailDispacher({ type: 'INPUT', val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    passDispacher({ type: 'INPUT', val: event.target.value });
  };

  const phoneChangeHandler = (event) => {
    phoneDispacher({ type: "INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    emailDispacher({ type: 'BLUR' });
  };

  const validatePasswordHandler = () => {
    emailDispacher({ type: 'BLUR' });
  };

  const validatePhoneHandler = () => {
    phoneDispacher({ type: "BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (isLogin) {
      props.onLogin(emailState.value, passState.value);
    } else {
      props.onRegister({
        firstname: fname.current.value,
        lastname: lname.current.value,
        email: emailState.value,
        phone: phoneState.value,
        password: passState.value,
      });
    }

  };

  return (
    <div className={classes.container}>
      <img src='noteImg.svg' alt='notesLogo' className={classes.noteImg} />
      <div className={classes.border}>
        <p className = {`${isLogin ? classes.toggleBtnActive : classes.toggleBtn}`} onClick={() => setIsLogin(true)}>Log In</p>
        <p className = {`${!isLogin ? classes.toggleBtnActive : classes.toggleBtn}`} onClick={() => setIsLogin(false)}>Sign up</p>
        {isLogin ? (<form onSubmit={submitHandler}>

          <div
            className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
              }`}
          >
            <h2>To Continue</h2>
            <p style={{color: '#999999'}}>We need your Name & Email </p>
            {/* <label htmlFor="email">E-Mail</label> */}
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
            {/* <label htmlFor="password">Password</label> */}
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
          (<form onSubmit={submitHandler}>
            <div className={classes.control}>
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

        <input type='checkbox' className={classes.remberMe} /> Remember Me
      </div>
    </div>
  );
};

export default Login;
