<script setup>
import {
    Edit,
    Delete,
} from '@element-plus/icons-vue'

import { ref } from 'vue'


//教师搜索时填写的昵称
const nickname = ref('')


//教师列表数据模型
const teachers = ref([
    
])

//定义变量，控制标题的展示
const title = ref('')

//分页条数数据模型
const pageNum = ref(1)   //当前页
const total = ref(20)   //总条数
const pageSize = ref(3) //每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size
    teacherList()
}

//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num
    teacherList()
}

import { teacherListService, teacherCreateService, teacherDeleteService } from '@/api/teacher';

//获取列表数据
const teacherList = async()=> {
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        nickname: nickname.value ? nickname.value : null,
    }
    let result = await teacherListService(params)

    //渲染视图
    console.log(result.data.total)
    total.value = result.data.total
    teachers.value = result.data

}
teacherList()

import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { Plus } from '@element-plus/icons-vue'
//控制抽屉是否显示
const visibleDrawer = ref(false)
//添加表单数据模型
const teacherModel = ref({
    username: '',
    password: '',
    nickname: '',
    age: 0,
    status: '1'
})

//导入token
import { useTokenStore } from '@/stores/token';
const tokenStore = useTokenStore()

//上传成功的回调函数
// const uploadSuccess = (result)=>{
//     teacherModel.value.image = result.data
//     console.log(result.data)
// }

//添加教师
import { ElMessage } from 'element-plus';

const onAddTeacher = () => {
    title.value = '添加教师'
    //teacherModel.status = ref(1)
    visibleDrawer.value = true
}

const addTeacher = async()=>{
    console.log('add teacher')

    if(teacherModel.value.username == '') {
        ElMessage.error('教师账号不能为空')
        return
    }

    if(teacherModel.value.password == '') {
        ElMessage.error('教师登录密码不能为空')
        return
    }

    //调用接口
    let result = await teacherCreateService(teacherModel.value)
    ElMessage.success(result.msg ? result.msg : '添加成功')

    //让抽屉消失
    visibleDrawer.value = false
    //刷新当前列表
    teacherList()
}

import { ElMessageBox } from 'element-plus';
//删除教师
const deleteTeacher = (row)=> {
    //提示教师，确认框
    ElMessageBox.confirm(
        '你确认要删除该教师吗',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        })
        .then(async () => {
            //调用接口
            //let result = teacherDeleteService(row.id)
            //ElMessage({ type: 'success', message: '删除成功'})
            ElMessage.error('教师不能删除')
            //刷新列表
            setTimeout(teacherList, 200);
        })
        .catch(() => {
            ElMessage({ type: 'info', message: '教师取消了删除'})
        })
    
    
}

//显示编辑弹窗
const editTeacher = (row) => {
    console.log(row)
    // title.value = '编辑教师'
    // //让抽屉显示
    // visibleDrawer.value = true

    // if(row.type == "单人") {
    //     teacherModel.value.type = 1
    // }else if(row.type == "多人") {
    //     teacherModel.value.type = 2
    // }else if(row.type == "教师") {
    //     teacherModel.value.type = 3
    // }

    // //数据拷贝
    // teacherModel.value.name = row.name
    // teacherModel.value.image = row.image
    // teacherModel.value.description = row.description
    // teacherModel.value.sort = row.sort
    // teacherModel.value.status = row.status=="启用" ? "1" : "0"
    // //扩展id属性，将来需要传递给后台，完成教师的修改
    // teacherModel.value.id = row.id
    
}

//编辑教师
const updateTeacher = async() => {
    console.log('update teacher')
    console.log(title)
    // //调用接口
    // let result = await teacherUpdateService(teacherModel.value)
    // ElMessage.success(result.msg ? result.msg : '修改成功')
    // //调用获取教师列表
    // teacherList()
    // visibleDrawer.value = false     //隐藏弹窗

}

//清空表单数据
const clearData = ()=> {
    teacherModel.value = {
         username: '',
         password: '',
         nickname: '',
         age: 30,
         status: '1'
    }
}

</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>教师管理</span>
                <div class="extra">
                    <el-button @click="onAddTeacher">添加教师</el-button>
                </div>
            </div>
        </template>
        <!-- 搜索表单 -->
        <el-form inline>
            <el-form-item label="教师名称：" style="width: 210px">
                <el-input v-model="name" placeholder="请输入教师名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="teacherList">搜索</el-button>
                <el-button @click="name = '';">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 教师列表 -->
        <el-table :data="teachers" style="width: 100%">
            <el-table-column label="ID" width="60" prop="id"></el-table-column>
            <el-table-column label="教师姓名" width="120" prop="username"></el-table-column>
            <el-table-column label="教师昵称" width="120" prop="nickname"></el-table-column>
            <el-table-column label="电话" width="140" prop="phone"></el-table-column>
            <el-table-column label="Email" prop="openid"></el-table-column>
            <el-table-column label="操作" width="150">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="editScene(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteTeacher(row)"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
        <!-- 分页条 -->
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[3, 5, 10, 15]"
            layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
            @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />

        <!-- 抽屉 -->
        <el-drawer v-model="visibleDrawer" title="添加教师" direction="rtl" size="50%">
            <!-- 添加教师表单 -->
            <el-form :model="teacherModel" label-width="100px">
                
                <el-form-item label="教师账号">
                    <el-input v-model="teacherModel.username" placeholder="请输入教师账号"></el-input>
                </el-form-item>
                
                
                <el-form-item label="教师密码">
                    <el-input v-model="teacherModel.password" placeholder="请输入教师登录密码"></el-input>
                </el-form-item>

                <el-form-item label="教师昵称">
                    <el-input v-model="teacherModel.nickname" placeholder="请输入教师昵称"></el-input>
                </el-form-item>

                <el-form-item label="教师年龄">
                    <el-input type="number" v-model="teacherModel.age" placeholder="请输入教师年龄"></el-input>
                </el-form-item>
                <el-form-item label="启用状态">
                    <el-radio-group v-model="teacherModel.status">
                        <el-radio label='1'>启用</el-radio>
                        <el-radio label='0'>禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="title == '添加教师' ? addTeacher() : updateTeacher()">确认</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
    </el-card>
</template>

<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}

/* 抽屉样式 */
.avatar-uploader {
    :deep() {
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }

        .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .el-upload:hover {
            border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            text-align: center;
        }
    }
}

</style>
