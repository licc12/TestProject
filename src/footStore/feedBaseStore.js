/**
 * 用于获取逛吃数据，并监听数据
 * Created by licc on 2018/8/14.
 */
import {observable, computed, action, runInAction} from 'mobx'
import {get} from '../config/HttpTool'

export default class FeedStore{

    @observable feedList = [];
    @observable errorMsg = '';
    @observable page = 1;
    @observable isRefreshing = false;
    @observable isNoMore = true;

    constructor(categoryId){//形参为上个页面传递过来的id type
        this.categoryId = categoryId;
        this.fetchFeedList();
    }

    fetchFeedList = async () =>{
        try {
            if (this.isRefreshing){//如果是初始加载和下拉刷新，就初始化成1
                this.page = 1;
            }
            const url = 'http://food.boohee.com/fb/v1/feeds/category_feed'
            const params ={//请求参数
                page: this.page,
                category: this.categoryId,
                per:10
            }
            const responseData = await get({url,params,timeout:30}).then(res=>res.json())
            const {feeds, page, total_pages} = responseData;
            runInAction(()=>{
                this.isRefreshing = false;//
                this.errorMsg = '';
                this.isNoMore = page>=total_pages;//如果总页数大于当前页，可以上拉加载更多
                if(this.page === 1){
                    this.feedList.replace(feeds);
                }else{
                    this.feedList.splice(this.feedList.length,0,...feeds)
                }
            });
        }catch (error) {
            if(error.msg){
                this.errorMsg = error.msg;
            }else{
                this.errorMsg = error;
            }
        }

    }

    @computed
    get isFetching(){
        return this.feedList.length === 0 && this.errorMsg === '';
    }

    @computed
    get isLoadMore(){
        return this.page !== 1;
    }
}


