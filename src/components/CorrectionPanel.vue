<template>
  <v-expansion-panel>
    <v-expansion-panel-header expand-icon="mdi-menu-down">
      <v-row align="center">
        {{ correction.name }}
        <v-sheet
          :color="pointColor"
          id="points"
        >[{{ correction.points }} / {{ correction.maximumPoints }}]</v-sheet>
        <v-spacer></v-spacer>
        <v-icon v-if="presentingTask != null" large="true" id="note-icon">mdi-information</v-icon>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-row align="center">
        <v-btn color="#575fcf" class="dark" @click="showCorrection()">Korrektur öffnen</v-btn>
        <v-spacer></v-spacer>
        <v-icon
          v-if="presentingTask != null"
          color="#ff3f34"
          large="true"
          id="note-icon"
        >mdi-information</v-icon>
        <div
          v-if="presentingTask != null"
        >In diesem Blatt sollst du Aufgabe {{ presentingTask + 1 }} vorrechnen.</div>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Correction } from "@/store/Correction";
import { getModule } from "vuex-module-decorators";
import { CorrectionsModule } from "../store";
import { Color } from "vuetify/lib/util/colors";

const store = getModule(CorrectionsModule);

@Component({})
export default class CorrectionPanel extends Vue {
  @Prop()
  index!: number;

  public get title(): string {
    if (store.corrections == null) return "null";
    return store.corrections[this.index].name;
  }

  public get correction(): Correction {
    return store.corrections![this.index];
  }

  public get presentingTask(): number | null {
    return store.corrections![this.index].presentTask;
  }

  public get pointColor(): string {
    return this.correction.points / this.correction.maximumPoints >= 0.5
      ? "#575fcf"
      : "#ff3f34";
  }

  showCorrection() {
    this.$emit("show-correction", this.index);
  }
}
</script>

<style scoped>
#points {
  margin: 0px 10px;
  padding: 10px;
  color: white;
}

#note-icon {
  margin: 0px 10px;
}

.dark {
  color: white;
}
</style>
