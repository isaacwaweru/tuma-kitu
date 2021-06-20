import {handle_api_error} from "./errorHandler";
import axios from "axios";

let api_url = "https://tuma-kitu.herokuapp.com/";

function login({email, password}) {
  return new Promise(function (resolve, reject) {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      let endpoint = "login";

      const body = {
        email: email.toString().toLowerCase(),
        password: password
      };

      let response = post_api(endpoint, body, config);
      return resolve(response);
    } catch (err) {
      return reject(err);
    }
  });
}

function register({
                    firstname,
                    lastname,
                    email,
                    password,
                    phone
                  }) {
  return new Promise(function (resolve, reject) {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      let endpoint = "register";

      const body = {
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        email: email.toString().trim().toLowerCase(),
        phone: phone.trim(),
        password: password,
      };

      let response = post_api(endpoint, body, config);
      return resolve(response);
    } catch (err) {
      return reject(err);
    }
  });
}

function fetchUserById(token) {
  let id = parseJwt(token).userId;
  return new Promise(function (resolve, reject) {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      };

      let endpoint = "users/" + id;
      let response = get_api(endpoint, config);
      return resolve(response);
    } catch (err) {
      return reject(err);
    }
  });
}

function topUp({token,amount,_id}) {
  return new Promise(function (resolve, reject) {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      };

      let endpoint = "topUp/" + _id;
      const body = {
        amount: parseInt(amount),
      };
      let response = patch_api_body(endpoint,body, config);
      return resolve(response);
    } catch (err) {
      return reject(err);
    }
  });
}


function sendMoney({token,amount,_id,phone}) {
  return new Promise(function (resolve, reject) {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      };

      let endpoint = "send/" + _id;
      const body = {
        phone: phone,
        amount:parseInt(amount)
      };
      let response = patch_api_body(endpoint,body, config);
      return resolve(response);
    } catch (err) {
      return reject(err);
    }
  });
}

function forgotPassword(email) {
  return new Promise(function (resolve, reject) {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      let endpoint = "forgotPassword";

      const body = {
        email: email.toString().toLowerCase(),
      };

      let response = call_api(endpoint, body, config);
      return resolve(response);
    } catch (err) {
      return reject(err);
    }
  });
}


function resetPassword({password, token}) {
  return new Promise(function (resolve, reject) {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      let endpoint = "resetPassword";

      const body = {
        password: password,
        token: token
      };

      let response = patch_api(endpoint, body, config);
      return resolve(response);
    } catch (err) {
      return reject(err);
    }
  });
}

function getSystemUsers(token) {
  return new Promise(function (resolve, reject) {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      };

      let endpoint = "users";

      let response = get_api(endpoint, config);
      return resolve(response);
    } catch (err) {
      return reject(err);
    }
  });
}

function getAllTeams(token) {
  return new Promise(function (resolve, reject) {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      };

      let endpoint = "team";

      let response = get_api(endpoint, config);
      return resolve(response);
    } catch (err) {
      return reject(err);
    }
  });
}





function postLog({action, actor ,actionName,token}) {
  return new Promise(function (resolve, reject) {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      };

      let endpoint = "logs";

      const body = {
        logs:[
          {
            action: action,
            actor:actor,
            actionName:actionName
          }
        ]
      };

      let response = post_api(endpoint, body, config);
      return resolve(response);
    } catch (err) {
      return reject(err);
    }
  });
}

function getLogs({token}) {
  return new Promise(function (resolve, reject) {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      };

      let endpoint = "logs";


      let response = get_api(endpoint, config);
      return resolve(response);
    } catch (err) {
      return reject(err);
    }
  });
}


function parseJwt(token) {
  var base64Payload = token.split(".")[1];
  var payload = Buffer.from(base64Payload, "base64");
  return JSON.parse(payload.toString());
}

async function call_api(endpoint, body, config) {
  return new Promise(function (resolve, reject) {
    axios
      .post(api_url + endpoint, body, config)
      .then(function (response) {
        return resolve(response);
      })
      .catch(function (error) {
        if (error.request.response) {
          return reject(handle_api_error(error.response.data.error));
        } else {
          return reject(handle_api_error(error.message));
        }

      });
  });
}

async function delete_api(endpoint, config) {
  return new Promise(function (resolve, reject) {
    axios
      .delete(api_url + endpoint, config)
      .then(function (response) {
        return resolve(response);
      })
      .catch(function (error) {
        if (error.request.response) {
          return reject(handle_api_error(error.response.data.error));
        } else {
          return reject(handle_api_error(error.message));
        }
      });
  });
}

async function post_api(endpoint, body, config) {
  return new Promise(function (resolve, reject) {
    axios
      .post(api_url + endpoint, body, config)
      .then(function (response) {
        return resolve(response);
      })
      .catch(function (error) {
        if (error.request.response) {
          return reject(handle_api_error(error.response.data.error));
        } else {
          return reject(handle_api_error(error.message));
        }
      });
  });
}

async function get_api(endpoint, config) {
  return new Promise(function (resolve, reject) {
    axios
      .get(api_url + endpoint, config)
      .then(function (response) {
        return resolve(response.data);
      })
      .catch(function (error) {
        if (error.request.response) {
          return reject(handle_api_error(error.response.data.error));
        } else {
          return reject(handle_api_error(error.message));
        }
      });
  });
}

async function patch(endpoint, config) {
  return new Promise(function (resolve, reject) {
    axios
      .patch(api_url + endpoint, config)
      .then(function (response) {
        return resolve(response.data);
      })
      .catch(function (error) {
        if (error.request.response) {
          return reject(handle_api_error(error.response.data.error));
        } else {
          return reject(handle_api_error(error.message));
        }
      });
  });
}

async function patch_api(endpoint, config) {
  return new Promise(function (resolve, reject) {
    axios
      .patch(api_url + endpoint, config)
      .then(function (response) {
        return resolve(response.data);
      })
      .catch((error) => {
        console.log("ERROR IN PATCH", error.request)
        if (error.request.response) {
          return reject(handle_api_error(error.response.data.error));
        } else {
          return reject(handle_api_error(error.message));
        }
      });
  });
}


async function patch_api_body(endpoint, body, config) {
  return new Promise(function (resolve, reject) {
    axios
      .patch(api_url + endpoint, body, config)
      .then(function (response) {
        return resolve(response.data);
      })
      .catch(function (error) {
        if (error.request.response) {
          return reject(handle_api_error(error.response.data.error));
        } else {
          return reject(handle_api_error(error.message));
        }
      });
  });
}


async function put_api(endpoint, body, config) {
  return new Promise(function (resolve, reject) {
    axios
      .put(api_url + endpoint, body, config)
      .then(function (response) {
        return resolve(response);
      })
      .catch(function (error) {
        if (error.request.response) {
          return reject(handle_api_error(error.response.data.error));
        } else {
          return reject(handle_api_error(error.message));
        }
      });
  });
}

export {
  login,
  fetchUserById,
  register,
  forgotPassword,
  resetPassword,
  parseJwt,
  getSystemUsers,
  getAllTeams,
  postLog,
  getLogs,
  topUp,
  sendMoney
};

