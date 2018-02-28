{
  let APP_ID = '5aImPyUBKHiTqsdwfPoH9Ffb-gzGzoHsz';
  let APP_KEY = 'i8iC5KBgzTXW6wtF1atl9O5Y';

  AV.init({
    appId: APP_ID,
    appKey: APP_KEY
  });

}
// var TestObject = AV.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.save({
//   words: 'Hello World!'
// }).then(function(object) {
//   alert('LeanCloud Rocks!');
// })