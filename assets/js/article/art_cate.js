$(function () {
    var layer = layui.layer
    var form = layui.form
    function initArtCate() {
        $.ajax({
            url: '/my/article/cates',
            method: 'get',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户列表失败')
                }
                console.log(res);
                var html = template('tpl_table', res)
                $('tbody').html(html)

            }
        })
    }
    initArtCate()
    var index = null
    $('#btnAdd').on('click', function () {
        index = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类'
            , content: $('#dialog-add').html()
        });

    })
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/addcates',
            method: 'post',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {

                    return layer.msg('新增分类失败')

                }
                initArtCate()
                layer.msg('新增分类成功')
                layer.close(index)

            }
        })
    })
    var indexEdit = null
    $('tbody').on('click', '#btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '修改文章分类'
            , content: $('#dialog-edit').html()
        });
        var id = $(this).attr('data-id')
        console.log(id);
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + id,
            success: function (res) {
                console.log(res);
                form.val('form-edit', res.data)
            }
        })

    })
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);

                if (res.status !== 0) {
                    return layer.msg('更新分类失败')
                }
                initArtCate()

                layer.msg('更新分类成功')
                layer.close(indexEdit)
            }
        })
    })
    //点击删除
    // var indexDelete=null
    $('tbody').on('click', '#btn-delete', function () {
        var id = $(this).attr('data-id')
        layer.confirm('是否删除', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    layer.close(index);
                    initArtCate()

                }
            })
            
        });


    })
})