/**
 * Created by licc on 2018/4/30.
 */
import {observable, runInAction, computed, action} from 'mobx'
import {getJson} from '../config/HttpTool'

export default class FootMainListData {
    @observable foodCategoryList = []
    @observable errorMsg = ''

    @action
    fetchCategoryList = async() => {

        try {
            const url = 'http://food.boohee.com/fb/v1/categories/list'
            const responseData = await getJson({url, timeout: 30}).then(res => res.json())
            alert(JSON.stringify('--222--'+responseData));
            runInAction(() => {
                this.foodCategoryList.replace(responseData.group)
                this.errorMsg = ''
            })
        } catch (error) {
            if (error.msg) {
                this.errorMsg = error.msg
            } else {
                this.errorMsg = error
            }
        }
    }

    @computed
    get isFetching() {
        return this.foodCategoryList.length === 0 && this.errorMsg === ''
    }

    @computed
    get isNoResult() {
        return this.foodCategoryList.length === 0
    }
}
