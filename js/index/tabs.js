{
    let view = {
        el: '#tabs',
        init() {
            this.$el = $(this.el)
        }
    }
    let model = {

    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.init()
            this.bindEvents()
        },
        bindEvents() {
            this.view.$el.on('click', 'ol>li', (e) => {
             let $li=$(e.currentTarget)
                $li.addClass('active').siblings().removeClass('active')
                let data=$li.attr('data')
                window.eventHub.emit('tabClick',data)
            })
        }
    }
    controller.init(view, model)
}