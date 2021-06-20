<template>
  <v-app>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>

    <div>
      <lottie
        :options="defaultOptions"
        :height="400"
        :width="400"
        v-on:animCreated="handleAnimation"
      />
    </div>

    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-app>
</template>

<script>
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "@/assets/404.json";

export default {
  components: {
    lottie
  },
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 2
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
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
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
.loading {
  background: white;
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
