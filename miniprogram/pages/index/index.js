//index.js
const app = getApp()
Page({
  data: {
     //是否显示弹出层
      show: false,
      //存放省市区的变量Object
      areaList: {},
      address:'泸县',
      //存放美食分类的数据
      category:{},
      //首页每日推荐的数据
      recommend:[]
  },
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  confirm(e){
    this.setData({
      //设置选择市区后的地址显示
       address:e.detail.values[2].name,
       show:false
    })
    console.log(e.detail.values[2]);
  },
  onLoad: function() {
    //先把数据库中的省市区加载进areaList中
    var db = wx.cloud.database();
    var collection=db.collection("area");
    collection.get({
      success:res=>{
        this.setData({
          areaList:res.data[0]
        })
        console.log(res.data[0]);
      }
    });
    //这里是加载数据库中的分类到页面中（包括了文字及图片）
    var db=wx.cloud.database();
    var collection=db.collection("category");
    collection.get({
      success:res=>{
        this.setData({
          category:res.data
        })
        console.log(this.data.category);
      }
    });
    //这里加载所有的美食的图片及详情
    var db=wx.cloud.database();
    var collection=db.collection("hotelOwner");
    collection
    .get({
      success:res=>{
        //定义一个每日推荐变量，把这些数据封装到一个数据集中
        let recommend=[];
        for(var i=0;i<res.data.length;i++){
          for(var j=0;j<res.data[i].foods.length;j++){
             recommend.push(res.data[i].foods[j]);
             //console.log(res.data[i].foods[j]);
          }
        }
        //不知道原理，只知道网上搜的数组对象中的排序方法!
        function creatCompare(propertyName) {
          return function (obj1,obj2) {
              var value1=obj1[propertyName];
              var value2=obj2[propertyName];
              //console.log(obj1)
              if(value1<value2){
                  return 1
              }else if(value1>value2){
                  return -1
              }else {
                  return 0
              }
          }
      }
        this.setData({
          //后面的赋值是通过数组中的排序方法，原理有点懵
          recommend:recommend.sort(creatCompare("saleNum"))
        })
        console.log(this.data.recommend);
        //console.log(this.data.recommend.sort(creatCompare("saleNum")));
      }
    })
  },
})
