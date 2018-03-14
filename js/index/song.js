{
    let view = {
        el: '.play-music',
        init() {
            this.$el = $(this.el)
        },
        animation(x) {
            if (x) {
                this.$el.find('.disc-box').addClass('animate')
                this.$el.find('.play-btn').addClass('active')
            } else {
                let outBox = this.$el.find('.out-box');
                let image = this.$el.find('.disc-box');
                let iTransform = getComputedStyle(image[0]).transform;
                let cTransform = getComputedStyle(outBox[0]).transform;
                outBox[0].style.transform = cTransform === 'none'
                    ? iTransform
                    : iTransform.concat(cTransform);
                this.$el.find('.disc-box').removeClass('animate')
                this.$el.find('.play-btn').removeClass('active')
            }
        }
    }
    let model = {
        data: {},
        getUrl() {
            let id = window.location.search.substring(4)
            // console.log(id)
            let query = new AV.Query('Song');
            return query.get(id)
                .then((todo) => {
                    // console.log(todo)
                    this.data.url = todo.attributes.url

                    // 成功获得实例
                    // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
                }, function (error) {
                    // 异常处理
                });


        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.init()
            this.bindEvents()
            this.setUrl()
        },
        bindEvents() {
            var onOff = true
            let image = this.view.$el.find('.disc-box');

            image.on('click', () => {
                if (onOff) {
                    this.view.$el.find('.music')[0].play()
                    this.view.animation(onOff)
                    onOff = false
                } else {
                    this.view.$el.find('.music')[0].pause()
                    this.view.animation(onOff)
                    onOff = true

                }




            })

            // $('.po').on('click', () => {
            //     $('.music')[0].pause()
            // })
        },
        setUrl() {
            this.model.getUrl().then(() => {

                // console.log(this.view.$el.find("audio.music"))
                // console.log(this.model.data)
                // this.view.$el.find('audio.music')[0].setAttribute('src',this.model.data.url)
                this.view.$el.find('audio.music').attr('src', this.model.data.url)
                console.log(2)
                console.log(this.view.$el.find('audio.music')[0].getAttribute('src'))
                console.log(3)
            })
        }

    }
    controller.init(view, model)
}









