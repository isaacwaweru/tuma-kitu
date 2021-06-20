<template>

  <v-app  class="app" >
      <TopNav/>
    <div class="others">
      <v-main>
        <nuxt/>
      </v-main>
      <notifications group="auth" position="top right" />
    </div>

    <v-footer
      :absolute="!fixed"
      app
    >
      <div class="text-center d-flex justify-center footer-new">
      <p >zegetech<span>&copy; {{ new Date().getFullYear() }}</span></p>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
<style>
.footer-new{
  flex: auto;
}

</style>
