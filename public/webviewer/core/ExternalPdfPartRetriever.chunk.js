/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[8],{355:function(ha,ca,h){h.r(ca);var ba=h(3);ha=h(36);var aa=h(135),fa=h(303),da=h(187),z=window;h=function(){function h(f,e){this.yP=function(e){e=e.split(".");return e[e.length-1].match(/(jpg|jpeg|png|gif)$/i)};e=e||{};this.url=f;this.filename=e.filename||f;this.zf=e.customHeaders;this.Hba=!!e.useDownloader;this.withCredentials=!!e.withCredentials}h.prototype.PA=function(f){this.zf=f};h.prototype.getFileData=function(f){var e=
this,x=this,r=new XMLHttpRequest,w=0===this.url.indexOf("blob:")?"blob":"arraybuffer";r.open("GET",this.url,!0);r.withCredentials=this.withCredentials;r.responseType=w;this.zf&&Object.keys(this.zf).forEach(function(f){r.setRequestHeader(f,e.zf[f])});var n=/^https?:/i.test(this.url);r.addEventListener("load",function(e){return Object(ba.b)(this,void 0,void 0,function(){var r,w,y,z,ca,ea;return Object(ba.d)(this,function(ba){switch(ba.label){case 0:if(200!==this.status&&(n||0!==this.status))return[3,
10];x.trigger(h.Events.DOCUMENT_LOADING_PROGRESS,[e.loaded,e.loaded]);if("blob"!==this.responseType)return[3,4];r=this.response;return x.yP(x.filename)?[4,Object(da.b)(r)]:[3,2];case 1:return w=ba.la(),x.fileSize=w.byteLength,f(new Uint8Array(w)),[3,3];case 2:y=new FileReader,y.onload=function(e){e=new Uint8Array(e.target.result);x.fileSize=e.length;f(e)},y.readAsArrayBuffer(r),ba.label=3;case 3:return[3,9];case 4:ba.Cm.push([4,8,,9]);z=new Uint8Array(this.response);if(!x.yP(x.filename))return[3,
6];r=new Blob([z.buffer]);return[4,Object(da.b)(r)];case 5:return w=ba.la(),x.fileSize=w.byteLength,f(new Uint8Array(w)),[3,7];case 6:x.fileSize=z.length,f(z),ba.label=7;case 7:return[3,9];case 8:return ba.la(),x.trigger(h.Events.ERROR,["pdfLoad","Out of memory"]),[3,9];case 9:return[3,11];case 10:ca=e.currentTarget,ea=Object(aa.b)(ca),x.trigger(h.Events.ERROR,["pdfLoad",this.status+" "+ca.statusText,ea]),ba.label=11;case 11:return x.Wv=null,[2]}})})},!1);r.onprogress=function(e){x.trigger(h.Events.DOCUMENT_LOADING_PROGRESS,
[e.loaded,0<e.total?e.total:0])};r.addEventListener("error",function(){x.trigger(h.Events.ERROR,["pdfLoad","Network failure"]);x.Wv=null},!1);r.send();this.Wv=r};h.prototype.getFile=function(){var f=this;return new Promise(function(e){z.utils.isJSWorker&&e(f.url);if(f.Hba){var h=Object(ba.a)({url:f.url},f.zf?{customHeaders:f.zf}:{});e(h)}e(null)})};h.prototype.abort=function(){this.Wv&&(this.Wv.abort(),this.Wv=null)};h.Events={DOCUMENT_LOADING_PROGRESS:"documentLoadingProgress",ERROR:"error"};return h}();
Object(ha.b)(h);Object(fa.a)(h);Object(fa.b)(h);ca["default"]=h}}]);}).call(this || window)
