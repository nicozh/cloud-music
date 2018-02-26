var uploader = Qiniu.uploader({
    runtimes: 'html5',    //上传模式
    browse_button: 'uploadButton',       //上传选择的点选按钮
    uptoken_url: '//127.0.0.1:8002/uptoken',            //Ajax请求upToken的Url，（服务端提供）
    // unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
    // save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
    domain: 'p4mux6w96.bkt.clouddn.com',   //bucket 域名，下载资源时用到
    get_new_uptoken: false,  
    unique_names: false,                // JS-SDK 会为每个文件自动生成key（文件名）
    container: 'uploadArea',           //上传区域DOM ID，默认是browser_button的父元素，
    max_file_size: '30mb',         
    max_retries: 3,                   
    dragdrop: true,                   //开启可拖曳上传
    drop_element: 'uploadArea',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
    chunk_size: '4mb',                //分块上传时，每片的体积
    auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
    init: {
        'FilesAdded': function (up, files) {
            plupload.each(files, function (file) {
                // 文件添加进队列后,处理相关的事情
            });
        },
        'BeforeUpload': function (up, file) {
            // 每个文件上传前,处理相关的事情
        },
        'UploadProgress': function (up, file) {
            // 每个文件上传时,处理相关的事情
        },
        'FileUploaded': function (up, file, info) {
            // 每个文件上传成功后,处理相关的事情
            var domain = up.getOption('domain');
            var response = JSON.parse(info.response);
            var sourceLink = '//' + domain + '/' + encodeURIComponent(response.key); //获取上传成功后的文件的Url
            console.log(sourceLink)
        },
        'Error': function (up, err, errTip) {
            //上传出错时,处理相关的事情
        },
        'UploadComplete': function () {
            //队列文件处理完毕后,处理相关的事情
        },
        // 'Key': function (up, file) {
        //     // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
        //     // 该配置必须要在 unique_names: false , save_key: false 时才生效

        //     var key = "";
        //     // do something with key here
        //     return key
        // }
    }
});
