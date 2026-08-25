import request from '@/utils/request.js'
import { useTokenStore } from '@/stores/token'


//列表查询
export const teacherListService = (params)=>{
    return request.get('/v1/teacher/list', { params:params })
} 

export const teacherCreateService = (params)=>{
    return request.post('/user/v1/teacher/create', params)
} 

//删除
export const teacherDeleteService = (id) => {
    //request.delete('/member/delete?id=' + id)
}
