/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-07-26 21:43:53
 * @version $Id$
 */
window.onload=function(){
	var oIn=document.getElementById('in'),
		inValue=document.getElementById('in-value'),
		inArea=document.getElementById('in-area'),
		oSubmit=document.getElementById('submit'),
		outValue=document.getElementById('out-value');
		console.log(outValue);

	//渲染的函数
	function render(stuff,tag){
		// console.log(stuff);
		if(tag=='in'){
				inValue.innerHTML='';
		}
		else if(tag=='out'){
				outValue.innerHTML='';
		}
		stuff.map(function(x){
			var oSpan=document.createElement('span');
			oSpan.innerText=x;
			console.log(x);

			if(tag=='in'){
				inValue.appendChild(oSpan);
			}
			else if(tag=='out'){
				outValue.appendChild(oSpan);
			}
		})
	}

	//输入的数组
	var tags=[];

	oIn.onkeyup=function(){
		// console.log(this.value);
		if((/(\s|,|\，)/g.test(this.value))||(event.keyCode==13)){

			if(tags.indexOf(this.value.replace(/(\s|,|\，)/g,''))<0){

				if(tags.length>=10){
					tags.shift();
					console.log(tags.length);
				}
				tags.push(this.value.replace(/(\s|,|\，)/g,'').trim());
				console.log(tags.length);
			}
			
			this.value='';

			render(tags,'in');
		}
		//lantern
	}

	//删除tag,鼠标事件
	inValue.addEventListener('click',function(e){
		// console.log(e);
		var index=tags.indexOf(e.target.innerHTML);
		//删除改元素
		tags.splice(index,1);
		//页面上再渲染一次
		render(tags,'in');
	})

	var noReArea=[];

	oSubmit.onclick=function(){

		var tagsArea=inArea.value.replace(/[,、\s，、/\\s\n]+/g,',').split(',');

		//在input中不能直接用\s\n当作回车的正则匹配，但是在textArea就可以，因为在input中的回车是特殊的意义，不是value的值，但是在textArea中就是个换行符。
		
		tagsArea.map(function(x){

			if(noReArea.indexOf(x)<0){
				
				if(noReArea.length>=10){
					noReArea.shift();
				}
				noReArea.push(x);
			}
		});
		
		console.log(noReArea);

		render(noReArea,'out');

	}


}
