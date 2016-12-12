var p = {};
p.init = function() {
	p.initVar();
	p.initCss();

	if(user.currentUser.get('userRole')=='Users'){
		p.id = user.currentUser.id;
		user.checkLogin(p.initData);
	}else{
		p.id = misc.getParam('id');
		p.getUserInfoById(p.id,p.commonCheckLog,p.loadMyActJoinLog);
	}
};
p.initVar = function() {
	mark=0;
	$star_count_log = $('.star-count-log');
};
p.initCss = function() {
	$out_wrap.css("visibility","visible");
};
p.initData = function() {
	p.showMyCheckLog();
	p.loadMyActJoinLog();
};
p.loadMyActJoinLog = function(){
	var query = new AV.Query('ActJoinLog');
	query.equalTo('user',p.id);
	query.find({
		success:function(datas){
			loadingHide();
			var l=datas.length,act_count=0,extra_total=0;
			arr=[];
			if(l>0){
				for (var i = 0; i < l; i++) {
					var obj = datas[i];
					extra_total += obj.get('extra');
					act_count += obj.get('star');
					arr.push([
						'<li data-id="',obj.id,'">',
							'<div class="name">',mark+i+1,'. ',obj.get("activity")[1],'</div>',
							'<div class="marks">',(1+obj.get("extra")),'分</div>',
							'<div class="stars">',obj.get('star'),'星</div>',
						'</li>'
					].join(''))
				}
				$out_wrap.find('.j_mark_count').html(mark+l+extra_total);
				$out_wrap.find('.j_star_count').html(act_count);
				$star_count_log.append(arr.join('')).show();
			}
			else{
				$out_wrap.find('.j_mark_count').html(mark+l);
			}
		},
		error:function(){
			$out_wrap.find('.j_mark_count').html(mark);
		}
	});
};
p.showMyCheckLog = function(){
	if(user.userInfo.get("checkin")[0]=="true"){
		p.commonCheckLog();
	}
};
p.commonCheckLog = function(){
	mark=1;
	$star_count_log.append([
		'<li>',
			'<div class="name">',1,'. 报到</div>',
			'<div class="marks">1分</div>',
			'<div class="stars"></div>',
		'</li>'
	].join('')).show();
};
p.getUserInfoById = function(id,callback1,callback2){
	var query = new AV.Query("Users");
	query.equalTo('pid',id);
	query.first({
	  success: function(data) {
	  	if(data.id){
	  		$('.user-profile')
	  			.append(data.get("username")+'&nbsp;&nbsp;')
	  			.append(data.get("realname")+'<br/>')
	  			.append("单位："+data.get("group")[2]+'<br/>')
	  			.show();
	  		var lo = data.get('location');
	  		if(lo.length>0){
	  			$('.user-profile').append("居委："+lo[2]+'<br/>');
	  		}
	  		data.get("checkin")[0]=="true" && callback1 && callback1();
	  		callback2 && callback2();
	  	}
	  }
	}); 
};