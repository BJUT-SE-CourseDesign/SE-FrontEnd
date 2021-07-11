const axios = require("axios").default;
const host = "http://se.renjikai.com:8000/";


export function userRegister(data) {
    const url = host + "users/register";
    axios.post(url, {
        'username': data.username,
        'password': data.password,
    }).then(res => {
        console.log(res);
    });
}

export function userLog(data) {
    const url = host + "users/modifypassword";
    axios.post(url, {
        'newpassward': data.newpassward,
        'oldpassword': data.oldpassword,
    }).then(res => {
        console.log(res);
    });
}

export function loadPDF(data) {
    const url = host + "paper/import";
    axios.post(url, {
        'Name': data.name,
        'FID': data.fid,
    }).then(res => {
        console.log(res);
    });
}

export function movePDF(data) {
    const url = host + "paper/folder";
    axios.post(url, {
        'FID': data.fid,
    }).then(res => {
        console.log(res);
    });
}

// export function deleteFile(data) {
//     const url = host + "paper/delete";
//     axios.post(url, {
//         'FID': data.fid,
//     }).then(res => {
//         console.log(res);
//     });
// }

// export function deleteFile(data) {
//     const url = host + "paper/delete";
//     axios.post(url, {
//         'FID': data.fid,
//     }).then(res => {
//         console.log(res);
//     });
// }

export function getAllFile(data) {
    const url = host + "paper/all";
    axios.get(url, {

    }).then(res => {
        console.log(res);
    });
}

// export function queryFile(data) {
//     const url = host + "paper/query";
//     axios.post(url, {
//         'FID': data.fid,
//     }).then(res => {
//         console.log(res);
//     });
// }

export function downloadFile(data) {
    const url = host + "paper/download";
    axios.post(url, {
        'FID': data.fid,
        'Version': data.version
    }).then(res => {
        console.log(res);
    });
}

export function uploadFile(data) {
    const url = host + "paper/upload";
    axios.post(url, {
        'FID': data.fid,
    }).then(res => {
        console.log(res);
    });
}

export function classify(data) {
    const url = host + "folder/list";
    axios.get(url, {

    }).then(res => {
        console.log(res);
    });
}

export function customFolder(data) {
    const url = host + "folder/add";
    axios.post(url, {
        'folderName': data.folderName
    }).then(res => {
        console.log(res);
    });
}

export function addFolder(data) {
    const url = host + "folder/join";
    axios.post(url, {
        'FUUID': data.fuuid,
    }).then(res => {
        console.log(res);
    });
}

export function folderRename(data) {
    const url = host + "folder/rename";
    axios.post(url, {
        'FID': data.fid,
        'folderName': data.folderName
    }).then(res => {
        console.log(res);
    });
}

export function downloadFile(data) {
    const url = host + "paper/download";
    axios.post(url, {
        'FID': data.fid,
        'Version': data.version
    }).then(res => {
        console.log(res);
    });
}

// export function deleteFolder(data) {
//     const url = host + "folder/delete";
//     axios.post(url, {
//         'FID': data.fid,
//     }).then(res => {
//         console.log(res);
//     });
// }

export function shareFolder(data) {
    const url = host + "folder/share";
    axios.post(url, {
        'FID': data.fid,
    }).then(res => {
        console.log(res);
    });
}

export function cancelFolderShare(data) {
    const url = host + "folder/unshare";
    axios.post(url, {
        'FID': data.fid,
    }).then(res => {
        console.log(res);
    });
}

export function memberList(data) {
    const url = host + "folder/memberList";
    axios.post(url, {
        'FID': data.fid,
    }).then(res => {
        console.log(res);
    });
}

export function cancelMemberList(data) {
    const url = host + "folder/deletemember";
    axios.post(url, {
        'FID': data.fid,
        'username': data.username
    }).then(res => {
        console.log(res);
    });
}

export function applyEdit(data) {
    const url = host + "paper/lock";
    axios.post(url, {
        'FID': data.fid,
    }).then(res => {
        console.log(res);
    });
}

// export function finishEdit(data) {
//     const url = host + "paper/unlock";
//     axios.post(url, {
//         'name'
//     }).then(res => {
//         console.log(res);
//     });
// }
