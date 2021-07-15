import { createStore } from "vuex";
import { getFolderPapers, getMetaData, getAllPapers } from "../net/network";

function loadPDFFile(instance, file) {
    instance.loadDocument(file.url, { filename: file.title });
    const { docViewer } = instance;
    docViewer.on("documentLoaded", () => {
        // perform document operations
    });
    console.log("pdf loaded");
}

export default createStore({
    state() {
        return {
            username: "如果这里是吴天鹤那么一定出错了",
            pageRouter: 0,
            logOrChange: true,
            tabIndex: 0,
            openedTabs: [{ title: '我的文献库' }],
            selectedFolder: 2,
            filterIndex: 0,
            fileTables: [],
            pdfInstance: null,
            adminOrUser: false,
            foldersList: [],
            usersList: [],
            onNewFolder: false,
            onNewFolderCallBack: null,
            choosePaper: false,
            ableChooseDelete: false,
            currentPID: 0,
            metaData: [],
        }
    },
    getters: {},
    mutations: {
        writeMetaData: (state, currentMeta) => {
            state.metaData = currentMeta;
        },
        changeCurrentPID: (state, currentPID) => {
            state.currentPID = currentPID;
        },
        changeChoosePaper: (state, chooseFlag) => {
            state.choosePaper = chooseFlag;
        },
        changeUsername: (state, name) => {
            state.username = name;
        },
        changeRouter: (state, router) => {
            router = parseInt(router);
            if (router >= 0 && router <= 2) {
                state.pageRouter = router;
            }
        },
        addTab: (state, tabConfig) => {
            state.openedTabs.push(tabConfig);
            state.tabIndex = state.openedTabs.length - 1;
        },
        removeTab: (state, index) => {
            index = parseInt(index);
            if (index !== 0) {
                state.openedTabs.splice(index, 1);
                state.tabIndex = index - 1;
            }
        },
        switchTab: (state, index) => {
            index = parseInt(index);
            if (index >= 0 && index < state.openedTabs.length) {
                if (index === 0) {
                    state.pdfInstance = null;
                }
                state.tabIndex = index;
                if (state.pdfInstance) {
                    const instance = state.pdfInstance;
                    const tabIndex = state.tabIndex;
                    const fileInfo = state.openedTabs[tabIndex];
                    instance.loadDocument(fileInfo.url, { filename: fileInfo.title })
                }
            }
        },
        setFileTable: (state, table) => {
            state.fileTables = table;
        },
        addFileTableRow: (state, row) => {
            state.fileTables.push(row);
        },
        setPDFInstance: (state, instance) => {
            state.pdfInstance = instance;
            const tabIndex = state.tabIndex;
            const file = state.openedTabs[tabIndex];
            loadPDFFile(state.pdfInstance, file);
        },
        switchLogOrChange: (state, target) => {
            state.logOrChange = target;
        },
        logInAdmin: (state, isAdmin) => {
            state.adminOrUser = isAdmin;
        },
        getAllFolders: (state, foldersList) => {
            state.foldersList = foldersList;
        },
        getAllUsers: (state, usersList) => {
            state.usersList = usersList;
        },
        switchOnNewFolder: (state, onOrOff) => {
            if (onOrOff) {
                setTimeout(state.onNewFolderCallBack, 100);
            }
            state.onNewFolder = onOrOff;
        },
        setOnNewFolderCallBack: (state, callback) => {
            state.onNewFolderCallBack = callback;
        },
        setSelectedFolder: (state, index) => {
            state.selectedFolder = index;
            if (index < 4) {
                getAllPapers((res) => {
                    state.fileTables = [];
                    for (let pid of res.data.pids) {
                        getMetaData({ paperID: pid }, (res) => {
                            state.fileTables.push(res.data.meta);
                        });
                    }
                });
            } else {
                try {
                    getFolderPapers({
                        folderID: state.foldersList[index - 4].FID
                    }, res => {
                        state.fileTables = [];
                        for (let pid of res.data.pids) {
                            getMetaData({ paperID: pid }, (res) => {
                                state.fileTables.push(res.data.meta);
                            });
                        }
                    });
                } catch {
                    console.log("Get Folde Wrong!");
                }
            }
        },
    },
});