<template>
    <div class="container">
            <div style="position: fixed;left: 0;top: 0;width: 100%;z-index: 999;overflow-y: scroll;">
                <header>
                        <div class="playTit">
                           <a href="javascript:history.back()" class="back"><img src="http://image.kuwo.cn/mpage/html5/2015/tuijian/back.png" width="100%"></a>
                           <span class="backTex" id="mvplaytitleid" ref="mvTitle"></span>
                        </div>
                </header>
                <video controls autoplay="true" src="" ref="videoPlayer" style="width: 100%;display: block;"></video> 
            </div>
                                
            <ul class="mvplaylist" id="mvplaylist" style="background-color: #fff;" ref="mvListWrapper">
                <li v-for="item in mvList.items" class="singBox_MV clearfix" :data-id="item.id" :title="item.album+' - '+item.artist" @click.stop="reload">
                    <div class="specialImgBox">
                        <img v-lazy="'http://img1.kwcdn.kuwo.cn/wmvpic/'+item.mvpic" onerror="errorimg(this,'http://image.kuwo.cn/mpage/html5/2016/default.png');" >
                    </div>
                    <div class="MV_singTex">
                        <div class="MV_singTexUp">
                            <p class="singTexUp2">{{item.album}}</p>
                            <p class="singTime">{{item.artist}}</p>
                        </div>
                        <a onclick="commDownSong_fromMV(6779171,event)" class="downLoad"><img src="http://m.kuwo.cn/static/h5/image/h5img/download_black.png"></a>
                    </div>
                </li>
            </ul>
    </div>
</template>
<script>

    export default{
        data(){
            return{
                mvList:{
                    currentPage:0,
                    items:[]
                },

                mvRecommend:null,//video播放页面的MV推荐列表
                _fontSize:'',
                loading:false,
                curTabState:{
                    tab_mv:'',
                },
                viedoH:5.48,
            }
        },
        methods:{
            /*showVideoPlayer(event){
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
            },*/
            loadMvList(event){             
                    this.loading = true;
                    this.$http.jsonp('http://nplserver.kuwo.cn/pl.svc?op=getlistinfo&pid=236682777&pn=0&rn=30&encode=utf-8&keyset=padmvpl&identity=kuwo&r=1493736129712').then(function(response){
                        console.log(response)
                        if(response.body.musiclist.length){
                            this.mvList.items = this.mvList.items.concat(response.body.musiclist)
                            this.mvList.currentPage++;
                        }else{
                            this.curTabState['tab_mv'] = false;
                            this.loading = false;
                        }
                        this.loading = false;
                    },function(){
                    this.loading = false;
                })                                 
            },
            scrollLoad(){//滚动加载
                if(document.body.scrollTop + 50 > document.body.scrollHeight - window.innerHeight){
                    console.log('isBtoom')
                    if(this.loading) return;
                    console.log('loading')

                    if(this.curTabState[this.curTab]==false) return;
                    this.loadMvList();                                                                          
                }
            },
            reload(event){
                location.search = "?id="+event.currentTarget.getAttribute('data-id')+'&title='+encodeURIComponent(event.currentTarget.getAttribute('title'));              
            },
            resize(){
                this._fontSize =  window.innerWidth / 7.5;
                document.getElementsByTagName('html')[0].style.fontSize = this._fontSize +'px';           
            },
        },
        created(){
            this.loadMvList();
        },
        mounted(){
            var that = this;

            this.resize();

            this.$refs.videoPlayer.src = 'http://antiserver.kuwo.cn/anti.s?rid=MUSIC_'+location.search.match(/id=([0-9]+)/)[1]+'&response=res&format=mp4|mkv&type=convert_url';
            if(/title/.test(location.search)){
                this.$refs.mvTitle.innerText = decodeURIComponent(location.search.match(/title=([^.]+)/)[1])
            }
            this.$refs.mvListWrapper.style.marginTop = this.$refs.videoPlayer.offsetHeight>this.viedoH*this._fontSize?this.$refs.videoPlayer.offsetHeight+(0.3*this._fontSize) +'px':this.viedoH+'rem';

            window.addEventListener('scroll',function(){
                that.scrollLoad();                
            })
            window.addEventListener('orientationchange',function(){
                that.resize();
            })
        }
    }
</script>
<style lang="scss">
    .singBox_MV {
        width: 100%;
        height: 1.51rem;
        padding: .18rem 0 .12rem .2rem;
        overflow: hidden;
        position: relative;
        .specialImgBox {
            width: 25.8%;
            height: 1.2rem;
            float: left;
            img {
                width: 100%;
                height: 100%;
                display: inline-block;
            }
        }
        .MV_singTex {
            float: left;
            width: 72%;
            margin-left: 2.2%;
            height: 1.3rem;
            border-bottom: .01rem solid #e5e5e5;
            .MV_singTexUp{
                .singTexUp2 {
                    padding-top: .14rem;
                    font-size: .32rem;
                    line-height: .58rem;
                    color: #333;
                    width: 80%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .singTime {
                    font-size: .24rem;
                    line-height: .50rem;
                    color: #666;
                    width: 80%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            .downLoad {
                position: absolute;
                top: 0;
                right: 0;
                box-sizing: content-box;
                float: left;
                width: .36rem;
                height: .36rem;
                padding: .6rem .27rem .46rem .27rem;
                img {
                    display: block;
                    width: 100%;
                }
            }
        }
    }
    
    .playTit {
        height: 0.88rem;
        background: #ededed;
        overflow: hidden;
        padding: 0 4%;
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
    }

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
</style>