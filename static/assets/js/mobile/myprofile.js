var p = {
	'classname':'',
	'valued':'valued'
};
p.init = function() {
	p.initVar();
	p.initCss();
	user.checkLogin(p.initData);
};
p.initVar = function(){
	userRole = user.currentUser.get('userRole');
	$propertys = $('.'+userRole+' .property');
};
p.initCss = function() {
	menuHtml('shop1','mee');
	$out_wrap.css("visibility","visible");
};
p.initData = function(){
	loadingHide();
	var userRole = user.currentUser.get('userRole');
	$('.'+userRole).show();
	if(userRole=='Users'){
		p.showMyQRCode();
		$propertys.eq(0).append(user.userInfo.get('username'));
		$propertys.eq(1).append(user.userInfo.get('realname'));
		$propertys.eq(2).append(user.userInfo.get('sex'));
		$propertys.eq(3).append(user.userInfo.get('age')+'岁');
		$propertys.eq(4).append(misc.formatDateTime(user.userInfo.get('birth'),misc.formatType['1']));
		$propertys.eq(5).append(user.userInfo.get('arole'));
		$propertys.eq(6).append(user.userInfo.get('job'));
		$propertys.eq(7).append(user.userInfo.get('group')[2]||'无');
		$propertys.eq(8).append(user.userInfo.get('location')[2]||'无');
		$propertys.eq(9).append(user.userInfo.get('address').replace('上海市崇明县',''));
		$propertys.eq(10).append(user.userInfo.get('checkin')[0]=="true"?'已报到':'未报到').css('color',user.userInfo.get('checkin')[0]=="true"?'green':'red');
	}
	else if(userRole=='Admins'){
		$propertys.eq(0).append(user.userInfo.get('username'));
		$propertys.eq(1).append(user.userInfo.get('name'));
		$propertys.eq(2).append(user.userInfo.get('person'));
		$propertys.eq(3).append(user.userInfo.get('mobile'));
		$propertys.eq(4).append(user.userInfo.get('tel'));
		$propertys.eq(5).append(user.userInfo.get('address'));
	}
};
p.showMyQRCode = function(){
	qrcodeEle = document.getElementById("qrcode");
    var qrcode = new QRCode(qrcodeEle, {
        width: 260,//设置宽高
        height: 260
    });
 	var url = [location.protocol,'//',location.host,'/card/mobile/scanqrcode/?id=',user.currentUser?user.currentUser.id:-1];
    qrcode.makeCode(url.join(''));
    setTimeout(function(){
    	qrcodeEle.style.visibility = 'visible';
    },200);
};