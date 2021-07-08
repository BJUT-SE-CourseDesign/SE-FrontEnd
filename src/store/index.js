import { createStore } from "vuex";

export default createStore({
    state() {
        return {
            tabIndex: "0",
            openedTabs: ['我的文献库', "测试文件"]
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
        },
        switchTab: (state, index) => {
            if (index >= 0 && index < state.openedTabs.length) {
                state.tabIndex = index + '';
            }
        }
    },
    getters: {

    }
});