// getState is used to get the value of a state path
// setState is used to set the value of a state path
import { getState, setState } from "statezero";
import { setEmptyState } from "./helpers";
const log = console.log;

export const readCookie = () => {
    const url = "http://localhost:3002/users/check-session"; // !!!

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }

        })
        .then(json => {
            if (json && json.userID) {
                setState("userID", json.userID)
            }
        })
        .catch(error => {
            console.log("No Cookie found");
        });
};

export const updateLoginForm = field => {
    const { name, value } = field;
    setState(`loginForm.${name}`, value);
};

export const login = (event) => {
    event.preventDefault()
    // Create our request constructor with all the parameters we need
    const request = new Request("http://localhost:3002/users/login", { // !!! change to heroku URI
        method: "post",
        body: JSON.stringify(getState("loginForm")),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            console.log(res)
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            console.log("fetched")
            if (json.userID !== undefined) {
                setState("userID", json.userID)
                this.props.onLogin();
            }
        })
        .catch(error => {
            console.log(error);
        }
    );
};

export const register = (event) => {
    event.preventDefault()
    // Create our request constructor with all the parameters we need
    log(JSON.stringify(getState("regForm")))
    const request = new Request("http://localhost:3002/users/", { // !!! change to heroku URI
        method: "post",
        body: JSON.stringify(getState("regForm")),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });



    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json !== undefined) {
                alert("Registered!")
            } else {
                alert("Username already taken.")
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const updateRegForm = field => {
    const { name, value } = field;
    setState(`regForm.${name}`, value);
};

export const logout = () => {
    const url = "http://localhost:3002/users/logout"; // !!!

    fetch(url)
        .then(res => {
            setEmptyState();
        })
        .catch(error => {
            console.log(error);
        });
};
