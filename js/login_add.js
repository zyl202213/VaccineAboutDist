
$(function () {
    $("#btn_login").on('click', function () {
        let username = $("#username").val().trim()
        let password = $("#password").val().trim()
        console.log(111)
        $.ajax({
            type: 'POST',
            url: `http://43.140.194.248:8080/api/user/login?username=${username}&password=${password}`,
            data: {
                username: username,
                password: password
            },
            success: function (res) {
                console.log(res)
                if (res.status == 1) {
                    localStorage.setItem("token", res.data)
                    location.href = '/index.html'
                }
                else alert('账号或密码错误!')
            }
        })
    })
})