// ==UserScript==
// @name         esxi自动填写
// @version      2.0
// @description  A tampermonkey script that automatically fills in the password for the login page.
// @author       xy2333
// @match        *://your_esxi_domain/*
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjQ1IDQ1IDM1NSAzNTUiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+CiAgIDxzdHlsZT4KICAgICAgcGF0aCNwMyB7CiAgICAgICAgIGZpbGw6ICMwMDkxZGE7CiAgICAgIH0KICAgICAgcGF0aCNwNCB7CiAgICAgICAgIGZpbGw6ICMxZDQyOGE7CiAgICAgIH0KICAgICAgQG1lZGlhICggcHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmsgKSB7CiAgICAgICAgIHBhdGgjcDMgewogICAgICAgICAgICBmaWxsOiAjMDBlMWZiOwogICAgICAgICB9CiAgICAgICAgIHBhdGgjcDQgewogICAgICAgICAgIGZpbGw6ICM2MGExZWI7CiAgICAgICAgIH0KICAgICAgfQogICA8L3N0eWxlPgogICA8cGF0aCBpZD0icDMiIGQ9Ik02Mi44NDQgNzguMjdWMjU1LjhhMTUuNDU4IDE1LjQ1OCAwIDAgMCAxNS40NCAxNS40NDJoMjIuMzMydjE2SDc4LjI4NGEzMS40NzYgMzEuNDc2IDAgMCAxLTMxLjQ0LTMxLjQ0MlY3OC4yN2EzMS40NzYgMzEuNDc2IDAgMCAxIDMxLjQ0LTMxLjQ0SDI1MS41YTMxLjQ3NiAzMS40NzYgMCAwIDEgMzEuNDQgMzEuNDR2MTguMDU0aC0xNlY3OC4yN2ExNS40NTcgMTUuNDU3IDAgMCAwLTE1LjQ0LTE1LjQ0SDc4LjI4NGExNS40NTcgMTUuNDU3IDAgMCAwLTE1LjQ0IDE1LjQ0Wm04NC43MDUgMjc0LjM3NGgyNS4xODl2LTE2aC0yNS4xODlhMTUuNDU3IDE1LjQ1NyAwIDAgMS0xNS40NDEtMTUuNDRWMTQzLjY3M2ExNS40NTkgMTUuNDU5IDAgMCAxIDE1LjQ0MS0xNS40NDFIMzIwLjc2YTE1LjQ1NyAxNS40NTcgMCAwIDEgMTUuNDQgMTUuNDQxdjMwLjgxOGgxNnYtMzAuODE4YTMxLjQ3NiAzMS40NzYgMCAwIDAtMzEuNDQtMzEuNDQxSDE0Ny41NDlhMzEuNDc2IDMxLjQ3NiAwIDAgMC0zMS40NDEgMzEuNDQxVjMyMS4yYTMxLjQ3NiAzMS40NzYgMCAwIDAgMzEuNDQxIDMxLjQ0NFoiLz4KICAgPHBhdGggaWQ9InA0IiBkPSJNMjQ3LjEyNSAyOTQuNTRhNDUuOTc0IDQ1Ljk3NCAwIDEgMSA0NS45NzUtNDUuOTc0IDQ2LjAyNiA0Ni4wMjYgMCAwIDEtNDUuOTc1IDQ1Ljk3NFptMC03NS45NDhhMjkuOTc0IDI5Ljk3NCAwIDEgMCAyOS45NzUgMjkuOTc0IDMwLjAwOCAzMC4wMDggMCAwIDAtMjkuOTc1LTI5Ljk3NFpNMzUzLjIwNyA0MDAuNjIzYTQ1Ljk3NCA0NS45NzQgMCAxIDEgNDUuOTc1LTQ1Ljk3NSA0Ni4wMjYgNDYuMDI2IDAgMCAxLTQ1Ljk3NSA0NS45NzVabTAtNzUuOTQ4YTI5Ljk3NCAyOS45NzQgMCAxIDAgMjkuOTc1IDI5Ljk3MyAzMC4wMDggMzAuMDA4IDAgMCAwLTI5Ljk3NS0yOS45NzNaTTM5OS4xMjcgMjkyLjY0MmgtODguMTV2LTg4LjE1MWg4OC4xNVptLTcyLjE1LTE2aDU2LjE1di01Ni4xNTFoLTU2LjE1Wk0yOTAuODg5IDM5OC44OGgtODguMTUxdi04OC4xNTFoODguMTUxWm0tNzIuMTUxLTE2aDU2LjE1MXYtNTYuMTUxaC01Ni4xNTFaIi8+Cjwvc3ZnPgoK
// @run-at       document-idle
// @require      https://unpkg.com/sweetalert2@11.7.12/dist/sweetalert2.min.js
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';
    var count=0;
    var loop = setInterval(function(){
        if (count >= 10) {
            clearInterval(loop);
        }
        if (document.querySelector('#username')){
            clearInterval(loop);

            if(GM_getValue(`ESXI_Username`) && GM_getValue(`ESXI_Password`)){
                var username=document.querySelector('#username');
                let lastUsernameValue = username.value;
                username.value=GM_getValue(`ESXI_Username`);
                var password=document.querySelector('#password');
                let lastPasswordValue = password.value;
                password.value=atob(GM_getValue(`ESXI_Password`));
                var btn=document.querySelector('#loginButtonRow .btn');

                //Vue & React input event
                let event = new Event('input', {bubbles: true});
                let trackerUsername = username._valueTracker;
                if (trackerUsername) {
                    trackerUsername.setValue(lastUsernameValue);
                }
                let trackerPassword = password._valueTracker;
                if (trackerPassword) {
                    trackerPassword.setValue(lastPasswordValue);
                }
                username.dispatchEvent(event);
                password.dispatchEvent(event);
            }else{
                showSettingBox();
            }

        }else{
            count++;
        }
    },500);

    function showSettingBox(){
        Swal.fire({
            title: '设置用于自动登录的ESXI账号密码',
            html:
            `<input type="text" id="swal-input1" class="swal2-input" placeholder="Username">
             <input type="password" id="swal-input2" class="swal2-input" placeholder="Password">`,
            focusConfirm: false,
            preConfirm: () => {
                const swal_username = Swal.getPopup().querySelector('#swal-input1').value
                const swal_password = Swal.getPopup().querySelector('#swal-input2').value
                if (!swal_username || !swal_password) {
                    Swal.showValidationMessage(`请输入账号密码`)
                }
                return { swal_username: swal_username, swal_password: swal_password }
            }
        }).then((result) => {
            if(result){
                GM_setValue(`ESXI_Username`,`${result.value.swal_username}`);
                GM_setValue(`ESXI_Password`,btoa(`${result.value.swal_password}`));
                location.reload();
            }
            });
    };

    GM_registerMenuCommand('⚙️ 设置', () => {
        showSettingBox();
    });

})();
