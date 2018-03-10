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
        init() {
            this.$el = $(this.el)
        },
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
                this.$el.html(a)
            })
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
                Song.map((item) => {
                    // this.data.songs.push({ id: item.id, ...item.attributes })
                    this.data.songs.push(Object.assign({ id: item.id }, item.attributes))
                    console.log(this.data.songs)
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
                this.model.searchSongs(value).then(()=>{
                    this.view.render(this.model.data)
                })
                
                
            })
        },
    }
    controller.init(view, model)
}
