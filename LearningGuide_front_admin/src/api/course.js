import request from '@/utils/request.js'
import { useTokenStore } from '@/stores/token'


//列表查询
export const courseListService = (params)=>{
    return request.post('/v1/course/list', params)
} 


//删除
export const courseDeleteService = (id) => {
    //request.delete('/member/delete?id=' + id)
}
