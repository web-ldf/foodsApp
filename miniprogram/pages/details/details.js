// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //分类要显示的数据
    items:[
      {
        // 导航名称
        text: '热销',
        // 禁用选项
        disabled: false,
      },
      {
        // 导航名称
        text: '促销',
        // 禁用选项
        disabled: false,
      },
      {
        // 导航名称
        text: '进店必买',
        // 禁用选项
        disabled: false,
      },
    ],
    mainActiveIndex: 0,
    //右侧选中项的 id，支持传入数组
    activeId: [],
    //右侧选中商品最多选的个数
    max:10,
    //店家信息
    hotelOwnerMessage:[],
    //foodCategory分类数据
    foodCategory:[]
  },
  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0,
    });
  },
  onClickItem({ detail = {} }) {
    const { activeId } = this.data;
    const index = activeId.indexOf(detail.id);
    if (index > -1) {
      activeId.splice(index, 1);
    } else {
      activeId.push(detail.id);
    }
    this.setData({ activeId });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获得店家传过来的_id;
    console.log(options);
    //这里是首页跳转过来
    var db=wx.cloud.database();
    var collection=db.collection("hotelOwner");
    collection.get({
      success:res=>{
        //做一个循环，把_id=?的商家的食品找到
        for(var i=0;i<res.data.length;i++){
           for(var j=0;j<res.data[i].foods.length;j++){  
               //找到后设置属性值并终止程序
               console.log(res.data[i].foods[j]._id);
               if(options.foodId==res.data[i].foods[j]._id){
                 console.log(res.data[i]);
                 console.log(res.data[i].foods);
                 this.setData({
                  hotelOwnerMessage:res.data[i],
                  foodCategory:res.data[i].foods
                 });
                 console.log(this.data.hotelOwnerMessage);
                 //console.log("找到了元素，终止程序");
                 //console.log(i,j);
                 break;
               }
           }
        }
        /* 
        打印信息，用于自己查看获取的数据
        console.log(res.data);
        console.log(res.data[0].foods[0]._id);
        console.log(res.data[0].foods.length);
        console.log(this.data.hotelOwnerMessage);
        console.log(this.data.foodCategory) */
      }
    });
    //这里是店家页跳转过来
    var db=wx.cloud.database();
    var collection=db.collection("hotelOwner");
    collection.
    where({
     _id:db.command.eq(options._id)
    }).
    get({
      success:res=>{
        console.log(res.data[0]);
        /* 由于商家跳转详情页，传的值是商家id，获取不到食物分类，所以需
          要用for循环来存储商家食物分类(foodCategory)的数据，用于前台遍历
         */
          for(var i=0;i<res.data[0].foods.length;i++){  
            this.setData({
              /* 店家数据 */
              hotelOwnerMessage:res.data[0],
              /* 食物分类数据 */
              foodCategory:res.data[0].foods
            });
        }
      }
    })
  },
  //单击返回图标按钮返回上一页
  back(){
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})