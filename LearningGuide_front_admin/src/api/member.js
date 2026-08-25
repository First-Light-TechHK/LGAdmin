import request from '@/utils/request.js'
import { useTokenStore } from '@/stores/token'


//列表查询
export const memberListService = (params)=>{
    return request.get('/member/list', { params:params })
} 


//删除
export const memberDeleteService = (id) => {
    request.delete('/member/delete?id=' + id)
}
