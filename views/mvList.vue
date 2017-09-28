<template>
    <div class="container">
        <div class="fixedTop" ref="fixedTop">
            <header>
            <a href="search.html" class="material-icons search">search</a>
            <a href="index.html" class="material-icons home">home</a>               
            <h4><img class="logo" src="../public/images/logo.png" alt="">音乐播放器</h4>
        </header>
            <nav class="nav clearfix" id="nav">
                <div ref="nav">
                    <span v-for="(item, index) in navList" :data-id="item.id" class="navitem" :data-index="index" v-tap="{ methods : reload }">{{item.title}}</span>
                </div>
            </nav>
        </div>
        <ul class="mvplaylist" id="messDivId" ref="ul">
        </ul>
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
 //import Hammer from '../public/js/hammer.js';
    export default{
        data(){
            return{
                mvList:{
                    currentPage:0,
                    items:[]
                },

                mvViewState:false,
                _fontSize:'',
                loading:false,
                curTabState:{
                    tab_mv:'',
                },
                scrollDir:null,

                navList:[{"title":"首播","id":"236682871"},{"title":"排行","id":"1220837352"},{"title":"华语","id":"236682731"},{"title":"欧美","id":"236682735"},{"title":"日韩","id":"236742444"},{"title":"网络","id":"236682773"},{"title":"热舞","id":"236682777"},{"title":"经典","id":"236742496"},{"title":"伤感","id":"236742508"},{"title":"禁播","id":"236742510"},{"title":"美女","id":"236742514"},{"title":"性感","id":"236682801"},{"title":"现场","id":"236742576"},{"title":"剧情","id":"236742578"}],
            }
        },
        methods:{
            loadMvList(event){             
                    this.loading = true;
                    this.$http.get('http://m.kuwo.cn/newh5/mv/listByPage?id='+location.search.match(/id=([0-9]+)/)[1]+'&pn='+this.mvList.currentPage+'&rn=30').then(function(response){
                            if(response.body!= ''){
                                this.$refs.ul.innerHTML += response.body.trim();
                                this.mvList.currentPage ++;
                            }else{
                                this.curTabState['tab_mv'] = false;
                                this.loading = false;
                            }
                            this.loading = false;
                            

                    },function(){this.loading = false})           
            },
            scrollLoad(){//滚动加载
                if(document.body.scrollTop + 50 > document.body.scrollHeight - window.innerHeight){
                    if(this.loading) return;
                    console.log('loading')
                    if(this.curTabState[this.curTab]==false) return;
                    this.loadMvList();                                                                        
                }
            },
            resize(){
                this._fontSize =  window.innerWidth / 7.5;
                document.getElementsByTagName('html')[0].style.fontSize = this._fontSize +'px';         
            },
            reload(event){
                location.search = "?id="+event.event.target.getAttribute('data-id');              
            }
        },
        created(){
            this.loadMvList();
        },
        mounted(){
            var that = this;
            this.resize();
            document.querySelector('[data-id="'+location.search.match(/id=([0-9]+)/)[1]+'"]').classList.add('on')
            this.$refs.nav.scrollLeft = (window.innerWidth*0.2 * document.querySelector('[data-id="'+location.search.match(/id=([0-9]+)/)[1]+'"]').getAttribute('data-index')) - window.innerWidth*0.2 *2;

            window.jumpPage = function(src){
                location.href = "mvPlayer.html?id="+src.match(/id=([0-9]+)/)[1];
            }
            window.befScrollTop = 0;
            window.aftScrollTop = 0;
            window.addEventListener('scroll',function(){
                //滚动加载
                that.scrollLoad();

                aftScrollTop = document.body.scrollTop;
                var delta = aftScrollTop - befScrollTop;
                if( delta === 0 ) return false;
                if(that.scrollDir == (delta>0?1:0)){
                    befScrollTop = aftScrollTop;
                    return;
                }
                that.scrollDir = delta>0?1:0;

                if(that.scrollDir == 1){
                    that.$refs.fixedTop.classList.add('simple');
                }else{
                     that.$refs.fixedTop.classList.remove('simple');
                }
                              
                //console.log( delta > 0 ? "down" : "up" );
                befScrollTop = aftScrollTop;

                
                
            },false)
            window.addEventListener('orientationchange',function(){
                that.resize();
            })
            window.defaultpic = 'http://image.kuwo.cn/mpage/html5/2016/default.png'
            window.errorimg = function(event,defaultpic){
                event.src = defaultpic
            }

        }
    }
</script>
<style lang="scss">
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
.fixedTop{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9;
    transition: transform 300ms ease;
    -webkit-transition: transform 300ms ease;
}
.fixedTop.simple{
    transform: translate3d(0,-1rem,0);
    -webkit-transform: translate3d(0,-1rem,0);
}
.fixedTop+*{
    padding-top: 1.76rem;
}
header{
    height: 1.0rem;
    line-height: 1.0rem;
    background-color: #1da0ef;
    color: #fff;
    h4{
      text-align: center;
        font-size: 0.32rem;
        font-weight: 400;
    }
    > .search{
        position: absolute;
        top: 0;
        left: 0;
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
    }
    > .home{
        position: absolute;
        top: 0;
        right: 0;
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
    }
    .logo{
      display: inline-block;
      width: 0.56rem;
      vertical-align: middle;
    }
}
.nav{ 
    width: 100%;
    height: 0.76rem;
    border-bottom: 1px solid #ddd;
    background: #fff;
    overflow-x: hidden;
    box-shadow: 0px 1px 14px -5px rgba(0,0,0,.9);
}
.nav>*{
    overflow-x: scroll;
    display: -webkit-flex;
    display: flex;
}
.nav .navitem{
    width: 20%;
    font-size: 0.3rem;
    text-align: center;
    line-height: 0.76rem;
    height: 0.76rem;
    color: #333;
    display: inline-block;
    -webkit-flex-shrink:0;
    flex-shrink:0;
}
.nav .navitem.on{ 
    color: #2095dd;
    border-bottom: 4px solid #2095dd;
}
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
    }
    .specialImgBox img {
        width: 100%;
        height: 100%;
        display: inline-block;
    }
    .MV_singTex {
        float: left;
        width: 72%;
        margin-left: 2.2%;
        height: 1.3rem;
        border-bottom: .01rem solid #e5e5e5;
        .downLoad {
            position: absolute;
            top: 0;
            right: 0;
            box-sizing: content-box;
            float: left;
            width: .36rem;
            height: .36rem;
            padding: .6rem .27rem .46rem .27rem;
        }
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
</style>