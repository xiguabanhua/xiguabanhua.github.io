/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-07-31 21:59:56
 * @version $Id$
 */
window.onload=function(){
	var preBtn=document.getElementById('pre-btn'),
		miBtn=document.getElementById('mi-btn'),
		postBtn=document.getElementById('post-btn'),
		_root=document.querySelector('.root')

		//数组存放遍历的节点
		var nodeList=[];

		//前序
	function preOrder(node){
		if(node!=null){
			nodeList.push(node);
			preOrder(node.firstElementChild);
			preOrder(node.lastElementChild);
		}
	}
		//中序
	function inOrder(node){
		if(node!=null){
			inOrder(node.firstElementChild);
			nodeList.push(node);
			inOrder(node.lastElementChild);
		}

	}
		//后序
	function postOrder(node){
		if(node!=null){
			postOrder(node.firstElementChild);
			postOrder(node.lastElementChild);
			nodeList.push(node);
		}

	}

		//动效
	function render(){
		var i=0;
		nodeList[i].style.backgroundColor='#FF0057';

		//选出select中选中的value值
		var value=document.getElementsByTagName('select')[0].value;
		if(value=='慢'){
			console.log(value);
			value=1000;
		}
		else if (value=='中') {
			value=500;
		}
		else if(value=='快'){
			value=300;
		}
		

		timer=setInterval(function(){
			i++;
			// console.log(i);
			if(i<nodeList.length){
				nodeList[i-1].style.backgroundColor='#FFF';
				nodeList[i].style.backgroundColor='#FF0057';
			}
			else{
				clearInterval(timer);
			}
			
		},value);
		

	}

	//设置初始化
	function reset(){
		for (var i = 0; i < nodeList.length; i++) {
				
			nodeList[i].style.backgroundColor='#FFF';

		}
		nodeList=[];
	}

	//事件
	preBtn.onclick=function(){
		reset();
		preOrder(_root);
		render();
	}
	miBtn.onclick=function(){
		reset();
		inOrder(_root);
		render();
	}
	postBtn.onclick=function(){
		reset();
		postOrder(_root);
		render();
	}
}
