$(document).ready(function () {
    // 修改用户
    $('.btn-info').click(function () {
        var id = $(this).val();
        $('#updateUserId').val(id);
        var url = "users/" + id;
        $.get(url, function (data) {
            $('#updateUsername').val(data.username);
            $("#updatePassword").val('');
            $('#updateFullName').val(data.fullName);
            $('#updateEmail').val(data.email);
            $("#updateEnabled").val(data.enabled);
            $("#updateCity").val(data.defaultCity);
            $.get(url + "/auth", function (auth) {
                $("#updateRole").val(auth.authority);
            });
        });
    });

    // 删除用户
    $('.btn-danger').click(function () {
        var user = eval('(' + $(this).val() + ')');

        // 由于 User 实体配置了 OneToOne，所以要先删 User，成功后再删 Auth
        $.ajax({
            type: 'DELETE',
            url: "users/" + user.id
        }).then(function () {
            $.ajax({
                type: 'DELETE',
                url: "auths/" + user.name
            }).then(function () {
                location.reload();
            });
        });
    });

    // 修改用户提交更改
    $('#updateBtn').click(function () {
        var url = "users/" + $('#updateUserId').val();
        var user = {};
        user.fullName = $('#updateFullName').val();
        user.email = $('#updateEmail').val();
        user.enabled = $('#updateEnabled').val();
        user.defaultCity = $('#updateCity').val();
        user.updateTime = new Date();

        //处理密码
        var password = $('#updatePassword').val();
        if (password.trim() != '') {
            user.password = md5(password);
        }

        // 更新用户表
        var jsonData = JSON.stringify(user);
        $.ajax({
            type: 'PATCH',
            url: url,
            data: jsonData,
            contentType: "application/json"
        });

        // 更新角色表
        var auth = {};
        auth.authority = $('#updateRole').val();

        url = 'auths/' + $('#updateUsername').val();
        jsonData = JSON.stringify(auth);
        $.ajax({
            type: 'PATCH',
            url: url,
            data: jsonData,
            contentType: "application/json"
        }).then(function (data) {
            location.reload();
        });
    });

    // 新增用户提交保存
    $('#newUserBtn').click(function () {
        var data = getFormData($('#newUserForm'));

        // 校验必填字段
        var username = data.username.trim();
        var password = data.password.trim();
        if (username == '' || password == '') {
            alert("用户名和密码为必填项，不能为空。");
            return false;
        }

        // 校验电子邮箱正确性
        var email = data.email.trim();
        if (email != '' && !email.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)) {
            alert("邮箱格式不正确，请填写正确格式邮箱，或清空不填邮箱。");
            return false;
        }

        // 检查用户是否已存在
        var url = "users/search/findByUsername?username=" + username;
        $.ajax({
            type: 'GET',
            url: url
        }).then(function (data) {
            // 有数据返回，表示用户名已存在
            alert("用户名已存在。");
            return false;
        });

        data.username = username;
        data.password = md5(password);
        data.fullName = data.fullName.trim();
        data.email = email;
        data.createTime = new Date();
        data.updateTime = new Date();
        data.type = 1; // 普通用户类型

        // 先添加角色到数据库
        var jsonData = JSON.stringify(data);
        $.ajax({
            type: 'POST',
            url: "auths",
            data: jsonData,
            contentType: "application/json",
            dataType: 'json'
        }).then(function (data) {
            // 再添加新用户到数据库
            $.ajax({
                type: 'POST',
                url: "users",
                data: jsonData,
                contentType: "application/json",
                dataType: 'json'
            }).then(function (data) {
                location.reload();
            });
        });
    });

    // 转换表单数组到JS对象，以便进一步转换为JSON字符串
    function getFormData($form) {
        var unindexed_array = $form.serializeArray();
        var indexed_array = {};

        $.map(unindexed_array, function (n, i) {
            indexed_array[n['name']] = n['value'];
        });

        return indexed_array;
    }

});
