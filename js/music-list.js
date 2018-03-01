{
    let view = {
        el: ".layout-one",
        template: `<div class="music-list">歌曲列表</div>
        <ul>
        <li>歌曲1</li>
        <li>歌曲2</li>
        <li>歌曲3</li>
        <li>歌曲4</li>
        <li>歌曲5</li>
        <li>歌曲6</li>
        <li>歌曲7</li>
        <li>歌曲8</li>
        <li>歌曲9</li>
    </ul>`,
        render(data) {
            $(this.el).html(this.template)
            if (data) {
                let { songs } = data
                let liList = songs.map((song) => {
                    let li = $('<li></li>').text(song.name)
                    return li
                })
                // console.log(liList)
                liList.map((li) => {
                    $(this.el).find('ul').append(li)
                })
            }

        },
        
    }
    let model = {
        data: {
            songs: []      //[{name:'',singer:'',url:''}]
        },
        find() {
            var query = new AV.Query('Song');
            return query.find().then(
                (Song) => {
                    console.log(2)
                    Song.map((item) => {
                        this.data.songs.push(item.attributes)
                    })
                })
        }
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
        getAllSongs(){
            this.model.find().then(() => {
                this.view.render(this.model.data)
            })
        },
    
        bindEventHub() {
            window.eventHub.on("create", (data) => {
                this.model.data.songs.push(data)
                this.view.render(this.model.data)
                // console.log('歌曲列表拿到信息'+ data.name)
                // console.log(data)
            })
        }
    }
    controller.init(view, model)
}