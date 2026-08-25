import request from '@/utils/request.js'
import { useTokenStore } from '@/stores/token'


//列表查询
export const categoryListService = (params)=>{
    return request.get('/course/v1/categorys', { params:params })
} 

//添加分类
export const categoryCreateService = (params)=>{
    return request.post('/course/v1/category/create', params)
} 


//删除
export const categoryDeleteService = (id) => {
    request.delete('/course/v1/category/' + id)
}
