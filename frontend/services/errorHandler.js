import Vue from "vue";

function handle_api_error(error) {
  try {
    Vue.notify({
      group: "auth",
      type: "error",
      title: "Error!",
      text: `${error}`
    });
    return error;
  } catch (err) {
    return err;
  }
}

export { handle_api_error };
