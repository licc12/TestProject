/**
 * 用于获取逛吃数据，并监听数据
 * Created by licc on 2018/8/14.
 */
import {observable, computed, action, runInAction} from 'mobx'
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

        if (this.isRefreshing){//如果是初始加载和下拉刷新，就初始化成1
            this.page = 1;
        }
        const params ={//请求参数
            page: this.page,
            category: this.categoryId,
            per:10
        }
        const responseData = await get({url,params,timeout:30}).then(res=>res.json())
        const {feeds, page, total_pages} = responseData;
        runInAction(()=>{
            this.isRefreshing = false;//

        });



    }

}


