import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import classes from "./Login.module.css";
import AuthContext from "../../store/auth-contect";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};
const passwordReducer = (state, action) => {
  if (action.type === "PASSWORD_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
};
const Login = (props) => {
  const ctx = useContext(AuthContext);
  // const [email, setEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  //const [password, setPassword] = useState("");
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);
    return () => {
      console.log("clearTimeout");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);
  const emailHandle = (e) => {
    dispatchEmail({ type: "USER_INPUT", val: e.target.value });
    setFormIsValid(e.target.value.includes("@") && passwordReducer.isValid);
  };
  const passwordHandle = (e) => {
    dispatchPassword({ type: "PASSWORD_INPUT", val: e.target.value });
    setFormIsValid(e.target.value.trim().length > 6 && emailState.isValid);
  };
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const submitHandle = (e) => {
    e.preventDefault();
    if (formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };
  const validateEmailHandler = () => {
    //setEmailIsValid(email.includes("@"));
    dispatchEmail({ type: "INPUT_BLUR" });
  };
  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
    // setPasswordIsValid(password.trim().length > 6);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandle}>
        <Input
          ref={emailInputRef}
          type="email"
          id="email"
          label="E-Mail"
          value={emailState.value}
          onChange={emailHandle}
          isValid={emailIsValid}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          id="password"
          label="Password"
          onChange={passwordHandle}
          onBlur={validatePasswordHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};
export default Login;
