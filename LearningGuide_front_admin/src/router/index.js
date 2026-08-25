import { createRouter, createWebHistory } from 'vue-router'

//导入组件
import LoginVue from '@/views/Login.vue'
import LayoutVue from '@/views/Layout.vue'

import AdminList from '@/views/admin/AdminList.vue'
import TeacherList from '@/views/teacher/TeacherList.vue'
import StudentList from '@/views/student/StudentList.vue'
import CategoryList from '@/views/category/CategoryList.vue'
import CourseList from '@/views/course/CourseList.vue'
import OrdersList from '@/views/orders/OrdersList.vue'
import Setting from '@/views/setting/Setting.vue'

import ArticleCategory from '@/views/article/ArticleCategory.vue'
import ArticleManager from '@/views/article/ArticleManager.vue'
import UserAvatar from '@/views/user/UserAvatar.vue'
import UserInfo from '@/views/user/UserInfo.vue'
import UserResetPassword from '@/views/user/UserResetPassword.vue'

import RoleList from '@/views/role/RoleList.vue'

//定义路由关系
const routes = [
    {path: '/login', component: LoginVue},
    {path: '/', component: LayoutVue, redirect:'/admin/list', children:[
            { path:'/admin/list', component: AdminList },
            { path:'/teacher/list', component: TeacherList },
            { path:'/student/list', component: StudentList },
            { path:'/category/list', component: CategoryList },
            { path:'/course/list', component: CourseList },
            { path:'/orders/list', component: OrdersList },
            { path:'/setting/setting', component: Setting },

            { path:'/article/category', component: ArticleCategory },
            { path:'/article/manage', component: ArticleManager },
            { path:'/user/info', component: UserInfo },
            { path:'/user/avatar', component: UserAvatar },
            { path:'/user/resetPassword', component: UserResetPassword },

            { path:'/role/list', component: RoleList },

    ]}
]

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

//导出路由
export default router