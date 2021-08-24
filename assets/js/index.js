$(function(){
    function renderAvater(user){
        var name=user.nickname||user.username
        $('#welcome').html('欢迎  '+name)
        if(user.user_pic!==null){
            $('.layui-nav-img').attr('src',user.user_pic).show()
            $('.text-avatar').hide()
        }else{
            $('.layui-nav-img').hide()
            var first=name[0].toUpperCase()
            $('.text-avatar').html(first)
           
          
        }
    }
    function getUserInfo(){
        $.ajax({
            url:'/my/userinfo',
            method:'get',
            // headers:{
            //     Authorization:localStorage.getItem('token')
            // },
            success:function(res){
                if(res.status!==0){
                    return layui.layer.msg('获取用户信息失败')
                }
                renderAvater(res.data)
            },
            // complete:function(res){
            //     if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败！'){
            //         localStorage.removeItem('token')
            //         location.href='/login.html'
            //     }
                
            // }
        })

    }
    getUserInfo()
    $('#btnLogout').on('click',function(){
        console.log(1);
        var layer=layui.layer
        layer.confirm('确定退出吗', {icon: 3, title:'提示'}, function(index){
            //do something
            
            localStorage.removeItem('token')
            location.href='/login.html'
            layer.close(index)
          });
    })
})