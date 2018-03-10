{
    let view = {
        el: '.page-1',
        init() {
            this.$el = $(this.el)
        },
    }
    let model = {
       
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.init()
            this.bindEvents()
            this.bindEventHub()
        },
        bindEvents() {

        },
        bindEventHub() {
            window.eventHub.on('tabClick', (data) => {
                if (this.view.el === '.' + data) {
                    this.view.$el.addClass('active').siblings().removeClass('active')
                }
            })
        }
    }
    controller.init(view, model)
}