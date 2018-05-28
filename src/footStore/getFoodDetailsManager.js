/**
 * Created by licc on 2018/5/21.
 */
import {observable, runInAction, computed, action} from 'mobx';
import {getJson} from '../config/HttpTool'

class getFoodDetailsManager {
    @observable foods = []
    @observable page = 1
    @observable kind=''
    @observable categoryId = 1
    @observable orderBy = 1
    @observable orderAsc = 0
    @observable sub_value = ''
    @observable isFetching = false
    @observable isNoMore = true

    constructor(kind, categoryId) {
        this.categoryId = categoryId
        this.kind = kind
        this.isFetching = true
        this.fetchFoods()
        alert(kind+'----'+categoryId);
    }

    @action
    fetchFoods = async() => {
        try {
            const {foods, isNoMore} = await this._fetchDataFromUrl()
            runInAction(() => {
                this.isFetching = false
                this.isNoMore = isNoMore
                if (this.page === 1) {
                    this.foods.replace(foods)
                } else {
                    this.foods.splice(this.foods.length, 0, ...foods);
                }
            })
        } catch (error) {
            this.isFetching = false
        }
    }

    _fetchDataFromUrl() {
        return new Promise((resolve, reject) => {
            const URL = `http://food.boohee.com/fb/v1/foods?kind=${this.kind}&value=${this.categoryId}&order_by=${this.orderBy}&page=${this.page}&order_asc=${this.orderAsc}&sub_value=${this.sub_value}`
            fetch(URL).then(response => {
                if (response.status === 200) return response.json()
                return null
            }).then(responseData => {
                if (responseData) {
                    const {foods, page, total_pages} = responseData
                    resolve({foods, isNoMore: page >= total_pages})
                } else {
                    reject('请求出错！')
                }
            }).catch(error => {
                reject('网络出错！')
            })
        })
    }
}
export default getFoodDetailsManager