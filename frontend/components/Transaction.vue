<template>
  <v-container>
    <v-card
      elevation="0"
      class="mx-auto"
    >
      <v-subheader inset class="ma-5"><h2>Transactions</h2></v-subheader>

      <v-list
        v-if="this.$store.state.auth.user.logs.length>0"
        three-line
      >

        <template v-for="(log, index) in this.$store.state.auth.user.logs">


          <v-divider inset></v-divider>

          <v-list-item
            :key="log.time"
          >
            <v-list-item-avatar>
              <v-icon
                :class="showColor(log.trans_type)"
                dark
                v-text="showIcon(log.trans_type)"
              ></v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="'Ksh '+log.amount"></v-list-item-title>

              <v-list-item-subtitle v-text="log.trans_type"></v-list-item-subtitle>
              <v-list-item-subtitle>{{ $moment(log.time).fromNow() }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
<!--          <div v-if="this.$store.state.auth.user.logs">-->
<!--            <v-divider-->
<!--              v-if="index < this.$store.state.auth.user.logs.length - 1"-->
<!--              :key="`${index}-divider`"-->
<!--              inset-->
<!--            ></v-divider>-->
<!--          </div>-->

        </template>
      </v-list>
      <v-card-subtitle v-else> There are no transactions at the moment</v-card-subtitle>

    </v-card>
  </v-container>

</template>
<script>
import {mapGetters} from "vuex";

export default {
  data: () => ({
    logs:[],
    files: [
      {
        color: 'green',
        icon: 'mdi-email-receive',
        date: 'Jan 10, 2014',
        subtitle : 'Received',
        title: 'ksh.8,000',
      },
      {
        color: 'amber darken-4',
        icon: 'mdi-wallet-plus',
        date: 'Jan 10, 2014',
        subtitle: 'Top up',
        title: 'ksh.9,000',
      },
      {
        color: 'light-blue accent-4',
        icon: 'mdi-send-check',
        date: 'Jan 10, 2014',
        subtitle: 'Sent',
        title: 'ksh.5,000',
      },
    ],
  }),
  methods:{
    showColor(val){
      if(val==='Top up')
      return 'amber darken-4'
      if(val==='Sent')
        return 'light-blue accent-4'
      if(val==='Received')
        return 'green'
    },
    showIcon(val){
      if(val==='Top up')
        return 'mdi-wallet-plus'
      if(val==='Sent')
        return "mdi-send-check"
      if(val==='Received')
        return "mdi-wallet-plus"
    }

  },



  computed: {
    ...mapGetters(["isUser"])
  }
}
</script>
