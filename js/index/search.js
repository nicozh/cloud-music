{
    let view = {
        el: '.search-songs',
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
        template2: `<p style="text-align:center"> sorry,没找到😭 </p>`,
        template3: `<p style="text-align:center"> 请输入歌名🙄  </p>`,
        init() {
            this.$el = $(this.el)
        },
        render(data) {
            if (typeof data === 'object') {
                let { songs } = data
                let ali = songs.map((song) => {
                    let a = this.template
                        .replace('{{name}}', song.name)
                        .replace('{{singer}}', song.singer)
                        .replace('{{id}}', song.id)

                    return a
                })
                ali.map((a) => {
                    this.$el.html(a)
                })
            } else {
                this.$el.html(data)
            }
        },
    }
    let model = {
        data: {
            songs: []
        },
        searchSongs(value) {
            let query = new AV.Query('Song');
            query.contains('name', value)
            return query.find().then((Song) => {
                if (Song.length === 0) {
                    return false
                } else {
                    console.log('存在')
                    Song.map((item) => {
                        // this.data.songs.push({ id: item.id, ...item.attributes })
                        this.data.songs.push(Object.assign({ id: item.id }, item.attributes))
                        // console.log(this.data.songs)
                    })

                    return true
                }

            })
        }

    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.init()
            this.bindEvents()
        },
        getSongs() {
            this.model.findSongs().then(() => {

                this.view.render(this.model.data)
            })
        },
        bindEvents() {
            $('.for-search').bind('submit', (e) => {
                e.preventDefault()
                let value = $('#search').val()
                console.log(value)

                if (value) {
                    this.model.searchSongs(value).then((blean) => {
                        console.log(blean)
                        if (blean) {
                            console.log('找到了')
                            this.view.render(this.model.data)

                        } else {
                            console.log('没找到')
                            this.view.render(this.view.template2)

                        }
                    })
                } else {
                    console.log('请输入歌名')
                    this.view.render(this.view.template3)
                }

            })
        },
    }
    controller.init(view, model)
}
