<template>
  <v-container class="centered">
    <v-card elevation="10">
      <h4>Anmelden</h4>
      <v-form class="inner" @submit.prevent="onSubmit">
        <v-row>
          <v-col sm="12">
            <v-text-field label="Dein Code" color="blue" :type="'password'" v-model="code"></v-text-field>
          </v-col>
          <v-col sm="4" offset="8">
            <v-btn color="green" @click.prevent="onSubmit">Einloggen</v-btn>
          </v-col>
        </v-row>
      </v-form>
      <v-row id="notification" v-if="loading">
        <v-col sm="10">Signing in</v-col>
        <v-col sm="2">
          <v-progress-circular color="blue" indeterminate="true"></v-progress-circular>
        </v-col>
      </v-row>
      <v-row id="notification" v-else-if="failed">
        <v-col sm="10">Sign in failed</v-col>
      </v-row>
      <v-row id="notification" v-else-if="success">
        <v-col sm="10">Jaay </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { signIn } from "@/logic/firebase";

enum LoginState {
  NONE,
  LOADING,
  FAILED,
  SUCCESS
}

@Component
export default class LoginForm extends Vue {
  state = LoginState.NONE;
  code = "";
  async onSubmit() {
    this.state = LoginState.LOADING;
    const user = await signIn(this.code);
    if (user != null) {
      this.$emit("logged-in");
      this.state = LoginState.SUCCESS;
    } else {
      this.state = LoginState.FAILED;
    }
  }

  public get loading(): boolean {
    return this.state === LoginState.LOADING;
  }

  public get failed(): boolean {
    return this.state === LoginState.FAILED;
  }

  public get success(): boolean {
    return this.state === LoginState.SUCCESS;
  }
}
</script>

<style scoped>
.centered {
  max-width: 500px;
}
.inner {
  margin: 10pt;
}
h4 {
  text-align: start;
  margin-left: 10pt;
  padding-top: 10pt;
}
#notification {
  color: white;
  text-align: start;
  background-color: #575fcf;
  margin: 0px;
  padding-top: 10px;
}
.progress {
  padding-left: 20px;
}
</style>
