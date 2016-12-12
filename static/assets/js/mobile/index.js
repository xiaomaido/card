var p = {
	'classname':'Shops'
};
p.init = function() {
	p.initVar();
	p.initCss();
	user.checkLogin(p.initData);
};
p.initVar = function() {
	$j_banners = $out_wrap.find('.j_banners');
	banners = [{
		'img': 'card-logo',
		'link': 'http://mp.weixin.qq.com/s?__biz=MjM5MTM0ODk4Nw==&mid=402392472&idx=1&sn=8380919fedf804290f857218368f1111&scene=0&previewkey=FGXu6YCcm7sNbY7Boghw2swqSljwj2bfCUaCyDofEow%3D#wechat_redirect'
	}];
	page = 0;
	size = 20;
};
p.initCss = function() {
	$out_wrap.css("visibility","visible");
};
p.initData = function() {
	// p.loadBanners();
	if(user.currentUser.get('userRole')=='Users'){
		$('.j_users_see').show();
	}else{
		$('.j_admins_see').show();
	}
};
p.loadBanners = function() {
	var arr = [],l = banners.length;
	for (var i = 0; i < l ; i++) {
		arr.push(['<li><a class="pic" href="#"><img class="j_picture" data-src="',defaultImg,'" src="',imgpath,'/',banners[i].img,'.jpg" alt=""></a></li>'].join(''));
	};
	$j_banners.html(arr.join(''));
	if(l>1){
		// 左右滑动轮播
		TouchSlide({ 
			slideCell: "#slideBox",
			titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
			mainCell:".bd ul", 
			effect:"leftLoop", 
			autoPage:true, //自动分页
			autoPlay:true, //自动播放
			delayTime: 500,
			interTime: 4000,
		});
	}
	else{
		$('#slideBox .hd ul').hide();
	}
};
function logout(){
	if(confirm('确认退出当前账号？')){user.logout();}
}