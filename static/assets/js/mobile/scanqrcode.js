var p = {};
p.init = function() {
	p.initVar();
	p.initCss();
	user.checkLogin(p.initData);
	p.initEvent();
};
p.initVar = function() {
	id = misc.getParam('id');
	$propertys = $('.Users .property');
	activities = [];
	_user={};
	enable=checkIn=false;
};
p.initCss = function() {
	$out_wrap.css("visibility","visible");
};
p.initData = function() {
	loadingHide();
	if(!id){
		$out_wrap.find('.profile-box').html('<div style="width:100%;text-align:center;margin-top:30px;"">查无此人</div>');
		return false;
	}
	if(user.currentUser.get('userRole')=="Admins"){
		p.loadUserById(p.renderUserInfo); //查看用户资料
	}else{
		$out_wrap.find('.profile-box').html('<div style="width:100%;text-align:center;margin-top:30px;"">请交给管理员扫描</div>');
	} 
};
p.loadUserById = function(callback){
	var query = new AV.Query('Users');
	query.equalTo('pid',id);
	query.equalTo('isShow','1');
	query.first({
	  success: function(data) {
	  	_user = data;
	  	if(_user && _user.id){
	  		_user.attributes['age']=misc.getAge(_user.get('birth'));
	  		_user.attributes['arole']=_user.get('political')=="团员"?(_user.attributes['age']<=28?'团员':'青年'):_user.get('political').replace(/[S]/gm, '');
	  		p.loadActJoinLog(callback);
	  	}else{
			$out_wrap.find('.profile-box').html('<div style="width:100%;text-align:center;margin-top:30px;"">查无此人！</div>');
		}
	  },
	  error:function(){
		$out_wrap.append('当前网络不好哦');
	  }
	}); 
};
p.renderUserInfo = function(){
	var obj = _user;
	$propertys.eq(0).append(obj.get('username'));
	$propertys.eq(1).append(obj.get('realname'));
	$propertys.eq(2).append(obj.get('sex'));
	$propertys.eq(3).append(obj.get('age')+'岁');
	$propertys.eq(4).append(obj.get('arole'));
	$propertys.eq(5).append(obj.get('job'));
	$propertys.eq(6).append(obj.get('group')[2]||'无');
	$propertys.eq(7).append(obj.get('location')[2]||'无');
	$propertys.eq(8).append(obj.get('checkin')[0]=="true"?'已报到':'未报到').css('color',obj.get('checkin')[0]=="true"?'green':'red');
	if(obj.get('checkin')[0]!=="true"){//未报到
		var temp='';
		if(obj.get('location')[0]==user.currentUser.id){// 用户的所在居委是当前用户
			checkIn=true;
			temp='<span class="check-in-btn j_save_checkin">点此报到</span>';
		}
		else if(!obj.get('location')[0] && obj.get('group')[0]==user.currentUser.id){ //用户没有居委，用户的所在单位是当前用户
			checkIn=true;
			temp='<span class="check-in-btn j_save_checkin">点此报到</span>';
		}
		$propertys.eq(8).append(temp);
	}
	$('.Users').show();
	p.loadActivities();
};
p.loadActivities = function(){
	var query = new AV.Query('Activities');
	query.equalTo('isShow',"1");
	query.notEqualTo('isDelete',"1");
	query.equalTo('admin',user.currentUser.id);
	query.find({
		success:function(datas){
			activities = datas;
			var l = datas.length;
			if(l>0){
				var arr = [
					'<select class="activitiy-select j_activitiy_select">',
					'<option value="" selected="selected">请选择所参加的活动</option>'
				];
				for (var i = datas.length-1; i>=0; i--) {
					var obj=datas[i],isNotJoin=true;
					for (var j = 0,len = actJoinLog.length; j < len; j++) {
						if(obj.id == actJoinLog[j].get('activity')[0]){
							isNotJoin = false;
							break;
						}
					}
					isNotJoin && arr.push('<option value=',obj.id,'>',obj.get("title"),'</option>');
					// isNotJoin && arr.push('<option value=',[obj.id,obj.get("title"),obj.get("admin")].join('-'),'>',obj.get("title"),'</option>');
				}
				arr.push('</select>');
				arr.push([
					'<select class="activitiy-select j_star_select">',
					'<option value="" selected="selected">请选择评分星级</option>',
					'<option value="5">5星</option>',
					'<option value="4">4星</option>',
					'<option value="3">3星</option>',
					'<option value="2">2星</option>',
					'<option value="1">1星</option>',
					'</select>'
				].join(''));
				arr.push('<div class="save-btn j_save">提交</div>');
				if(arr.length==5) return false;
				$out_wrap.find('.profile-box').append(arr.join(''));
				enable = true;
			}
		},
		error:function(){
			$out_wrap.append('当前网络不好哦');
		}
	});
};
p.saveActJoinLog = function(value1,value2){
	// var activityArr=value1.split('-');// 0: actId, 1:actName, 2:admin
	var activityArr = activities.filter(function(d){ return d.id == value1 });
	var ActJoinLog = AV.Object.extend('ActJoinLog');
    var actJL = new ActJoinLog();
    actJL.set('star',value2);
    actJL.set('activity',[
    	activityArr[0].id,
    	activityArr[0].get("title")
    ]);
    // var admin = activityArr[0].get("admin").split(',');
    var admin = activityArr[0].get("admin");
    actJL.set('admin',admin);
    actJL.set('user',[
    	_user.get('pid'),
    	_user.get('username'),
    	_user.get('realname'),
    	_user.get('sex'),
    	_user.get('job'),
    	_user.get('mobile'),
    	_user.get('political')
    ]);
    var flag=false;
    if(_user.get("group").length>0){
    	actJL.set("userGroupArr",_user.get("group"));
    	flag = (admin[0]==_user.get("group")[0]);
    }
    if(_user.get("location").length>0){
    	actJL.set("userLocationArr",_user.get("location"));
    	flag = flag || (admin[0]==_user.get("location")[0]);
    }
    actJL.set('isInner',flag);
    var $this = $('.j_save');
    actJL.save().then(function(){
		var query = new AV.Query('Activities');
	    query.get(activityArr[0].id, {
            success: function(data) {
	            data.increment("joinnum");
	            data.save().then(function(){
					$this.html('提交成功');
	            }, function(){

	            });
            }
	    });
    }, function(){
    	enable = true;
		$this.html('提交失败');
		btnText($this,'重新提交');
    });
};
p.loadActJoinLog = function(callback){
	var query = new AV.Query('ActJoinLog');
	query.equalTo('user',_user.get('pid'));
	query.equalTo('admin',user.userInfo.get('pid'));
	query.find({
		success:function(datas){
			actJoinLog = datas;
	  		callback && callback();
		},
		error:function(){

		}
	});
};
p.initEvent = function(){
	$out_wrap.delegate('.j_save', 'click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var $selects = $('select.activitiy-select');
		var v0 = $.trim($selects.eq(0).val()),
		v1 = $.trim($selects.eq(1).val());
		if(enable){
			if(!v0){
				$selects.eq(0).focus();
			} else if(!v1){
				$selects.eq(1).focus();
			} else{
				enable = false;
				p.saveActJoinLog(v0,parseInt(v1));
			}
		}
	});
	$out_wrap.delegate('.j_save_checkin', 'click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		checkIn && p.saveCheckIn();
	});
};

p.saveCheckIn = function(){
    checkIn=false;
    var $this = $('.j_save_checkin');
    var cd = new Date();
    var checkinArr = [];
    checkinArr.push("true");
    checkinArr.push(misc.formatDateTime(cd,misc.formatType['5']));
    checkinArr.push(misc.formatDateTime(cd,misc.formatType['6']));
    checkinArr.push(misc.formatDateTime(cd,misc.formatType['7']));
    checkinArr.push(misc.formatDateTime(cd,misc.formatType['8']));
    _user.set("checkin",checkinArr);
    _user.save().then(function(){
		$this.html('报到成功');
		$this.parent().css('color','green').html('<label>状态：</label>已报到');
    }, function(){
    	checkIn = true;
		$this.html('报到失败');
		btnText($this,'重新报到');
    });
};