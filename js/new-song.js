{
    let view = {
        el: ".new-music",
        init() {
            this.$el = $(this.el)
        },
        template: `
        <div class="page-title">_$_</div>
        <form action="">
            <div class="row">
                <label for="song">歌名</label>
                <input name="name" type="text" id="song" value="__name__">
            </div>
            <div class="row">
                <label for="singer">歌手</label>
                <input name ="singer" type="text" id="singer" value="__singer__">
            </div>
            <div class="row">
                <label for="songSrc">外链</label>
                <input name ="url" type="text" id="songSrc" value="__url__">
            </div>
            <div class="row">
            <label for="songLrc">歌词</label>
            <input name ="lrc" type="text" id="songLrc" value="__lrc__">
            </div>
            <div class="row">
                <button type="submit">保存</button>
            </div>
        </form>
       
        `,
        render(data = {}, text) {
            let template = this.template
            template = template.replace(`_$_`, text || '新建歌曲')
            let place = ['name', 'singer', 'url', 'id', 'lrc']
            place.map((string) => {
                template = template.replace(`__${string}__`, data[string] || '')
            })
            $(this.el).html(template)
        }
    }
    let model = {
        data: { name: '', singer: '', url: '', id: '', lrc: '' },
        create(data) {
            var Song = AV.Object.extend('Song');
            // 新建对象
            var song = new Song();
            // 设置名称
            song.set('name', data.name);
            song.set('singer', data.singer);
            song.set('url', data.url);
            song.set('lrc', data.lrc)
            // 设置优先级
            // song.set('priority', 1);
            return song.save().then((newSong) => {

                let { id, attributes } = newSong
                Object.assign(this.data, { id, ...attributes })

            }, function (error) {
                console.error(error);
            });
        },
        updateSong(data) {
            var todo = AV.Object.createWithoutData('Song', data.id);
            // 修改属性
            todo.set('name', data.name);
            todo.set('singer', data.singer);
            todo.set('url', data.url);
            todo.set('lrc', data.lrc)
            // 保存到云端
            return todo.save();
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.view.init()
            this.model = model
            this.view.render(this.model.data)
            this.bindEvents()
            this.bindEventHub()
            // window.eventHub.on('upload', (data) => {
            //     this.view.render(data)
            // })
        },
        create() {
            let needs = 'name singer url lrc'.split(' ')
            let data = {}
            needs.map((string) => {
                data[string] = this.view.$el.find(`[name="${string}"]`).val()
            })
            if (data.name && data.url) {

                this.model.create(data)
                    .then(() => {
                        this.view.render({})
                        window.eventHub.emit("create", this.model.data) //通知歌单云端创建成功后发布数据
                    })

            } else {
                console.log('请输入歌曲名')
            }
        },
        updateSong() {
            let needs = 'name singer url lrc'.split(' ')
            needs.map((string) => {
                this.model.data[string] = this.view.$el.find(`[name="${string}"]`).val()
            })



            this.model.updateSong(this.model.data)
                .then(() => {
                    console.log('更新成功')

                })

            window.eventHub.emit('updateOver', this.model.data)     //    通知歌单更新数据

        },
        bindEvents() {
            this.view.$el.on("submit", 'form', (e) => {
                e.preventDefault()
                if (this.model.data.id) {
                    this.updateSong()

                } else {
                    this.create()
                }

            })

        },
        bindEventHub() {
            window.eventHub.on('liClick', (data) => {
                this.model.data = data
                this.view.render(this.model.data, '编辑歌曲')

            }),

                window.eventHub.on('newSongClick', (data) => {

                    this.view.render(data, '新建歌曲')
                    this.create()
                    this.model.data = { name: '', singer: '', url: '', id: '', lrc: '' }

                }),

                window.eventHub.on('upload', (data) => {
                    this.view.render(data)
                })
        }
    }
    controller.init(view, model)
}