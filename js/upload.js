{
    let view = {
        el: "upload",
        template: '',
        render(data) {
            $(this.el).html(this.template)
        },
        find(selector) { return $(this.el).find(selector)[0] }
    }
    let model = {

    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render(this.model.data)

        },

    }
    controller.init(view, model)

}

