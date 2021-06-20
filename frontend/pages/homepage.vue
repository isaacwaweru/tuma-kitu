<template>
  <v-row text-center v-if="this.$store.state.auth.user">
    <div class="d-block pl-7">

    <v-card-title class="pl-0 ml-5 mt-5"><span class="tertiary--text ">{{ getGreetingTime($moment().hour()) }}&nbsp;<span class="text-capitalize">{{this.$store.state.auth.user.firstname}}</span></span></v-card-title>
    </div>
      <v-col  cols="12" sm="12" md="12" class="pl-5" >
      <v-card elevation="0" class="ml-2">
        <v-container>
          <v-row class="mr-5" >
            <div class="pt-0 pa-5 grey--text">
              <h3 class="tertiary--text">Current balance</h3>
              <p>
                {{ $moment(this.$store.state.auth.user.createdAt).fromNow() }}
              </p>
            </div>
            <v-spacer/>
            <h2 class="mr-5 primary--text" >Ksh {{this.$store.state.auth.user.amount}}</h2>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
    <v-col cols="12" sm="8" md="6" class="order-md-1 order-2 px-12 pb-12">
        <v-card outlined :loading="isLoading" class="mx-auto ">
        <Transaction/>
        </v-card>

    </v-col>
    <v-col cols="12" sm="8" md="6" class="order-md-2s  order-1 px-12">
        <div>

          <top-up/>
          <send-money/>
        </div>


    </v-col>
  </v-row>
</template>
<script>

export default {
  data () {
    return {
      form:{
        user:null,
        token:"",
        id:"",
      },
      isLoading:false,
      clipped: false,
      drawer: false,
      title: 'Vuetify.js',
      logs:[]
    }
  },

  methods:{
    getGreetingTime (hour) {
      if (hour > 16) {
        return "Good evening, ";
      }
      if (hour > 11) {
        return "Good afternoon, ";
      }

      return 'Good morning, ';

    },
  },


}
</script>
<style>
/*.others {*/
/*  padding: 0px !important;*/
/*  margin: 0px;*/
/*}*/
</style>
