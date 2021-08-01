$(function () {
    // go reg
    $('#link_reg').on('click', function () {
        $('.login').hide();
        $('.reg').show();
    })

    // go login
    $('#link_login').on('click', function () {
        $('.login').show();
        $('.reg').hide();
    })
    // 表单验证 login
    $('#username').on('blur', function () {
        var a = $('#username').val().trim();
        var mingzi = /^[\u4E00-\u9FA5A-Za-z]+$/;
        if (a) {
            if (mingzi.test(a)) {
                $('.mz').html('名字可用');
                $('.mz').addClass('green').removeClass('red');
            } else {
                $('.mz').html('名字不可用');
                $('.mz').addClass('red').removeClass('green');
            }
        } else {
            $('.mz').html('名字不能为空');
            $('.mz').addClass('red').removeClass('green');
        }
    })

    $('#password').on('blur', function () {
        var a = $('#password').val().trim();
        var mingzi = /^[a-zA-Z0-9_-]{6,16}$/;
        if (a) {
            if (mingzi.test(a)) {
                $('.mm').html('密码可用');
                $('.mm').addClass('green').removeClass('red');
            } else {
                $('.mm').html('密码不可用');
                $('.mm').addClass('red').removeClass('green');
            }
        } else {
            $('.mm').html('密码不能为空');
            $('.mm').addClass('red').removeClass('green');
        }
    })

    // 表单验证 register
    $('#username1').on('blur', function () {
        var a = $('#username1').val().trim();
        var mingzi = /^[\u4E00-\u9FA5A-Za-z1-9]+$/;
        if (a) {
            if (mingzi.test(a)) {
                $('.mz1').html('名字可用');
                $('.mz1').addClass('green').removeClass('red');
            } else {
                $('.mz1').html('名字不可用');
                $('.mz1').addClass('red').removeClass('green');
            }
        } else {
            $('.mz1').html('名字不能为空');
            $('.mz1').addClass('red').removeClass('green');
        }
    })
    $('#password1').on('blur', function () {
        var a = $('#password1').val().trim();
        var mingzi = /^[a-zA-Z0-9_-]{6,16}$/;
        if (a) {
            if (mingzi.test(a)) {
                $('.mm1').html('密码可用');
                $('.mm1').addClass('green').removeClass('red');
            } else {
                $('.mm1').html('密码不可用');
                $('.mm1').addClass('red').removeClass('green');
            }
        } else {
            $('.mm1').html('密码不能为空');
            $('.mm1').addClass('red').removeClass('green');
        }
    })

    $('#repassword').on('blur', function () {
        var a = $('#repassword').val().trim();
        var b = $('#password1').val().trim();
        if (a) {
            if (a === b) {
                $('.re').html('密码相同');
                $('.re').addClass('green').removeClass('red');
            } else {
                $('.re').html('密码不相同');
                $('.re').addClass('red').removeClass('green');
            }
        } else {
            $('.re').html('此项不能为空');
            $('.re').addClass('red').removeClass('green');
        }
    })


    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.post('http://api-breakingnews-web.itheima.net/api/reguser', { 'username': $('#username1').val(), 'possword': $('#password1').val() }, function (res) {
            if (res.status !== 0) {
                return console.log(res.message);
            }
            console.log('注册成功');
        })
    })
})