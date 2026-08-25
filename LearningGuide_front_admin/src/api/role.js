import request from '@/utils/request.js'
import { useTokenStore } from '@/stores/token'


//列表查询
export const roleListService = (params)=>{
    return request.get('/role/list', { params:params })
} 

//添加
export const roleAddService = (roleData)=>{
    return request.post('/role/add', roleData)
}

//删除
export const roleDeleteService = (id) => {
    request.delete('/role/delete?id=' + id)
}

//修改
export const roleUpdateService = (roleData) => {
    return request.put('/role/update', roleData)
}