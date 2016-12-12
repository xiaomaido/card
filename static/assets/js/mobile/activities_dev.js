var p = {
	'classname':'Activities'
};
p.init = function() {
	p.initVar();
	p.initCss();
	user.checkLogin(p.initData);
	p.initEvent();
};
p.initVar = function(){
	$j_activities_box = $('.j_activities_box');
	$j_create_btn = $('.j_create_btn');
	$j_loadmore = $('.j_loadmore');
	activities = [];
	p.size=8;
	p.page=0;
};
p.initCss = function() {
	$out_wrap.css("visibility","visible");
	if(user.currentUser.get('userRole')=='Admins'){
		// $j_activities_box.addClass('pBottom25');
		$j_create_btn.show();
	}
};
p.initEvent = function(){
	$j_activities_box.delegate('li', 'click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		location.href='../activity/?id='+$(this).attr('data-id');
	});
	$j_create_btn.on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		location.href='../activitycreateoredit/';
	});
};
p.initData = function(){
	 p.loadActivities();
};
p.loadActivities = function(){
	var query = new AV.Query(p['classname']);
	query.notEqualTo("isDelete","1");
	query.notEqualTo("isShow","0");
	query.descending("createdAt");
	query.limit(p.size);
	query.skip(p.page*p.size);
	query.find({
		success: function(datas) {
			activities = datas;
			if(activities && activities.length>0){
				var arrHtml = [];
				for (var i = 0,l = activities.length; i < l; i++) {
					arrHtml.push(p.liHtml(activities[i],i+1));
				};
				$j_activities_box.find('ul.j_activities').append(arrHtml.join(''));
				p['page']++;
				if(activities.length < p['size']){
		  			$j_loadmore.html('已加载完所有活动');
				}
		  	}
		  	else if(p.page==0){
		  		$j_loadmore.html('当前还没有活动');
		  	}
		  	else{
		  		$j_loadmore.html('已加载完所有活动');
		  	}
	   	},
	    error: function(data) {
	  		$j_loadmore.html('当前网络不给力哦！');
	    }
	}); 
};
p.liHtml = function(obj,number){
	return [
		'<li class="thinner-border" data-id="',obj.id,'">',
			'<div class="userarea j_view">',
			'<div class="userinfo">',
				'<div class="objname">',(p.page*p.size)+number,'、',obj.get("title"),'</div>',
				'<div class="usersepcial">',obj.get("content").replace(/-b/g,' '),'</div>',
				'<ul class="usertags" style="left: 0.7rem;">',
					'<li style="margin-right: .25rem;"><img src="../../static/assets/images/mobile/broadcast1.png" class="desc-tag-img" style="width: 1rem;height: auto;top: 0.05rem;"></li>',
					'<li>',obj.get("admin")[2],'</li>',
				'</ul>',
				'<ul class="usertags">',
					'<li><img src="../../static/assets/images/mobile/iconfont-rili.png" class="desc-tag-img"></li>',
					'<li>',misc.formatDateTime(obj.createdAt,misc.formatType["9"]),'</li>',
				'</ul>',
			'</div>',
			'<div class="follow j_follow"><span style="top: 1.75rem;position: relative;">查看详情</span></div></div>',
		'</li>'
	].join('');
	// return [
	// 	'<li class="thinner-border" data-id="',obj.id,'">',
	// 		'<div class="userarea j_view">',
	// 			'<div class="userinfo">',
	// 				'<div class="objname">',(p.page*p.size)+number,'、',obj.get("title"),'</div>',
	// 				'<div class="usersepcial">',obj.get("content").replace(/-b/g,' '),'</div>',
	// 				'<ul class="usertags">',
	// 					'<li><img src="../../static/assets/images/mobile/iconfont-rili.png" class="desc-tag-img"></li>',
	// 					'<li>',misc.formatDateTime(obj.createdAt,misc.formatType["9"]),'</li>',
	// 				'</ul>',
	// 			'</div>',
	// 			'<div class="follow j_follow"><span style="top: 1.75rem;position: relative;">查看详情</span></div>',
	// 		'</div>',
	// 	'</li>'
	// ].join('');
};


window.onscroll = function () { 
   if (getScrollTop() + getClientHeight() == getScrollHeight()) { 
		p.loadActivities();
   } 
} 
