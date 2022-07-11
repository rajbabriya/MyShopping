const SIGN_UP = "SIGN_UP";
const LOG_IN = "LOG_IN";

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-yEXjV69Sl8GSp3otI4LyHsRps8Q82eg",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      let msg = "Something went wrong!!";
      const errData = await response.json();

      if (errData.error.message === "EMAIL_EXISTS") {
        msg = "Sorry, Email already exist!!";
      }
      console.log(errData.error.message);
      throw new Error(msg);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch({
      type: SIGN_UP,
      token: resData.idToken,
      userId: resData.localId,
    });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-yEXjV69Sl8GSp3otI4LyHsRps8Q82eg",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      let msg = "Something went wrong!!";
      const errData = await response.json();
      if (errData.error.message === "INVALID_PASSWORD") {
        msg = "Sorry, Your Password Is Wrong!!";
      } else if (errData.error.message === "EMAIL_NOT_FOUND") {
        msg = "Sorry, Email doesn't exist!!";
      }
      // console.log(errData.error.message);
      throw new Error(msg);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch({
      type: LOG_IN,
      token: resData.idToken,
      userId: resData.localId,
    });
  };
};
