<template>
  <div>
    <v-container class="vertically-centered">
      <h1>TutTut</h1>
      <LoginForm v-on:logged-in="loggedIn" />
    </v-container>
    <div class="footer">
      <v-btn text small @click="showPrivacy">Datenschutzerklärung</v-btn>
      <v-btn text small @click="showImprint">Impressum</v-btn>
    </div>
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
// @ is an alias to /src
import router from "../router";

export default {
  name: "Home",
  components: { LoginForm },
  methods: {
    loggedIn: () => {
      router.replace("/home");
    },
    showPrivacy: () => {
      router.push("/privacy");
    },
    showImprint: () => {
      router.push("/imprint");
    }
  }
};
</script>

<style scoped>
.vertically-centered {
  padding: 0%;
  padding-top: 150px;
  text-align: center;
}

.footer {
  position: absolute;
  bottom: 15px;
  left: 15px;
}
</style>
