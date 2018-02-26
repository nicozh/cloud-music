{
    let view = {
        el: ".new-music",
        template: `
        <div class="page-title">新建歌曲</div>
        <form action="">
            <div class="row">
                <label for="song">歌名</label>
                <input type="text" name="" id="song">
            </div>
            <div class="row">
                <label for="singer">歌手</label>
                <input type="text" name="" id="singer">
            </div>
            <div class="row">
                <label for="songSrc">外链</label>
                <input type="text" name="" id="songSrc">
            </div>
            <div class="row">
                <button type="submit">保存</button>
            </div>
        </form>
        `,
        render(data) {
            $(this.el).html(this.template)
        }
    }
    let model = {}
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render(this.model.data)
        }
    }
    controller.init(view,model)

}