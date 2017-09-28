<template>
	<div>
		<transition name="bottomIn">
	        <div v-show="songList.length" class="baseBar clearfix">
	            <div class="info"   v-tap="{ methods : showTarget,paramA:'fullScreenState' }">
	                <img :src="playerInfo.curImg?playerInfo.curImg.match(/http/)?playerInfo.curImg:'http://img1.kwcdn.kuwo.cn/star/albumcover/'+playerInfo.curImg:'http://image.kuwo.cn/mpage/html5/2015/tuijian/defpic_240.png'" alt="">
	                <div class="text">
	                    <p class="songName" v-html="playerInfo.curSongName"></p>
	                    <p class="singer" v-html="playerInfo.curSinger"></p>
	                </div>
	            </div>
	            <div class="operation">
	                <span @click="togglePlay"><ui-icon-button color="white" :icon="iconPlay"  type="secondary"></ui-icon-button></span>
	                <span @click="nextSong"><ui-icon-button color="white" icon="skip_next"  type="secondary"></ui-icon-button></span>
	                <span  v-tap="{ methods : showTarget,paramA:'songListState' }"><ui-icon-button color="white" icon="queue_music"  type="secondary"></ui-icon-button></span>
	            </div>
	        </div>
	    </transition>
	    <!--简易播放列表-->
	    <transition name="fade">
	        <div id="queue" v-show="songListState" @click="hideSongList">
	            <div>
	                <dl>
	                    <dt class="amount">
	                        <span>播放队列({{songListLen}})</span>
	                        <i class="iconfont order" @click="changeMode" ref="mode_simple">&#xe60d;</i>
	                        <span class="clearAll">清空</span>
	                    </dt>
	                    <div class="dl-wrapper" v-if="songList.length>0">
	                        <dd v-for="item in songList" :class="['list',playerInfo.curIndex==item.index?'currentsong':'']" :index="item.index" @click="playTarget">
	                            <span class="name" v-html="item.songName"></span>
	                            <span class="singer" v-html="' - '+item.singer"></span>
	                            <div :class="playerInfo.curIndex==item.index?playerInfo.playing==true?'Icon_playing':'Icon_pause':''">
	                                <span></span>
	                                <span></span>
	                                <span></span>
	                                <span></span>
	                            </div><i id="del" class=" iconfont"></i>
	                        </dd>
	                    </div>      
	                </dl>
	                <span id="shut" v-tap.stop="{ methods : hideTarget,paramA:'songListState' }">关闭</span>
	            </div>
	        </div>
	    </transition>
	    <!--全屏音乐-->
	    <transition name="bottomIn">
	        <div class="fullScreen" v-show="fullScreenState">
	            <div style="position: absolute;top: 0;left: 0; right: 0; bottom: 0;height: 100%;width: 100%;background-image: url(http://img8.zol.com.cn/bbs/upload/10656/10655778.jpg);background-size: cover;z-index: -1;opacity: .4;">            </div>
	                <div class="top">
	                    <div class="info"><span class="songName" v-html="playerInfo.curSongName"></span><br><span v-html="playerInfo.curSinger"></span></div>
	                    <span class="back" v-tap="{ methods : hideTarget,paramA:'fullScreenState' }"></span>
	                </div>
	                <div class="middle">
	                    <div id="lyrics" v-if="curSongLyc" :style="{height:lycColumns*0.72+'rem'}">
	                        <ul ref="lyc">
	                            <li v-for="(item,index) in curSongLyc" :data-column="index" :data-time="item.timeId" class="">{{item.text}}</li>
	                        </ul>
	                    </div>
	                </div>
	                <div class="bottom">
	                    <div class="line-1">
	                        <span style="display:block;text-align:center;color:#fff;line-height:2rem;visibility: hidden;">正在缓冲……</span>
	                        <i id="show_setting" class="iconfont setting">&#xe602;</i>
	                    </div>
	                    <div class="line-2">
	                        <span class="timer" ref="curTime">00:00</span>      
	                        <div id="progress" ref="progress">
	                            <span class="bar-t" ref="progressTl" style="width: 0"></span>
	                            <span class="bar-b" ref="progressBl"></span>
	                            <span class="point" style="left: 0" ref="progressPoint"></span>
	                        </div>
	                        <span class="timer" ref="duration">{{playerInfo.duration | toTime}}</span>
	                    </div>
	                    <div class="line-3">
	                        <i id="mode" class="iconfont order" @click="changeMode" ref="mode_full" >&#xe60d;</i>
	                        <i id="prev" class="iconfont pre" @click="prevSong">&#xe61f;</i>
	                        <i id="play" class="iconfont control" ref="iconPlay_full" @click="togglePlay">&#xe61e;</i>
	                        <i id="next" class="iconfont next" @click="nextSong">&#xe61d;</i>
	                        <i id="list" class="iconfont"  v-tap="{ methods : showTarget,paramA:'songListState' }">&#xe611;</i>
	                    </div>
	                    <div class="line-4">
	                        <i class="iconfont">&#xe616;</i>
	                        <a :href="playerInfo.downLoadUrl" style="display:block"><i class="iconfont">&#xe606;</i></a>
	                        <i class="iconfont">&#xe61a;</i>
	                        <i class="iconfont">&#xe619;</i>
	                        <i id="showMore" class="iconfont"  v-tap="{ methods : showTarget,paramA:'moreListState' }">&#xe621;</i>
	                    </div>
	                </div>
	                <audio id="player" src="" ref="audioPlayer"></audio>
	                <i class="iconfont">&#xe696;</i>                    
	                <transition name="fade">
	                    <div id="more" v-show="moreListState">
	                        <div class="list_icon">
	                            <ul>
	                                <li><i class="iconfont">&#xe605;</i><span>添加到</span></li>
	                                <li><i class="iconfont">&#xe616;</i><span>喜欢</span></li>
	                                <li><a :href="playerInfo.downLoadUrl" style="display:block;color: #fff"><i class="iconfont">&#xe606;</i><span>下载</span></a></li>
	                                <li><i class="iconfont">&#xe613;</i><span>歌手海报</span></li>
	                                <li><i class="iconfont">&#xe61b;</i><span>选择音质</span></li>
	                                <li><i class="iconfont">&#xe617;</i><span>相似推荐</span></li>
	                                <li><i class="iconfont">&#xe60f;</i><span>分享</span></li>
	                                <li><i class="iconfont">&#xe60b;</i><span>设置彩铃</span></li>
	                            </ul>
	                        </div>
	                        <div class="volume">
	                            <i class="iconfont">&#xe600;</i>
	                            <div class="progress" ref="pg_volume">
									<span class="bar-t" ref="pg_volume_t" style="width: 50%"></span>
									<span class="bar-b" ref="pg_volume_b" ></span>
									<span class="point" ref="pg_volume_p" style="left: 50%"></span>
								</div>
	                        </div>
	                        <span class="shut" v-tap="{ methods : hideTarget,paramA:'moreListState' }">取消</span>
	                    </div>
	                </transition>
	                <div id="setting" style="display: none">
	                    <div class="list_icon">
	                        <ul>
	                            <li><i class="iconfont">&#xe614;</i><span>搜索歌词</span></li>
	                            <li><i class="iconfont">&#xe607;</i><span>字体调整</span></li>
	                            <li><i class="iconfont">&#xe601;</i><span>歌词调整</span></li>
	                            <li><i class="iconfont">&#xe615;</i><span>搜索图片</span></li>
	                            <li><i class="iconfont">&#xe610;</i><span>关闭写真</span></li>
	                            <li><i class="iconfont">&#xe608;</i><span>设为皮肤</span></li>
	                        </ul>
	                    </div>
	                    <span class="shut">取消</span>
	                </div>
	                <div class="mask" style="display:none"></div>

	                <div class="msg" style="position:fixed;z-index:999;top:50%;left:50%;width:8rem;margin-left:-4rem;margin-top:-1.7rem;text-align:center;background:rgba(0,0,0,.9);color:#fff;padding:1rem;display:none;opacity:0;border-radius:0.4rem;font-size:1.4rem;transition:opacity 300ms ease">循环模式</div>
	        </div>
	    </transition>
	    <!--信息弹出框-->
	    <transition name="fade">
	        <div class="tips" v-show="tips.state"><span>{{tips.value}}</span></div>
	    </transition>
	    <!--MV弹出层列表-->
	    <transition name="fade">
	        <div v-show="mvViewState" style="position: fixed;left: 0;top: 0;height: 100%; width: 100%;background: #fff;z-index: 999;overflow-y: scroll;">
	            <header>
	                <div class="playTit nofixed">
	                   <a href="javascript:" class="back" v-tap="{ methods : hideVideoPlayer }"><img src="http://image.kuwo.cn/mpage/html5/2015/tuijian/back.png" width="100%"></a>
	                   <span class="backTex" id="mvplaytitleid" ref="mvTitle"></span>
	                   <a href="javascript:" class="seachBtn"><img src="http://image.kuwo.cn/mpage/html5/2015/tuijian/seach.png" width="100%"></a>
	                </div>
	            </header>
	            <video controls autoplay="true" src="" ref="videoPlayer" style="width: 100%;display: block;"></video>

	            <div class="newMc" id="mvplaysgid" style="display: block;">
	                <h3>相关MV推荐</h3>
	                <div class="newList2">
	                    <div v-for="item in mvRecommend" class="newBs4" style="clear: both;" :mid="item.id" :title="item.name+'-'+item.artist"  v-tap="{ methods : showVideoPlayer }">
	                        <img :src="'http://img1.kwcdn.kuwo.cn/wmvpic/'+item.mvpic" class="mvbk">
	                        <a href="javascript:" class="playMv2"><img src="http://image.kuwo.cn/mpage/html5/2015/tuijian/playHover.png"></a>
	                        <p class="newBtex">{{item.name}} - {{item.artist}}</p>
	                    </div>
	                </div>
	                <p class="h50"></p>
	            </div>
	        </div>
	    </transition>
	</div>
</template>
<script>
	import Hammer from '../public/js/hammer.js';
	export default{
		data(){
			return{
				musicList:{
	                /*currentPage:0,
	                items:[]*/
	            },
	            mvList:{
	                /*currentPage:0,
	                items:[]*/
	            },


	            songList:[],//简易列表
	            fullScreenState:false,//全屏列表--单歌
	            songListState:false,               
	            moreListState:false,


	            playerInfo:{
	                playing:false,
	                curIndex:null,
	                curSongID:'',
	                curSongUrl:'',
	                downLoadUrl:'',
	                curSongName:'音乐播放器',
	                curSinger:'来一首吧',
	                curImg:'',
	                duration:'00:00',
	                curTime:0,//当前播放时间
	            },

	            curSongLyc:{},//当前个特区歌词
	            lycColumns:null,
	            lycScrollDir:null,//歌词滚动
	            isEmptyLyc:true,

	            iconPlay:'play_arrow',
	            playMode:0,//当前播放模式
	            tips:{//播放模式提示
	                state:false,
	                value:''
	            },
	            volume:50,
			}
		},
		computed:{
	        songListLen(){
	            return this.songList.length
	        },
        },
        methods:{
            resetProps(){
                this.musicList.items = [];
                this.musicList.currentPage = 0;

                this.mvList.items = [];
                this.mvList.currentPage = 0;

                this.$parent.$data.curTab = 'tab_music';
                this.$parent.$data.curTabState = {};
            },
            
            hideVideoPlayer(){
                this.mvViewState = false;
                this.$refs.videoPlayer.src = '';
                document.getElementsByTagName('html')[0].className = '';
            },

            showTarget(params){
                this[params.paramA] = true;
                document.getElementsByTagName('html')[0].className = 'overHide';
            },
            hideTarget(params){
                this[params.paramA] = false;
                document.getElementsByTagName('html')[0].className = '';
            },
            hideSongList(event){
                if(event.target.id == 'queue'){
                    this.songListState = false;
                }
                document.getElementsByTagName('html')[0].className = '';                
            },
            updateInfo(index){ //更改歌曲更新歌名歌手
                var _index;

                if(index){
                    _index = index;
                }else{
                    _index = event.currentTarget.getAttribute('index') *1;
                }
                var curSongData = this.musicList.items[_index];
                console.log(curSongData)
                this.playerInfo.curIndex = _index;

                this.playerInfo.curSongID = curSongData.MUSICRID.split('_')[1];
                this.playerInfo.curSongUrl = this.$refs.audioPlayer.src = 'http://antiserver.kuwo.cn/anti.s?format=aac|mp3&rid=MUSIC_'+curSongData.MUSICRID.split('_')[1]+'&type=convert_url&response=res';
                this.playerInfo.downLoadUrl = 'http://antiserver.kuwo.cn/anti.s?format=mp3&rid=MUSIC_'+curSongData.MUSICRID.split('_')[1]+'&type=convert_url&response=res';
                this.playerInfo.curSongName = curSongData.SONGNAME;
                this.playerInfo.curSinger = curSongData.ARTIST;

            },
            commPlaySong(event){ //点击歌曲列表添加到简易操作列表
                this.updateInfo();
                this.insistPlay();
                this.songListState = false;             
            },
            playTarget(event){//点击简易操作列表，播放所选歌曲
                console.log('eeeeee')
                this.updateInfo(event.currentTarget.getAttribute('index')*1);
                this.insistPlay();
            },
            togglePlay(){
                if(this.songList.length>0 && this.playerInfo.curSongUrl!==''){
                    this.playerInfo.playing = !this.playerInfo.playing;
                    if(this.playerInfo.playing == true){
                        this.$refs.audioPlayer.play()
                        this.iconPlay = 'pause';
                        this.$refs.iconPlay_full.innerHTML = '&#xe61c;';
                    }else{
                        this.$refs.audioPlayer.pause()
                        this.iconPlay = 'play_arrow';
                        this.$refs.iconPlay_full.innerHTML = '&#xe61e;'
                    }
                }               
            },
            insistPlay(){//绝对播放
                var that = this;
                if(this.songList.length>0 && this.playerInfo.curSongUrl!==''){
                    this.playerInfo.playing = true;
                    this.$refs.audioPlayer.play();
                    this.iconPlay = 'pause';
                    this.$refs.iconPlay_full.innerHTML = '&#xe61c;';
                    
                    this.loadLyic();
                }
            },
            loadLyic(){//加载歌词

                this.curSongLyc = {};
                this.isEmptyLyc = true;
                this.playerInfo.curLycScrollTop = 0;
                this.$refs.lyc.style.transform = 'none';
                /*if(that.$refs.lyc.querySelector('.on')){
                    that.$refs.lyc.querySelector('.on').className = '';
                }*/

                var that = this;
                var temp = {};

                this.$http.get('http://mobile.kuwo.cn/mpage/html5/songinfoandlrc?mid='+this.playerInfo.curSongID).then(function(response){
                    console.log(response)
                    response.bodyText.promise.then(function(res){   
                        var res = res.replace(/'/g,'"').replace(/lrclist/,'"lrclist"');
                        res = JSON.parse(res)
                        console.log(res)
                        that.playerInfo.duration = res.songinfo.duration*1;
                        that.playerInfo.curImg = res.songinfo.artpic;

                        if(res.lrclist.length){
                            that.curSongLyc = res.lrclist;
                            that.isEmptyLyc = false;
                        }else{
                            that.curSongLyc = [{'timeId':0,text:'此歌曲暂无歌词'}]
                            that.isEmptyLyc = true;
                        }                      
                    })                                      
                })  
            },
            insistPause(){//绝对暂停
                if(this.songList.length>0 && this.playerInfo.curSongUrl!==''){
                    this.playerInfo.playing = false;
                    this.$refs.audioPlayer.pause();
                    this.iconPlay = 'play_arrow';
                    this.$refs.iconPlay_full.innerHTML = '&#xe61e;';                    
                }
            },
            prevSong(){
                if(!this.songList.length)return;
                if(this.songList.length == 1){

                }else{
                    this.playerInfo.curIndex --;//console.log(this.playerInfo.curIndex);console.log(this.musicList.items[this.playerInfo.curIndexh])
                    this.playerInfo.curIndex = this.playerInfo.curIndex<0?this.songList.length-1:this.playerInfo.curIndex;

                    this.updateInfo(this.playerInfo.curIndex);

                    this.insistPlay();

                }
            },
            nextSong(){
                if(!this.songList.length)return;
                if(this.songList.length == 1){

                }else{
                    this.playerInfo.curIndex ++;//console.log(this.playerInfo.curIndex);console.log(this.musicList.items[this.playerInfo.curIndexh])

                    this.playerInfo.curIndex = this.playerInfo.curIndex>this.songList.length-1?0:this.playerInfo.curIndex;

                    this.updateInfo(this.playerInfo.curIndex);

                    this.insistPlay();

                }
            },
            changeMode(){//修改播放模式
                var that = this;
                this.playMode ++;
                this.playMode = this.playMode>2?0:this.playMode;
                var modeEle_full = this.$refs.mode_full;
                var modeEle_simple = this.$refs.mode_simple;
                switch(this.playMode)
                {
                    case 0:
                        modeEle_simple.innerHTML =  modeEle_full.innerHTML = '&#xe60d;';
                        /*this.modeEle.innerHTML = '&#xe60d;';
                        showMsg('顺序播放')*/                       
                        that.tips.value ="顺序播放";
                        that.tips.state = true;
                        clearTimeout(timeoutTips);
                        timeoutTips = setTimeout(function(){
                            that.tips.state = false;
                        },3000)
                    break;

                    case 1:
                        modeEle_simple.innerHTML =  modeEle_full.innerHTML = '&#xe612;';
                        /*this.modeEle.innerHTML = '&#xe612;';
                        showMsg('随机播放')*/                       
                        that.tips.value ="随机播放";
                        that.tips.state = true;
                        clearTimeout(timeoutTips);
                        timeoutTips = setTimeout(function(){
                            that.tips.state = false;
                        },3000)
                    break;

                    case 2:
                        modeEle_simple.innerHTML =  modeEle_full.innerHTML = '&#xe618;';
                        /*this.modeEle.innerHTML = '&#xe618;';
                        showMsg('单曲循环')*/                       
                        that.tips.value ="单曲循环";
                        that.tips.state = true;
                        clearTimeout(timeoutTips);
                        timeoutTips = setTimeout(function(){
                            that.tips.state = false;
                        },3000)
                    break;
                }
            },
            updateLyric(playerObj){
                if(this.isEmptyLyc) return;
                var that = this;
                var targetIndex;
                //var _time;
                var index = 0;

                this.curSongLyc.forEach(function(item,index){

                    if(playerObj.currentTime >= item.timeId){
                        //console.log(i +' ||| ' +that.curSongLyc[i])
                        targetIndex = index;
                        //_time = item.timeId;
                    }
                    ++index;
                
                })

                if(targetIndex){
                    //console.log(targetIndex)
                    if(that.$refs.lyc.querySelector('.on')){
                        that.$refs.lyc.querySelector('.on').className = '';
                    }
                    
                    that.$refs.lyc.children[targetIndex].className = 'on';
                    if(targetIndex>=(that.lycColumns-1)/2){
                        that.$refs.lyc.style.transform = 'translate3d(0,'+ (that.$refs.lyc.children[targetIndex].offsetTop - that.lycScrollDir)*-1+'px,0)';
                    }else{
                        that.$refs.lyc.style.transform = 'translate3d(0,0,0)';
                    }
                }
                
            },
           
            resize(){
                this._fontSize =  window.innerWidth / 7.5;
                document.getElementsByTagName('html')[0].style.fontSize = this._fontSize +'px';
                var columns = Math.floor((window.innerHeight /this._fontSize - 4.72) / 0.72);
                this.lycColumns = columns%2===0?columns-1:columns;
                this.lycScrollDir = this.lycColumns*0.72*this._fontSize/2 - (0.72*this._fontSize/2);            
            },
        },
        filters:{
            toTime(value){//时间格式化，秒数转成minute:second格式
                var currentTime = parseInt(value);

                var minute = parseInt(currentTime/60);
                    minute = minute>9?minute:'0'+minute;
                var second = currentTime%60;
                    second = second>9?second:'0'+second;
                
                return minute+':'+second;
            },
            cl_nbsp(value){
                return value.replace(/&nbsp|&apos/g,' ')
            }
        },
        mounted(){
        	console.log(this)
            var that = this;
            window.timeoutTips = '';

            this.resize();
          
            
            var scrollY = Math.ceil(document.getElementsByTagName('html')[0].style.fontSize.slice(0,-2)*1 *1.82);
            console.log(scrollY)
            /*window.addEventListener('scroll',function(){

                //选项卡fixed
                if(document.body.scrollTop >= scrollY){
                    tabs.classList.add('fixedTop')
                }else{
                    tabs.classList.remove('fixedTop')
                }

                //滚动加载
                that.scrollLoad();
                
            })*/
            window.addEventListener('orientationchange',function(){
                that.resize();
            })

            var that = this;
            var audioEle = this.$refs.audioPlayer;//音频节点
                var scrollBar = this.$refs.progress;//滚动条
                var scrollPoint = this.$refs.progressPoint;//滚动小圆点
                var bar_t = this.$refs.progressTl;//上层滚动样式条
                var bar_b = this.$refs.progressBl;//下层滚动样式条
                var curTime = this.$refs.curTime;
                var curDist = 0;

                //               
                var pg_volume = this.$refs.pg_volume;
                var pg_volume_t = this.$refs.pg_volume_t;
                var pg_volume_b = this.$refs.pg_volume_b;
                var pg_volume_p = this.$refs.pg_volume_p;
                console.log(audioEle)
                console.log(pg_volume_t)

                //初始化音量值;
                var curDist_volume = window.innerWidth*0.85;
                pg_volume_p.style.left = pg_volume_t.style.width = audioEle.volume*100 +'%';
                console.log(curDist_volume)

            //更新歌词和播放时间等
            audioEle.addEventListener("timeupdate",function(){

                var len = audioEle.buffered.length;
                if(len > 0 && len != undefined){
                    bar_b.style.width = (audioEle.buffered.end(len - 1) / audioEle.duration)*100 +'%';
                }

                scrollPoint.style.left = bar_t.style.width = parseInt(audioEle.currentTime) * (scrollBar.offsetWidth / audioEle.duration) + 'px';
                //scrollPoint.style.left = bar_t.style.width = (audioEle.played.end(0) / audioEle.duration)*100 + '%';

                var second = '00',minute = '00';
                var currentTime = parseInt(audioEle.currentTime);

                var minute = parseInt(currentTime/60);
                    minute = minute>9?minute:'0'+minute;
                var second = currentTime%60;
                    second = second>9?second:'0'+second;
                
                curTime.innerText = minute+':'+second;
                
                that.updateLyric(audioEle);
            },false);

            audioEle.addEventListener('ended',function(){
                console.log('end')
                switch(that.playMode)
                {
                    case 0:
                        that.nextSong();
                    break;
                    case 1:
                        that.playerInfo.curIndex  = parseInt(Math.random()*that.songList.length)
                        that.updateInfo(that.playerInfo.curIndex);
                        that.insistPlay();
                    break;

                    case 2:
                        that.updateInfo(that.playerInfo.curIndex);
                        that.insistPlay();
                    break;
                }
            })

            audioEle.addEventListener('play',function(){
                that.$refs.audioPlayer.play()
                that.iconPlay = 'pause';
                that.$refs.iconPlay_full.innerHTML = '&#xe61c;';
            })
            audioEle.addEventListener('pause',function(){
                that.$refs.audioPlayer.pause()
                that.iconPlay = 'play_arrow';
                that.$refs.iconPlay_full.innerHTML = '&#xe61e;'
            })
            //播放进度条滑动事件
            var progressSlider = new Hammer(this.$refs.progress);
            progressSlider.on('panmove',function(e){
                if(that.playerInfo.curSongUrl == '') return;
                if(e.deltaX + curDist > scrollBar.offsetWidth){
                    scrollPoint.style.left = '99%';
                    return;
                }
                if(e.deltaX + curDist < 0){
                    scrollPoint.style.left = 0;
                    return;
                }
                scrollPoint.style.left = bar_t.style.width = (e.deltaX + curDist) / scrollBar.offsetWidth *100 + '%';

                //that.audioEle.currentTime = ((currentX + moveX) / that.scrollBar.offsetWidth) * that.audioEle.duration;
                //scrollPoint.style.left = bar_t.style.width = ((e.center.x - e.distance) / scrollBar.offsetWidth)*100 + '%';
            })
            progressSlider.on('panend',function(e){

                if(that.playerInfo.curSongUrl == '') return;

                if(e.deltaX + curDist > scrollBar.offsetWidth){
                    scrollPoint.style.left = '99%';
                }
                
                audioEle.currentTime = (e.deltaX + curDist) / scrollBar.offsetWidth * audioEle.duration;

                curDist += e.deltaX;
            })
            progressSlider.on('tap',function(e){

                if(that.playerInfo.curSongUrl == '') return;

                curDist = e.center.x - scrollBar.offsetLeft;

                var targetDist = ((e.center.x - scrollBar.offsetLeft) / scrollBar.offsetWidth)
                scrollPoint.style.left = bar_t.style.width = targetDist*100 + '%';
                
                audioEle.currentTime = targetDist * audioEle.duration;
            })

            //音量进度条滑动事件
            var volumeProgress = new Hammer(pg_volume);
            volumeProgress.on('tap',function(e){ 
                console.log(e)
                if(e.center.x - pg_volume.offsetLeft > pg_volume.offsetWidth ) {
                    pg_volume_p.style.left = pg_volume_t.style.width = value*100 + '%';
                    audioEle.volume = 1
                }else if(e.center.x - pg_volume.offsetLeft <0){
                    pg_volume_p.style.left = pg_volume_t.style.width = 0;
                    audioEle.volume = 0
                }else{
                    var value = ((e.center.x - pg_volume.offsetLeft) / pg_volume.offsetWidth);
                    audioEle.volume = value;       
                    pg_volume_p.style.left = pg_volume_t.style.width = value*100 + '%';
                }
                curDist_volume = e.center.x - pg_volume.offsetLeft;
            	                
            })
            volumeProgress.on('panmove',function(e){
               if(e.deltaX + curDist_volume > pg_volume.offsetWidth){
                     pg_volume_p.style.left = pg_volume_t.style.width = '100%';
                     audioEle.volume = 1;
                     return;
                }
                if((e.deltaX + curDist_volume)< 0){
                    scrollPoint.style.left = 0;
                     pg_volume_p.style.left = pg_volume_t.style.width = '0';
                     audioEle.volume = 0;
                     return;
                }

                var value = (e.deltaX + curDist_volume) / pg_volume.offsetWidth;
                audioEle.volume = value;
                pg_volume_p.style.left = pg_volume_t.style.width = value *100 + '%';
            })
            volumeProgress.on('panend',function(e){
                curDist_volume += e.deltaX;
            })
        },
	}
</script>