//index.js
const app = getApp()

Page({
  data: {
      show: false,
  },
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  onLoad: function() {
   
  },
})
