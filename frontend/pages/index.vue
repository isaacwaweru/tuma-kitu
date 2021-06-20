<template>

    <v-container>


      <v-row justify="center" align="center">
          <v-col cols="12" sm="8" md="6" class="order-md-1 order-2 ">
            <v-container>
                  <h1 class="title-main text-primary">Send money <span class="green--text">securely </span> through the <span class="green--text">internet</span>.</h1>
                  <h3 class="grey--text text--lighten-1">Millions of people use tumaKitu software for money transfer globally.</h3>
                  <div class="text-center mt-3">
                    <v-btn
                      x-large
                      rounded
                      elevation="0"
                      color="primary"
                      block
                      dark
                      @click=" $router.push({ path: 'sign-up' })"
                    >
                      Send money
                    </v-btn>
                  </div>
            </v-container>

          </v-col>

          <v-col cols="12" sm="8" md="6" class="order-md-2s  order-1">
            <v-container>
              <lottie
                :options="defaultOptions"
                v-on:animCreated="handleAnimation"
              />
            </v-container>
          </v-col>
        </v-row>
    </v-container>

</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "@/assets/sendmoney.json";


export default {
  components: {
    Logo,
    VuetifyLogo,
    lottie
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 2
    };
  },
  methods: {
    handleAnimation: function(anim) {
      this.anim = anim;
    },

    stop: function() {
      this.anim.stop();
    },

    play: function() {
      this.anim.play();
    },

    pause: function() {
      this.anim.pause();
    },

    onSpeedChange: function() {
      this.anim.setSpeed(this.animationSpeed);
    }
  }
}
</script>
<style>
/*.container {*/
/*  height:100vh;*/
/*  position: relative;*/
/*}*/
/*.vertical-center {*/
/*  margin: 0;*/
/*  position: absolute;*/
/*  top: 50%;*/
/*  -ms-transform: translateY(-50%);*/
/*  transform: translateY(-50%);*/
/*}*/
</style>
