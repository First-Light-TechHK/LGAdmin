//定制请求的实例

//导入axios ; npm install axios
import axios from 'axios';
import { ElMessage } from 'element-plus';
//定义一个变量，记录公共的前缀，baseURL
//const baseURL = 'http://localhost:8080'
const baseURL = '/adm'
const instance = axios.create({baseURL})

//在请求或响应被then获catch处理前拦截他们

import { useTokenStore } from '@/stores/token';
//添加请求拦截器
instance.interceptors.request.use(
    (config)=>{
        const tokenStore = useTokenStore();
        // 兼容后端返回 token 字符串或 { token: 'xxx' }
        const token = typeof tokenStore.token === 'string'
            ? tokenStore.token
            : tokenStore.token?.token;

        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (err)=>{
        //请求错误的回调
        return Promise.reject(err)
    }
)

//import { useRouter } from 'vue-router'    //这种方式不行
//const router = useRouter();
import router from '@/router'

//添加响应拦截器
instance.interceptors.response.use(
    result=>{
        //判断业务状态码
        if(result.data.code === 0) {
            return result.data; 
        }
        //操作失败
        //alert(result.data.msg ? result.data.msg : '操作失败')
        ElMessage.error(result.data.msg ? result.data.msg : '操作失败')     //msg 还是message,后台改msg
        //异步操作的状态转换为失败的状态
        return Promise.reject(result.data)
        
    },
    err=>{
        //判断响应状态码，如果为401，则证明未登录，提示请登录，并跳转到登录页面
        if(err.response.status === 401) {
            ElMessage.error('请先登录')
            setTimeout(function() {
                router.push('/login')
            }, 1200);
        }else {
            //alert('服务异常');
            ElMessage.error('服务异常')
        }
        return Promise.reject(err); //异步的状态转化为失败的状态
    }
)

export default instance;
