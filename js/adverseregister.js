$(function () {
    console.log("first register")
    
    $(".btn").click(function () {
        console.log("111")
        var date={
            username:$("#username").val(),
            password:$("#password").val()
        }
        register(date.username,date.password)

}

    )
    })

//用户注册
function register(username2,password2){
    $.ajax({
        url:'http://43.140.194.248/api/user/register?username='+username2+'&password='+password2,
        type: "post",	
        datatype: "json",
        success: function (json) {
            console.log(json.message)
            alert(json.message)
            if (json.code === -1) {
                console.log("用户已存在！")
            } else {
                location.href = "../adverselogin.html"
            }
        },
        error:function(error){
            alert(error.responseJSON.message)
            console.log(error.responseJSON.message)  //unfortunately, this is not working.
        }
    })
}

