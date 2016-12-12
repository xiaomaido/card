var p = {
	'classname':'Activities',
	'classname2':'ActRegistration'
};
var query2 = undefined;
p.init = function() {
	p.initVar();
	p.initCss();
	user.checkLogin(p.initData);
};
p.initVar = function(){
	$box = $('.box');
	id = misc.getParam('id');
	activity = {};
	p.size=10;
	p.page=0;
};
p.initCss = function() {
	$out_wrap.css("visibility","visible");
};
p.lateEvent = function(type){
	if(type==1){
		enable = true;
		$out_wrap.delegate('.j_join', 'click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			var $this = $(this);
			if(user.currentUser.get('userRole')=='Users' && enable){
				enable = false;
				var ActRegistration = AV.Object.extend(p['classname2']);
			    var actReg = new ActRegistration();
		        actReg.set('admin',activity.get('admin'));
		        actReg.set('activity',[
		        	activity.id,
		        	activity.get("title")
		        ]);
		        actReg.set('user',[
		        	user.userInfo.get('pid'),
		        	user.userInfo.get('username'),
		        	user.userInfo.get('realname'),
		        	user.userInfo.get('sex'),
		        	user.userInfo.get('job'),
		        	user.userInfo.get('mobile'),
		        	user.userInfo.get('political')
		        ]);
		        var flag=false;
		        if(user.userInfo.get('group').length>0){
		        	actReg.set('userGroupArr',user.userInfo.get('group'));
		        	flag = (activity.get('admin')[0]==user.userInfo.get('group')[0]);
		        }
		        if(user.userInfo.get('location').length>0){
		        	actReg.set('userLocationArr',user.userInfo.get('location'));
		        	flag = (activity.get('admin')[0]==user.userInfo.get('location')[0]);
		        }
		        actReg.set('isInner',flag);
			    actReg.save().then(function(){
					$this.html('报名成功');
					setTimeout(function(){
						window.location.reload();
					},300);
		        }, function(){
			    	enable = true;
					$this.html('报名失败');
					btnText($this,'重新报名');
		        });
			}
		});
	}
};
p.initData = function(){
	p.loadActivity();
};
p.loadActivity = function(){
	var q = new AV.Query(p['classname']);
	q.get(id,{
		success: function(data) {
			activity = data;
			loadingHide();
			if(activity && activity.id){
				$box.find('.title').append(activity.get('title'));
				$box.find('.date').append(misc.formatDateTime(activity.createdAt,misc.formatType["3"]));
				var pArr = activity.get('content').split('-b');
				for (var i = 0,l = pArr.length; i < l; i++) {
					$box.find('.content').append('<p>'+pArr[i]+'</p>');
				}
				renderingByRole();
		  	}
		  	else{
		  		alert('当前活动不存在！');
		  	}
	   	},
	    error: function(data) {
	  		alert('当前网络不给力哦！');
	    }
	}); 
};
function renderingByRole(){
	var query = new AV.Query(p['classname2']);
	query.equalTo('activity',activity.id);
	query.count().then(function(count) { //活动参与总人数
	  	count>0 && $out_wrap.find('.j_join_count').html(count);
	}, function(error) {
	  	
	});
	if(user.currentUser.get('userRole')=='Admins' && user.currentUser.id==activity.get('admin')[0]){
		$out_wrap.append([
			'<div class="thinner-border" style="width:90%;margin:0 auto;"></div>',
			'<div class="comments-title j_reply">',
				'<span class="count">报名人员列表</span>',
			'</div>',
			'<div class="comments">',
				'<ul class="list j_join_list"></ul>',
				'<div class="clearboth"></div>',
			'</div>',
			'<div class="more j_loadmore" style="border:none;"><img class="loading-img" src="../../static/assets/images/mobile/loading.jpg"><span>正在加载...</span></div>',
			'<div class="edit-btn" onclick="location.href=',("'../activitycreateoredit/?id="+activity.id+"'"),'" ><p style="margin-top:.5rem">修改</p><p>活动</p></div>',
		].join(''));
		query2 = query;
		p.ActRegistration(query);
	}
	else if(user.currentUser.get('userRole')=='Users'){
		query.equalTo('user',user.currentUser.id);
		query.count().then(function(count) { //该用户是否参与活动
		  if(count>0){
		  	$out_wrap.addClass('pBottom25').append('<div class="join-btn maxWidth">已报名</div>');
		  }else{
		  	$out_wrap.addClass('pBottom25').append('<div class="join-btn maxWidth j_join">我要报名</div>');
			p.lateEvent(1,activity);
		  }
		}, function(error) {
		  	
		});
	}
}
p.ActRegistration = function(query){
	query.descending("createdAt");
	query.limit(p.size);
	query.skip(p.page*p.size);
	query.find({
		success: function(datas) {
			if(datas && datas.length>0){
				var arrHtml = [];
				for (var i = 0,l = datas.length; i < l; i++) {
					arrHtml.push(p.liHtml(datas[i],i+1));
				};
				$out_wrap.find('ul.j_join_list').append(arrHtml.join(''));
				

				p['page']++;
				if(datas.length < p['size']){
		  			$('.j_loadmore').html('已加载完所有数据');
				}
		  	}
		  	else if(p.page>0){
		  		$('.j_loadmore').html('已加载完所有数据');
		  	}
		  	else{
		  		$('.j_loadmore').html('暂无报名人员');
		  	}
	   	},
	    error: function(data) {
	  		$('.j_loadmore').html('当前网络不给力哦！');
	    }
	});
};
p.liHtml = function(obj,number){
	return [
		'<li class="">',
			'<div class="user-name">',p.page*p.size+number,'. ',obj.get('user')[2]||"暂无",' ',obj.get('user')[3]||"暂无",' ',obj.get('user')[4]||"暂无",' ',obj.get('userGroupArr')[2].replace('崇明县','')||"暂无",' ',obj.get('userLocationArr')[2]||"暂无",'</div>',
			'<div class="createAt">',misc.formatDateTime(obj.createdAt,misc.formatType['4']),'</div>',
		'</li>'
	].join('');
};
window.onscroll = function () { 
    if (getScrollTop() + getClientHeight() == getScrollHeight()) { 
		p.ActRegistration(query2||new AV.Query(p['classname2']));
    } 
} 