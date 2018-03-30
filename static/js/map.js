var map, clipboardText, livingStatus = '0';
var path1 = [
  // 新郎家
  [114.00,30.00],
  [114.00,30.00],
  // 铁四院掉头点1
  [114.34572458267212,30.60243023741825],
  // 铁四院掉头点2
  [114.34585869312286,30.602351743894705],
  // 花店
  [114.34599816799164,30.602347126626633],
  [114.34988737106323,30.606160915066763],
  // 二七长江大桥上桥点
  [114.35805201530457,30.612518434362563],
  [114.36026751995087,30.612698488744297],
  [114.36099708080292,30.613224799632796],
  [114.36097025871277,30.61405119429069],
  [114.36025679111481,30.615168431720967],
  [114.35929119586945,30.61626718984319],
  [114.35830414295197,30.617195122914932],
  [114.35638904571533,30.61911559296108],
  [114.35248374938965,30.621922365267235],
  [114.33261394500732,30.636028856572608],
  [114.32953476905823,30.637164302762326],
  [114.32724952697754,30.636988909505742],
  [114.32315111160278,30.635641140187317],
  [114.32259321212769,30.63479185124713],
  [114.32260930538177,30.6346856896054],
  [114.32429373264313,30.633716382271672],
  [114.32686865329742,30.636504268590915],
  // 解放大道百步亭花园路口
  [114.32847797870636,30.639933627820266],
  [114.32645559310913,30.640570561369064],
  [114.3198573589325,30.644355152472325],
  [114.31917071342468,30.645121283378437],
  [114.3191921710968,30.64513051383429],
  // 百步亭花园路兴业路口
  [114.31765794754028,30.64833342881643],
  // 百步亭花园路后湖大道路口
  [114.31532979011536,30.65450820177784],
  [114.30410742759705,30.6502163610175],
  [114.30172562599182,30.6492379792541],
  [114.29309964179993,30.64455822390607],
  // 后湖大道掉头位置
  [114.2903745174408,30.6430028704602],
  [114.29036378860474,30.642924409831352],
  // 世纪家园北门
  [114.2925363779068,30.644045929242857],
  // 小区第一个路口
  [114.292933344841,30.643492094121868],
  [114.29303526878357,30.643353634846047],
  [114.29303526878357,30.643353634846047],
  // 终点 新娘家
  [114.29373800754547,30.643436710435335]
];

var path2 = [
  [114.00,30.00],
  [114.29402232170105,30.64373670502467],
  [114.29400622844696,30.64399054587349],
  [114.29292261600494,30.643501324733187],
  [114.29301381111145,30.643358250158435],
  [114.29363071918488,30.642522875028554],
  [114.29323375225067,30.642333645405653],
  [114.29286360740662,30.641793646641162],
  [114.29321229457855,30.641521338428408],
  [114.29337859153748,30.641152105728942],
  [114.2933464050293,30.640962873424172],
  // 世纪家园南门
  [114.29346978664398,30.640676716552765],
  // 后湖南路后湖三路口
  [114.29255247116089,30.64018747865038],
  // 后湖三路兴业路口
  [114.29398477077484,30.63721507443514],
  // 兴业路金桥大道路口
  [114.28597569465637,30.633808697674233],
  [114.28259611129761,30.63251165819328],
  [114.28266048431396,30.6323547198527],
  [114.28551435470581,30.633407125031308],

  [114.28579330444336,30.632243939694312],
  [114.28802490234375,30.62506142209331],
  [114.3092679977417,30.6126892551944],
  [114.34338569641113,30.590156771775625],
  [114.35441493988037,30.60164529932085],
  [114.34777915477753,30.60768454159257],
  [114.34692084789276,30.606664176176185]
];

var path3 = [
  [114.34620201587677,30.60585618688543],
  [114.34784889221191,30.607716860683496],
  [114.34958159923553,30.606225554254692],
  [114.34966742992401,30.60629481047961],
  // 铁机路沿江大道口
  [114.34384167194366,30.611202642179485],
  [114.34231281280518,30.609245079671872],
  [114.33958768844604,30.606918114275476],
  [114.330575466156,30.596399902671457],
  [114.3265950679779,30.59183765427464],
  [114.3218207359314,30.58536332587456],
  [114.31599497795105,30.57743838101956],
  [114.31446075439453,30.57639460457767],
  [114.3134093284607,30.575286157117766],
  [114.31097388267517,30.570796815344785],
];

// 去行
var route1 = {
  points: {},
  path: null
}

// 回行
var route2 = {
  points: {},
  path: null
}

// 去酒店
var route3 = {
  points: {},
  path: null
}

init();
// initStatus();
polling();

/******************* */
function Overlay(html, position, index, name) {
  this.html = html
  this.index = index;
  this.position = position;
  this.name = name
}

Overlay.prototype = new qq.maps.Overlay();

Overlay.prototype.construct = function() {
  var fragment = document.createDocumentFragment();
  var template = document.createElement('div');
  template.innerHTML = this.html;
  fragment.appendChild(template);
  
  this.div = template.children[0];
  // this.div = template.content.cloneNode(true)
  var divStyle = this.div.style;

  //将dom添加到覆盖物层
  var panes = this.getPanes();
  //设置panes的层级，overlayMouseTarget可接收点击事件
  panes.overlayMouseTarget.appendChild(this.div);

  var self = this;
  this.div.onclick = function() {
      // alert(self.index);
  }
}

Overlay.prototype.draw = function() {
  var overlayProjection = this.getProjection();
  //返回覆盖物容器的相对像素坐标
  var pixel = overlayProjection.fromLatLngToDivPixel(this.position);
  var divStyle = this.div.style;
  if (this.name === 'car') {
    divStyle.left = pixel.x - 48 + "px";
    divStyle.top = pixel.y + 5 + "px";
    if (livingStatus === '2') {
      this.div.className = "car towards-right"
    } else {
      this.div.className = "car"
    }
  } else {
    if (livingStatus === '0' || livingStatus === '1' || this.name !== 'baobao') {
      divStyle.left = pixel.x - 24 + "px";
      divStyle.top = pixel.y - 24 + "px";
    } else {
      divStyle.left = parseInt(jingjing.div.style.left) + 40 + 'px';
      divStyle.top = jingjing.div.style.top;
    }
  }
}

Overlay.prototype.destroy = function() {
  this.div.onclick = null;
  this.div.parentNode.removeChild(this.div);
  this.div = null;
}

var center = map.getCenter();
var baobaoPos = createPos([114.00,30.00]);
var jingjing = new Overlay('<div class="avatar jingjing"></div>',center, 0, 'jingjing');
var baobao = new Overlay('<div class="avatar baobao"></div>', baobaoPos, 1, 'baobao');
var car = new Overlay('<div class="car"></div>', baobaoPos, 1, 'car');
var statusNotice = new Overlay('<div class="status">' +
'<div class="text"></div>' +
'<div class="triangle"></div>' +
'</div>', center, 2, 'status');

jingjing.setMap(map);
baobao.setMap(map);
car.setMap(map);
statusNotice.setMap(map);

/*********************** */

function init() {
  var myLatlng = new qq.maps.LatLng(30.603048948847825, 114.3233871459961);
  var myOptions = {
    zoom: 13,
    center: myLatlng,
    mapTypeId: qq.maps.MapTypeId.ROADMAP
  }
  map = new qq.maps.Map(document.getElementById("map"), myOptions);

  addEvent();
  initLegend();

  route1.path = drawLine(parsePath(path1), '#00aefd');
  var rongqiao = drawMarkerLabel([114.00, 30.0], '起点');
  var flowershop = drawMarkerLabel([114.34599816799164,30.602347126626633], '花店');
  var wife = drawMarkerLabel([114.00,30.00], '新娘家');
  route1.points = {rongqiao: rongqiao, flowershop: flowershop, wife: wife};
  
  route2.path = drawLine(parsePath(path2), '#ff0000');
  var home = drawMarkerLabel([114.34548318386078,30.606719580909186], '新房');
  route2.points = {home: home}

  route3.path = drawLine(parsePath(path3), '#ff9900');
  var hujin = drawMarkerLabel([114.30565774440765,30.562385668216802], '湖锦酒楼');
  route3.points = {hujin: hujin}

  addMarkerClickEvent([rongqiao,flowershop,wife,home,hujin])
}

function addMarkerClickEvent (markers) {
  if (!(markers instanceof Array)) {
    markers = Array(markers)
  }
  markers.forEach(function(marker){
    qq.maps.event.addListener(marker.marker, 'click', function(){
      map.setCenter(marker.pos)
    })
  })
}

function addEvent() {
  qq.maps.event.addListener(
    map,
    'click',
    function(event) {
      console.log('您点击的位置为:[' + event.latLng.getLng() + ',' + event.latLng.getLat() + ']');
      clipboardText = '[' + event.latLng.getLng() + ',' + event.latLng.getLat() + ']';
    }
  );
}

document.addEventListener('copy', function(e){
    e.clipboardData.setData('text/plain', clipboardText);
    e.preventDefault(); 
});

function drawLine(path, color) {
  return new qq.maps.Polyline({
    path: path,
    strokeColor: color,
    strokeWeight: 4,
    map
  });
}

function drawMarkerLabel (pos, name) {
  var marker = new qq.maps.Marker({
    position: createPos(pos),
    map: map
  });

  var label = new qq.maps.Label({
    position: createPos(pos),
    map: map,
    content: name,
    style: {
      backgroundColor: '#ff9000',
      color: '#fff',
      borderColor: '#ff6000' 
    }
  });

  return {marker: marker, label: label, pos: createPos(pos)}
}

function createPos (pos) {
  return new qq.maps.LatLng(pos[1], pos[0])
}

function parsePath (path) {
  return path.map(function(item){
    return createPos(item)
  })
}

function initLegend() {
  document.getElementById('line1-checkbox').addEventListener('change', function(e){
    if (this.checked) {
      route1.path.setVisible(true);
    } else {
      route1.path.setVisible(false);
    }
  })
  document.getElementById('line2-checkbox').addEventListener('change', function(e){
    if (this.checked) {
      route2.path.setVisible(true);
    } else {
      route2.path.setVisible(false);
    }
  })
  document.getElementById('line3-checkbox').addEventListener('change', function(e){
    if (this.checked) {
      route3.path.setVisible(true);
    } else {
      route3.path.setVisible(false);
    }
  })
}

// update position
function update () {
  $.ajax({
    type: 'get',
    url: '/wedding/api/update',
    success: function (data) {
      var pos = data.data[0];
      livingStatus = data.data[0].status;
      jingjing.position = new qq.maps.LatLng(pos.lat, pos.lng);
      car.position = new qq.maps.LatLng(pos.lat, pos.lng);
      jingjing.draw();
      baobao.draw();
      car.draw();
      refreshStatus();
    }
  });
}

function polling(){
  update();
  setTimeout(polling, 15000)
}

function refreshStatus(){
  var text = '';
  switch (livingStatus) {
    case '0': text = '还未出发';break;
    case '1': text = '出发啦';break;
    case '2': text = '接到新娘啦';break;
    case '3': text = '在去酒店途中';
  }
  $('.status .text').html(text);
  $('.btns button').removeClass('active');
  $('.btns button').eq(parseInt(livingStatus)).addClass('active');
  $('.status').css({
    left: parseInt(jingjing.div.style.left) + 40 + 'px',
    top: parseInt(jingjing.div.style.top) -50 + 'px'
  })
  map.setCenter(jingjing.position)
}

function initStatus () {
  var div = document.createDocumentFragment('<div class="status">' +
  '<div class="text"></div>' +
  '<div class="triangle"></div>' +
  '</div>');
}
