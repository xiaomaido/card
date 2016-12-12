var p={};
p.init = function(){
	p.initData();
};
p.initData = function(){
	p.maxPage=6;
	p.page= misc.getParam('page')||1;
//	p.limit=100;
	p.limit=1000;
	p.getUsersTable();
};
p.getUsersTable = function(){
	var query = new AV.Query('Users');
	query.equalTo('isShow','1');
    query.descending("createdAt");
//  query.descending("updatedAt");
//	query.equalTo('checkin','06');
	query.limit(p.limit);
	query.skip((p.page-1)*p.limit);
	query.find().then(doneCallbacks, failCallbacks);
};
function doneCallbacks(datas){
	var l=datas.length||0;
	if(l>0){
		var arr = [];
		for (var i = 0; i < l; i++) {
			var d = datas[i];
			var cki = d.get("checkin"),
    		cki_str = cki.length>1?[cki[1],"-",cki[2],"-",cki[3]," ",cki[4]].join(""):"未报到";
			arr.push([
				'<tr>',
					'<td>',d.get("flagNumber"),'</td>',
					'<td>',d.get("username"),'</td>',
					'<td>',d.get("realname"),'</td>',
					'<td>',d.get("sex")=="男"?"男":"女",'</td>',
					'<td>',d.get("mobile"),'</td>',
					'<td>ID:',d.get("idcard"),'</td>',
					'<td>',misc.formatDateTime(d.get('birth'),'yyyy/MM/dd'),'</td>',
					'<td>',d.get('birth')?misc.getAge(d.get('birth')):"无",'</td>',
					'<td>',d.get("political").replace('S',''),'</td>',
              		'<td>',d.get("political")=="团员"?(misc.getAge(d.get('birth'))<=28 ?"团员":'青年'):d.get("political").replace('S',''),'</td>',
					'<td>',(d.get("group")[2]||"暂无"),'</td>',
              		'<td>',(d.get("location")[2]||"暂无"),'</td>',
              		'<td>',cki_str,'</td>',
				'</tr>'
			].join(''));
		}
		$('tbody').append(arr.join(''));
	}
}
function failCallbacks(error){

}