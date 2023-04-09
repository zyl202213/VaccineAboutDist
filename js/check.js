
$(function () {

    let page = 1
    let click_mode = 0

    function getInfo_1(page, pageSize = 20,) {
        const baseUrl = "http://43.140.194.248:8080/api/vaers"
        let vaccineId = $("#vaccineId").val().trim()
        let symptomId = $("#symptomId").val().trim()

        if ($("#now_page").html() == 1) {
            $("#pre_page").addClass("disabled")
        }
        else (
            $("#pre_page").removeClass("disabled")
        )
        if (vaccineId == "" && symptomId == "") {
            return alert("至少填写一项")
        }
        $.ajax({
            type: 'GET',
            url: `${baseUrl}?page=${page}&pageSize=${pageSize}&vaccineId=${vaccineId}&symptomId=${symptomId}`,
            success: function (res) {
                let data = res.data.results[0]
                if (res.status != 1) return alert("请求失败")
                infobox = $("#infobox")
                infobox.html("")
                if (!data) return infobox.html("<p>无数据</p>")
                let item = `
                     <div id="info_onePeice" class="card">
                <div class="card-body"> `
                $.each(data, (idx, obj) => {
                    if (typeof (obj) != "null" && typeof (obj) == "object") {
                        $.each(obj, (idx, obj) => {
                            item += `<p>${idx}: &nbsp;&nbsp;<span> ${obj}</span></p>`
                        })
                    }
                    else {
                        item += `<p>${idx}: &nbsp;&nbsp;<span> ${obj}</span></p>`
                    }
                })
                item += `</div></div>`
                infobox.html(item)
            }
        })
        $.ajax({
            type: 'GET',
            url: `${baseUrl}?page=${page + 1}&pageSize=${pageSize}&vaccineId=${vaccineId}&symptomId=${symptomId}`,
            success: function (res) {
                let data = res.data.results[0]
                if (!data) {
                    $("#next_page").addClass("disabled")
                } else {
                    $("#next_page").removeClass("disabled")
                }
            }
        })
    }
    function getInfo_2() {
        const baseUrl = "http://43.140.194.248:8080/api/vaers/"
        let vaersId = $("#vaersId").val().trim()
        $("#pre_page").addClass("disabled")
        $("#next_page").addClass("disabled")

        if (vaersId == "") {
            return alert("未填写")
        }
        $.ajax({
            type: 'GET',
            url: `${baseUrl}${vaersId}`,

            success: function (res) {
                if (res.status != 1) return alert("请求失败")
                let data = res.data
                infobox = $("#infobox")
                infobox.html("")
                if (data == "") return infobox.html("<p>无数据</p>")
                let item = `
                     <div id="info_onePeice" class="card">
                <div class="card-body"> `

                $.each(data, (idx, obj) => {
                    if (typeof (obj) != "null" && typeof (obj) == "object") {
                        $.each(obj, (idx, obj) => {
                            if (typeof (obj) != "null" && typeof (obj) == "object") {
                                $.each(obj, (idx, obj) => {
                                    item += ` <p>${idx}: &nbsp;&nbsp;<span> ${obj}</span></p>`
                                })
                            }
                            else {
                                item += `<p>${idx}: &nbsp;&nbsp;<span> ${obj}</span></p>`
                            }
                        })
                    }
                    else {
                        item += `<p>${idx}: &nbsp;&nbsp;<span> ${obj}</span></p>`
                    }
                })
                item += `</div></div>`
                infobox.html(item)
            }
        })
    }
    function getInfo_3(page, pageSize = 20,) {
        const baseUrl = "http://43.140.194.248:8080/api/vaers/vaccine"
        let keyword = $("#vaccine").val().trim()

        if ($("#now_page").html() == 1) {
            $("#pre_page").addClass("disabled")
        }
        else (
            $("#pre_page").removeClass("disabled")
        )
        if (keyword == "") {
            return alert("未填写疫苗")
        }
        $.ajax({
            type: 'GET',
            url: `${baseUrl}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`,
            success: function (res) {
                console.log(res)
                let data = res.data.vaccines
                if (res.status != 1) return alert("请求失败")
                infobox = $("#infobox")
                infobox.html("")
                if (!data) return infobox.html("<p>无数据</p>")
                let item = `
                     <div id="info_onePeice" class="card">
                <div class="card-body"> `
                $.each(data, (idx, obj) => {
                    if (typeof (obj) != "null" && typeof (obj) == "object") {
                        $.each(obj, (idx, obj) => {
                            item += `<p>${idx}: &nbsp;&nbsp;<span> ${obj}</span></p>`
                        })
                    }
                    else {
                        item += `<p>${idx}: &nbsp;&nbsp;<span> ${obj}</span></p>`
                    }
                })
                item += `</div></div>`
                infobox.html(item)
            }
        })
        $.ajax({
            type: 'GET',
            url: `${baseUrl}?page=${page + 1}&pageSize=${pageSize}&keyword=${keyword}`,
            success: function (res) {
                let data = res.data.vaccines
                if (data == "") {
                    $("#next_page").addClass("disabled")
                } else {
                    $("#next_page").removeClass("disabled")
                }
            }
        })
    }
    function getInfo_4(page, pageSize = 20,) {
        const baseUrl = "http://43.140.194.248:8080/api/vaers/symptom"
        let keyword = $("#symptom").val().trim()

        if ($("#now_page").html() == 1) {
            $("#pre_page").addClass("disabled")
        }
        else (
            $("#pre_page").removeClass("disabled")
        )
        if (keyword == "") {
            return alert("未填写症状")
        }
        $.ajax({
            type: 'GET',
            url: `${baseUrl}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`,
            success: function (res) {
                console.log(res)
                let data = res.data.symptoms
                if (res.status != 1) return alert("请求失败")
                infobox = $("#infobox")
                infobox.html("")
                if (!data) return infobox.html("<p>无数据</p>")
                let item = `
                     <div id="info_onePeice" class="card">
                <div class="card-body"> `
                $.each(data, (idx, obj) => {
                    if (typeof (obj) != "null" && typeof (obj) == "object") {
                        $.each(obj, (idx, obj) => {
                            item += `<p>${idx}: &nbsp;&nbsp;<span> ${obj}</span></p>`
                        })
                    }
                    else {
                        item += `<p>${idx}: &nbsp;&nbsp;<span> ${obj}</span></p>`
                    }
                })
                item += `</div></div>`
                infobox.html(item)
            }
        })
        $.ajax({
            type: 'GET',
            url: `${baseUrl}?page=${page + 1}&pageSize=${pageSize}&keyword=${keyword}`,
            success: function (res) {
                let data = res.data.symptoms
                if (data == "") {
                    $("#next_page").addClass("disabled")
                } else {
                    $("#next_page").removeClass("disabled")
                }
            }
        })
    }




    $("#btn_check_1").on('click', function () {
        page = 1
        getInfo_1(page)
        $("#pre_page").on("click", () => {
            $("#now_page").html(--page)
            getInfo_1(page)
        })

        $("#next_page").on("click", () => {
            $("#now_page").html(++page)
            getInfo_1(page)
        })
    })

    $("#btn_check_2").on('click', function () {
        page = 1
        getInfo_2(page)
        $("#pre_page").on("click", () => {
            getInfo_2()
        })

        $("#next_page").on("click", () => {
            getInfo_2()
        })
    })
    $("#btn_check_3").on('click', function () {
        page = 1
        getInfo_3(page)
        $("#pre_page").on("click", () => {
            $("#now_page").html(--page)
            getInfo_3(page)
        })

        $("#next_page").on("click", () => {
            $("#now_page").html(++page)
            getInfo_3(page)
        })
    })
    $("#btn_check_4").on('click', function () {
        page = 1

        getInfo_4(page)
        $("#pre_page").on("click", () => {
            $("#now_page").html(--page)
            getInfo_4(page)
        })

        $("#next_page").on("click", () => {
            $("#now_page").html(++page)
            getInfo_4(page)
        })
    })

})
