/**
 * Created by licc on 2018/4/15.
 */
const router = {
    // 'Splash': require('../views/splash/splash'),
    // 'foodMain': require('../views/foods/foodMain'),
    // 'guangChiMain': require('../views/guangChi/guangChiMain'),
    // 'mineMain': require('../views/mine/mineMain'),
    // 'Details': require('../component/Details'),
    splash: {screen: require('../views/splash/splash')},
    foodMain: {screen: require('../views/home/home')},
    guangChiMain: {screen: require('../views/guangChi/guangChiMain')},
    mineMain: {screen:  require('../views/mine/mineMain')},
    Details: {screen: require('../component/Details')},
}
export default router