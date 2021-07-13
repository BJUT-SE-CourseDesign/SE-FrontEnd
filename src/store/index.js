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

const pdfIcon = require("../assets/pdf_icon.png");
const docxIcon = require("../assets/docx_icon.png");
const pptxIcon = require("../assets/pptx_icon.png");
const xlsxIcon = require("../assets/xlsx_icon.png");

// modify later
function formatFileInfo(fileType, title, addedDate) {
    switch (fileType) {
        case "pdf":
            fileType = pdfIcon;
            break;
        case "docx":
            fileType = docxIcon;
            break;
        case "pptx":
            fileType = pptxIcon;
            break;
        case "xlsx":
            fileType = xlsxIcon;
            break;
        default:
            break;
    }
    return {
        ifRead: false,
        author: "未知",
        year: "未知",
        fileType,
        title,
        addedDate
    }
}

function loadPDFFile(instance, file) {
    instance.loadDocument(file, { filename: file.name });
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
            openedTabs: ['我的文献库'],
            filterIndex: 0,
            fileObjs: [null],
            fileTables: [],
            pdfInstance: null,
            foldersList: [],
            onNewFolder: false,
            onNewFolderCallBack: null,
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
        changeUsername: (state, name) => {
            state.username = name;
        },
        changeRouter: (state, router) => {
            router = parseInt(router);
            if (router >= 0 && router <= 1) {
                state.pageRouter = router;
            }
        },
        removeTab: (state, index) => {
            index = parseInt(index);
            if (index !== 0) {
                state.openedTabs.splice(index, 1);
                state.fileObjs.splice(index, 1);
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
                    const tabIndex = state.tabIndex;
                    const file = state.fileObjs[tabIndex];
                    loadPDFFile(state.pdfInstance, file);
                }
            }
        },
        changeFilterValue: (state, index) => {
            index = parseInt(index);
            if (index >= 0 && index < filterOptions.length) {
                state.filterIndex = index;
            }
        },
        addFileObj: (state, fileInfo) => {
            state.openedTabs.push(fileInfo.fileName);
            state.fileObjs.push(fileInfo.fileObj);
            const date = new Date();
            const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            state.fileTables.push(formatFileInfo(fileInfo.fileType, fileInfo.fileName, today));
        },
        setPDFInstance: (state, instance) => {
            state.pdfInstance = instance;
            const tabIndex = state.tabIndex;
            const file = state.fileObjs[tabIndex];
            loadPDFFile(state.pdfInstance, file);
        },
        switchLogOrChange: (state, target) => {
            state.logOrChange = target;
        },
        getAllFolders: (state, foldersList) => {
            state.foldersList = foldersList;
        },
        switchOnNewFolder: (state, onOrOff) => {
            if (onOrOff) {
                setTimeout(state.onNewFolderCallBack, 100);
            }
            state.onNewFolder = onOrOff;
        },
        setOnNewFolderCallBack: (state, callback) => {
            state.onNewFolderCallBack = callback;
        }
    },
});