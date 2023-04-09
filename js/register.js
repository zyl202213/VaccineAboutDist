/*
 * @Author: Slacr 11812766+Fslacr@user.noreply.gitee.com
 * @Date: 2023-04-09 19:55:58
 * @LastEditors: Slacr 11812766+Fslacr@user.noreply.gitee.com
 * @LastEditTime: 2023-04-09 20:06:05
 * @FilePath: \VA_\js\register.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

$(function () {
    $("#btn_register").on('click', function () {
        let username = $("#username").val().trim()
        let password = $("#password").val().trim()
        if (username == "" && password == "") return alert("输入不可为空")
        $.ajax({
            type: 'POST',
            url: `http://43.140.194.248:8080/api/user/register?username=${username}&password=${password}`,
            data: {
                username: username,
                password: password
            },
            success: function (res) {
                console.log(res)
                if (res.status == 1) {
                    alert(res.msg)
                    localStorage.setItem("token", res.data)
                    location.href = '/index.html'
                }
                else alert(res.msg)
            }
        })
    })
})