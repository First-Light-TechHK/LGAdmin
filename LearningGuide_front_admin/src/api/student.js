import request from '@/utils/request.js'
import { useTokenStore } from '@/stores/token'


//列表查询
export const studentListService = (params)=>{
    return request.get('/v1/user/list', { params:params })
} 


//删除
export const studentDeleteService = (id) => {
    //request.delete('/member/delete?id=' + id)
}
