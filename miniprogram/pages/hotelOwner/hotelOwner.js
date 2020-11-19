// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //店家数据
     hotelOwnerData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options);
    var db=wx.cloud.database();
    let collection=db.collection("hotelOwner");
    collection.
    where({
      categoryId:db.command.eq(options._id)
    }).
    get({
      success:res=>{
        that.setData({
          hotelOwnerData:res.data
        })
        console.log(that.data.hotelOwnerData);
      }
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