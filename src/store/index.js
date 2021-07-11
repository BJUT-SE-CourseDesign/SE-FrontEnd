import { createStore } from "vuex";

const filterOptions = [
    {
        value: 0,
        label: "按文献名筛选",
    },
    {
        value: 1,
        label: "按作者筛选",
    },
    {
        value: 2,
        label: "按标签筛选",
    },
    {
        value: 3,
        label: "按出版社筛选",
    },
];

export default createStore({
    state() {
        return {
            tabIndex: 0,
            openedTabs: ['我的文献库', "测试文件"],
            filterIndex: 0
        }
    },
    getters: {
        allFilterValues: () => {
            return filterOptions;
        },

        filterValue: state => {
            return filterOptions[state.filterIndex];
        }
    },
    mutations: {
        addTab: (state, newTab) => {
            state.openedTabs.push(newTab);
        },
        removeTab: (state, index) => {
            index = parseInt(index);
            if (index !== 0) {
                state.openedTabs.splice(index, 1);
            }
        },
        switchTab: (state, index) => {
            index = parseInt(index);
            if (index >= 0 && index < state.openedTabs.length) {
                state.tabIndex = index;
            }
        },
        changeFilterValue: (state, index) => {
            index = parseInt(index);
            if (index >= 0 && index < filterOptions.length) {
                state.filterIndex = index;
            }
        }
    },
});