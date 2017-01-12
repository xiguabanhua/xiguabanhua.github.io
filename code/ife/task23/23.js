/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-07-31 21:59:56
 * @version $Id$
 */
window.onload=function(){

	//写一个选择的函数

	//
	var preBtn=document.getElementById('pre-btn'),
		miBtn=document.getElementById('mi-btn'),
		postBtn=document.getElementById('post-btn'),
		_root=document.querySelector('.root'),
		foundText=document.getElementById('value'),
		preSelect=document.getElementById('pre-select'),
		postSelect=document.getElementById('post-select');

		//数组存放遍历的节点
		var nodeList=[];

		//定义自增减字符
		var nodeDeep=0;

		//定义是否正在遍历
		var noDoing=true;

		//深度遍历
	function preOrder(node){
		if(node!=null){
			nodeList.push(node);
			console.log(node.children);
			for(var i=0,len=node.children.length;i<len;i++){ 
				// console.log(node.children[i]);
				preOrder(node.children[i]);
				console.log(node.children[i]);
			}
		}
	}
	
		//广度遍历(很精妙的地方)
	function postOrder(node){
		// console.log(node.children);
		if(node!=null){
			nodeList.push(node);
			console.log(nodeList);
				postOrder(node.nextElementSibling);
				node=nodeList[nodeDeep++];
				postOrder(node.firstElementChild);
			console.log(node.children);
		}

	}

	//动效
	function render(value){

		//把其他的遍历禁止掉
		noDoing=false;

		var timer=null;//定时器
		if(arguments[0]){
			//如果有参数传递，是搜索的部分
			var i=0;
			timer=setInterval(function(){
				if(i<nodeList.length){
					var result=value.test(nodeList[i].firstChild.nodeValue);

					if(result){
						nodeList[i].style.backgroundColor='#9EB0DA';
					}
					else{
						nodeList[i].style.backgroundColor='#FF0057';
					}

					if(i!=0){
					(nodeList[i-1].style.backgroundColor!='rgb(255, 0, 87)')?(nodeList[i-1].style.backgroundColor=nodeList[i-1].style.backgroundColor):(nodeList[i-1].style.backgroundColor='#FFF');
					}
				}
				else{
					clearInterval(timer);

					//渲染完了之后开放其他遍历
					noDoing=true;	
				}
				

				i++;

			},500);

		}

		else{
			var i=0;    
			console.log(nodeList);
			nodeList[i].style.backgroundColor='#FF0057';

			timer=setInterval(function(){
				i++;
				// console.log(i);
				if(i<nodeList.length){
					nodeList[i-1].style.backgroundColor='#FFF';
					nodeList[i].style.backgroundColor='#FF0057';
				}
				else{
					clearInterval(timer);

					//渲染完了之后开放其他遍历
					noDoing=true;	
				}
				
			},500);
		}

		//这里面有一个javascript异步执行的问题，设置nodoing的时候	
	}

	//设置初始化
	function reset(){
		for (var i = 0; i < nodeList.length; i++) {
				
			nodeList[i].style.backgroundColor='#FFF';

		}
		nodeDeep=0;
		nodeList=[];
	}

	//事件
	preBtn.onclick=function(){

		if(noDoing){
			reset();
			preOrder(_root);
			render();
		}
		else{
			alert('正在遍历中，请稍后再按疤疼');
		}
		
	}

	postBtn.onclick=function(){
		if (noDoing) {
			reset();
			postOrder(_root);
			render();
		}
		else{
			alert('正在遍历中，请稍后再按疤疼');
		}
		
	}

	preSelect.onclick=function(){

		var foundTextValue=new RegExp(foundText.value.trim(),'i');//这里数据为空这种情况明天接着调
		console.log(typeof(foundText.value));
		console.log(foundTextValue);

		if(noDoing){
			reset();
			preOrder(_root);
			render(foundTextValue);
		}
		else{
			alert('正在遍历中，请稍后再按疤疼');
		}
		

	}
	postSelect.onclick=function(){
		var foundTextValue=new RegExp(foundText.value.trim(),'i');
		console.log(foundTextValue);

		if(noDoing){
			reset();
			postOrder(_root);
			render(foundTextValue);
		}
		else{
			alert('正在遍历中，请稍后再按疤疼');
		}
		
	}
}
