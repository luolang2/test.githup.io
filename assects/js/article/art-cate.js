$(function () {
    var layer = layui.layer;
    var form = layui.form;

    initArtCateList();

    // 获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl_table', res);
                $('tbody').html(htmlStr);
            }
        })
    }
    var indexAdd = null;
    // 为添加类别按钮添加点击事件
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog_add').html()
        })
    })

    // 通过代理的方式给表单绑定submit事件
    $('body').on('submit', '#form_add', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $('#form_add').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败');
                }
                initArtCateList();
                layer.msg('新增分类成功');

                // 根据索引关闭弹出层
                layer.close(indexAdd);
            }
        })
    })

    // 通过代理的形式给编辑按钮绑定事件
    var indexEdit = null;
    $('tbody').on('click', '.btn_edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog_edit').html()
        })
        var id = $(this).attr('data_id');

        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章信息失败或该文章禁止修改');
                }
                form.val('form_edit', res.data)
            }
        })
    })

    // 通过代理的形式为修改分类的表单绑定 submit 事件
    $('body').on('submit', '#form_edit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $('#form_edit').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败');
                }
                layer.msg('更新分类数据成功');
                layer.close(indexEdit);
                initArtCateList();
            }
        })
    })

    // 通过代理给每个删除的按钮添加事件
    $('tbody').on('click', '.btn_delete', function () {
        var id = $(this).attr('data_id');
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something

            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败');
                    }
                    layer.msg('删除分类成功');
                    layer.close(index);
                    initArtCateList();
                }
            })
        })
    })
})