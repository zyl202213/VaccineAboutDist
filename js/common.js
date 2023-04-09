
$(function () {
    window.onload = function () {
        $.ajax({
            type: 'GET',
            url: `http://43.140.194.248:8080/api/user/status?token=${localStorage.getItem('token')}`,
            success: function (res) {
                console.log(res)
                if (res.status == 1) {
                    // 处于登录状态
                    $("#btn_login").html("已登录, 点击注销")
                    $("#btn_login").on('click', () => {
                        localStorage.removeItem('token')
                        location.reload()
                        $(this).html('登录')
                    })

                } else {
                    $("#btn_login").on('click', () => {
                        location.href = '/login.html'
                    })
                }
            }
        })
    }

    // $('#btn_login').addEventListener('click', function () {
    //     $.ajax({
    //         type: 'POST',
    //         url: 'http://www.liulongbin.top:3006/api/addbook',
    //         data: {
    //             bookname: '德米安',
    //             author: '黑塞',
    //             publisher: '人民文学出版社'
    //         },
    //         success: function (res) {
    //             console.log('success!')
    //         }
    //     })
    // })

})