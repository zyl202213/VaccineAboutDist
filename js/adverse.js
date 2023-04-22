
$(function () {
    console.log("first log")
    loadVaccine()
    $(".a6").click(function () {
        inquireVaccine("")
    })

    var selectedDiv
    $(".search-box").hide()
    $(".vaccine-search-box").click(function () {
        var id = $(this).attr("id")
        $(this).after($("#vaccine-search-box"))
        changeVisible("#vaccine-search-box")
        selectedDiv = $(this)
    })

    // 疫苗搜索
    $("#vaccine-search").click(function () {
        var keyword = $("#vaccine-input").val()
        inquireVaccine(
            onSuccess = function (json) {
                $("#vaccine-result-list").empty()
                var vaccineList = json.data.vaccineList
                for (var i = 0; i < vaccineList.length; i++) {
                    var html = `<li class="search-result-item" vaccineId="${vaccineList[i].id}">${vaccineList[i].productName}</li>`
                    $("#vaccine-result-list").append(html)
                }
                $(".search-result-item").click(function () {
                    var name = $(this).text()
                    selectedDiv.text(name)
                    selectedDiv.attr('vaccineId', $(this).attr("vaccineId"))
                    console.log(selectedDiv.attr('vaccineId'))
                })
            },
            str = keyword,
        )
    })

    $("#adverse-event-submit-btn").click(function () {
        let sex
        if (document.getElementById('male').checked) {
            sex = 'F'
        } else if (document.getElementById('female').checked) {
            sex = 'M'
        } else {
            sex = 'N'
        }
        // 获取疫苗列表
        var vaccineList = []
        // 遍历table中的每个tr元素
        $("#adverse-vaccine-table").children("tr").each(function (index, element) {
            // 如果这个tr元素的vaccine-search-box有vaccineId这个属性，获取当前这一行的数据
            var vaccineId = $(this).find(".vaccine-search-box").attr("vaccineId")
            if (vaccineId == undefined) {
                return
            }
            var vaccine = {
                id: parseInt(vaccineId),
                dose:  $(this).find("#Inoculation-times").val(),
                route: $(this).find("#Vaccination-route").val(),
                site: $(this).find("#inoculation-site").val(),
            }
            if ($(this).find(".vaccinate-date:first").val() != undefined) {
                vaccine.vaccinareData = new Date($(this).find(".vaccinate-date:first").val()).toISOString()
            }
            vaccineList.push(vaccine)
        })
        var data = {
            code: ($("#code").val()), // The code of the vaccine to be used. Learn more about codes and their formats at https://codegeex.cn
            name: $("#name").val(), // The name of the vaccine to be used. Learn more about names and their formats at https://codegeex.cn
            sex: sex,// The birth date of the individual. Learn more about birth dates and their formats at https://codegeex.cn
            phone: $("#Phone").val(), // The contact number of the individual. Learn more about contact numbers and their formats at https://codegeex.cn
            address: $("#address").val(), // The date on which the condition was first detected. Learn more about the date formats at https://codege
            description: $("#adverse-event-description").val(),
            treatmentDepartment: $("#treatmentDepartment").val(), // The department that provided treatment for the condition. Learn more about departments and their formats at https://codege
            rapporteur: $("#rapporteur").val(), // The person who provided the treatment for the condition. Learn more about people and their formats at https://codege
            rapporteurPhone: $("#rapporteurPhone").val(), // The contact number of the person who provided the treatment for the condition. Learn more about contact numbers and their
            rapporteurAddress: $("#rapporteurAddress").val(), // Learn more about addresses and their formats at https://codegeex.cn
            vaccineList: vaccineList,
        }
        if ($("#birth").val() != undefined) {
            data.birth = new Date($("#birth").val()).toISOString()
        }
        if ($("#onsetDate").val()) {
            data.onsetDate = new Date($("#onsetDate").val()).toISOString()
        }

        postAdverseEvent(
            onSuccess = function (data) {
                console.log("接口调用成功")
            },
            data = data,

            token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ0ZXN0IiwiZXhwIjoxNjgyMjIyNTA1LCJqdGkiOiIxMiIsImlhdCI6MTY4MjEzNjEwNSwiaXNzIjoiQWJvdXRWYWNjaW5lIiwibmJmIjoxNjgyMTM2MTA1LCJzdWIiOiJ0b2tlbiJ9.LzTVteFAqVPU2UEfZNY1ppFGp9f6NWQ6aSGlRhD7ZYE"
        )
    })

})

function changeVisible(element) {
    if ($(element).css("display") == 'none') {
        $(element).show();
    } else {
        $(element).hide();
    }
}
function loadVaccine() {
    $.ajax({
        url: "http://43.140.194.248:8080/api/adverse?page=1&pageSize=50",
        type: "get",
        dataType: "json",
        success: function (data) {
            console.log(data.msg)
            var events = data.data.eventList
            for (var i = 0; i < events.length; i++) {

                console.log(events[i]) // The person who provided the treatment for the condition. Learn more about people and their formats at https://

            }
        }
    })
}

function postAdverseEvent(onSuccess, data, token) {
    $.ajax({
        url: "http://43.140.194.248:8080/api/adverse?token=" + token,
        type: "post",
        dataType: "json",
        data: JSON.stringify(data),

        success: function (data) {
            console.log(data.msg)
            onSuccess(data)
        }
    })
}

function inquireVaccine(onSuccess, str, page = 1, pageSize = 10) {
    $.ajax({
        url: "http://43.140.194.248:8080/api/vaccine/cfda",
        type: "get", //get, post, put, delete, etc.  Learn more about the various types of HTTP requests, including GET, OPTIONS,
        dataType: "json", //the type of data that the server will return. Learn more about the data types returned to you from this point on. The JSON
        data: {
            productName: str,
            page: page, //the page number. Learn more about the page number. The default is 1.
            pageSize: pageSize //the number of entries per page. Learn more about the page size. The default is 10.
        },
        success: function (json) {
            console.log(json)
            onSuccess(json)
        }
    })
}