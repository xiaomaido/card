var p = {
  'className': 'Users',
  'page': 1,
  'size': 5
};
p.init = function(){
  p.page = misc.getParam('page') || 1;
  $j_pagenation = $('.j_pagenation');
  if(userObj.currentUser.get("userRole")=="Admins"){
    userObj.loadByPID('Admins',userObj.currentUser.id,function(data){
      if(data.id){
        p.admin = data;
        var op_str="";
        if(p.admin.get("type")=="location"){
          op_str='<option value="group">单位</option>';
        }else{
          op_str='<option value="location">居委会</option>';
        }
        $('.search-type').append(op_str);
      }
    });
  }else{
    p.admin=userObj.currentUser;
    var op_str="";
    op_str+='<option value="group">单位</option>';
    op_str+='<option value="location">居委会</option>';
    $('.search-type').append(op_str);
  }
  p.initEvent();
};
p.clearTablePages = function(){
    $j_pagenation.html('');
    $('#datatable tbody').html('');
};
p.loadUserById = function(ids){
  if(ids.length==0){
    p.clearTablePages();
    return false;
  }
  var query = new AV.Query(p.className);
  query.containedIn('pid',ids);
  var searchType = $('.search-type').val(),
      searchWord = $.trim($('#search-word').val());
  searchWord && query.startsWith(searchType,searchWord.toLowerCase());
  // searchWord && query.equalTo(searchType,searchWord.toLowerCase());
  query.count({
    success: function(data){
      p.maxPage = Math.ceil(data/p.size);
      $('#maxCount').text(data);
    }
  });
  query.descending("createdAt");
  query.limit(p['size']);
  query.skip((p['page']-1)*p['size']);
  query.find().then(function(datas) {
      $('#datatable tbody').html(p.htmlDatas(datas));
      operateEvent();
      p.maxPage>=1 && $j_pagenation.show() && p.loadPagination();
  }, function(error) {

  });

};
p.loadPagination = function(){
  $('.pages').remove();
  $j_pagenation.append(pagestyle);
  pg.pageCount = p.maxPage; // 定义总页数(必要)
  pg.argName = 'page';  // 定义参数名(可选,默认为page)
  pg.element = $j_pagenation; // 文本渲染在那个标签里面
  pg.printHtml(1);
};
p.initEvent = function(){
  $('#search').on('click', function (e) {
      e.preventDefault();
      var searchWord = $.trim($('#search-word').val());
      if(searchWord){
        p.loadUsersByArrayKey(p.admin.get("type"),userObj.currentUser.id,p.showUsers);
      }
  });
  $('.j_show_persons').on('click', function (e) {
      e.preventDefault();
      p.checkin="";
      // $('#search-word').val('');
      p.page=1;
      p.loadUsersByArrayKey(p.admin.get("type"),userObj.currentUser.id,p.showUsers);
  });
  $('.j_check_in').on('click', function (e) {
      e.preventDefault();
      p.checkin="checkin";
      // $('#search-word').val('');
      p.page=1;
      p.loadUsersByArrayKey(p.admin.get("type"),userObj.currentUser.id,p.showUsers);
      // p.loadUserById([]);
      // if(!p.checkInUsers){
      //   p.loadCheckInUsersByAdminId(userObj.currentUser.id,p.showCheckIn);
      // }else{
      //   p.showCheckIn();
      // }
  });
  $('.j_uncheck_in').on('click', function (e) {
      e.preventDefault();
      p.checkin="uncheckin";
      // $('#search-word').val('');
      p.page=1;
      p.loadUsersByArrayKey(p.admin.get("type"),userObj.currentUser.id,p.showUsers);
      // if(!p.checkInUsers){
      //   p.loadCheckInUsersByAdminId(userObj.currentUser.id,undefined,p.showUnCheckIn);
      // }else{
      //   p.showUnCheckIn();
      // }
  });
  $('.j_btn').on('click', function (e) {
      e.preventDefault();
      var $this = $(this);
      p.btn = $this.index();
      $this.siblings().removeClass('beclick');
      $this.addClass('beclick');
      $this.blur();
  });
};
p.loadUsersByArrayKey= function(type,adminId,cb){
  var query = new AV.Query('Users');
  query.equalTo("isShow","1");
  var searchType = $('.search-type').val(),
      searchWord = $.trim($('#search-word').val());
  searchWord && query.startsWith(searchType,searchWord.toLowerCase());
  if(p.checkin=="checkin"){
    query.equalTo("checkin","true");
  }else if(p.checkin=="uncheckin"){
    query.notEqualTo("checkin","true");
  }
  type && query.equalTo(type, adminId);
  query.count({
    success: function(data){
      p.maxPage = Math.ceil(data/p.size);
      $('#maxCount').text(data);
    }
  });
  query.ascending("flagNumber");
  // query.ascending("pid");
  // query.descending("createdAt");
  query.limit(p['size']);
  query.skip((p['page']-1)*p['size']);
  query.find().then(function(datas){
    if(datas && datas.length>0){
      cb && cb(datas);
    }
    else{
      p.clearTablePages();
    }
  }, function(error){
    alert('query error')
  });
}
p.getCheckInUserIds = function(){
  p.unCheckInUserIds = userIds.map(function(data, index) {
    if(checkInUserIds.indexOf(data)==-1)
      return data;
  });
};
p.showUnCheckIn = function(){
  if(!p.unCheckInUserIds){
    p.getCheckInUserIds();
  }
  p.loadUserById(p.unCheckInUserIds);
};
p.showCheckIn = function(){
  var datas = p.checkInUsers,
      l = datas.length;
  var arrHtml = [];
  if(l==0){
    arrHtml = [
          '<h3>暂无已报到人员</h3>'
    ];
  }
  else{
    arrHtml = [
          '<h3>已报到人员名单</h3>'
    ];
    arrHtml.push('<ul class="users-list">');
    for (var i = 0; i < l; i++) {
      arrHtml.push([
          '<li>',
            '<div style="width:15%;text-align:center;">',i+1,'.</div>',
            '<a target="_blank" href="./user.html?id=',datas[i].get("userId"),'#user"><div style="width:25%;">',datas[i].get("userRealName"),'</div></a>',
            '<div style="width:60%;">',misc.formatDateTime(datas[i].createdAt,userObj.format),'</div>',
          '</li>',            
            // $('.createdAt').text(misc.formatDateTime(obj['createdAt'],userObj.format));
      ].join(''));
    }
    arrHtml.push('</ul');
  }
  Tools.UseModal([],'关闭',arrHtml.join(''),{
      'width': 700,
      'height': 480,
      'margin-left':-350,
      'margin-top':-200,
      'position': 'fixed',
      'left': '50%',
      'top': '50%',
  });
  $('.modal-footer').remove();
  $('.modal-body').css('margin-bottom', '50px');
};
p.loadCheckInUsersByAdminId = function(adminId,checkInFunc,unCheckInFunc){
  var query = new AV.Query('CheckInLog');
  query.limit(1000);
  query.equalTo('adminId',adminId);
  query.descending('createdAt');
  query.find().then(function(datas) {
    p.checkInUsers = datas;
    checkInUserIds = datas.map(function(data, index) {
      return data.get('userId');
    });
    checkInFunc && checkInFunc();
    unCheckInFunc && unCheckInFunc();
  }, function(error) {

  });
};
p.htmlDatas = function(datas){
  var arr = [];
  for(var i=0,l=datas.length;i<l;i++){
    arr.push(htmlRow(datas[i]));
  }
  return arr.join('');
};
function htmlRow(data){
    var cki = data.get("checkin"),
    cki_str = cki.length>1?[cki[1],"-",cki[2],"-",cki[3]," ",cki[4]].join(""):"未报到";
    return ['<tr data-id="',data.id,'" data-pid="',data.get("pid"),'">',
              '<td>',data.get("flagNumber"),'</td>',
              '<td class="j_starmark">',data.get("username"),'</td>',
              '<td class="j_view" style="color:#4b8df8;cursor:pointer;max-width: 60px;">',data.get("realname"),'</td>',
              '<td>',data.get("sex")=="男"?"男":"女",'</td>',
              '<td>',data.get("idcard"),'</td>',
              '<td style="max-width:100px;">',data.get("mobile"),'</td>',
              '<td>',data.get("political")=="团员"?(misc.getAge(data.get('birth'))<=28 ?"团员":'青年'):data.get("political").replace('S',''),'</td>',
              '<td style="max-width:120px;">',data.get("job"),'</td>',
              '<td>',(data.get(p.admin.get("type")=="group"?"location":"group")[2]||"暂无"),'</td>',
              '<td>',cki_str,'</td>',
            '</tr>'].join('');
}
function operateEvent(){
    $('#datatable .j_view').off().on('click', function (e) {
        e.preventDefault();
        window.open('user.html?id='+$(this).parent().attr('data-pid')+'#user');
    });
    $('#datatable .j_starmark').off().on('click', function (e) {
        e.preventDefault();
        window.open('/card/mobile/starandmark/?id='+$(this).parent().attr('data-pid')+'#user');
    });
}

p.showUsers = function(datas){
  $('#datatable tbody').html(p.htmlDatas(datas));
  operateEvent();
  p.maxPage>=1 && $j_pagenation.show() && p.loadPagination();
};
// 重写分页函数
showPages.prototype.toPage = function(page){ //页面跳转
 var turnTo = 1;
 if (typeof(page) == 'object') {
  turnTo = page.options[page.selectedIndex].value;
 } else {
  turnTo = page;
 }
 p.page = turnTo;
 p.loadUsersByArrayKey(p.admin.get("type"),userObj.currentUser.id,p.showUsers);
 // if(p.btn == '1'){
 //  p.loadUsersByArrayKey(p.admin.get("type"),userObj.currentUser.id,p.showUsers);
 // }
 // else if(p.btn == '2'){
 //  p.loadUsersByArrayKey(p.admin.get("type"),userObj.currentUser.id,p.showUsers);
 // }
 // else{
 //  p.loadUsersByArrayKey(p.admin.get("type"),userObj.currentUser.id,p.showUsers);
 // }
 // self.location.href = this.createUrl(turnTo);
};
showPages.prototype.printHtml = function(mode){ //显示html代码
 this.page = p.page ? p.page : 1;
 // this.getPage();
 this.checkPages();
 this.showTimes += 1;
 this.element.append('<div id="pages_' + this.name + '_' + this.showTimes + '" class="pages"></div>');
 document.getElementById('pages_' + this.name + '_' + this.showTimes).innerHTML = this.createHtml(mode);
};
