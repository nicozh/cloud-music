{
    let view = {
        el: '.upload-area',
        template: `<div class="page-title">上传区</div>
        <div class="upload-button" id="uploadButton">点击上传或者将文件拖至此区域</div>`,
        render(data) {
            $(this.el).html(this.template)
        }
    }
    let model = {}
    let controller = {
        init(view, model) {
            this.view = view,
                this.model = model,
                this.view.render(this.model.data)
        }
    }
    controller.init(view,model)
}