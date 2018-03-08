{
    let view = {
        el: '.page-2',
        init() {
            this.$el = $(this.el)
        },
        template: `
        <a href="./song.html?id={{id}}">
            <li>
                <div class="song-in">
                    <p class="s-name">
                        {{name}}
                    </p>
                    <p class="s-singer">
                        <span>
                            <svg class="icon m-sq" aria-hidden="true">
                                <use xlink:href="#icon-sq1"></use>
                            </svg>
                        </span>
                        {{singer}}
                    </p>
                    <svg class="icon m-play" aria-hidden="true">
                        <use xlink:href="#icon-play"></use>
                    </svg>
                </div>
                <div class="play-logo">

                </div>
            </li>
        </a>
        `,

        render(data) {
            let { songs } = data
            let ali = songs.map((song) => {
                let a = this.template
                    .replace('{{name}}', song.name)
                    .replace('{{singer}}', song.singer)
                    .replace('{{id}}', song.id)

                return a
            })
            ali.map((a) => {
                this.$el.find('.hot-songs').append(a)
            })
        },

        show() {

        },
        hide() {

        }
    }
    let model = {
        data: {
            songs: []
        },
        findSongs() {
            var query = new AV.Query('Song');
            return query.find().then((Song) => {
                Song.map((item) => {
                    // this.data.songs.push({ id: item.id, ...item.attributes })
                    this.data.songs.push(Object.assign({ id: item.id }, item.attributes))
                })

            })
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.init()
            this.bindEvents()
            this.bindEventHub()
            this.getSongs()
        },
        getSongs() {
            this.model.findSongs().then(() => {

                this.view.render(this.model.data)
            })
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