var layer = layui.layer

// 1.1获取裁剪区域的 dom 元素
var $image = $('#image')
// 1.2配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview',
}

// 1.3创建裁剪区域
$image.cropper(options)

// 为上传按钮绑定点击事件
$('#btnChooseImage').on('click', function () {
  $('#file').click()
})

// 为文件选择框绑定 change 事件
$('#file').on('change', function (e) {
  // 获取用户选择的文件
  var filelist = e.target.files
  if (filelist.length === 0) {
    return layer.msg('请选择照片!')
  }
  // 拿到用户选择的文件
  var file = e.target.files[0]
  // 根据选择的文件,创建一个对应的 url 地址
  var newImgURL = URL.createObjectURL(file)

  $image
    .cropper('destroy') //销毁旧的裁剪区域
    .attr('src', newImgURL) //重新设置图片路径
    .cropper(options) //重新初试化裁剪区域
})

// 为确定按钮,绑定点击事件
$('#btnUpload').on('click', function () {
  //  1.要拿到用户裁剪之后的头像
  var dataURL = $image
    .cropper('getCroppedCanvas', {
      //创建一个 canvas 画布
      width: 100,
      height: 100,
    })
    .toDataURL('image/png') //将 canvas 画布上的内容,转化为 base64 格式字符

  // 2.调用接口
  $.ajax({
    method: 'POST',
    url: '/my/update/avatar',
    data: {
      avatar: dataURL,
    },
    success: function (res) {
      console.log(res)
      if (res.status !== 0) {
        return layer.msg('更换头像失败!')
      }
      layer.msg('更换头像成功!')
      window.parent.getUserInfo()
    },
  })
})
