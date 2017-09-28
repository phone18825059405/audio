//(function(window){
module.exports = slider;
function slider(options, data){
		if(arguments.length == 1){
			this.data = arguments[0];
		}else{
			this.data = data;
		}

		if (this.data.length == 0)return;


		this.slider = document.querySelector('.slider') || options.slider;
		this.transitionSpeed = 300 || options.transitionSpeed;
		this.intervalTimer = 3000 || options.intervalTimer;
		this.indexColor = 'rgba(255,255,255,.8)' || options.indexColor;
		this.indexActiveColor = 'rgba(255,0,0,.8)' || options.indexActiveColor;
		this.indexSize = 8 || options.indexColor;
		this.iWidth = document.body.offsetWidth || document.documentElement.offsetWidth || window.innerWidth;
		this.index = 1;

		console.log(this.data)
		if(this.data.length == 1){
			var img = document.createElement('img');
			img.src = this.data[0].src;
			img.style.width = '100%';
			img.display = 'block';
			this.slider.appendChild(img);
			return;
		}

		this.renderDom();

		this.slider.querySelector('ul').style.webkitTransition = 'transform '+this.transitionSpeed+'ms ease';
		this.slider.querySelector('span').style.background = this.indexActiveColor;
		this.slider.querySelector('ul').style.webkitTransform = 'translate3d('+ -(this.index * this.iWidth) +'px,0,0)';

		var that = this;
		this.init = setInterval(function(){
			that.index ++;
			that.play();
		},this.intervalTimer)

		this.addTouchListener();
	}
	slider.prototype.renderDom = function(){
		var that = this;
		var ul = document.createElement('ul');
		var div = document.createElement('div');
		//焦点图样式
		that.slider.style.width = that.iWidth + 'px';
		that.slider.style.overflow = 'hidden';
		that.slider.style.position = 'relative';
		//ul样式
		ul.className = 'clearfix';
		ul.style.listStyle = 'none';
		ul.style.width = (that.data.length+2) * that.iWidth + 'px';
		//小圆点外层样式
		div.style.position = 'absolute';
		div.style.marginLeft = -((that.indexSize * that.data.length) + (that.indexSize*that.data.length))/2 + 'px';
		div.style.bottom = '20px';
		div.style.left = '50%';

		var frg = document.createDocumentFragment();
		for(var i=0,len=that.data.length; i<len; i++){
			var li = document.createElement('li');
			li.style.float = 'left';
			li.style.width = that.iWidth +'px';
			li.innerHTML = '<a href="javascript:"><img src="'+ that.data[i]['src'] +'" width="'+ that.iWidth +'"></a>';
			frg.appendChild(li);

			var span = document.createElement('span');
			span.style.background = that.indexColor;
			span.style.display = 'inline-block';
			span.style.width = span.style.height = that.indexSize + 'px';
			span.style.borderRadius = '50%';
			span.style.margin = '0 '+ that.indexSize / 2 +'px';
			div.appendChild(span);
			
		}
		ul.appendChild(frg);

		var last = ul.children[ul.children.length-1].cloneNode(true);
		var first = ul.children[0].cloneNode(true);
		ul.insertBefore(last,ul.children[0]);
		ul.appendChild(first);

		that.slider.appendChild(ul);
		that.slider.appendChild(div);
	}
	slider.prototype.addTouchListener = function(){
		var that = this;
		var startX, startY, moveX, moveY,distX,distY,startTimer,endTimer;
		var ul = that.slider.querySelector('ul');

		var touchHandler = {
			tStart:function(e){
				startTimer = new Date()*1;
				clearInterval(that.init);
				var touches = e.touches;
				startX = touches[0].pageX;
				startY = touches[0].pageY;
				console.log(startX)
				this.addEventListener('touchmove',touchHandler.tMove,false);
				this.addEventListener('touchend',touchHandler.tEnd,false);
			},
			tMove:function(e){
				var changeTouches = e.changedTouches;
				moveX = changeTouches[0].pageX;
				moveY = changeTouches[0].pageY;
				distX = moveX - startX;
				distY = moveY - startY;

				ul.style.webkitTransition = '';
				if(Math.abs(distX) > Math.abs(distY)){
					e.preventDefault();
					//console.log(distX)
					ul.style.webkitTransform = 'translate3d('+ (-that.index * that.iWidth+distX) +'px,0,0)';
				}		
			},
			tEnd:function(e){
				endTimer = new Date()*1;
				var speed = endTimer - startTimer;
				if(speed < 300){
					if(distX>0){
						that.index --;
						that.play();
					}else{
						that.index ++;
						that.play();
					}
				}else{
					if(Math.abs(distX) > that.iWidth / 3){
						if(distX>0){
							that.index --;
							that.play();
						}else{
							that.index ++;
							that.play();
						}
					}else{
						that.play();
					}	
				}
				startX=startY=moveX=moveY=distX=distY=null;
				this.removeEventListener('touchmove',touchHandler.tMove,false);
				this.removeEventListener('touchend',touchHandler.tEnd,false);
				that.init = setInterval(function(){
					that.index ++;
					that.play();
				},that.intervalTimer)
			}
		}
		ul.addEventListener('touchstart',touchHandler.tStart,false)

	}
	slider.prototype.play = function(){
		var that = this;
		var index = that.index;
		
		var ul = that.slider.querySelector('ul');
		if(!ul)return;
		var spans = that.slider.querySelectorAll('span');

		ul.style.webkitTransition = 'transform '+ that.transitionSpeed +'ms ease';
		ul.style.webkitTransform = 'translate3d('+ -(index * that.iWidth) +'px,0,0)';
		for(var i=0,len=spans.length; i<len; i++){
			spans[i].style.background = that.indexColor;
		}

		if(index == that.data.length+1){
			that.index = 1;
			
			setTimeout(function(){
				ul.style.webkitTransition = 'transform 0ms ease';
				ul.style.webkitTransform = 'translate3d('+ -that.iWidth +'px,0,0)'
			},300)
		}
		if(index == 0){
			that.index = that.data.length;

			setTimeout(function(){
				ul.style.webkitTransition = 'transform 0ms ease';
				ul.style.webkitTransform = 'translate3d('+ that.data.length*-that.iWidth +'px,0,0)'
			},300)
		}
		//console.log(index-1)
		spans[that.index-1].style.background = that.indexActiveColor;
	}
//})(window)