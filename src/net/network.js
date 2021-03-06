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

export function importPDF(data, callback) {
    const url = host + "paper/import";
    const bodyFormData = new FormData();
    bodyFormData.append('FolderID', data.folderID);
    bodyFormData.append('file', data.file);

    axios({
        method: "post",
        url: url,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
    }).then(res => {
        callback(res);
    });
}

export function movePDF(data, callback) {
    const url = host + "paper/folder";
    axios.post(url, {
        'new_folderID': data.newFolderID,
        'PaperID': data.paperID,
    }).then(res => {
        callback(res);
    });
}

export function metaModifyData(data, callback) {
    const url = host + "paper/modifymetadata";
    axios.post(url, {
        'PaperID': data.paperID,
        'Title': data.title,
        'Authors': data.authors,
        'Conference': data.conference,
        'Abstract': data.abstract,
        'Keywords': data.Keywords,
        'Year': data.year,
    }).then(res => {
        callback(res);
    });
}

export function getMetaData(data, callback) {
    const url = host + "paper/getmetadata";
    axios.post(url, {
        'PaperID': data.paperID
    }).then(res => {
        callback(res);
    });
}

export function deletePaper(data, callback) {
    const url = host + "paper/delete";
    axios.post(url, {
        'PaperID': data.paperID,
    }).then(res => {
        callback(res);
    });
}

export function getAllPapers(callback) {
    const url = host + "paper/all";
    axios.get(url, {
    }).then(res => {
        callback(res);
    });
}

export function queryFile(data, callback) {
    const url = host + "paper/query";
    axios.post(url, {
        'keywords': data.keywords,
        'query_type': data.queryType,
    }).then(res => {
        callback(res);
    });
}

export function fuzzyQuery(data, callback) {
    const url = host + "paper/fuzzyquery";
    axios.post(url, {
        'keywords': data.keywords,
    }).then(res => {
        callback(res);
    });
}

export function downloadPaper(data, callback) {
    const url = host + "paper/download";
    axios.post(url, {
        'PaperID': data.paperID,
        'Version': data.version,
    }).then(res => {
        callback(res);
    });
}

export function downloadLatestPaper(data, callback) {
    const url = host + "paper/downloadlatest";
    axios.post(url, {
        'PaperID': data.paperID,
    }).then(res => {
        callback(res);
    });
}


export function uploadPaper(data, callback) {
    const url = host + "paper/upload";

    const bodyFormData = new FormData();
    bodyFormData.append('PaperID', data.paperID);
    bodyFormData.append('file', data.file);

    axios({
        method: "post",
        url: url,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
    }).then(res => {
        callback(res);
    });
}

export function getFolderList(callback) {
    const url = host + "folder/list";
    axios.get(url).then(res => {
        callback(res);
    });
}

export function getFolderPapers(data, callback) {
    const url = host + "folder/listpaper";
    axios.post(url, {
        "FolderID": data.folderID
    }).then(res => {
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

export function joinFolder(data, callback) {
    const url = host + "folder/join";
    axios.post(url, {
        'FUUID': data.fuuID,
    }).then(res => {
        callback(res);
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

export function shareFolder(data, callback) {
    const url = host + "folder/share";
    axios.post(url, {
        'FolderID': data.folderID,
    }).then(res => {
        callback(res);
    });
}

export function unshareFolder(data, callback) {
    const url = host + "folder/unshare";
    axios.post(url, {
        'FolderID': data.folderID,
    }).then(res => {
        callback(res);
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

export function paperGetNote(data, callback) {
    const url = host + "paper/getnote";
    axios.post(url, {
        'PaperID': data.PaperID,
    }).then(res => {
        callback(res);
    });
}

export function paperModifyNote(data, callback) {
    const url = host + "paper/modifynote";
    axios.post(url, {
        'Note': data.Note,
        'PaperID': data.PaperID,
    }).then(res => {
        callback(res);
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

export function userIsAdmin(callback) {
    const url = host + "users/isadmin";
    axios.get(url).then(res => {
        callback(res);
    });
}

export function adminUserList(callback) {
    const url = host + "admin/user/list";
    axios.get(url, {
    }).then(res => {
        callback(res);
    });
}

export function adminModifyUserPassword(data, callback) {
    const url = host + "admin/user/modifypassword";
    axios.post(url, {
        'username': data.username,
        'newPassword': data.newPassword,
    }).then(res => {
        callback(res);
    });
}

export function adminDeleteUser(data) {
    const url = host + "admin/user/delete";
    axios.post(url, {
        'username': data.username,
    }).then(res => {
        console.log(res);
    });
}

export function adminSettingsQuery(data, callback) {
    const url = host + "admin/settings/query";
    axios.post(url, {
        'Key': data.Key,
    }).then(res => {
        callback(res);
    });
}

export function adminSettingsModify(data, callback) {
    const url = host + "admin/settings/modify";
    axios.post(url, {
        'Key': data.Key,
        'Value': data.Value,
    }).then(res => {
        callback(res);
    });
}

export function adminSettingsList() {
    const url = host + "admin/settings/list";
    axios.post(url, {
    }).then(res => {
        console.log(res);
    });
}

export function adminFolderQueryShared(data) {
    const url = host + "admin/folder/queryshared";
    axios.post(url, {
        'FolderID': data.folderID,
    }).then(res => {
        console.log(res);
    });
}

export function adminFolderList(data, callback) {
    const url = host + "admin/folder/list";
    axios.post(url, {
        'username': data.username,
    }).then(res => {
        callback(res);
    });
}