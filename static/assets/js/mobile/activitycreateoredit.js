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
	activity={};
	activity.id = misc.getParam('id')||'';
	$create_confirm_btn = $('.create-confirm-btn');
	$textarea = $('textarea');;
	enable = true;
};
p.initCss = function() {
	$out_wrap.css("visibility","visible");
};
p.initEvent = function(){
	$('body').delegate('.isShow', 'click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var $this = $(this);
		if(!$this.hasClass('green')){
			if(confirm('确认下线该活动？')){
				activity.set('isShow','0');
				activity.save().then(function(){
					$('.isShow').prev('i').html('未上线');
					$('.isShow').html('上线').addClass('green');
		        }, function(){
			    	enable = !enable;
					$('.isShow').html('下线失败');
					btnText($('.isShow'),'下线');
		        });
			}
		}
		else{
			if(confirm('确认上线该活动？')){
				activity.set('isShow','1');
				activity.save().then(function(){
					$('.isShow').prev('i').html('已上线');
					$('.isShow').html('下线').removeClass('green');

		        }, function(){
			    	enable = !enable;
					$('.isShow').html('上线失败');
					btnText($('.isShow'),'上线');
		        });
			}
		}
	});
	$('body').delegate('.isDelete', 'click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var $this = $(this);
		if($this.hasClass('green')){
			if(confirm('确认撤销删除该活动？')){
				activity.set('isDelete','0');
				activity.save().then(function(){
					$('.isDelete').html('撤销成功');
					btnText($('.isDelete'),'点此删除');
					$('.isDelete').removeClass('green');
		        }, function(){
			    	enable = !enable;
					$('.isDelete').html('撤销失败');
					btnText($('.isDelete'),'点此撤销');
		        });
			}
		}
		else{
			if(confirm('不可恢复哦，确认删除该活动？')){
				activity.set('isDelete','1');
				activity.save().then(function(){
					$('.isDelete').html('删除成功');
					redirect('../activities/');
					// btnText($('.isDelete'),'撤销');
					// $('.isDelete').addClass('green');

		        }, function(){
			    	enable = !enable;
					$('.isDelete').html('删除失败');
					btnText($('.isDelete'),'点此删除');
		        });
			}
		}
	});
	$create_confirm_btn.on('click',function(e){
		e.preventDefault();
		e.stopPropagation();
		var v0 = $.trim($textarea.eq(0).val()),
		v1 = $.trim($textarea.eq(1).val());
		if(activity.id){
			// 修改
		    activity.set('title',v0);
		    activity.set('content',v1);
			activity.save().then(function(){
				$create_confirm_btn.html('修改成功');
				btnText($create_confirm_btn,'提交保存');
	        }, function(){
		    	enable = !enable;
				$create_confirm_btn.html('修改失败');
				btnText($create_confirm_btn,'提交保存');
	        });
		}else{
			// 创建
			if(enable && v0 && v1){
				enable = false;
				var Activity = AV.Object.extend(p['classname']);
			    var act = new Activity();
		        act.set('title',v0);
		        act.set('content',v1);
		        act.set('admin',[
		        	user.currentUser.id,
		        	user.userInfo.get('username'),
		        	user.userInfo.get('name'),
		        	user.userInfo.get('type')
		        ]);
			    act.save().then(function(data){
			    	activity=data;
					$create_confirm_btn.html('创建成功');
					btnText($create_confirm_btn,'提交保存');
					p.doHtml();
					// redirect('../activitycreateoredit/?data')
					
		        }, function(){
			    	enable = !enable;
					$create_confirm_btn.html('创建失败');
					btnText($create_confirm_btn,'提交保存');
		        });
			}
			else{
				$create_confirm_btn.html('请填写完整活动数据');
				btnText($create_confirm_btn,'提交保存');
			}
		}
	});
};
p.initData = function(){
	if(activity.id){
		var query = new AV.Query(p['classname']);
		query.get(activity.id,{
			success:function(data){
				activity=data;
				p.doHtml();
			},
			error:function(data){
				alert('活动不存在哦');
			}
		});
	}
};
p.doHtml = function(){
	if(activity && activity.id){
		$textarea.eq(0).val(activity.get("title"));
		$textarea.eq(1).val(activity.get("content"));
		
		// if(activity.get("isDelete")=="1"){
		// 	$('.j_is_delete').append('是否删除：<i>已删除</i><span class="btnn green isDelete">撤销删除</span>');
		// }
		// else{
			if(activity.get("isShow")=="1"){
				$('.j_is_show').append('是否上线：<i>已上线</i><span class="btnn isShow">下线</span>');
			}
			else{
				$('.j_is_show').append('是否上线：<i>未上线</i><span class="btnn green isShow">上线</span>');
			}

			$('.j_is_delete').append('是否删除：<i>未删除</i><span class="btnn isDelete">删除</span>');
		// }
	}else{
		alert('活动不存在哦');
	}
};