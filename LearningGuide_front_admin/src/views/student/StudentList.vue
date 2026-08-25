<script setup>
import {
    Edit,
    Delete,
} from '@element-plus/icons-vue'

import { ref } from 'vue'


//学生搜索时填写的昵称
const nickname = ref('')


//学生列表数据模型
const students = ref([
    
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
    studentList()
}

//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num
    studentList()
}

import { studentListService,  studentDeleteService } from '@/api/student';

//获取列表数据
const studentList = async()=> {
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        nickname: nickname.value ? nickname.value : null,
    }
    let result = await studentListService(params)

    //渲染视图
    console.log(result.data.total)
    total.value = result.data.total
    students.value = result.data

}
studentList()

import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { Plus } from '@element-plus/icons-vue'
//控制抽屉是否显示
const visibleDrawer = ref(false)
//添加表单数据模型
const studentModel = ref({
    
})

//导入token
import { useTokenStore } from '@/stores/token';
const tokenStore = useTokenStore()

//上传成功的回调函数
// const uploadSuccess = (result)=>{
//     studentModel.value.image = result.data
//     console.log(result.data)
// }

//添加学生
import { ElMessage } from 'element-plus';
const addStudent = async()=>{

    // //调用接口
    // let result = await studentAddService(studentModel.value)
    // ElMessage.success(result.msg ? result.msg : '添加成功')

    // //让抽屉消失
    // visibleDrawer.value = false
    // //刷新当前列表
    // studentList()
}

import { ElMessageBox } from 'element-plus';
//删除学生
const deleteStudent = (row)=> {
    //提示学生，确认框
    ElMessageBox.confirm(
        '你确认要删除该学生吗',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        })
        .then(async () => {
            //调用接口
            let result = studentDeleteService(row.id)
            ElMessage({ type: 'success', message: '删除成功'})
            //刷新列表
            setTimeout(studentList, 200);
        })
        .catch(() => {
            ElMessage({ type: 'info', message: '学生取消了删除'})
        })
    
    
}

//显示编辑弹窗
const editStudent = (row) => {
    console.log(row)
    // title.value = '编辑学生'
    // //让抽屉显示
    // visibleDrawer.value = true

    // if(row.type == "单人") {
    //     studentModel.value.type = 1
    // }else if(row.type == "多人") {
    //     studentModel.value.type = 2
    // }else if(row.type == "学生") {
    //     studentModel.value.type = 3
    // }

    // //数据拷贝
    // studentModel.value.name = row.name
    // studentModel.value.image = row.image
    // studentModel.value.description = row.description
    // studentModel.value.sort = row.sort
    // studentModel.value.status = row.status=="启用" ? "1" : "0"
    // //扩展id属性，将来需要传递给后台，完成分类的修改
    // studentModel.value.id = row.id
    
}

//编辑学生
const updateStudent = async() => {
    // //调用接口
    // let result = await studentUpdateService(studentModel.value)
    // ElMessage.success(result.msg ? result.msg : '修改成功')
    // //调用获取学生列表
    // studentList()
    // visibleDrawer.value = false     //隐藏弹窗

}

//清空表单数据
const clearData = ()=> {
    // studentModel.value = {
    //     name: '',
    //     type: '',
    //     description: '',
    //     image: '',
    //     sort: 1,
    //     status: 0
    // }
}

</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>学生管理</span>
                <div class="extra">
                    
                </div>
            </div>
        </template>
        <!-- 搜索表单 -->
        <el-form inline>
            <el-form-item label="学生昵称：" style="width: 210px">
                <el-input v-model="nickname" placeholder="请输入学生昵称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="studentList">搜索</el-button>
                <el-button @click="nickname = '';">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 学生列表 -->
        <el-table :data="students" style="width: 100%">
            <el-table-column label="ID" width="60" prop="id"></el-table-column>
            <el-table-column label="学生姓名" width="120" prop="username"></el-table-column>
            <el-table-column label="学生昵称" width="120" prop="nickname"></el-table-column>
            <el-table-column label="电话" width="140" prop="phone"></el-table-column>
            <el-table-column label="Email" prop="openid"></el-table-column>
            <el-table-column label="操作" width="150">
                <template #default="{ row }">
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteStudent(row)"></el-button>
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
        <el-drawer v-model="visibleDrawer" title="添加学生" direction="rtl" size="50%">
            <!-- 添加学生表单 -->
            <el-form :model="studentModel" label-width="100px">
                
                <el-form-item label="学生名称">
                    <el-input v-model="studentModel.name" placeholder="请输入学生名称"></el-input>
                </el-form-item>
                
                <el-form-item label="学生封面">

                    <!-- 
                        auto-upload:设置是否自动上传
                        action:设置服务器接口路径
                        name:设置上传的文件字段名
                        headers:设置上传的请求头
                        on-success:设置上传成功的回调函数
                     -->
                   
                     <el-upload class="avatar-uploader" :auto-upload="true" :show-file-list="false"
                    action="/student/student/upload"
                    name="file"
                    :data="{path:'image/student/'}"
                    :headers="{'Authentication':tokenStore.token}"
                    :on-success="uploadSuccess"
                    >
                        <img v-if="studentModel.image" :src="studentModel.image" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="学生描述">
                    <el-input v-model="studentModel.description" placeholder="请输入学生描述"></el-input>
                </el-form-item>
                <el-form-item label="学生排序">
                    <el-input v-model="studentModel.sort" placeholder="请输入学生排序"></el-input>
                </el-form-item>
                <el-form-item label="发布状态">
                    <el-radio-group v-model="studentModel.status">
                        <el-radio value="1">启用</el-radio>
                        <el-radio value="0">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="title == '添加学生' ? addStudent() : updateStudent()">确认</el-button>
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
