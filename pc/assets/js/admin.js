var p = {
  'className': 'Admins'
};
p.init = function(){
  p.initVar();
  p.loadDatas();
  p.initEvent();
};
p.initVar = function(){
  obj = {};
  obj.pid = misc.getParam('id') || userObj.currentUser.id;
};
p.loadDatas = function(){
  var query = new AV.Query(p.className);
  query.equalTo("pid",obj.pid);
  query.find({
    success: function(datas){
      obj = datas[0];
      if(obj && obj.id){
          // $('.createdAt').text(misc.formatDateTime(obj['createdAt'],userObj.format));
          // $('.updatedAt').text(misc.formatDateTime(obj['updatedAt'],userObj.format));
          $('.name').val(obj.get('name'));
          $('.type').val(obj.get('type'));
          $('.tel').val(obj.get('tel'));
          $('.mobile').val(obj.get('mobile'));
          $('.address').val(obj.get('address'));
          $('.username').val(obj.get('username'));
          $('.person').val(obj.get('person'));
      }
      else{
          alert('该账号不存在');
          return false;
      }
    },
    error: function(user, error) {
      alert('网络不给力哦');
    }
  });  
};

p.initEvent = function(){
  $('.j_btn_modify').on('click',function(e){
    e.stopPropagation();
    e.preventDefault();
    var span_el = $(this).siblings('span').first();
    var query = new AV.Query(p.className);
    query.get(obj.id, {
        success: function(data) {
          data.set('tel',$.trim($('.tel').val()));
          data.set('mobile',$.trim($('.mobile').val()));
          data.set('address',$.trim($('.address').val()));
          data.set('person',$.trim($('.person').val()));

          data.save(null,{
            success: function(d){
              span_el.text('修改成功').show().fadeOut(800);
            },
            error: function(d, error) {
              span_el.text('修改失败').show().fadeOut(800);
            }
          });
        },
        error: function(shop, error) {   
          span_el.text('修改失败').show().fadeOut(800);
        }
    });
  });
};

