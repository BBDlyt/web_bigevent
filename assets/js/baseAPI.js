//每次发送请求，会先调用ajaxPrefilter这个函数，可以拿到给ajax提供的配置对象
$.ajaxPrefilter(function (option) {

    option.url = 'http://api-breakingnews-web.itheima.net' + option.url
    if (option.url.indexOf('/my') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token')
        }

    }
    option.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})