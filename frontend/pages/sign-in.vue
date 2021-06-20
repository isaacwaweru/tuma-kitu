<template>

  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6" class="order-md-1 order-2 ">
      <v-container>
        <v-card outlined :loading="isLoading" class="mx-auto my-12" max-width="500">
          <template slot="progress">
            <v-progress-linear
              color="rgb(1, 51, 161)"
              height="5"
              indeterminate
            ></v-progress-linear>
          </template>
          <div >
            <v-card-title class="pa-5"><h2>Sign in</h2></v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>

                <v-text-field
                  v-model="form.email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                  outlined
                ></v-text-field>

                <v-text-field
                  v-model="form.password"
                  :rules="passwordRules"
                  :type="show1 ? 'text' : 'password'"
                  label="Password"
                  required
                  outlined
                ></v-text-field>


                <v-btn
                  x-large
                  rounded
                  dark
                  block
                  :disabled="!valid"
                  color="#0133A1"
                  class="mr-4"
                  @click="validate"
                >
            <span v-if="isLoading"
            >Please wait...<v-progress-circular
              indeterminate
              :size="17"
              :width="2"
              class="ml-2"
              color="white"
            ></v-progress-circular
            ></span>
                  <span v-else> Sign in</span>
                </v-btn>
              </v-form>
            </v-card-text>
            <v-card-actions>

              <v-btn
                rounded
                block
                color="#0133A1"
                text
                class="custom-transform-class text-none "
                @click="gotoSignin"
              >
                create account? Sign up
              </v-btn>
            </v-card-actions>
          </div>

        </v-card>
      </v-container>

    </v-col>
    <v-col cols="12" sm="8" md="6" class="order-md-2s  order-1 pr-5">
      <v-container>
      <img class="logo-img3" src="~assets/signin.jpg" alt="Logo">
      </v-container>
    </v-col>
  </v-row>

</template>

<script>
import {LOGIN_REQUEST} from "@/store/actions/auth";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    valid: true,
    form: {
      email: "",
      password: "",
    },

    show1: false,
    nameRules: [
      v => !!v || "Name is required",
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    passwordRules: [
      v => !!v || "Required.",
      v => v.length >= 8 || "Min 8 characters"
    ],
    select: null,

  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        if (this.valid) {
          this.$store.dispatch(LOGIN_REQUEST, this.form);
        }
      }
    },
    gotoSignin() {
      this.$router.push({ path: "/sign-up" });
    }
  },
  computed: {
    ...mapGetters(["isLoading"])
  }
};
</script>
<style>
h2{
  color: #0133a1 !important;
}

.logo-img3{
  height: 43vh;
  width: 100%;
  margin: auto;
  padding: 0.5em;
  border-radius: 5px;

}
</style>

