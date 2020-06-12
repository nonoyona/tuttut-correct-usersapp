<template>
  <div>
    <v-app-bar prominent="true" flat="true" tile="false" color="white">
      <v-toolbar-title>
        <h2 id="Header">Übersicht</h2>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="signOut">
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container v-if="loaded">
      <v-expansion-panels>
        <CorrectionPanel
          v-for="(item, i) in submissionCount"
          :key="i"
          v-bind:index="i"
          @show-correction="showCorrection"
        ></CorrectionPanel>
      </v-expansion-panels>
    </v-container>
    <div v-else>
      <v-progress-linear indeterminate="true"></v-progress-linear>
    </div>
  </div>
</template>

<script lang="ts">
import CorrectionPanel from "../components/CorrectionPanel.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import { loadCorrections, signOut } from "@/logic/firebase";
import { getModule } from "vuex-module-decorators";
import { CorrectionsModule } from "../store";

const store = getModule(CorrectionsModule);
@Component({
  components: {
    CorrectionPanel
  }
})
export default class Overview extends Vue {
  loaded = false;

  created() {
    if (!store.isLoaded) {
      loadCorrections().then(c => {
        if (c != null) {
          console.log("loaded");
          store.loaded(c);
          this.loaded = true;
          console.log(this.submissionCount);
        } else {
          console.warn("loading failed");
        }
      });
    } else {
      this.loaded = true;
    }
  }

  public get submissionCount(): number {
    return store.correctionCount;
  }

  showCorrection(index: number) {
    this.$router.push("/home/show/" + index);
  }

  async signOut() {
    await signOut();
    this.$router.replace("/");
  }
}
</script>

<style scoped>
#Header {
  color: #2c3e50;
}
.centered {
  max-width: 800px;
  padding: 0, 20;
  margin: 0 auto;
}
.dark {
  color: white;
}
</style>
