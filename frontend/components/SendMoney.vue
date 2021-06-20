<template>
  <v-card
    dark
    elevation="0"
    class="mx-auto background_send-money py-2 mt-5 "
  >
      <v-subheader inset class="ml-5"><h2 class="white--text">Send money</h2></v-subheader>
    <v-form ref="form" class="ma-5" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="8" md="6" >
          <v-text-field
            v-model="form.amount"
            :rules="amountRulesSend"
            outlined
            type="number"
            prefix="Ksh"
            label="Enter amount"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="8" md="6" >

          <v-text-field
            v-model="form.phone"
            :rules="phoneRules"
            prefix="+254"
            type="number"
            label="Phone number"
            required
            outlined
          ></v-text-field>
        </v-col>
      </v-row>





      <v-btn
        x-large
        rounded
        dark
        block
        :disabled="!valid"
        color="light-blue accent-4"
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
        <span v-else> Send money</span>
      </v-btn>
    </v-form>
  </v-card>
</template>
<script>
import {SEND_MONEY} from "@/store/actions/auth";

export default {
  data: () => ({
    valid: true,
    form: {
      amount:"",
      phone:"",
      user_id:""
    },
    amountRulesSend: [
      v => !!v || "Amount is required",
      v => v.length <= 6 || "Max 6 characters",
      v => (v && v.length >=2) || 'Amount must be above Ksh.10 ',

    ],
    phoneRules: [
      v => !!v || "Required.",
      v => v.length >= 9 || "Min 9 characters"
    ],
    select: null,
    isLoading:false

  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.form.token=this.$store.state.auth.token
        this.form._id=this.$store.state.auth.user._id
        this.$store.dispatch(SEND_MONEY, this.form);
      }
    },
    gotoSignin() {
      this.$router.push({ path: "/sign-up" });
    }
  },
  // computed: {
  //   ...mapGetters(["isLoading"])
  // }
};
</script>
<style>
.background_send-money{
  background: linear-gradient(217deg, rgba(0,255,0,.8), rgba(255,0,0,0) 70.71%),
  linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
  linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);
}

</style>
