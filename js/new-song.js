{
    let view = {
        el: ".new-music",
        init() {
            this.$el = $(this.el)
        },
        template: `
        <div class="page-title">新建歌曲</div>
        <form action="">
            <div class="row">
                <label for="song">歌名</label>
                <input name="name" type="text" name="" id="song" value="__name__">
            </div>
            <div class="row">
                <label for="singer">歌手</label>
                <input name ="singer" type="text" name="" id="singer" value="__singer__">
            </div>
            <div class="row">
                <label for="songSrc">外链</label>
                <input name ="url" type="text" name="" id="songSrc" value="__url__">
            </div>
            <div class="row">
                <button type="submit">保存</button>
            </div>
        </form>
        `,
        render(data = {}) {
            let template = this.template
            let place = ['name', 'singer', 'url', 'id']
            place.map((string) => {
                template = template.replace(`__${string}__`, data[string] || '')
            })
            $(this.el).html(template)
        }
    }
    let model = {
        data: { name: '', singer: '', url: '', id: '' },
        create(data) {
            var Song = AV.Object.extend('Song');
            // 新建对象
            var song = new Song();
            // 设置名称
            song.set('name', data.name);
            song.set('singer', data.singer);
            song.set('url', data.url);
            // 设置优先级
            // song.set('priority', 1);
            return song.save().then((newSong) => {
                // console.log('objectId is ' + todo.id);
                // console.log(todo)

                let { id, attributes } = newSong
                Object.assign(this.data, { id, ...attributes })
                // console.log({id,...attributes})
            }, function (error) {
                console.error(error);
            });
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.view.init()
            this.model = model
            this.view.render(this.model.data)
            this.bindEvents()
            window.eventHub.on('upload', (data) => {
                this.view.render(data)
            })
        },
        create() {
            let needs = 'name singer url'.split(' ')
            let data = {}
            needs.map((string) => {
                data[string] = this.view.$el.find(`[name="${string}"]`).val()
            })
            window.eventHub.emit("create", data)
            this.model.create(data)
                .then(() => { this.view.render({}) })
        },
        bindEvents() {
            this.view.$el.on("submit", 'form', (e) => {
                e.preventDefault()
                this.create()
            })
        }
    }
    controller.init(view, model)
}