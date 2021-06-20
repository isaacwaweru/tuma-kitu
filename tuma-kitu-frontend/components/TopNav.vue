<template>
  <v-app-bar
    elevation="0"
    :clipped-left="clipped"
    class="px-3"
    fixed
    app
  >
    <div class="logo-img mb-5">
      <h1 class="text-primary">tuma<span class="textKitu">Kitu</span></h1>
    </div>
    <v-spacer />


    <div v-if="this.$store.state.auth.user"  class="text-center test">

      <v-btn
        class="ma-2"
        outlined
        fab
        x-small
        color="teal"
      >
        <v-avatar
          color="primary"
          size="36"


        >
          <span class="white--text text-h5 pa-4">{{ this.$store.state.auth.user.firstname.charAt(0) }}</span>
        </v-avatar>
      </v-btn>
      <v-btn
        class="ma-2"
        outlined
        small
        color="primary"
        @click="logout"
      >
        Logout
      </v-btn>
    </div>
  </v-app-bar>
</template>
<script>

import {LOGOUT} from "@/store/actions/auth";

export default {
  data() {
    return {
      clipped: false,
    }
  },
  methods:{
      logout() {
        this.$store.dispatch(LOGOUT);
      }
  }
}

</script>
<style>
h2{
  color: #0133a1 !important;
  font-size: revert !important;
}
.text-primary {
  color: #0233a1 !important;
}
.theme--light.v-application {
  background: #ffffff !important;
}
.v-application--wrap {
  background: white !important;
}
.logo-img{
  height: 100%;
  width: 18rem;
  padding: 0.5em;

}
.test{
  min-width: fit-content;
}
</style>
