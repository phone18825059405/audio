<template>
    <div class="container">
        <div class="artistbanner">
            <div class="bannerInfo" artist-id="947">          
                <img ref="artistImg" src="http://star.kuwo.cn/star/starheads/300/10/94/745334819.jpg">      
                <!--icon_play-->
                <div class="banner_other clearfix">
                    <span v-if="musicList.items.length" class="ad_name fl">{{musicList.items[0].artist}}</span>
                    <a class="ad_playbtn fr" :index="0" @click="commPlaySong"></a>
                </div>
                 <div class="banner_other clearfix" style="top: 0;">
                    <a href="javascript:history.back()" class="back"><img src="../public/images/back.png" alt=""></a>
                </div>
            </div>
        </div>
        <ui-tabs fullwidth text-color-active="primary" text-color="gray" ref="tabs" @tab-change="tabsChange" >
            <ui-tab title="单曲" id="tab_music" >
                <div id="tabcontent" class="tabcontent">
                    <!--单曲列表-->
                    <ul class="artist_tab tabactive" music-total="358" v-if="musicList.items.length>1">
                         <li v-for="(item, index) in musicList.items" class="singBox" @click.stop="commPlaySong" :index="index" :mid="item.id" :songUrl="'http://antiserver.kuwo.cn/anti.s?format=aac|mp3&rid='+item.musicrId+'&type=convert_url&response=res'">
                            <div class="singTex">
                                <div class="singTexUp clearfix">
                                    <span class="songName fl">{{item.songName}}</span>                                  
                                        <span v-if="item.coopFormats[1] ==='192kmp3'" class="spanSingHQ fl"></span>                                
                                        <span v-if="item.coopFormats[0] ==='320kmp3'" class="spanSingLMusic fl" ></span>                                    
                                </div>
                                <div class="singName">{{item.artist}}-{{item.songName}}</div>
                            </div>                          
                                <a :class="item.hasEcho=='0'?'':'singMv'" :title="item.songname+'-'+item.artist" :mid="item.musicrId.split('_')[1]" @click.stop="showVideoPlayer"></a>                          
                            <a :href="'http://antiserver.kuwo.cn/anti.s?format=mp3&rid='+item.musicrId+'&type=convert_url&response=res'" class="ad_download"></a>
                        </li> 
                    </ul>
                </div>
            </ui-tab>
            <!---->
            <ui-tab title="MV" id="tab_mv" @select="loadMvList">
                <div class="singList" id="searchmvid">
                    <div v-for="(item, index) in mvList.items" class="singerMv" :index="index" :title="item.name+'-'+item.artist" :mid="item.musicid" @click="showVideoPlayer">
                        <p class="singerMvImg">
                            <img v-lazy="'http://img4.kwcdn.kuwo.cn:81/wmvpic/324'+item.pic.slice(3)">
                        </p>
                        <p class="singerRiTex">
                            <span class="singerRiName" >{{item.name}}</span>
                            <span class="singerRiName2">{{item.artist}}</span>
                        </p>
                    </div>
                </div>
            </ui-tab>
        </ui-tabs> 
        <transition name="bottomIn">
            <div v-show="songList.length" class="baseBar clearfix">
                <div class="info" v-tap="{ methods : showTarget,paramA:'fullScreenState' }">
                    <img :src="playerInfo.curImg?playerInfo.curImg.match(/http/)?playerInfo.curImg:'http://img1.kwcdn.kuwo.cn/star/albumcover/'+playerInfo.curImg:'http://image.kuwo.cn/mpage/html5/2015/tuijian/defpic_240.png'" alt="">
                    <div class="text">
                        <p class="songName" v-html="playerInfo.curSongName"></p>
                        <p class="singer" v-html="playerInfo.curSinger"></p>
                    </div>
                </div>
                <div class="operation">
                    <span @click="togglePlay"><ui-icon-button color="white" :icon="iconPlay"  type="secondary"></ui-icon-button></span>
                    <span @click="nextSong"><ui-icon-button color="white" icon="skip_next"  type="secondary"></ui-icon-button></span>
                    <span v-tap="{ methods : showTarget,paramA:'songListState' }"><ui-icon-button color="white" icon="queue_music"  type="secondary"></ui-icon-button></span>
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
                                <span class="name" v-html="item.songName">{{}}</span>
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
                    <span id="shut" v-tap="{ methods : hideTarget,paramA:'songListState' }">关闭</span>
                </div>
            </div>
        </transition>
        <!--全屏音乐-->
        <transition name="bottomIn">
            <div class="fullScreen" v-show="fullScreenState">
                    <div style="position: absolute;top: 0;left: 0; right: 0; bottom: 0;height: 100%;
    width: 100%;
    background-image: url(http://img8.zol.com.cn/bbs/upload/10656/10655778.jpg);
    background-size: cover;
    z-index: -1;
    opacity: .4;"></div>
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
                            <i id="mode" class="iconfont order" @click="changeMode" ref="mode_full">&#xe60d;</i>
                            <i id="prev" class="iconfont pre" @click="prevSong">&#xe61f;</i>
                            <i id="play" class="iconfont control" ref="iconPlay_full" @click="togglePlay">&#xe61e;</i>
                            <i id="next" class="iconfont next" @click="nextSong">&#xe61d;</i>
                            <i id="list" class="iconfont" v-tap="{ methods : showTarget,paramA:'songListState' }">&#xe611;</i>
                        </div>
                        <div class="line-4">
                            <i class="iconfont">&#xe616;</i>
                            <a :href="playerInfo.downLoadUrl" style="display:block"><i class="iconfont">&#xe606;</i></a>
                            <i class="iconfont">&#xe61a;</i>
                            <i class="iconfont">&#xe619;</i>
                            <i id="showMore" class="iconfont" v-tap="{ methods : showTarget,paramA:'moreListState' }">&#xe621;</i>
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
                    <div class="playTit">
                       <a href="javascript:" class="back" @click="hideVideoPlayer"><img src="http://image.kuwo.cn/mpage/html5/2015/tuijian/back.png" width="100%"></a>
                       <span class="backTex" id="mvplaytitleid" ref="mvTitle"></span>
                       <a href="javascript:" class="seachBtn"><img src="http://image.kuwo.cn/mpage/html5/2015/tuijian/seach.png" width="100%"></a>
                    </div>
                </header>
                <video controls autoplay="true" src="" ref="videoPlayer" style="width: 100%;display: block;margin-top: 0.88rem"></video>
    
                <div class="newMc" id="mvplaysgid" style="display: block;">
                    <h3>相关MV推荐</h3>
                    <div class="newList2">
                        <div v-for="item in mvRecommend" class="newBs4" style="clear: both;">
                            <img :src="'http://img1.kwcdn.kuwo.cn/wmvpic/'+item.mvpic" class="mvbk" :mid="item.id" @click="showVideoPlayer">
                            <a href="javascript:" class="playMv2"><img src="http://image.kuwo.cn/mpage/html5/2015/tuijian/playHover.png"></a>
                            <p class="newBtex">{{item.name}} - {{item.artist}}</p>
                        </div>
                    </div>
                    <p class="h50"></p>
                </div>
            </div>
        </transition>
         <!--加载动画-->
        <transition>
            <div id="loadtjid" style="display: block;" v-show="loading">
                <div id="padload" style="display: block;margin:0 auto;" class="loading">
                    <span class="padloadIcon"></span>
                    <span class="pullUpLabel" style="font-size:1.27em;">正在搜索，好音乐马上就来...</span>
                </div>
             </div>
        </transition>
    </div>
</template>
<script>
    import UiIconButton from 'keen-ui/src/UiIconButton.vue';
    import UiTabs from 'keen-ui/src/UiTabs.vue';
    import Hammer from '../public/js/hammer.js';

    export default{
        data(){
            return{
                musicList:{
                    currentPage:0,
                    items:[]
                },
                mvList:{
                    currentPage:0,
                    items:[]
                },

                mvRecommend:null,//video播放页面的MV推荐列表
                songList:[],//简易列表

                fullScreenState:false,
                songListState:false,               
                moreListState:false,
                mvViewState:false,

                playerInfo:{
                    playing:false,
                    curIndex:null,
                    curSongID:'',
                    curSongUrl:'',
                    curSongName:'音乐播放器',
                    downLoadUrl:'javascript:',
                    curSinger:'来一首吧',
                    curImg:'',
                    duration:'00:00',
                    curTime:0,//当前播放时间
                },

                curSongLyc:{},
                curTab:'tab_music',
                curTabState:{},
                lycColumns:null,
                lycScrollDir:null,//歌词滚动
                isEmptyLyc:true,

                iconPlay:'play_arrow',
                playMode:0,
                tips:{
                    state:false,
                    value:''
                },
                volume:50,
                _fontSize:'',
                loading:false,

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

                this.curTab = 'tab_music';
                this.curTabState = {};
            },
            showVideoPlayer(event){
                this.$refs.audioPlayer.pause();
                document.getElementsByTagName('html')[0].className = 'overHide';
                var id = event.currentTarget.getAttribute('mid');              
                this.$refs.mvTitle.innerHTML = event.currentTarget.getAttribute('title');              
                if(!this.mvViewState){
                    this.$http.get('http://mobile.kuwo.cn/mpage/html5/getmvinfo?mid='+id).then(function(response){
                        this.mvRecommend = response.body.musiclist;
                    })
                    this.mvViewState = true;
                }
                this.$refs.videoPlayer.src = 'http://antiserver.kuwo.cn/anti.s?rid=MUSIC_'+id+'&response=res&format=mp4&type=convert_url';                                          
            },
            hideVideoPlayer(){
                this.mvViewState = false;
                this.$refs.videoPlayer.src = '';
                document.getElementsByTagName('html')[0].className = '';
            },
            getHotKeys(){
                this.$http.get('http://mobile.kuwo.cn/mpage/html5/2015/action/hotword.jsp').then(function(response){
                    console.log(response)
                    var that = this;
                    response.body.forEach(function(item,index){
                        if(index<=5){
                            that.hotKeyList.left.push({name:item.name || item.disname})
                        }else if(index>=6 && index<=11){
                            that.hotKeyList.right.push({name:item.name || item.disname})
                        }else{
                            return
                        }
                    })
                    console.log(this.hotKeyList)
                 })
            },
            loadMusicList(event){//加载搜索出来的数据,歌曲列表
                var that = this;            
                this.loading = true;
                this.$http.get('http://m.kuwo.cn/newh5/artist/artistMusicByPage'+location.search+'&pn='+this.musicList.currentPage+'&rn=30').then(function(response){
                    //this.$set(this,musicList['items'],) 
                    var data = JSON.parse(response.body).data.musicList;
              
                     if(data.length){
                             this.musicList.items = this.musicList.items.concat(data);
                             this.musicList.currentPage++;
                        }else{
                            this.curTabState['tab_music'] = false;
                            this.loading = false;
                            return;
                        }
                        this.loading = false;
                       /* console.log('li数目：'+document.querySelector('[music-total]').children.length)
                        console.log('ul高度：'+document.querySelector('[music-total]').offsetHeight)
                        console.log('loaded')*/
                },function(){
                    this.loading = false;
                })
               
            },
            loadMvList(inistTrue,event){             
                if(!this.mvList.items.length || inistTrue == 'true'){
                    this.loading = true;
                    this.$http.jsonp('http://search2013.kuwo.cn/r.s?stype=mvlist&artistid='+location.search.match(/id=([0-9]+)/)[1]+'&sortby=0&rn=30&pn=1&r=20170502').then(function(response){

                        if(response.body.mvlist.length){
                            this.mvList.items = this.mvList.items.concat(response.body.mvlist)
                            this.mvList.currentPage++;
                        }else{
                            this.curTabState['tab_mv'] = false;
                            this.loading = false;
                        }
                        this.loading = false;
                    },function(){
                    this.loading = false;
                })                  
                }
               
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

                this.playerInfo.curSongID = curSongData.musicrId.split('_')[1];
                this.playerInfo.curSongUrl = this.$refs.audioPlayer.src = 'http://antiserver.kuwo.cn/anti.s?format=aac|mp3&rid=MUSIC_'+curSongData.musicrId.split('_')[1]+'&type=convert_url&response=res';
                this.playerInfo.downLoadUrl = 'http://antiserver.kuwo.cn/anti.s?format=mp3&rid=MUSIC_'+curSongData.musicrId.split('_')[1]+'&type=convert_url&response=res';
                this.playerInfo.curSongName = curSongData.songName;
                this.playerInfo.curSinger = curSongData.artist;

            },
            commPlaySong(event){ //点击歌曲列表添加到简易操作列表
                var that = this;
                that.songList = [];
                var _index = event.currentTarget.getAttribute('index') *1;
                var max = _index + 50;
                this.musicList.items.forEach(function(item,index){
                    if(index>=_index &&index<= max)
                    that.songList.push({
                        songUrl:'http://antiserver.kuwo.cn/anti.s?format=aac|mp3&rid='+item.musicrId+'&type=convert_url&response=res',
                        songName:item.songName,
                        singer:item.artist,
                        index:index
                    })
                })

                this.updateInfo();
                this.insistPlay();
                this.songListState = false;             
            },
            playTarget(event){//点击简易操作列表，播放所选歌曲
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
            scrollLoad(){//滚动加载
                if(document.body.scrollTop + 50 > document.body.scrollHeight - window.innerHeight){
                    if(this.loading) return;
                    console.log('loading')
                    switch(this.curTab){
                        case 'tab_music':
                            if(this.curTabState[this.curTab]==false) return;
                            this.loadMusicList();                                                      
                        break;

                        case 'tab_mv':
                            if(this.curTabState[this.curTab]==false) return;
                            this.loadMvList();                                                       
                        break;
                    }
                    
                }
            },
            tabsChange(tabId){
                this.curTab = tabId;
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
        components:{
            UiTabs,
            UiIconButton,
        },
        created(){
            this.loadMusicList();
        },
        mounted(){
            var that = this;
            window.timeoutTips = '';

            this.resize();
            
            this.$refs.artistImg.src = 'http://star.kuwo.cn/star/starheads/300'+decodeURIComponent(location.search).match(/starheads\/[0-9]+([\/0-9]+)/)[1]+'.jpg'         
            var tabs = document.querySelector('.ui-tabs__header');
            var scrollY = Math.ceil(document.getElementsByTagName('html')[0].style.fontSize.slice(0,-2)*1 *4);
            window.addEventListener('scroll',function(){

                //选项卡fixed
                if(document.body.scrollTop >= scrollY){
                    tabs.classList.add('fixedTop')
                }else{
                    tabs.classList.remove('fixedTop')
                }

                //滚动加载
                that.scrollLoad();
                
            })
            window.addEventListener('orientationchange',function(){
                that.resize();
            })

            var that = this;
            var audioEle = that.$refs.audioPlayer;//音频节点
                var scrollBar = that.$refs.progress;//滚动条
                var scrollPoint = that.$refs.progressPoint;//滚动小圆点
                var bar_t = that.$refs.progressTl;//上层滚动样式条
                var bar_b = that.$refs.progressBl;//下层滚动样式条
                var curTime = that.$refs.curTime;
                var curDist = 0;

                 //               
                var pg_volume = that.$refs.pg_volume;
                var pg_volume_t = that.$refs.pg_volume_t;
                var pg_volume_b = that.$refs.pg_volume_b;
                var pg_volume_p = that.$refs.pg_volume_p;

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
        updated(){
            /*this.loading = false;
            console.log('li数目：'+document.querySelector('[music-total]').children.length)
            console.log('ul高度：'+document.querySelector('[music-total]').offsetHeight)
            console.log('loaded')*/
        }

    }
</script>
<style lang="scss">
    .artistbanner {
            width: 100%;
            .bannerInfo {
                position: relative;
                width: 100%;
                height: 4rem;
                background: #fff;
                z-index: 10;
                overflow: hidden;
                img {
                    width: 100%;
                    height: 100%;
                    -webkit-transform: translateY(1.2rem) scale(1,1.8);
                    transform: translateY(1.2rem) scale(1,1.8);
                }
                .up_btns {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    .openApp {
                        width: 1.5rem;
                        height: 0.46rem;
                        border: 1px solid #fff;
                        border-radius: 4px;
                        line-height: 0.46rem;
                        text-align: center;
                        font-size: 0.28rem;
                        font-family: 'microsoft yahei';
                        margin-top: 0.24rem;
                    }
                }
                .banner_other {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 0.8rem;
                    background: rgba(0,0,0,0.4);
                    .ad_name {
                        width: 45%;
                        height: 100%;
                        font-size: 0.40rem;
                        line-height: 0.8rem;
                        color: #fff;
                        padding-left: 0.2rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .ad_playbtn {
                        width: 0.8rem;
                        height: 0.8rem;
                        background: url(http://m.kuwo.cn/static/h5/image/h5img/icon_play.png) no-repeat center center;
                        background-size: 80%;
                    }
                    .back{
                        width: 0.8rem;
                        height: 0.8rem;                      
                        background-size: 80%;
                        display: inline-block;
                        img{
                            transform: none;
                            -webkit-transform: none;
                            padding: 0.1rem;
                        }
                    }
                }

            }
            .artist_nav {
                display: -webkit-box;
                width: 100%;
                height: 0.81rem;
                border-bottom: 1px solid #e5e5e5;
                background: #fff;
                .artist_nav span {
                    display: block;
                    -webkit-box-flex: 1;
                    height: 0.8rem;
                    font-size: 0.32rem;
                    text-align: center;
                    line-height: 0.8rem;
                    color: #333;
                    border-bottom: 2px solid transparent;
                }
                .artist_nav span.on {
                    color: #2095dd;
                    border-bottom: 2px solid #2095dd;
                }
            }
        }
    .newMc {
        width: 100%;
        padding: 0 3%;
        overflow: hidden;
        font-size: 0;
        margin-top: 0.3rem;
        >h3{
            height: 0.6rem;
            font-size: 0.32rem;
            color: #46b4e6;
            font-weight: 400;
            line-height: 0.6rem;
            border-bottom: 1px solid #ccc;
            margin-bottom: 0.2rem;
        }
        .newBs4{
            display: inline-block;
            width: 50%;
            margin-bottom: 0.2rem;
            position: relative;
            .playMv2 {
                width: 0.52rem;
                height: 0.52rem;
                position: absolute;
                top: 30%;
                left: 49%;
                margin: -0.26rem 0 0 -0.26rem;
            }
            .newBtex {
                width: 100%;
                overflow: hidden;
                font: 0.28rem/ 0.38rem "微软雅黑";
                color: #000;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                height: 0.8rem;
                text-align: center;
                margin-top: 0.1rem;
            }
            img{
                width: 100%;
                display: inline-block;
            }
        }
        .newBs4:nth-child(odd){
            padding-right: 0.2rem;
        }
        .newBs4:nth-child(even){
            padding-left: 0.2rem;
        }
    }
    #loadtjid {
        position: fixed;
        z-index: 99;
        width: 6.4rem;
        left: 50%;
        margin-left: -3.2rem;
        top: 50%;
        margin-top: -0.5rem;
        display: none;
        #padload {
            background: 0;
            height: 0.8rem;
            line-height: 0.8rem;
            padding: 0.1rem 0.2rem;
            font-weight: bold;
            font-size: 0.28rem;
            color: #888;
            -webkit-transform: translateZ(0);
            display: none;
        }
    }
    #padload .padloadIcon, #padloadmv .padloadIcon {
        display: block;
        float: left;
        width: 0.8rem;
        height: 0.8rem;
        background: url(http://image.kuwo.cn/webmusic/html5/pull-icon@2x.png) 0 0 no-repeat;
        -webkit-background-size: 0.8rem 1.6rem;
        background-size: 0.8rem 1.6rem;
        -webkit-transition-property: -webkit-transform;
        -webkit-transition-duration: 250ms;
    }
    #padload.loading .padloadIcon, #padloadmv.loading .padloadIcon {
        background-position: 0 100%;
        -webkit-transform: rotate(0) translateZ(0);
        -webkit-transition-duration: 0;
        -webkit-animation-name: loading;
        -webkit-animation-duration: 2s;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-timing-function: linear;
    }
    @-webkit-keyframes loading{
        from{-webkit-transform:rotate(0) translateZ(0)}
        to{-webkit-transform:rotate(360deg) translateZ(0)}
    }
    .playTit {
        height: 0.88rem;
        background: #ededed;
        overflow: hidden;
        padding: 0 4%;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 10;
        .back {
            width: 0.6rem;
            height: 0.6rem;
            float: left;
            overflow: hidden;
            margin: 0.14rem 0.14rem 0 0;
        }
        .backTex {
            height: 0.88rem;
            font: 0.28rem/0.88rem "\5FAE\8F6F\96C5\9ED1";
            color: #010101;
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 5rem;
            float: left;
            line-height: 0.88rem;
        }
        .result{
            font-size: 0.28rem;
            float: right;
            display: block;
            line-height: 0.88rem;
            vertical-align: middle;
            width: 36%;
            text-align: right;

        }
    }
    .ui-tab{
        .singerMv {
                height: 2rem;
                border-bottom: 1px solid #e1e1e1;
                padding: 0 .1rem;
                font-size: 0;
            .singerMvImg {
                width: 40%;
                height: 1.5rem;
                overflow: hidden;
                display: inline-block;
            }
            img{
                height: 100%;
                background: #ccc;
                max-width: 100%;
            }
            .singerRiTex {
                    width: 60%;
                    height: 1.5rem;
                    overflow: hidden;
                    margin-top: .26rem;
                    display: inline-block;
                    padding-left: 0.2rem;
                .singerRiName {
                    width: 100%;
                    max-height: 0.8rem;
                    font: .28rem/.4rem \\5FAE\8F6F\96C5\9ED1;
                    font-weight: 700;
                    margin-top: .2rem;
                    display: block;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 2;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                }
                .singerRiName2 {
                    width: 100%;
                    height: .4rem;
                    font: .24rem/.4rem \\5FAE\8F6F\96C5\9ED1;
                    overflow: hidden;
                    margin-top: .06rem;
                    display: block;
                    color: #6c6c6c;
                }
            }
        }
    }
    #searchmvid.singList{
        margin-top: 0;
        padding: 0 2%;
    }
    .singList {
        width: 100%;
        padding: 0 4%;
        overflow: hidden;
        margin-top:0.88rem;
        .seackBox {
            height: 0.64rem;
            overflow: hidden;
            width: 100%;
            margin-top: 0.2rem;
            .seackLe {
                width: 79%;
                height: 0.6rem;
                border: 1px solid #a0a0a0;
                border-radius: 0.06rem;
                background: #fff;
                float: left;
                overflow: hidden;
                .seack {
                    width: 100%;
                    height: 0.6rem;
                    border: 0;
                    display: block;
                    overflow: hidden;
                    font: 0.28rem/0.6rem "微软雅黑";
                    padding: 0 3%;
                    border-radius: 0.06rem;
                }
            }
            .downApp {
                height: 0.4rem;
                font: 0.24rem/0.4rem "微软雅黑";
                color: #646464;
                
            }
            .seackBtn {
                width: 1.0rem;
                height: 0.64rem;
                background: #46b4e6;
                font: 0.28rem/0.64rem "微软雅黑";
                color: #fff;
                border-radius: 0.06rem;
                float: right;
                text-align: center;
            }
        }       
    }

    body{
        font-size: 24px;
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .2s
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
    }

    .bottomIn-enter-active, .bottomIn-leave {
        transition: transform 200ms ease;
        transform: translate3d(0,0,0);
    }
    .bottomIn-enter, .bottomIn-leave-active{
        transform: translate3d(0,100%,0);
    }

    .fullScreen{
            height: 100%;
            width: 100%;
            position: fixed;
            z-index: 99;
            background: #000;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            /*transform: translate3d(0,100%,0);
            -webkit-transform: translate3d(0,100%,0);*/
            transition: transform 300ms ease;
            -webkit-transition: transform 300ms ease;
    }
    /*.fullScreen.active{
        visibility: visible;
         transform: translate3d(0,0,0);
            -webkit-transform: translate3d(0,0,0);
    }*/
    .baseBar{
        padding-right:0.25rem;
        position: fixed;
        z-index: 9;
        width: 100%;
        bottom: 0;
        left: 0;
        height: 1rem;
        background: rgba(10,10,30,.9);
        .info{
            float: left;
            max-width: 65%;
            img{
                display: inline-block;
                height: 1rem;
                width: auto;
                border-radius: 50%;
                padding: 0.12rem;
            }
            .text{
                display: inline-block;
                padding-top: 0.16rem;
                vertical-align: top;
            }
            .songName{
                color: #fff;
                font-size: 0.28rem;
                width: 3.64rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .singer{
                color: #999;
                width: 3.64rem;
                font-size: 0.24rem;
                margin-top: 0.08rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .operation{
            float: right;
            height: 100%;
            span{
                display: inline-block;
                height: 100%;
            }
        }
        .material-icons{
            font-size: 0.56rem;
        }
    }
    .ui-tabs{
    }
    .tabcontent {
        li {
            position: relative;
        }
    }
    .artist_tab{
        .singBox {
            width: 100%;
            height: 1.2rem;
            border-bottom: 1px solid #e5e5e5;
            overflow: hidden;
            .singTex {
                width: 100%;
                height: 100%;
                .singTexUp {
                    height: auto;
                    font: 0.3rem/0.5rem "microsoft yahei";
                    color: #333;
                    padding: 0.16rem 0 0 0.18rem;
                    span {
                        height: 0.5rem;
                    }
                    .songName{
                        max-width: 40%;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                    .spanSingHQ {
                        width: 0.42rem;
                        height: 0.22rem;
                        background: url(http://m.kuwo.cn/static/h5/image/h5img/HQ.png) no-repeat center center;
                        background-size: 100%;
                        margin: 0 0.05rem 0 0.1rem;
                    }
                    .spanSingLMusic {
                        width: 0.42rem;
                        height: 0.22rem;
                        background: url(http://m.kuwo.cn/static/h5/image/h5img/LMusic.png) no-repeat center center;
                        background-size: 100%;
                    }
                }
                .singName {
                    padding-left: 0.18rem;
                    font-size: 0.22rem;
                    color: #999;
                    width: 60%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            .singMv {
                position: absolute;
                top: 0;
                right: 12.5%;
                width: 12.5%;
                height: 100%;
                background: url(http://m.kuwo.cn/static/h5/image/h5img/mv_icon.png) no-repeat center center;
                background-size: 55%;
            }
            .ad_download {
                position: absolute;
                top: 0;
                right: 0;
                width: 12.5%;
                height: 100%;
                background: url(http://m.kuwo.cn/static/h5/image/h5img/download_black.png) no-repeat center center;
                background-size: 40%;
            }
        }
    }
</style>