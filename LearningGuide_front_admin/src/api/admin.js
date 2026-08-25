import request from '@/utils/request.js'
import { useTokenStore } from '@/stores/token'


//列表查询
export const adminListService = (params)=>{
    return request.get('/v1/admin/list', { params:params })
} 


//删除
export const adminDeleteService = (id) => {
    //request.delete('/member/delete?id=' + id)
}
