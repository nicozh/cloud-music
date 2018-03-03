{
    let view = {
        el: ".layout-one",
        template: `<div class="music-list">歌曲列表</div>
        <ul>
    </ul>
    <div class="new-songList">新建歌曲</div>
    `,
        render(data) {
            $(this.el).html(this.template)

            if (data) {
                let { songs } = data
                let liList = songs.map((song) => {
                    let li = $('<li></li>')
                        .attr('data-id', song.id)
                        .append(`<p class="song-name">${song.name}</p>`)
                        .append(`<p class="song-singer">${song.singer}</p>`)
                    return li
                })

                liList.map((li) => {
                    $(this.el).find('ul').append(li)
                })
            }


        },
        activeLi(li) {
            $(li).addClass('active').siblings('.active').removeClass('active')
        },
        removeActive(li) {
            $(li).removeClass('active')
        },
        updateLi(data) {
            let li = $(this.el).find((`li[data-id=${data.id}]`))
            li.find('.song-name').text(data.name)
            li.find('.song-singer').text(data.singer)
        },

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
        },
        getAllSongs() {
            this.model.find().then(() => {
                this.view.render(this.model.data)

            })
        },
        bindEvents() {

            $(this.view.el).on('click', 'li', (e) => {
                this.view.activeLi(e.currentTarget)

                let id = $(e.currentTarget).attr('data-id')

                this.model.data.songs.map((song) => {
                    if (song.id === id) {

                        window.eventHub.emit('liClick', JSON.parse(JSON.stringify(song)))
                    }
                })

            })

            //新建歌曲按钮
            $(this.view.el).on('click', '.new-songList', () => {
                this.view.removeActive('li')

                window.eventHub.emit('newSongClick', {})          //通知输入区新建歌曲

            })

        },
        bindEventHub() {
            window.eventHub.on("create", (data) => {

                this.model.data.songs.push(data)    //data={ name: '', singer: '', url: '', id: '' }
                this.view.render(this.model.data)

            }),
                window.eventHub.on('updateOver', (data) => {
                    this.view.updateLi(data)
                })
        }
    }
    controller.init(view, model)
}