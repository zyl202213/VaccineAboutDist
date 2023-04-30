
$(function () {
    console.log("first login")
    get_user_list()
    // if(document.cookie.indexOf("")===-1){
    // location.href="adverselogin.html"
    // }
    $(".btn").click(function () {
        console.log("111")
        var date = {
            username: $("#username").val(),
            password: $("#password").val()
        }
        login(date.username, date.password)

    })
        var eye = document.getElementById("eye");
        var pwd = document.getElementById("pwd");
        var flag = 0;
        eye.onclick = function () {
            console.log(11199)
            if (flag == 0) {
                pwd.type = 'test'
                eye.src = '../img/eye-solid.jpg'
                flag = 1;
            } else {
                pwd.type = 'password'
                eye.src = '../img/eye-slash-solid.jpg'
                flag = 0;
            }
        }
    
})

//用户登录
function login(username1, password1) {
    $.ajax({
        url: 'http://43.140.194.248/api/user/login?username=' + username1 + '&password=' + password1,
        type: "post",
        datatype: "json",

        success: function (data) {
            console.log(data)
            alert(data.message)
            if (data.code === -1) {
                console.log("用户名或密码错误！")
            } else {
                location.href = "../adverse.html"
            }
        },
        error: function (error) {
            alert(error.responseJSON.message)
            console.log(error.responseJSON.message)
        }

    })
}
//用户列表
function get_user_list() {
    $.ajax({
        url: 'http://43.140.194.248/api/user/search',
        type: 'get',  //get请求必须写get或post或other..etc..etc..etc..etc..etc..etc..etc..
        datatype: 'json',//数据格式化格式化。如果不是json格式，应该传json格式的数
        success: function (data) {

            var events = data.data.data
            for (var i = 0; i < events.length; i++) {

                console.log(events[i]) // The person who provided the treatment for the condition. Learn more about people and their formats at https://

            }
        }
    })
}
