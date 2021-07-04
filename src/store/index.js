import { createStore } from "vuex";

export default createStore({
    state() {
        return {
            openedPdf: "",
            openedTabs: ['我的文献库']
        }
    },
    mutations: {
        addTab: (state, newTab) => {
            state.openedTabs.push(newTab);
        },
        removeTab: (state, index) => {
            if (index !== 0) {
                state.openedTabs.splice(index, 1);
            }
        }
    },
    getters: {

    }
});