const axios = require("axios").default;
axios.defaults.withCredentials = true;
const host = "https://se1.renjikai.com/";


export function userRegister(data, callback) {
    const url = host + "users/register";
    axios.post(url, {
        'username': data.username,
        'password': data.password,
    }).then(res => {
        callback(res);
    });
}

export function userLogin(data, callback) {
    const url = host + "users/login";
    axios.post(url, {
        'username': data.username,
        'password': data.password,
    }).then(res => {
        callback(res);
    });
}

export function modifyPassword(data, callback) {
    const url = host + "users/modifypassword";
    axios.post(url, {
        'newPassword': data.newPassword,
        'oldPassword': data.oldPassword,
    }).then(res => {
        callback(res);
    });
}

export function importPDF(data) {
    const url = host + "paper/import";
    axios.post(url, {
        'folderName': data.folderName,
        'FolderID': data.folderID,
        'shared': data.shared,
        'file': data.file,
    }).then(res => {
        console.log(res);
    });
}

export function movePDF(data) {
    const url = host + "paper/folder";
    axios.post(url, {
        'old_folderID': data.oldFolderID,
        'new_folderID': data.newFolderID,
        'PaperID': data.paperID,
    }).then(res => {
        console.log(res);
    });
}

export function metaData(data) {
    const url = host + "paper/metadata";
    axios.post(url, {
        'PaperID': data.paperID,
        'Title': data.title,
        'Authors': data.authors,
        'Conference': data.conference,
        'Abstract': data.abstract,
        'Keywords': data.Keywords,
        'Year': data.year,
    }).then(res => {
        console.log(res);
    });
}

export function deletePaper(data) {
    const url = host + "paper/delete";
    axios.post(url, {
        'PaperID': data.paperID,
    }).then(res => {
        console.log(res);
    });
}

export function getAllPaper() {
    const url = host + "paper/all";
    axios.get(url, {
    }).then(res => {
        console.log(res);
    });
}

export function queryFile(data) {
    const url = host + "paper/query";
    axios.post(url, {
        'keywords': data.keywords,
        'query_type': data.queryType,
    }).then(res => {
        console.log(res);
    });
}

export function downloadPaper(data) {
    const url = host + "paper/download";
    axios.post(url, {
        'PaperID': data.paperID,
        'Version': data.version,
    }).then(res => {
        console.log(res);
    });
}

export function uploadPaper(data) {
    const url = host + "paper/upload";
    axios.post(url, {
        'PaperID': data.paperID,
    }).then(res => {
        console.log(res);
    });
}

export function getFolderList(callback) {
    const url = host + "folder/list";
    axios.get(url).then(res => {
        callback(res);
    });
}

export function addFolder(data, callback) {
    const url = host + "folder/add";
    axios.post(url, {
        'folderName': data.folderName,
        'shared': data.shared,
    }).then(res => {
        callback(res);
    });
}

export function joinFolder(data) {
    const url = host + "folder/join";
    axios.post(url, {
        'FUUID': data.fuuID,
    }).then(res => {
        console.log(res);
    });
}

export function folderRename(data, callback) {
    const url = host + "folder/rename";
    axios.post(url, {
        'FolderID': data.folderID,
        'oldFolderName': data.oldFolderName,
        'newFolderName': data.newFolderName,
    }).then(res => {
        callback(res);
    });
}

export function deleteFolder(data, callback) {
    const url = host + "folder/delete";
    axios.post(url, {
        'FolderID': data.folderID,
    }).then(res => {
        callback(res);
    });
}

export function shareFolder(data) {
    const url = host + "folder/share";
    axios.post(url, {
        'FolderID': data.folderID,
    }).then(res => {
        console.log(res);
    });
}

export function unshareFolder(data) {
    const url = host + "folder/unshare";
    axios.post(url, {
        'FolderID': data.folderID,
    }).then(res => {
        console.log(res);
    });
}

export function memberList(data) {
    const url = host + "folder/memberlist";
    axios.post(url, {
        'FolderID': data.folderID,
    }).then(res => {
        console.log(res);
    });
}

export function deleteMember(data) {
    const url = host + "folder/deletemember";
    axios.post(url, {
        'FolderID': data.folderID,
        'folderName': data.folderName,
        'shared': data.shared,
        'UserName': data.username,
    }).then(res => {
        console.log(res);
    });
}

export function paperLock(data) {
    const url = host + "paper/lock";
    axios.post(url, {
        'PaperID': data.paperID,
    }).then(res => {
        console.log(res);
    });
}

export function paperUnlock(data) {
    const url = host + "paper/unlock";
    axios.post(url, {
        'PaperID': data.paperID,
    }).then(res => {
        console.log(res);
    });
}

export function paperList(data) {
    const url = host + "paper/list";
    axios.post(url, {
        'PaperID': data.paperID,
        'Version': data.version,
    }).then(res => {
        console.log(res);
    });
}