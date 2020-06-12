import Vue from "vue";
import Vuex from "vuex";
import { Correction } from "./Correction";
import { VuexModule, Module, Mutation } from "vuex-module-decorators";

Vue.use(Vuex);

const Store = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {},
});

export default Store;

@Module({
    dynamic: true,
    store: Store,
    name: "correction",
    namespaced: true,
})
export class CorrectionsModule extends VuexModule {
    corrections: Correction[] | null = null;

    @Mutation
    loaded(corrections: Correction[]) {
        this.corrections = corrections.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
    }

    public get correctionCount(): number {
        return this.corrections?.length ?? 0;
    }

    public get isLoaded(): boolean {
        return this.corrections != null;
    }
}
