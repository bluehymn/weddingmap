function refresh() {
  navigator.geolocation.getCurrentPosition(function(position) {
    var lng = position.coords.longitude;
    var lat = position.coords.latitude;
    var latlng = new qq.maps.LatLng(lat, lng)
    qq.maps.convertor.translate(latlng, 1, function (data) {
      $.ajax({
        type: 'post',
        url: '/wedding/api/admin/update',
        data: {
          lat: data[0].lat,
          lng: data[0].lng
        },
        success: function (data) {
          
        }
      });
    });
    // jingjing.position = latlng;
    // jingjing.draw();
  },
  function () {
    console.log('获取地理坐标失败')
  });
  setTimeout(refresh, 10000);
}

refresh()

$('.btns').on('click', 'button', function(){
  var status = this.dataset.status;
  var this_ = this;
  $.ajax({
    type: 'put',
    url: '/wedding/api/admin/status',
    data: {
      status: status
    },
    success: function (data) {
      if (data.status === 'ok') {
        $('.btns button').removeClass('active');
        $(this_).addClass('active');
      }
    }
  });
});

