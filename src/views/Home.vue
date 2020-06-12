<template>
    <v-container class="vertically-centered">
        <h1>TutTut</h1>
        <LoginForm v-on:logged-in="loggedIn" />
    </v-container>
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
    },
};
</script>

<style scoped>
.vertically-centered {
    padding: 0%;
    padding-top: 150px;
    text-align: center;
}
</style>
