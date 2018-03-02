{
  let APP_ID = '5aImPyUBKHiTqsdwfPoH9Ffb-gzGzoHsz';
  let APP_KEY = 'i8iC5KBgzTXW6wtF1atl9O5Y';

  AV.init({
    appId: APP_ID,
    appKey: APP_KEY
  });

  // var query = new AV.Query('Song');
  // query.find().then(
  //   function (Song) {
  //     // let array = message.map((item) => item.attributes)
  //     // array.forEach((item) => {
  //     //   let e = document.createElement('li')
  //     //   e.innerText = `${item.name}: ${item.content}`
  //     //   li.appendChild(e)
  //     // })
  //     console.log(Song)
  //   }
  // )


  // var query = new AV.Query('Song');
  // query.find().then(
  //   function (Song) {
  //     let songs=[]
  //       Song.map((item) => {
  //          songs.push(item.attributes)
  //         })
  //     // array.forEach((item) => {
  //     //   let e = document.createElement('li')
  //     //   e.innerText = `${item.name}: ${item.content}`
  //     //   li.appendChild(e)
  //     // })
  //     console.log(songs)
  //     return
  //   })


}
// var TestObject = AV.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.save({
//   words: 'Hello World!'
// }).then(function(object) {
//   alert('LeanCloud Rocks!');
// })

// bindEvents() {
//   $(this.view.el).on('click','li',(e)=>{
//       this.view.activeLi(e.currentTarget)
//   })
// },
// activeLi(li){
//   $(li).addClass('active').siblings('.active').removeClass('active')
// }


  // // 第一个参数是 className，第二个参数是 objectId
  // var todo = AV.Object.createWithoutData('Song', "5a97b1089f545442015b2577");
  // // 修改属性
  // todo.set('name', '每周工程师会议，本周改为周三下午3点半。');
  // // 保存到云端
  // todo.save();