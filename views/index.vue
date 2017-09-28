<template>
	<div>
		<header>
			<a href="search.html" class="search"><ui-icon-button color="white" icon="search" size="large"  type="secondary"></ui-icon-button></a>		 	
			<h4><img class="logo" src="../public/images/logo.png" alt="">音乐播放器</h4>
		</header>
	    <section class="page page--ui-tabs">
	            <ui-tabs fullwidth text-color-active="primary" text-color="gray"  ref="tabs" @tab-change="tabsChange">
	                <ui-tab title="推荐" id="tab_home">
	                    <div>
	                    	<div class="slider"></div>
	                    </div>
	                    <section class="recommand">
						    <div class="newsong">
					        	<h3 class="clearfix">每日新歌</h3>               
					            <div class="songtuijian">
					                <a class="songmsg" href="JavaScript:">
					                    <i class="newtip"></i>
					                    <div class="songmsgpic">
					                        <img v-lazy="'http://img1.kwcdn.kuwo.cn/star/upload/10/10/1466668022746_.jpg'">
					                    </div>
					                    <div class="other clearfix">
					                        <span class="listen fl"><span class="listennum">10960</span></span>
					                        <span class="playbtn fr"></span>
					                    </div>
					                </a>

					                <p>华语新歌推荐</p>
					            </div>
					        
					            <div class="songtuijian">
					                <a class="songmsg" href="JavaScript:">
					                    <i class="newtip"></i>
					                    <div class="songmsgpic">
					                        <img v-lazy="'http://img1.kwcdn.kuwo.cn/star/upload/14/14/1466668131470_.jpg'">
					                    </div>
					                    <div class="other clearfix">
					                        <span class="listen fl"><span class="listennum">5239</span></span>
					                        <span class="playbtn fr"></span>
					                    </div>
					                </a>

					                <p>日韩新歌推荐</p>
					            </div>
					        
					            <div class="songtuijian">
					                <a class="songmsg" href="JavaScript:">
					                    <i class="newtip"></i>
					                    <div class="songmsgpic">
					                        <img v-lazy="'http://img2.kwcdn.kuwo.cn/star/upload/3/3/1466668204339_.jpg'">
					                    </div>
					                    <div class="other clearfix">
					                        <span class="listen fl"><span class="listennum">10778</span></span>
					                        <span class="playbtn fr"></span>
					                    </div>
					                </a>

					                <p>欧美新歌推荐</p>
					            </div>
					    	</div>
					    	<div class="gedan">
					    		<h3 class="clearfix">歌单推荐</h3>
					    		<div class="swiper-container">
					    			<div class="swiper-wrapper">
						    			<div class="swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="3" style="width: 2.34rem; margin-right: 0.2rem;">
					                                <a href="JavaScript:">
					                                    <img v-lazy="'http://img1.kwcdn.kuwo.cn/star/upload/10/10/1492741364026_.jpg'">
					                                    <p class="gedantitle">【心塞】总有一首触碰你的泪点</p>                                   
					                                </a>
					                     </div>
					                     <div class="swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="3" style="width: 2.34rem; margin-right: 0.2rem;">
					                                <a href="JavaScript:">
					                                    <img v-lazy="'http://img1.kwcdn.kuwo.cn/star/upload/10/10/1492741364026_.jpg'">
					                                    <p class="gedantitle">【心塞】总有一首触碰你的泪点</p>                                   
					                                </a>
					                     </div>
					                     <div class="swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="3" style="width: 2.34rem; margin-right: 0.2rem;">
					                                <a href="JavaScript:">
					                                    <img v-lazy="'http://img1.kwcdn.kuwo.cn/star/upload/10/10/1492741364026_.jpg'">
					                                    <p class="gedantitle">【心塞】总有一首触碰你的泪点</p>                                   
					                                </a>
					                     </div>
					                     <div class="swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="3" style="width: 2.34rem; margin-right: 0.2rem;">
					                                <a href="JavaScript:">
					                                    <img v-lazy="'http://img1.kwcdn.kuwo.cn/star/upload/10/10/1492741364026_.jpg'">
					                                    <p class="gedantitle">【心塞】总有一首触碰你的泪点</p>                                   
					                                </a>
					                     </div>
					                     <div class="swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="3" style="width: 2.34rem; margin-right: 0.2rem;">
					                                <a href="JavaScript:">
					                                    <img v-lazy="'http://img1.kwcdn.kuwo.cn/star/upload/10/10/1492741364026_.jpg'">
					                                    <p class="gedantitle">【心塞】总有一首触碰你的泪点</p>                                   
					                                </a>
					                     </div>
					                     <div class="swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="3" style="width: 2.34rem; margin-right: 0.2rem;">
					                                <a href="JavaScript:">
					                                    <img v-lazy="'http://img1.kwcdn.kuwo.cn/star/upload/10/10/1492741364026_.jpg'">
					                                    <p class="gedantitle">【心塞】总有一首触碰你的泪点</p>                                   
					                                </a>
					                     </div>
					    			</div>
					    		</div>
					    	</div>
					    	<div class="program">
					    		<h3 class="clearfix">精彩节目</h3>
					    		<div class="swiper-container">
					    			<div class="swiper-wrapper">
						    			<div class="swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="3" style="width: 2.34rem; margin-right: 0.2rem;">
					                                <a href="JavaScript:">
					                                    <img src="http://img1.kuwo.cn/star/userpl2015/shoujigd/random/3158_autob.jpg">
					                                    <p class="gedantitle">【心塞】总有一首触碰你的泪点</p>                                   
					                                </a>
					                     </div>
					                     <div class="swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="3" style="width: 2.34rem; margin-right: 0.2rem;">
					                                <a href="JavaScript:">
					                                    <img src="http://img1.kuwo.cn/star/userpl2015/shoujigd/random/3158_autob.jpg">
					                                    <p class="gedantitle">【心塞】总有一首触碰你的泪点</p>                                   
					                                </a>
					                     </div>
					                     <div class="swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="3" style="width: 2.34rem; margin-right: 0.2rem;">
					                                <a href="JavaScript:">
					                                    <img data-src="http://img2.kwcdn.kuwo.cn/star/upload/6/6/1492741387142_.jpg" src="http://img2.kwcdn.kuwo.cn/star/upload/6/6/1492741387142_.jpg">
					                                    <p class="gedantitle">【心塞】总有一首触碰你的泪点</p>                                   
					                                </a>
					                     </div>
					                     <div class="swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="3" style="width: 2.34rem; margin-right: 0.2rem;">
					                                <a href="JavaScript:">
					                                    <img src="http://img1.kuwo.cn/star/userpl2015/shoujigd/random/3158_autob.jpg">
					                                    <p class="gedantitle">【心塞】总有一首触碰你的泪点</p>                                   
					                                </a>
					                     </div>
					                     <div class="swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="3" style="width: 2.34rem; margin-right: 0.2rem;">
					                                <a href="JavaScript:">
					                                    <img data-src="http://img2.kwcdn.kuwo.cn/star/upload/6/6/1492741387142_.jpg" src="http://img2.kwcdn.kuwo.cn/star/upload/6/6/1492741387142_.jpg">
					                                    <p class="gedantitle">【心塞】总有一首触碰你的泪点</p>                                   
					                                </a>
					                     </div>
					                     <div class="swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="3" style="width: 2.34rem; margin-right: 0.2rem;">
					                                <a href="JavaScript:">
					                                    <img src="http://img1.kuwo.cn/star/userpl2015/shoujigd/random/3158_autob.jpg">
					                                    <p class="gedantitle">【心塞】总有一首触碰你的泪点</p>                                   
					                                </a>
					                     </div>
					                     <div class="swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="3" style="width: 2.34rem; margin-right: 0.2rem;">
					                                <a href="JavaScript:">
					                                    <img data-src="http://img2.kwcdn.kuwo.cn/star/upload/6/6/1492741387142_.jpg" src="http://img2.kwcdn.kuwo.cn/star/upload/6/6/1492741387142_.jpg">
					                                    <p class="gedantitle">【心塞】总有一首触碰你的泪点</p>                                   
					                                </a>
					                     </div>
					    			</div>
					    		</div>
					    	</div>
					    	<div class="hotmv">
					    		<h3 class="clearfix">热门MV</h3>
					    		<div class="swiper-container">
					    			<div class="swiper-wrapper">
						    			<div class="swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="3" style="width: 3.72rem; margin-right: 0.2rem">
					                                <a href="JavaScript:">
					                                    <img src="http://img1.kwcdn.kuwo.cn/star/upload/11/11/1492768418507_.jpg">
					                                    <p class="gedantitle">【心塞】总有一首触碰你的泪点</p>                                   
					                                </a>
					                     </div>
					                     <div class="swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="3" style="width: 3.72rem; margin-right:0.2rem;">
					                                <a href="JavaScript:">
					                                    <img src="http://img1.kwcdn.kuwo.cn/star/upload/11/11/1492768418507_.jpg">
					                                    <p class="gedantitle">【心塞】总有一首触碰你的泪点</p>                                   
					                                </a>
					                     </div>
					                     <div class="swiper-slide swiper-slide-duplicate swiper-slide-prev" data-swiper-slide-index="3" style="width: 3.72rem; margin-right:0.2rem;">
					                                <a href="JavaScript:">
					                                    <img src="http://img1.kwcdn.kuwo.cn/star/upload/11/11/1492768418507_.jpg">
					                                    <p class="gedantitle">【心塞】总有一首触碰你的泪点</p>                                   
					                                </a>
					                     </div>
					    			</div>
					    		</div>
					    	</div>
				    	</section>
	                </ui-tab>

	                <ui-tab title="排行" id="tab_sort">
	               		<section class="chart">
		                    <ul class="chartbang">							
								<li class="chart_li clearfix" onclick="jumpPage('/newh5/bang/content?bid=27&amp;pic=http://img3.kwcdn.kuwo.cn/star/upload/15/15/1444899700703_.jpg');">
									<a class="chart_pic">
										<img data-src="http://img3.kwcdn.kuwo.cn/star/upload/15/15/1444899700703_.jpg" src="http://img3.kwcdn.kuwo.cn/star/upload/15/15/1444899700703_.jpg">
									</a>
									<div class="chart_con">
										<h3>中国TOP榜</h3>
										<div class="chart_detail">
											
												<p><span class="chart_num">1</span><span class="chart_songname">思美人-(电…</span><span class="chart_artname"> - 张靓颖</span></p>
											
												<p><span class="chart_num">2</span><span class="chart_songname">悠蓝曲</span><span class="chart_artname"> - 刘惜君</span></p>
											
												<p><span class="chart_num">3</span><span class="chart_songname">认真的老去</span><span class="chart_artname"> - 曹方&amp;am…</span></p>
											
										</div>
									</div>
									<span class="chart_toright"></span>
								</li>											
							</ul>
						</section>
	                </ui-tab>

	                <ui-tab title="分类" id="tab_classify">
	                    My collections
	                </ui-tab>

	                <ui-tab title="歌手" id="tab_singer">
	                    <div class="artistbang" id="artistbang">
							<ul class="artist_banglist">
								<li class="clearfix boldbottom" @click="jumpArtistList('0',$event)">
								<span class="artist_fenlei fl">热门歌手</span>
								<span class="artist_toright fr"></span>
								</li>
								<li class="clearfix" @click="jumpArtistList('1',$event)">
								<span class="artist_fenlei fl">华语男</span>
								<span class="artist_toright fr"></span>
								</li>
								<li class="clearfix" @click="jumpArtistList('2',$event)">
								<span class="artist_fenlei fl">华语女</span>
								<span class="artist_toright fr"></span>
								</li>
								<li class="clearfix boldbottom" @click="jumpArtistList('3',$event)">
								<span class="artist_fenlei fl">华语组合</span>
								<span class="artist_toright fr"></span>
								</li>
								<li class="clearfix" @click="jumpArtistList('4',$event)">
								<span class="artist_fenlei fl">日韩男</span>
								<span class="artist_toright fr"></span>
								</li>
								<li class="clearfix" @click="jumpArtistList('5',$event)">
								<span class="artist_fenlei fl">日韩女</span>
								<span class="artist_toright fr"></span>
								</li>
								<li class="clearfix boldbottom" @click="jumpArtistList('6',$event)">
								<span class="artist_fenlei fl">日韩组合</span>
								<span class="artist_toright fr"></span>
								</li>
								<li class="clearfix" @click="jumpArtistList('7',$event)">
								<span class="artist_fenlei fl">欧美男</span>
								<span class="artist_toright fr"></span>
								</li>
								<li class="clearfix" @click="jumpArtistList('8',$event)">
								<span class="artist_fenlei fl">欧美女</span>
								<span class="artist_toright fr"></span>
								</li>
								<li class="clearfix boldbottom" @click="jumpArtistList('9',$event)">
								<span class="artist_fenlei fl">欧美组合</span>
								<span class="artist_toright fr"></span>
								</li>
								<li class="clearfix" @click="jumpArtistList('10',$event)">
								<span class="artist_fenlei fl">其他</span>
								<span class="artist_toright fr"></span>
								</li>
							</ul>
							<aside :class="['clearfix',maskShow===true?'active':'']"></aside>
							<transition name="fade">
								<div class="mask" v-show="maskShow" @click="hideMask"></div>								
							</transition>
						</div>
	                </ui-tab>
	                <ui-tab title="MV" id="tab_mv">
	                    <ul class="mvbang" id="messDivId">				
								<li class="clearfix" onclick="jumpPage('/newh5/mv/list?id=236682871');">
									<div class="mvbang_pic">
										<img src="http://img3.kwcdn.kuwo.cn/star/userpl2015/73/46/1464249583559_66069973_120.jpg">
									</div>
									<div class="mvbang_txt">
										<span class="fl">首播</span>
										<span class="mv_toright fr"></span>
									</div>
								</li>
															
								<li class="clearfix" onclick="jumpPage('/newh5/mv/list?id=1220837352');">
									<div class="mvbang_pic">
										<img src="http://img2.kwcdn.kuwo.cn/star/userpl2015/73/46/1458287114515_66069973_120.jpg">
									</div>
									<div class="mvbang_txt">
										<span class="fl">排行</span>
										<span class="mv_toright fr"></span>
									</div>
								</li>
							
							
								
								<li class="clearfix" onclick="jumpPage('/newh5/mv/list?id=236682731');">
									<div class="mvbang_pic">
										<img src="http://img4.kwcdn.kuwo.cn/star/userpl2015/73/46/1464249796657_66069973_120.jpg">
									</div>
									<div class="mvbang_txt">
										<span class="fl">华语</span>
										<span class="mv_toright fr"></span>
									</div>
								</li>
							
							
								
								<li class="clearfix" onclick="jumpPage('/newh5/mv/list?id=236682735');">
									<div class="mvbang_pic">
										<img src="http://img3.kwcdn.kuwo.cn/star/userpl2015/73/46/1464249879617_66069973_120.jpg">
									</div>
									<div class="mvbang_txt">
										<span class="fl">欧美</span>
										<span class="mv_toright fr"></span>
									</div>
								</li>
							
							
								
								<li class="clearfix" onclick="jumpPage('/newh5/mv/list?id=236742444');">
									<div class="mvbang_pic">
										<img src="http://img3.kwcdn.kuwo.cn/star/userpl2015/73/46/1464249661441_66069973_120.jpg">
									</div>
									<div class="mvbang_txt">
										<span class="fl">日韩</span>
										<span class="mv_toright fr"></span>
									</div>
								</li>
							
							
								
								<li class="clearfix" onclick="jumpPage('/newh5/mv/list?id=236682773');">
									<div class="mvbang_pic">
										<img src="http://img4.kwcdn.kuwo.cn/star/userpl2015/73/46/1464839621489_66069973_120.jpg">
									</div>
									<div class="mvbang_txt">
										<span class="fl">网络</span>
										<span class="mv_toright fr"></span>
									</div>
								</li>
							
							
								
								<li class="clearfix" onclick="jumpPage('/newh5/mv/list?id=236682777');">
									<div class="mvbang_pic">
										<img src="http://img3.kwcdn.kuwo.cn/star/userpl2015/73/46/1464839832154_66069973_120.jpg">
									</div>
									<div class="mvbang_txt">
										<span class="fl">热舞</span>
										<span class="mv_toright fr"></span>
									</div>
								</li>
							
							
								
								<li class="clearfix" onclick="jumpPage('/newh5/mv/list?id=236742496');">
									<div class="mvbang_pic">
										<img src="http://img4.kwcdn.kuwo.cn/star/userpl2015/73/46/1465292690057_66069973_120.jpg">
									</div>
									<div class="mvbang_txt">
										<span class="fl">经典</span>
										<span class="mv_toright fr"></span>
									</div>
								</li>
							
							
								
								<li class="clearfix" onclick="jumpPage('/newh5/mv/list?id=236742508');">
									<div class="mvbang_pic">
										<img src="http://img3.kwcdn.kuwo.cn/star/userpl2015/73/46/1464839381409_66069973_120.jpg">
									</div>
									<div class="mvbang_txt">
										<span class="fl">伤感</span>
										<span class="mv_toright fr"></span>
									</div>
								</li>
							
							
								
								<li class="clearfix" onclick="jumpPage('/newh5/mv/list?id=236742510');">
									<div class="mvbang_pic">
										<img src="http://img1.kwcdn.kuwo.cn/star/upload/7/7/1443004086391_.jpg">
									</div>
									<div class="mvbang_txt">
										<span class="fl">禁播</span>
										<span class="mv_toright fr"></span>
									</div>
								</li>
							
							
								
								<li class="clearfix" onclick="jumpPage('/newh5/mv/list?id=236742514');">
									<div class="mvbang_pic">
										<img src="http://img2.kwcdn.kuwo.cn/star/userpl2015/73/46/1458286960632_66069973_120.jpg">
									</div>
									<div class="mvbang_txt">
										<span class="fl">美女</span>
										<span class="mv_toright fr"></span>
									</div>
								</li>
							
							
								
								<li class="clearfix" onclick="jumpPage('/newh5/mv/list?id=236682801');">
									<div class="mvbang_pic">
										<img src="http://img2.kwcdn.kuwo.cn/star/userpl2015/73/46/1441868226984_66069973_120.jpg">
									</div>
									<div class="mvbang_txt">
										<span class="fl">性感</span>
										<span class="mv_toright fr"></span>
									</div>
								</li>
							
							
								
								<li class="clearfix" onclick="jumpPage('/newh5/mv/list?id=236742576');">
									<div class="mvbang_pic">
										<img src="http://img1.kwcdn.kuwo.cn/star/userpl2015/73/46/1442987148880_66069973_120.jpg">
									</div>
									<div class="mvbang_txt">
										<span class="fl">现场</span>
										<span class="mv_toright fr"></span>
									</div>
								</li>
							
							
								
								<li class="clearfix" onclick="jumpPage('/newh5/mv/list?id=236742578');">
									<div class="mvbang_pic">
										<img src="http://img3.kwcdn.kuwo.cn/star/userpl2015/73/46/1464840077040_66069973_120.jpg">
									</div>
									<div class="mvbang_txt">
										<span class="fl">剧情</span>
										<span class="mv_toright fr"></span>
									</div>
								</li>							
						</ul>
	                </ui-tab>
	            </ui-tabs>
	    </section>
	    
    </div>
</template>

<script>

import UiButton from 'keen-ui/src/UiButton.vue';
import UiIconButton from 'keen-ui/src/UiIconButton.vue';
import UiIcon from 'keen-ui/src/UiIcon.vue';
import UiTabs from 'keen-ui/src/UiTabs.vue';

export default {
    data() {
        return {
            showCollectionsTab: true,
            disableAuthorsTab: true,
            maskShow:false,
            loadingShow:false,
        };
    },
    methods: {
        jumpArtistList(id,event){
        	this.maskShow = true;
        	this.loadingShow = true;
        	this.$http.get('http://m.kuwo.cn/newh5/artist/artistList?id='+id).then(function(response){
        		//console.log(response)
        		var singerDom = document.querySelector('#tab_singer aside');
        		singerDom.innerHTML = response.body.match(/<ul class="artistlist"[^~]+/)[0];
        		this.loadingShow = false;
       		
        		/*singerDom.querySelectorAll('#messDivId li').forEach(function(item){

        		})*/
        	})
        },
        hideMask(){
        	this.maskShow = false;
        },
        tabsChange(tabId){

                switch (tabId){
                	case 'tab_home':
                		location.href = 'index.html#1';              		
                	break;

                	case 'tab_sort':
                		location.href = 'index.html#2';
                	break;

                	case 'tab_classify':
                		location.href = 'index.html#3';
                	break;

                	case 'tab_singer':
                		location.href = 'index.html#4';
                	break;

                	case 'tab_mv':
                		location.href = 'index.html#5';
                	break;
                }
        },
        setTab(){
        	var tab_item_id = location.href.match(/#([0-9])$/);
	    	if(tab_item_id){
	    		console.log(tab_item_id[1])
	    		switch(tab_item_id[1]){
	    			case '1':
	    				this.$refs.tabs.setActiveTab('tab_home')
	    			break;

					case '2':
	    				this.$refs.tabs.setActiveTab('tab_sort')
	    			break;

	    			case '3':
	    				this.$refs.tabs.setActiveTab('tab_classify')
	    			break;

	    			case '4':
	    				this.$refs.tabs.setActiveTab('tab_singer')
	    			break;

	    			case '5':
	    				this.$refs.tabs.setActiveTab('tab_mv')
	    			break;
	    		}
	    		
	    	}
        }
    },
    components: {
        UiButton,
        UiIconButton,
        UiIcon,
        UiTabs
    },
    mounted(){
    	var Slider = require('../public/js/slider');
    	new Slider([
    			{'src':'http://img4.kwcdn.kuwo.cn/star/upload/1/1/1488182915745_.png'},
    			{'src':'http://img3.kwcdn.kuwo.cn/star/upload/7/7/1492702947943_.jpg'},
    			{'src':'http://img4.kwcdn.kuwo.cn/star/upload/14/14/1482482412398_.jpg'},
    			{'src':'http://img1.kwcdn.kuwo.cn/star/upload/11/11/1492685911611_.jpg'},
    		])
    	document.getElementsByTagName('html')[0].style.fontSize = window.innerWidth / 7.5 +'px';

    	//this.setTab();

    	window.jumpPage = function(src){
    		location.href = "mvList.html?id="+src.match(/id=([0-9]+)/)[1];
    	}
    	/*this.$http.jsonp('http://m.kuwo.cn/newh5/artist/artistList?id=0',{emulateJSON:true}).then(function(response){
    		console.log(response.statusText)
    	},function(reponse){console.log(response.text())})*/
    }
};

</script>
<style lang="scss">
.mvbang {
    margin-top: .1rem;
    li {
        font-size: .3rem;
	    color: #333;
	    height: 1.8rem;
	    line-height: 1.8rem;
	    overflow: hidden;
	    border-bottom: 1px solid #efefef;
	}
	.mvbang_pic {
	    float: left;
	    width: 1.8rem;
	    height: 1.8rem;
	    border-bottom: 1px solid transparent;
	    padding: .1rem .2rem;
	    img {
		    width: auto;
		    height: 100%;
		}
	}
	.mvbang_txt {
	    float: left;
	    width: 5.5rem;
	    width: calc(100% - 2rem);	    
	    padding-left: 0.2rem;
	    .mv_toright {
	        width: .4rem;
		    height: 1.8rem;
		    background: url(http://m.kuwo.cn/static/h5/image/h5img/arrow_r.png) no-repeat center center;
		    background-size: 40%;
		    display: block;
		}
	}
}

.fl {
	float: left;
}
.fr {
    float: right;
}
.mask{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	height: 100%;
	width: 100%;
	z-index: 9;
	background: rgba(0,0,0,.8);
}
.loading{
	display: -webkit-box;
	-webkit-box-pack:center;
	-webkit-box-align:center;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
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
      button{
      	height: 1rem;
	    vertical-align: top;
	    width: 1rem;
      }
    }
    .logo{
      display: inline-block;
      width: 0.56rem;
      vertical-align: middle;
    }
  };
  .recommand{
  	padding: 0 0.2rem;
    h3 {
        font-size: 0.32rem;
        height: 0.96rem;
        line-height: 0.96rem;
        font-weight: bold;
    }
    img {
        width: 100%;
        height: 100%;
    }
    .swiper-slide {
        padding-bottom: 0.2rem;
        position: relative;
    }
  }
  .newsong{
    color: #333;
    .songmsg {
        display: block;
        position: relative;
    }
    .newtip {
        position: absolute;
        left: 0;
        top: 0;
        width: 0.56rem;
        height: 0.56rem;
        background: url(https://image.kuwo.cn/mpage/html5/2016/newtip.png) no-repeat;
        background-size: 100%;
    }
    .songmsgpic {
        width: 100%;
        height: 3.3rem;
    }
    .other {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0.56rem;
        font-size: 0.24rem;
    }
    .listen {
        position: relative;
        width: 30%;
        height: 100%;
        line-height: 0.56rem;
        background: url(https://image.kuwo.cn/mpage/html5/2016/earphone.png) left center no-repeat;
        background-size: 10%;
        margin-left: 0.22rem;        
      .listennum {
          position: absolute;
          left: 0;
          top: 0;
          -webkit-transform: translate(0.28rem,0);
          transform: translate(0.28rem,0);
          color: #fff;
      }
    }   
    .playbtn {
        width: 0.44rem;
        height: 0.44rem;
        background: url(https://image.kuwo.cn/mpage/html5/2016/playbtn1.png) no-repeat;
        background-size: 100%;
        margin-right: 0.12rem;
    }
    p {
        font-size: 0.28rem;
        text-align: center;
        height: 0.64rem;
        line-height: 0.64rem;
    }
    
  }
  .swiper-container {
      width: 100%;
      height: 3.44rem;
      margin: 0 auto;
      position: relative;
      overflow: hidden;
      z-index: 1;
      .swiper-wrapper {
      	overflow-x: scroll;
        z-index: 1;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-transition-property: -webkit-transform;
        -moz-transition-property: -moz-transform;
        -o-transition-property: -o-transform;
        -ms-transition-property: -ms-transform;
        transition-property: transform;
        -moz-transform: translate3d(0,0,0);
        -o-transform: translate(0,0);
        -ms-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        box-sizing: content-box;

        .swiper-slide {
          -webkit-flex-shrink: 0;
          -ms-flex: 0 0 auto;
          flex-shrink: 0;
          color: #fff;
          a {
            display: block;
            width: 100%;
            height: 100%;
        }
        img {
            width: 100%;
            height: auto;
            pointer-events: none;
        }
        p {
            width: 100%;
		    color: #333;
		    text-align: center;
		    font-size: 0.24rem;
		    line-height: 0.36rem;
		    padding-top: 0.08rem;
        }
      }

    }
  }

	.chart{
	  	.chartbang {
	    	border-top: 0.2rem solid #f2f2f2;
	  	}
	  	li{
		    border-right: 0.2rem solid #f2f2f2;
	    	border-bottom: 0.2rem solid #f2f2f2;
	    	border-left: 0.2rem solid #fff;
	  	}
	  	.chart_pic {
		    float: left;
		    width: 2.5rem;
		    height: 2.5rem;
		    img {
			    width: 100%;
			    height: 100%;
			}
		}
		.chart_con {	
		    float: left;
		    width: 3.7rem;
		    margin-left: 0.2rem;
		    h3 {
			    margin: 0.28rem 0 0.18rem 0;
			    font-size: 0.32rem;
			    color: #333;
			}
			.chart_num {
			    margin-right: 0.2rem;
			    color: #999;
			}
			.chart_artname {
			    color: #999;
			}
			p {
			    width: 100%;
			    font-size: 0.3rem;
			    margin-bottom: 0.06rem;
			}		
		}
		.chart_toright {
			    float: right;
			    width: 0.4rem;
			    height: 2.5rem;
			    background: url(https://image.kuwo.cn/mpage/html5/2016/arrow_r.png) no-repeat center center;
			    background-size: 40%;
			    margin-right: 0.2rem;
		}
	}
	.artistbang{
    	width: 100%;
    	margin-bottom: 40px;
    	aside{
    		background: #fff;
    		position: fixed;
    		z-index: 10;
    		right: 0;
    		top: 0;
    		width: 75%;
    		height: 100%;
    		overflow-x:hidden;
    		overflow-y: scroll;
    		visibility: hidden;
    		transform: translate3d(100%,0,0);
    		-webkit-transform: translate3d(100%,0,0);
    		transition: transform 300ms ease;
    		-webkit-transition: transform 300ma ease;
    	}
    	aside.active{
    		transform: translate3d(0,0,0);
    		-webkit-transform: translate3d(0,0,0);
    		visibility: visible;
    	}
		#messDivId{
			width: 100%;
		}
    	li {
		    border-bottom: 1px solid #e5e5e5;
		    color: #333;
		    margin-left: 0.2rem;
		}
		.artist_fenlei {
		    height: 1.05rem;
		    line-height: 1.05rem;
		    font-size: 0.32rem;
		}
		.artist_toright {
		    width: 0.4rem;
		    height: 1.05rem;
		    background: url(http://m.kuwo.cn/static/h5/image/h5img/arrow_r.png) no-repeat center center;
		    background-size: 40%;
		    margin-right: 0.2rem;
		}
		.artistlist {
	    	padding-top: 0.1rem;

	    	.boldbottom {
			    border-bottom: 0.2rem solid #f2f2f2;
			    padding-left: 0.2rem;
			    margin-left: 0;
			}
	    	.singBox_special {
			    width: 100%;
			    padding-top: 0.11rem;
			    display: -webkit-box;
			    display: -webkit-flex;
			    .specialImgBox {
				    width: 1rem;
				    height: 1rem;
				    margin: 0 0.2rem 0.11rem 0.2rem;
				    border-radius: 50%;
				    overflow: hidden;
				    img {
					    width: 100%;
					    height: 100%;
					}
				}

				.Sp_singTex {
					-webkit-box-flex:1;
					-webkit-flex: 1;
				    padding-bottom: 0.11rem;
				    border-bottom: 1px solid #e5e5e5;
				    .Sp_singTexUp {
					    width: 70%;
					    .artistName {
						    font-size: 0.3rem;
						    color: #333;
						    padding: 0.1rem 0 0.06rem 0;
						    width: 100%;
						    overflow: hidden;
						    text-overflow: ellipsis;
						    white-space: nowrap;
						}
						.singCount {
						    font-size: 0.22rem;
						    color: #999;
						}
					}
					.artist_toright {
					    width: 0.4rem;
					    height: 1.05rem;
					    background: url(http://m.kuwo.cn/static/h5/image/h5img/arrow_r.png) no-repeat center center;
					    background-size: 40%;
					    margin-right: 0.2rem;
					}
					.artist_toright.at2 {
					    height: 1rem;
					}
				}
			}
		}
	  
	}

</style>