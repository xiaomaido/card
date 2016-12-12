var p = {
	'classname':'Admins'
};
p.init = function() {
	p.initVar();
	p.initCss();
	p.initEvent();
};
p.initVar = function() {
	$j_login_btn = $out_wrap.find('.j_login_btn');
	$j_wait_tip = $out_wrap.find('.j_wait_tip');
	$pwd = $('#pwd');	
	ex = '网络不好，请稍后再试！';
	s = 'sent';
	l = '立即登录';
	jumpUrl = '';
};
p.initCss = function() {
	$out_wrap.css("visibility","visible");
};
p.initEvent = function() {
	$out_wrap.delegate('.j_login_btn', 'click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var $username=$('#username');
		var $password=$('#password');
		if(!$username.val()){
			$username.focus();
			return false;
		}
		if(!$password.val()){
			$password.focus();
			return false;
		}
		if(location.pathname.indexOf('login')>-1){
			btnText($j_login_btn,'正在登录...',0);
			logIn($username.val().toLowerCase(),$password.val());
		}
	});
};

function fillAlert(s,time){
	time = time ? time : 600;
	$j_wait_tip.text(s).show();
	setTimeout(function(){
		$j_wait_tip.hide();
	},time);
}

function logIn(userName,userPwd,url){
	jumpUrl = url || '../../mobile/index/';
	AV.User.logIn(userName, userPwd, {
	  	success: function(user) {
	    	if(user && user.id  && user.get('userRole') == 'Admins'){
    			fillAlert('登录成功!');
				waitRedirect(jumpUrl,1000);
	    	}
	    	else{
	    		AV.User.logOut();
	    		fillAlert('账号登录异常!');
	    		$j_login_btn.html(l);
	    	}
	  	},
	  	error: function(user, error) {
	  		fillAlert(errorEnum[error.code]['msg']);
			btnText($j_login_btn,l);
	  	}
	});
}

