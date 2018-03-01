{
    let view = {
        el: ".layout-one",
        template: `<div class="music-list">歌曲列表</div>
        <ul>
        <li>歌曲1</li>
    </ul>`,
        render(data) {
            $(this.el).html(this.template)
            if (data) {
                let { songs } = data
                let liList = songs.map((song) => {
                    let li = $('<li></li>').text(song.name).attr('data-id', song.id)
                    return li
                })
                
                liList.map((li) => {
                    $(this.el).find('ul').append(li)
                })
            }

        },
        activeLi(li) {
            $(li).addClass('active').siblings('.active').removeClass('active')
        }

    }
    let model = {
        data: {
            songs: []      //[{name:'',singer:'',url:'',id:''}]
        },
        find() {
            var query = new AV.Query('Song');
            return query.find().then(
                (Song) => {
                    Song.map((item) => {
                        this.data.songs.push({ id: item.id, ...item.attributes })

                    })
                })
            console.log(1)

        },

    }
    let controller = {
        init(view, model) {

            this.view = view
            this.model = model
            this.view.render()
            this.bindEvents()
            this.getAllSongs()
            this.bindEventHub()
            this.bindEvents()
        },
        getAllSongs() {
            this.model.find().then(() => {
                this.view.render(this.model.data)
                // console.log(this.model.data.songs)
            })
        },
        bindEvents() {
            $(this.view.el).on('click', 'li', (e) => {
                this.view.activeLi(e.currentTarget)

                // console.log($(e.currentTarget).attr('data-id'))

                let id = $(e.currentTarget).attr('data-id')
                this.model.data.songs.map((song) => {
                    if (song.id === id) {

                        // console.log(song)

                        window.eventHub.emit('liClick', song)

                    }
                })



            })
        },
        bindEventHub() {
            window.eventHub.on("create", (data) => {

                this.model.data.songs.push(data)    //data={ name: '', singer: '', url: '', id: '' }
                this.view.render(this.model.data)
                // console.log('歌曲列表拿到信息'+ data.name)
                // console.log(data)
            })
        }
    }
    controller.init(view, model)
}