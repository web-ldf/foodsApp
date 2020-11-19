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
      category:{}
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
    })
  },
})
