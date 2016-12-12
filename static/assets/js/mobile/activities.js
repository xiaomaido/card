var p = {
	'classname':'Activities'
};
p.init = function() {
	window._filter={
		admin:'',
		id:'',
	};
	p.initVar();
	p.initCss();
	user.checkLogin(p.initData);
	p.initEvent();
};
p.initVar = function(){
	$j_activities_box = $('.j_activities_box');
	$j_create_btn = $('.j_create_btn');
	$j_loadmore = $('.j_loadmore');
	$j_tabs = $('.tab');
	$j_items = $('.items');
	_t_down='t-down';
	_t_up='t-up';
	_active='active';
	activities = [];
	p.size=10;
	p.page=0;
	// 初始化单位
	admins='[{"address":"崇明县城桥镇湄洲路388号","person":"王彩云","pwd":"895456","name":"崇明县东门中学","username":"shcm_dmzx","type":"group","tel":"18918350889","pid":"5704024971cfe4005dc06f9d","isShow":"1","mobile":"59613832","objectId":"57040249c4c9710051371b69","createdAt":"2016-04-05T18:22:01.223Z","updatedAt":"2016-04-07T09:19:15.018Z"},{"address":"西门北村西园路附56号","person":"顾沈宇","pwd":"566013","name":"城西","username":"shcm_cx","type":"location","tel":"69616249","pid":"5704bfd371cfe4005418a086","isShow":"1","mobile":"13167017057","objectId":"5704bfd4a34131004ce8603a","createdAt":"2016-04-06T07:50:44.035Z","updatedAt":"2016-10-13T05:57:10.873Z"},{"address":"南门港街102号","person":"张波波","pwd":"543088","name":"南门","username":"shcm_nm","type":"location","tel":"18917155510","pid":"5704c034d342d300540dcd26","isShow":"1","mobile":"18917155510","objectId":"5704c0341ea493005589424c","createdAt":"2016-04-06T07:52:20.235Z","updatedAt":"2016-05-16T07:53:17.099Z"},{"address":"翠竹路1388弄","person":"陈萍","pwd":"516898","name":"金鳌山","username":"shcm_jas","type":"location","tel":"15001839646","pid":"570539afa34131004ceeb5a3","isShow":"1","mobile":"15001839646","objectId":"570539af7db2a20051ae8e9f","createdAt":"2016-04-06T16:30:39.859Z","updatedAt":"2016-09-07T06:25:20.063Z"},{"address":"玉环路100号201室","person":"石轶","pwd":"115554","name":"玉环","username":"shcm_yh","type":"location","tel":"59675260","pid":"57053a32d342d300541430d9","isShow":"1","mobile":"13761863322","objectId":"57053a321ea493005db55505","createdAt":"2016-04-06T16:32:50.759Z","updatedAt":"2016-05-17T02:38:37.434Z"},{"address":"西门北村6号楼","person":"陈佳","pwd":"822334","name":"西门北村","username":"shcm_xmbc","type":"location","tel":"13818911198","pid":"570549c6128fe1005259fdd9","isShow":"1","mobile":"13818911198","objectId":"570549c62e958a0057a3e251","createdAt":"2016-04-06T17:39:18.662Z","updatedAt":"2016-04-06T17:39:18.662Z"},{"address":"八一路599号9甲2B","person":"沈菊锋","pwd":"515392","name":"西泯沟","username":"shcm_xmg","type":"location","tel":"69627243","pid":"57054a1dc4c971005149327e","isShow":"1","mobile":"13818416286","objectId":"57054a1d1ea4930055900dcf","createdAt":"2016-04-06T17:40:45.317Z","updatedAt":"2016-05-17T07:43:52.124Z"},{"address":"体育路58弄32号102室","person":"张国燕","pwd":"706227","name":"川心街","username":"shcm_cxj","type":"location","tel":"18918921018","pid":"57054a7bc4c971005149399a","isShow":"1","mobile":"18918921018","objectId":"57054a7bd342d3005414997b","createdAt":"2016-04-06T17:42:19.318Z","updatedAt":"2016-04-06T17:42:19.318Z"},{"address":"观潮新村43号103室","person":"陈旭旻","pwd":"888898","name":"观潮","username":"shcm_gc","type":"location","tel":"13916396486","pid":"57054b16c4c97100514944de","isShow":"1","mobile":"13916396486","objectId":"57054b161ea493005db5c13d","createdAt":"2016-04-06T17:44:54.981Z","updatedAt":"2016-06-06T07:54:42.510Z"},{"address":"湄洲路1288弄47号楼3楼","person":"顾叶雷","pwd":"758937","name":"金珠","username":"shcm_jz","type":"location","tel":"15221110797","pid":"57054b64c4c97100514948d7","isShow":"1","mobile":"15221110797","objectId":"57054b651ea493005db5c2ce","createdAt":"2016-04-06T17:46:13.115Z","updatedAt":"2016-04-06T17:46:13.115Z"},{"address":"酱园弄115号","person":"吴晓华","pwd":"172062","name":"城中","username":"shcm_cz","type":"location","tel":"13323296744","pid":"57054ba171cfe4005dcd3b40","isShow":"1","mobile":"13323296744","objectId":"57054ba239b05700539f8d79","createdAt":"2016-04-06T17:47:14.001Z","updatedAt":"2016-06-06T08:25:39.355Z"},{"address":"育麟桥路188弄98号","person":"姜婕","pwd":"451663","name":"明珠花苑","username":"shcm_mzhy","type":"location","tel":"13817255657","pid":"57054e635bbb500051df96e6","isShow":"1","mobile":"13817255657","objectId":"57054e637db2a20051af1845","createdAt":"2016-04-06T17:58:59.521Z","updatedAt":"2016-04-06T17:58:59.521Z"},{"address":"湄洲路237号","person":"黄勤","pwd":"479985","name":"湄洲","username":"shcm_mz","type":"location","tel":"18918538589","pid":"57054ed95bbb500051df99df","isShow":"1","mobile":"18918538589","objectId":"57054ed97db2a20051af1b05","createdAt":"2016-04-06T18:00:57.648Z","updatedAt":"2016-04-06T18:00:57.648Z"},{"address":"新崇南路399号","person":"梁箐庆","pwd":"439691","name":"新崇","username":"shcm_xc","type":"location","tel":"69616235","pid":"5706319f8ac247004c07af53","isShow":"1","mobile":"13795209133","objectId":"5706319fa34131004cf755d6","createdAt":"2016-04-07T10:08:31.720Z","updatedAt":"2016-05-17T05:57:09.199Z"},{"address":"吴家弄2号","person":"张如冰","pwd":"908545","name":"吴家弄","username":"shcm_wjn","type":"location","tel":"15921229471","pid":"570631f97db2a20051b73c5b","isShow":"1","mobile":"15921229471","objectId":"570631f92e958a0059c82035","createdAt":"2016-04-07T10:10:01.879Z","updatedAt":"2016-04-07T10:10:01.879Z"},{"address":"小港新村8号楼2楼","person":"邢磊","pwd":"503637","name":"小港","username":"shcm_xg","type":"location","tel":"13816796849","pid":"5707184a71cfe400542ed288","isShow":"1","mobile":"13816796849","objectId":"5707184a71cfe4005ddc97ae","createdAt":"2016-04-08T02:32:42.869Z","updatedAt":"2016-04-08T02:32:42.869Z"},{"address":"北门路388号","person":"张玲","pwd":"157716","name":"永凤","username":"shcm_yf","type":"location","tel":"13761639118","pid":"57071996a34131004cfe859c","isShow":"1","mobile":"13761639118","objectId":"5707199739b0570053aeea38","createdAt":"2016-04-08T02:38:15.136Z","updatedAt":"2016-04-08T13:21:15.406Z"},{"address":"人民路31号","person":"周艳虹","pwd":"648653","name":"花园弄","username":"shcm_hyn","type":"location","tel":"69616236","pid":"570719e7128fe10052697846","isShow":"1","mobile":"13818194817","objectId":"570719e739b0570053aeedcc","createdAt":"2016-04-08T02:39:35.658Z","updatedAt":"2016-05-17T00:43:04.735Z"},{"address":"绿海路500弄181号","person":"陆春燕","pwd":"424488","name":"海岛","username":"shcm_hd","type":"location","tel":"13661507119","pid":"57071a392e958a0057b35801","isShow":"1","mobile":"13661507119","objectId":"57071a391ea493005dc52bdf","createdAt":"2016-04-08T02:40:57.531Z","updatedAt":"2016-04-08T02:40:57.531Z"},{"address":"酱园弄5号","person":"陈晨","pwd":"212960","name":"北门","username":"shcm_bm","type":"location","tel":"13611837034","pid":"57071a7971cfe400542eec39","isShow":"1","mobile":"13611837034","objectId":"57071a7a79bc44004c542278","createdAt":"2016-04-08T02:42:02.108Z","updatedAt":"2016-04-08T02:42:02.108Z"},{"address":"东门新村附24号楼","person":"程玲玲","pwd":"690959","name":"东门","username":"shcm_dm","type":"location","tel":"69616252","pid":"57071adb1ea493005dc53356","isShow":"1","mobile":"15821960871","objectId":"57071adb8ac247004c0ee462","createdAt":"2016-04-08T02:43:39.779Z","updatedAt":"2016-09-14T01:57:48.364Z"},{"address":"西门路501弄门卫2楼","person":"陈晖晖","pwd":"424563","name":"怡祥居","username":"shcm_yxj","type":"location","tel":"15900928886","pid":"57071b122e958a0059cf5d49","isShow":"1","mobile":"15900928886","objectId":"57071b125bbb500051eef4bb","createdAt":"2016-04-08T02:44:34.983Z","updatedAt":"2016-04-08T02:44:34.983Z"},{"address":"西小港路96弄81号","person":"张婧","pwd":"456301","name":"东河沿","username":"shcm_dhy","type":"location","tel":"18017688818","pid":"57071b737db2a20051be7d8d","isShow":"1","mobile":"18017688818","objectId":"57071b73128fe10052698971","createdAt":"2016-04-08T02:46:11.652Z","updatedAt":"2016-04-08T02:46:11.652Z"},{"address":"长侯路92号","person":"王育才","pwd":"524453","name":"城东","username":"shcm_cd","type":"location","tel":"13386060387","pid":"57071b97128fe10052698b5b","isShow":"1","mobile":"13386060387","objectId":"57071b972e958a0059cf62ec","createdAt":"2016-04-08T02:46:47.328Z","updatedAt":"2016-04-08T02:46:47.328Z"},{"address":"一江山路18号","person":"吉莉","pwd":"797208","name":"江山","username":"shcm_js","type":"location","tel":"69616251","pid":"57071bc27db2a20051be80e1","isShow":"1","mobile":"13816583077","objectId":"57071bc22e958a0059cf64f4","createdAt":"2016-04-08T02:47:30.767Z","updatedAt":"2016-05-17T01:53:31.795Z"},{"address":"学宫新村19号楼","person":"蔡黄健","pwd":"360481","name":"学宫","username":"shcm_xuegong","type":"location","tel":"13621693946","pid":"57071bf0d342d300542429bc","isShow":"1","mobile":"13621693946","objectId":"57071bf039b0570053af0419","createdAt":"2016-04-08T02:48:16.771Z","updatedAt":"2016-04-08T02:48:16.771Z"},{"address":"城桥镇星火路2号","person":"马静","pwd":"882531","name":"城桥镇团委","username":"shcm_cqztw","type":"group","tel":"13391282808","pid":"57071c3b1ea493005dc5438a","isShow":"1","mobile":"13391282808","objectId":"57071c3b1ea49300559f98fb","createdAt":"2016-04-08T02:49:31.343Z","updatedAt":"2016-06-13T08:36:33.508Z"},{"address":"东门路378号","person":"孙卉","pwd":"315298","name":"经委","username":"shcm_jw","type":"group","tel":"15821992167","pid":"57071c7b79bc44004c54393f","isShow":"1","mobile":"15821992167","objectId":"57071c7b7db2a20051be896c","createdAt":"2016-04-08T02:50:35.849Z","updatedAt":"2016-04-08T16:57:05.988Z"},{"address":"东门路181号","person":"刘奕","pwd":"717808","name":"农委","username":"shcm_nw","type":"group","tel":"13918857049","pid":"57071ca539b0570053af0bd3","isShow":"1","mobile":"13918857049","objectId":"57071ca579bc44004c543b2d","createdAt":"2016-04-08T02:51:17.969Z","updatedAt":"2016-04-19T06:56:36.220Z"},{"address":"人民路138号","person":"邵军 顾禹龙","pwd":"152009","name":"建管委","username":"shcm_jgw","type":"group","tel":"13916943886 13816828918","pid":"57071cdda34131004cfea8fe","isShow":"1","mobile":"13916943886 13816828918","objectId":"57071cdd71cfe400542f07c4","createdAt":"2016-04-08T02:52:13.941Z","updatedAt":"2016-05-07T10:01:20.758Z"},{"address":"学宫路401号","person":"范莉莉","pwd":"558649","name":"卫生计生委","username":"shcm_wsjsw","type":"group","tel":"13651905703","pid":"57071d078ac247004c0efd05","isShow":"1","mobile":"13651905703","objectId":"57071d077db2a20051be8f44","createdAt":"2016-04-08T02:52:55.396Z","updatedAt":"2016-04-08T02:52:55.396Z"},{"address":"人民路28号","person":"茅巍","pwd":"389763","name":"公安局","username":"shcm_gaj","type":"group","tel":"13818007110","pid":"57071d2ed342d300542437ea","isShow":"1","mobile":"13818007110","objectId":"57071d2e2e958a0059cf7618","createdAt":"2016-04-08T02:53:34.852Z","updatedAt":"2016-04-08T16:50:35.761Z"},{"address":"南门路118号","person":"陈海广","pwd":"943660","name":"人力资源和社会保障局","username":"shcm_rlzyhshbzj","type":"group","tel":"13816772304","pid":"57071d5e8ac247004c0f0194","isShow":"1","mobile":"13816772304","objectId":"57071d5e128fe1005269a064","createdAt":"2016-04-08T02:54:22.220Z","updatedAt":"2016-04-08T02:54:22.220Z"},{"address":"城桥镇人民路599号","person":"周洁 施云丹","pwd":"688273","name":"民政局","username":"shcm_mzj","type":"group","tel":"13761149962 13564461760","pid":"57071d8679bc44004c544576","isShow":"1","mobile":"13761149962 13564461760","objectId":"57071d862e958a0059cf7a8a","createdAt":"2016-04-08T02:55:02.903Z","updatedAt":"2016-05-07T10:01:12.353Z"},{"address":"新崇北路308号","person":"朱一妹 严雍勇","pwd":"709565","name":"教育局","username":"shcm_jyj","type":"group","tel":"13482855388 13764168692","pid":"57071dbaa34131004cfeb36f","isShow":"1","mobile":"13482855388 13764168692","objectId":"57071dba2e958a0057b37f6c","createdAt":"2016-04-08T02:55:54.324Z","updatedAt":"2016-05-07T10:01:04.032Z"},{"address":"崇明大道7897号","person":"施希","pwd":"264751","name":"文广影视局","username":"shcm_wgysj","type":"group","tel":"13764022070","pid":"57071e1039b0570053af1b84","isShow":"1","mobile":"13764022070","objectId":"57071e1079bc44004c544a69","createdAt":"2016-04-08T02:57:20.757Z","updatedAt":"2016-04-08T16:50:20.427Z"},{"address":"翠竹路1501号","person":"袁军","pwd":"214554","name":"规划土地局","username":"shcm_ghtdj","type":"group","tel":"13671792928","pid":"57071e3c128fe1005269a7e0","isShow":"1","mobile":"13671792928","objectId":"57071e3ca34131004cfeb7de","createdAt":"2016-04-08T02:58:04.766Z","updatedAt":"2016-04-08T16:50:17.526Z"},{"address":"西门路313号","person":"陈俐莉","pwd":"316621","name":"住房保障房屋管理局","username":"shcm_zfbzfwglj","type":"group","tel":"13818697078","pid":"57071e6a79bc44004c544db5","isShow":"1","mobile":"13818697078","objectId":"57071e6a7db2a20051be9d9a","createdAt":"2016-04-08T02:58:50.206Z","updatedAt":"2016-04-08T13:22:48.813Z"},{"address":"八一路726号","person":"蔡小宇","pwd":"764942","name":"城管执法局","username":"shcm_cgzfj","type":"group","tel":"15921534534","pid":"57071eb571cfe4005ddcddcf","isShow":"1","mobile":"15921534534","objectId":"57071eb51ea493005dc55f07","createdAt":"2016-04-08T03:00:05.629Z","updatedAt":"2016-04-08T03:00:05.629Z"},{"address":"东门路197号","person":"卢冬","pwd":"244285","name":"水务局","username":"shcm_swj","type":"group","tel":"15921440055","pid":"57071ee939b0570053af2430","isShow":"1","mobile":"15921440055","objectId":"57071eea8ac247004c0f11a9","createdAt":"2016-04-08T03:00:58.089Z","updatedAt":"2016-04-08T16:50:14.201Z"},{"address":"东门路147号","person":"刘琛","pwd":"279489","name":"交通委","username":"shcm_jtw","type":"group","tel":"13564639391","pid":"57071f1279bc44004c5454e6","isShow":"1","mobile":"13564639391","objectId":"57071f128ac247004c0f12fc","createdAt":"2016-04-08T03:01:38.434Z","updatedAt":"2016-04-08T16:50:11.789Z"},{"address":"西门路799号","person":"颜子钧 卫成臣","pwd":"855468","name":"崇明工业园区","username":"shcm_cmgyyq","type":"group","tel":"13564651266 13774201961","pid":"57071f4b79bc44004c545761","isShow":"1","mobile":"13564651266 13774201961","objectId":"57071f4b5bbb500051ef22bf","createdAt":"2016-04-08T03:02:35.938Z","updatedAt":"2016-05-07T10:00:51.960Z"},{"address":"寒山寺路297号","person":"顾舒诗","pwd":"970135","name":"亚通公司","username":"shcm_ytgs","type":"group","tel":"13482734202","pid":"57071f932e958a0059cf8dd9","isShow":"1","mobile":"13482734202","objectId":"57071f9339b0570053af2a6d","createdAt":"2016-04-08T03:03:47.516Z","updatedAt":"2016-04-08T03:03:47.516Z"},{"address":"人民路60号","person":"吴春霞 许鹏远","pwd":"725831","name":"税务局","username":"shcm_shuiwuju","type":"group","tel":"13801882645 13816578369","pid":"57071ffb1ea493005dc56dc0","isShow":"1","mobile":"13801882645 13816578369","objectId":"57071ffc2e958a0059cf933f","createdAt":"2016-04-08T03:05:32.958Z","updatedAt":"2016-05-07T10:00:56.676Z"},{"address":"东门路388号","person":"顾牧之","pwd":"681775","name":"市场监管局","username":"shcm_scjgj","type":"group","tel":"13916811103","pid":"5707205e128fe1005269c163","isShow":"1","mobile":"13916811103","objectId":"5707205fc4c97100516ef9a0","createdAt":"2016-04-08T03:07:11.018Z","updatedAt":"2016-04-08T13:23:08.996Z"},{"address":"南门支路55号","person":"龚健","pwd":"118649","name":"崇明客轮公司","username":"shcm_cmklgs","type":"group","tel":"13816760214","pid":"5707217079bc44004c547397","isShow":"1","mobile":"13816760214","objectId":"570721705bbb500051ef3dab","createdAt":"2016-04-08T03:11:44.853Z","updatedAt":"2016-04-08T16:50:08.245Z"},{"address":"人民路68号","person":"周琴勤","pwd":"599348","name":"县级机关","username":"shcm_xjjg","type":"group","tel":"13761644390","pid":"570721b88ac247004c0f33d2","isShow":"1","mobile":"13761644390","objectId":"570721b8a34131004cfee18c","createdAt":"2016-04-08T03:12:56.601Z","updatedAt":"2016-04-08T03:12:56.601Z"},{"address":"朝阳门路11号总工会大厦9层","person":"胡茂密","pwd":"278048","name":"联通崇明分公司","username":"shcm_ltcmfgs","type":"group","tel":"18601721525","pid":"570722027db2a20051bec896","isShow":"1","mobile":"18601721525","objectId":"570722032e958a0057b3b1dd","createdAt":"2016-04-08T03:14:11.079Z","updatedAt":"2016-04-08T03:14:11.079Z"},{"address":"城桥镇八一路167号","person":"高春霞","pwd":"857966","name":"崇明巴士公交公司","username":"shcm_cmbsgjgs","type":"group","tel":"18017768920","pid":"570722337db2a20051becb2d","isShow":"1","mobile":"18017768920","objectId":"570722332e958a0057b3b414","createdAt":"2016-04-08T03:14:59.272Z","updatedAt":"2016-04-08T03:14:59.272Z"},{"address":"城桥镇八一路365","person":"魏亮亮","pwd":"441485","name":"邮政银行","username":"shcm_yzyh","type":"group","tel":"13917044872","pid":"5707225bc4c97100516f2742","isShow":"1","mobile":"13917044872","objectId":"5707225b1ea493005dc58b88","createdAt":"2016-04-08T03:15:39.600Z","updatedAt":"2016-04-08T03:15:39.600Z"},{"address":"城桥镇八一路365号","person":"胡佩","pwd":"850602","name":"崇明邮政局","username":"shcm_cmyzj","type":"group","tel":"18901895309","pid":"5707228e2e958a0057b3b84d","isShow":"1","mobile":"18901895309","objectId":"5707228e71cfe4005ddd0be6","createdAt":"2016-04-08T03:16:30.939Z","updatedAt":"2016-04-08T16:49:57.694Z"},{"address":"城桥镇八一路387号","person":"茅雪程","pwd":"134982","name":"建行崇明支行","username":"shcm_jhcmzh","type":"group","tel":"13611721100","pid":"570722b81ea49300559fe350","isShow":"1","mobile":"13611721100","objectId":"570722b88ac247004c0f3f62","createdAt":"2016-04-08T03:17:12.944Z","updatedAt":"2016-04-08T03:17:12.944Z"},{"address":"城桥镇北门路188号","person":"陆建峰","pwd":"857222","name":"农商行崇明支行","username":"shcm_nshcmzh","type":"group","tel":"13524718275","pid":"570722e7a34131004cfeefab","isShow":"1","mobile":"13524718275","objectId":"570722e77db2a20051bed3c6","createdAt":"2016-04-08T03:17:59.962Z","updatedAt":"2016-04-19T07:34:38.334Z"},{"address":"城桥镇北门路228号","person":"张睿","pwd":"144446","name":"浦发行崇明支行","username":"shcm_pfhcmzh","type":"group","tel":"13482428130","pid":"57072345d342d30054247e77","isShow":"1","mobile":"13482428130","objectId":"57072345a34131004cfef335","createdAt":"2016-04-08T03:19:33.560Z","updatedAt":"2016-04-08T16:49:54.437Z"},{"address":"城桥镇朝阳门路19号","person":"倪春阳","pwd":"813878","name":"村镇银行","username":"shcm_czyh","type":"group","tel":"15000543296","pid":"57072377d342d30054248119","isShow":"1","mobile":"15000543296","objectId":"570723781ea49300559fec79","createdAt":"2016-04-08T03:20:24.048Z","updatedAt":"2016-04-08T03:20:24.048Z"},{"address":"城桥镇川心街1号","person":"崔杰","pwd":"649047","name":"申万宏源证券崇明营业部","username":"shcm_swhyzqcmyyb","type":"group","tel":"13564337901","pid":"570723a3c4c97100516f488a","isShow":"1","mobile":"13564337901","objectId":"570723a31ea493005dc59acb","createdAt":"2016-04-08T03:21:07.904Z","updatedAt":"2016-04-08T16:49:50.214Z"},{"address":"城桥镇东门路125号","person":"顾樱","pwd":"888472","name":"农业发展银行","username":"shcm_nyfzyh","type":"group","tel":"13917824525","pid":"5707240071cfe4005ddd1bb1","isShow":"1","mobile":"13917824525","objectId":"57072400c4c97100516f518b","createdAt":"2016-04-08T03:22:40.793Z","updatedAt":"2016-04-08T16:49:45.632Z"},{"address":"城桥镇东门路177号","person":"陆健飞","pwd":"882576","name":"上海证券公司崇明营业部","username":"shcm_shzqgscmyyb","type":"group","tel":"13501677062","pid":"5707256c2e958a0059cfd25f","isShow":"1","mobile":"13501677062","objectId":"5707256c39b0570053af6f6d","createdAt":"2016-04-08T03:28:44.484Z","updatedAt":"2016-06-02T05:42:22.027Z"},{"address":"城桥镇东门路479号","person":"蒋如新","pwd":"397203","name":"新华人寿","username":"shcm_xhrs","type":"group","tel":"13918537485","pid":"570725a02e958a0057b3dab5","isShow":"1","mobile":"13918537485","objectId":"570725a02e958a0059cfd478","createdAt":"2016-04-08T03:29:36.686Z","updatedAt":"2016-04-08T03:29:36.686Z"},{"address":"城桥镇东引路718号","person":"谢警","pwd":"268508","name":"移动崇明分公司","username":"shcm_ydcmfgs","type":"group","tel":"13472512942","pid":"57072613c4c97100516f83ef","isShow":"1","mobile":"13472512942","objectId":"570726131ea493005dc5b4cb","createdAt":"2016-04-08T03:31:31.934Z","updatedAt":"2016-04-08T16:48:55.553Z"},{"address":"城桥镇南门路128号","person":"施佳溢","pwd":"467053","name":"崇明电信局","username":"shcm_cmdxj","type":"group","tel":"13386161373","pid":"5707269b2e958a0057b3e3b0","isShow":"1","mobile":"13386161373","objectId":"5707269b2e958a0059cfddd3","createdAt":"2016-04-08T03:33:47.917Z","updatedAt":"2016-08-29T01:55:04.348Z"},{"address":"城桥镇南门路158号","person":"张蔚","pwd":"627710","name":"工行崇明支行","username":"shcm_ghcmzh","type":"group","tel":"13681926693","pid":"570726c45bbb500051ef7736","isShow":"1","mobile":"13681926693","objectId":"570726c471cfe400542f779c","createdAt":"2016-04-08T03:34:28.126Z","updatedAt":"2016-04-08T16:49:41.115Z"},{"address":"城桥镇人民路207号","person":"郭俊梅","pwd":"345372","name":"社保","username":"shcm_sb","type":"group","tel":"18916875091","pid":"570726e8c4c97100516f94fe","isShow":"1","mobile":"18916875091","objectId":"570726e81ea493005dc5bc0d","createdAt":"2016-04-08T03:35:04.295Z","updatedAt":"2016-04-08T03:35:04.295Z"},{"address":"城桥镇人民路38号","person":"黄帅","pwd":"128118","name":"农行崇明支行","username":"shcm_nhcmzh","type":"group","tel":"13816934533","pid":"570727131ea493005dc5bd94","isShow":"1","mobile":"13816934533","objectId":"570727138ac247004c0f6cdd","createdAt":"2016-04-08T03:35:47.395Z","updatedAt":"2016-04-08T16:48:02.279Z"},{"address":"城桥镇人民路48号","person":"张娟","pwd":"947531","name":"中国人寿","username":"shcm_zgrs","type":"group","tel":"13818261600","pid":"5707273b39b0570053af8054","isShow":"1","mobile":"13818261600","objectId":"5707273bd342d3005424a7d3","createdAt":"2016-04-08T03:36:27.076Z","updatedAt":"2016-05-24T04:17:44.358Z"},{"address":"城桥镇人民路48号","person":"范益忠","pwd":"358977","name":"人民保险","username":"shcm_rmbx","type":"group","tel":"13761006133","pid":"5707276571cfe400542f7d10","isShow":"1","mobile":"13761006133","objectId":"5707276571cfe4005ddd3d76","createdAt":"2016-04-08T03:37:09.383Z","updatedAt":"2016-04-08T03:37:09.383Z"},{"address":"城桥镇人民路587号","person":"龚睿","pwd":"513032","name":"燃气公司","username":"shcm_rqgs","type":"group","tel":"13818112483","pid":"570727d61ea4930055a01839","isShow":"1","mobile":"13818112483","objectId":"570727d679bc44004c54b65f","createdAt":"2016-04-08T03:39:02.819Z","updatedAt":"2016-04-08T16:49:36.605Z"},{"address":"城桥镇西门路381号","person":"黄凌   ","pwd":"751630","name":"崇明电力公司","username":"shcm_cmdlgs","type":"group","tel":"15900899005","pid":"57072831128fe100526a15dc","isShow":"1","mobile":"15900899005","objectId":"570728312e958a0059cfec92","createdAt":"2016-04-08T03:40:33.084Z","updatedAt":"2016-04-08T16:49:27.995Z"},{"address":"城桥镇新崇南路28号","person":"黄诚如","pwd":"619681","name":"交行崇明支行","username":"shcm_jiaohangcmzh","type":"group","tel":"18121190202","pid":"57074da3c4c971005172b69a","isShow":"1","mobile":"18121190202","objectId":"57074da31ea493005dc74c7b","createdAt":"2016-04-08T06:20:19.580Z","updatedAt":"2016-04-08T06:20:19.580Z"},{"address":"城桥镇一江山路389号","person":"陆海荣","pwd":"911428","name":"县气象局","username":"shcm_xqxj","type":"group","tel":"13564651253","pid":"57074de31ea493005dc74e80","isShow":"1","mobile":"13564651253","objectId":"57074de31ea4930055a19dbe","createdAt":"2016-04-08T06:21:23.850Z","updatedAt":"2016-04-08T13:25:16.317Z"},{"address":"城桥镇西门路498号","person":"陈婧","pwd":"193533","name":"城桥中学","username":"shcm_cqzx","type":"group","tel":"18939739598","pid":"57074e1e5bbb500051f10d3a","isShow":"1","mobile":"18939739598","objectId":"57074e1e7db2a20051c08d09","createdAt":"2016-04-08T06:22:22.164Z","updatedAt":"2016-04-08T16:49:25.074Z"},{"address":"城桥镇一江山路501室","person":"芮示星","pwd":"614515","name":"海关","username":"shcm_hg","type":"group","tel":"18201729535","pid":"57074e84d342d30054263933","isShow":"1","mobile":"18201729535","objectId":"57074e841ea493005dc75375","createdAt":"2016-04-08T06:24:04.282Z","updatedAt":"2016-04-08T06:24:04.282Z"},{"address":"城桥镇一江山路508号","person":"黄洲","pwd":"642071","name":"检验检疫局","username":"shcm_jyjyj","type":"group","tel":"13764177236","pid":"57074ed71ea493005dc7577b","isShow":"1","mobile":"13764177236","objectId":"57074ed779bc44004c564352","createdAt":"2016-04-08T06:25:27.317Z","updatedAt":"2016-04-08T16:49:22.021Z"},{"address":"东门路566号","person":"陈漪漩","pwd":"146059","name":"安信农保","username":"shcm_axnb","type":"group","tel":"13761002848","pid":"57074f1a5bbb500051f11882","isShow":"1","mobile":"13761002848","objectId":"57074f1a7db2a20051c098bf","createdAt":"2016-04-08T06:26:34.528Z","updatedAt":"2016-04-08T06:26:34.528Z"},{"address":"南门路128号11楼","person":"许龙龙","pwd":"921033","name":"上海银行崇明支行","username":"shcm_shyhcmzh","type":"group","tel":"13761552554","pid":"57074f4a79bc44004c5649cf","isShow":"1","mobile":"13761552554","objectId":"57074f4a8ac247004c11089e","createdAt":"2016-04-08T06:27:22.546Z","updatedAt":"2016-04-08T06:27:22.546Z"},{"address":"城桥镇鼓浪屿路801号","person":"向莉","pwd":"823784","name":"崇明中学","username":"shcm_cmzx","type":"group","tel":"69672008","pid":"5707502ea34131004c00c0ac","isShow":"1","mobile":"18918775308","objectId":"5707502f7db2a20051c0a5f4","createdAt":"2016-04-08T06:31:11.033Z","updatedAt":"2016-05-31T01:25:10.585Z"},{"address":"城桥镇北门路58号","person":"王晓禅","pwd":"394292","name":"扬子中学","username":"shcm_yzzx","type":"group","tel":"13585856741","pid":"5707507839b0570053b128cc","isShow":"1","mobile":"13585856741","objectId":"570750795bbb500051f127d8","createdAt":"2016-04-08T06:32:25.253Z","updatedAt":"2016-04-08T06:32:25.253Z"},{"address":"城桥镇西园路237号","person":"龚静","pwd":"493627","name":"实验中学","username":"shcm_syzx","type":"group","tel":"18939978021","pid":"570750ad5bbb500051f12989","isShow":"1","mobile":"18939978021","objectId":"570750ad2e958a0057b5960c","createdAt":"2016-04-08T06:33:17.974Z","updatedAt":"2016-04-08T16:49:01.516Z"},{"address":"城桥镇育麟桥路363号","person":"朱凤","pwd":"180318","name":"育林中学","username":"shcm_ylzx","type":"group","tel":"18121191710","pid":"570750ef5bbb500051f12c2c","isShow":"1","mobile":"18121191710","objectId":"570750ef71cfe4005ddeee9b","createdAt":"2016-04-08T06:34:23.605Z","updatedAt":"2016-04-08T16:49:05.385Z"},{"address":"城桥镇北门路6号","person":"苏燕","pwd":"212487","name":"凌云中学","username":"shcm_lyzx","type":"group","tel":"18016281806","pid":"570751331ea4930055a1c1f4","isShow":"1","mobile":"18016281806","objectId":"5707513379bc44004c565deb","createdAt":"2016-04-08T06:35:31.225Z","updatedAt":"2016-05-29T12:02:55.337Z"},{"address":"西门南村25号楼111室","person":"吴燕华","pwd":"198463","name":"西门南村","username":"shcm_xmnc","type":"location","tel":"13764277317","pid":"57071b4c2e958a0059cf5f72","isShow":"1","mobile":"13764277317","objectId":"57071b4c71cfe4005ddcb92f","createdAt":"2016-04-08T02:45:32.827Z","updatedAt":"2016-05-23T06:22:03.507Z"}]';
	admins=JSON.parse(admins);
	admins=admins.sort(misc.getSortFun('desc', 'type'));
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
	$j_tabs.on('click', function(e) {
		e.preventDefault();
		var $this=$(this),
		i=$this.index();
		if(!$this.hasClass(_active)||$this.find('.'+_t_down).length>0){

			$j_tabs.removeClass(_active);
			$this.addClass(_active);
			$j_tabs.find('a').removeClass(_t_up).addClass(_t_down);
			$this.find('a').removeClass(_t_down).addClass(_t_up);
			$j_items.hide();
			$j_items.eq(i).show();
		}else{
			$this.removeClass(_active);
			$this.find('a').removeClass(_t_up).addClass(_t_down);
			$j_items.eq(i).hide();
		}
	});
	$j_items.delegate('a', 'click', function(e) {
		e.preventDefault();
		var $this=$(this),
		txt=$this.attr('data-name'),
		_id=$this.attr('data-id'),
		_pid=$this.attr('data-pid');
		// _value=$this.attr('data-value');
		// if(_value){//类型
		// 	_filter.admin=_value;
		// 	if(_filter.admin!=="all"){
		// 		$j_tabs.find('.'+_active).html('<a class="t-down"></a>'+txt);
		// 	}else{
		// 		$j_tabs.find('.'+_active).html('<a class="t-down"></a>发布方类型').removeClass(_active);
		// 	}
		// }
		if(_pid){//发布方筛选
			p.page=0;
			_filter.id=_pid;
			$j_activities_box.find('ul.j_activities').html('');
			if(_filter.id!=="undefined"){
				$('.'+_active).html('<a class="t-down"></a>'+txt);
			}else{
				_filter.id=undefined;
				$('.'+_active).html('<a class="t-down"></a>发布方筛选').removeClass(_active);
			}
			$j_tabs.eq(1).html('<a class="t-down"></a>快速筛选');
			p.loadActivities();
		}
		if(_id){//快速筛选
			p.page=0;
			_filter.id=_id;
			$j_activities_box.find('ul.j_activities').html('');
			if(_filter.id!=="undefined"){
				$('.'+_active).html('<a class="t-down"></a>'+txt);
			}else{
				_filter.id=undefined;
				$('.'+_active).html('<a class="t-down"></a>快速筛选').removeClass(_active);
			}
			$j_tabs.eq(0).html('<a class="t-down"></a>发布方筛选');
			p.loadActivities();
		}
		$j_items.hide();
	});
};
p.initData = function(){
	p.loadActivities();
	p.renderAdmins(admins);
	p.renderMyAdmin();
};
p.renderMyAdmin=function(){
	var arr=[];
	var _userRole=user.currentUser.get("userRole");
	if(_userRole=="Admins"){
		arr.push('<a data-id="'+user.userInfo.get('pid')+'" data-name="'+user.userInfo.get('name')+'">[本',(user.userInfo.get('type')=="group")?"单位":"居委",'] '+user.userInfo.get('name')+'</a>');

	}else if(_userRole=="Users"){
		user.userInfo.get('location').length && arr.push('<a data-id="'+user.userInfo.get('location')[0]+'" data-name="'+user.userInfo.get('location')[2]+'">[所在居委] '+user.userInfo.get('location')[2]+'</a>');
		user.userInfo.get('group').length && arr.push('<a data-id="'+user.userInfo.get('group')[0]+'" data-name="'+user.userInfo.get('group')[2]+'">[所在单位] '+user.userInfo.get('group')[2]+'</a>');
	}

	$j_items.eq(1).append(arr.join(''));
};
p.renderAdmins=function(datas){
	var arr=datas.map(function(data) {
		return ['<a class="text-elip" data-pid="',data.pid,'" data-name="',data.name,'">',"[",(data.type=="location"?"居委":"单位"),"] ",data.name,'</a>'].join('');
	});
	$j_items.eq(0).append(arr.join(''));
};
p.filterAdmin=function(type){
	return type!=="all"?admins.filter(function(data){return data.type==type}):admins;
};
// p.loadAdmins=function(){
// 	var query = new AV.Query('Admins');
// 	query.equalTo("isShow","1");
// 	query.limit(1000);
// 	query.find().then(function(datas){
		
// 	}, function(error){

// 	});
// };
p.loadActivities = function(){
	var query = new AV.Query(p['classname']);
	query.notEqualTo("isDelete","1");
	query.notEqualTo("isShow","0");
	window._filter.id && query.equalTo("admin",window._filter.id);
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
