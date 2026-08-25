import request from '@/utils/request.js'
import { useTokenStore } from '@/stores/token'


//列表查询
export const ordersListService = (params)=>{
    return request.post('/v1/order/list', params)
} 

//添加分类
export const ordersCreateService = (params)=>{
    return request.post('/course/v1/orders/create', params)
} 


//删除
export const ordersDeleteService = (id) => {
    request.delete('/course/v1/orders/' + id)
}
