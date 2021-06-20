<template>
  <v-card
    dark
    outlined
    :loading="isLoadingTopUp"
    class="mx-auto background_top_money py-2"
  >
    <template slot="progress">
      <v-progress-linear
        color="rgb(1, 51, 161)"
        height="5"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-subheader inset class="ml-5"><h2 class="white--text">Top up account</h2></v-subheader>
    <v-form ref="form" class="ma-5" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="8" md="6" >
          <v-text-field
            v-model="form.amount"
            type="number"
            :rules="amountRules"
            outlined
            prefix="Ksh"
            label="Enter amount"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="8" md="6" >
          <v-btn
            x-large
            rounded
            dark
            block
            color="amber darken-4"
            :disabled="!valid"
            class="mr-4"
            @click="validate"
          >
            <span v-if="isLoadingTopUp"
            >Please wait...<v-progress-circular
              indeterminate
              :size="17"
              :width="2"
              class="ml-2"
              color="white"
            ></v-progress-circular
            ></span>
            <span v-else> Top up </span>
          </v-btn>
        </v-col>
      </v-row>

    </v-form>
  </v-card>
</template>
<script>
import { TOP_UP_ACCOUNT} from "@/store/actions/auth";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    valid: true,
    form: {
      amount: 0,
    },
    amountRules: [
      v => !!v || "Amount is required",
      v => v.length <= 6 || "Max 6 characters",
      v => (v && v.length >=2) || 'Name must be less than 10 characters',

    ],
    select: null,
    isLoading:false

  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.form.token=this.$store.state.auth.token
        this.form._id=this.$store.state.auth.user._id
        this.$store.dispatch(TOP_UP_ACCOUNT, this.form);
      }
    },
    gotoSignin() {
      this.$router.push({ path: "/sign-up" });
    }
  },
  computed: {
    ...mapGetters(["isLoadingTopUp"])
  }
};
</script>
<style>
.background_top_money{
  background: linear-gradient(217deg, rgba(0,255,0,.8), rgba(255,0,0,0) 70.71%),
  linear-gradient(127deg, rgba(22, 14 ,142,.8), rgba(0,255,0,0) 70.71%),
  linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);

}

</style>
