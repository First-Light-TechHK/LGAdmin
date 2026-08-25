import request from '@/utils/request.js'
import { useTokenStore } from '@/stores/token'

//文章分类列表查询
export const articleCategoryListService = () => {
    //const tokenStore = useTokenStore()
    //在pinia中定义的响应式数据，都不需要.value
    //return request.get('/category/list', {headers:{'Authentication':tokenStore.token}})
    return request.get('/category/list')
}

//文章分类添加
export const articleCategoryAddService = (categoryData) => {
    return request.post('/category/add', categoryData)
}

//文章分类修改
export const articleCategoryUpdateService = (categoryData) => {
    return request.put('/category/update', categoryData)
}

//文章分类删除
export const articleCategoryDeleteService = (id) => {
    request.delete('/category/delete?id=' + id)
}

//文章列表查询
export const articleListService = (params)=>{
    return request.get('/article/list', { params:params })
} 

//文章添加
export const articleAddService = (articleData)=>{
    return request.post('/article/add', articleData)
}