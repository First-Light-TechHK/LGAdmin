<script setup>
import {
    Edit,
    Delete,
} from '@element-plus/icons-vue'

import { ref } from 'vue'


//课程搜索时填写的昵称
const nickname = ref('')


//课程列表数据模型
const courses = ref([
    
])

//定义变量，控制标题的展示
const title = ref('')

//分页条数数据模型
const pageNum = ref(1)   //当前页
const total = ref(0)   //总条数
const pageSize = ref(6) //每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size
    courseList()
}

//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num
    courseList()
}

import { courseListService,  courseDeleteService } from '@/api/course';

//获取列表数据
const courseList = async()=> {
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
    }
    console.log('params:')
    console.log(params)
    let result = await courseListService(params)

    //渲染视图
    console.log(result.data.total)
    total.value = result.data.total
    courses.value = result.data

}
courseList()

import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { Plus } from '@element-plus/icons-vue'
//控制抽屉是否显示
const visibleDrawer = ref(false)
//添加表单数据模型
const courseModel = ref({
    
})

//导入token
import { useTokenStore } from '@/stores/token';
const tokenStore = useTokenStore()

//上传成功的回调函数
// const uploadSuccess = (result)=>{
//     courseModel.value.image = result.data
//     console.log(result.data)
// }

//添加课程
import { ElMessage } from 'element-plus';
const addCourse = async()=>{

    // //调用接口
    // let result = await courseAddService(courseModel.value)
    // ElMessage.success(result.msg ? result.msg : '添加成功')

    // //让抽屉消失
    // visibleDrawer.value = false
    // //刷新当前列表
    // courseList()
}

import { ElMessageBox } from 'element-plus';
//删除课程
const deleteCourse = (row)=> {
    //提示课程，确认框
    ElMessageBox.confirm(
        '你确认要删除该课程吗',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        })
        .then(async () => {
            //调用接口
            let result = courseDeleteService(row.id)
            ElMessage({ type: 'success', message: '删除成功'})
            //刷新列表
            setTimeout(courseList, 200);
        })
        .catch(() => {
            ElMessage({ type: 'info', message: '课程取消了删除'})
        })
    
    
}

//显示编辑弹窗
const editCourse = (row) => {
    console.log(row)
    // title.value = '编辑课程'
    // //让抽屉显示
    // visibleDrawer.value = true

    // if(row.type == "单人") {
    //     courseModel.value.type = 1
    // }else if(row.type == "多人") {
    //     courseModel.value.type = 2
    // }else if(row.type == "课程") {
    //     courseModel.value.type = 3
    // }

    // //数据拷贝
    // courseModel.value.name = row.name
    // courseModel.value.image = row.image
    // courseModel.value.description = row.description
    // courseModel.value.sort = row.sort
    // courseModel.value.status = row.status=="启用" ? "1" : "0"
    // //扩展id属性，将来需要传递给后台，完成分类的修改
    // courseModel.value.id = row.id
    
}

//编辑课程
const updateCourse = async() => {
    // //调用接口
    // let result = await courseUpdateService(courseModel.value)
    // ElMessage.success(result.msg ? result.msg : '修改成功')
    // //调用获取课程列表
    // courseList()
    // visibleDrawer.value = false     //隐藏弹窗

}

//清空表单数据
const clearData = ()=> {
    // courseModel.value = {
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
                <span>课程管理</span>
                <div class="extra">
                    
                </div>
            </div>
        </template>
        <!-- 搜索表单 -->
        <el-form inline>
            <el-form-item label="课程标题：" style="width: 210px">
                <el-input v-model="title" placeholder="请输入课程标题"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="courseList">搜索</el-button>
                <el-button @click="title = '';">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 课程列表 -->
        <el-table :data="courses" style="width: 100%">
            <el-table-column label="ID" width="60" prop="id"></el-table-column>
            <el-table-column label="课程标题"  prop="title"></el-table-column>
            <el-table-column label="课程描述"  prop="description"></el-table-column>
            <el-table-column label="课程标签"  prop="tags"></el-table-column>
            <el-table-column label="操作" width="150">
                <template #default="{ row }">
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteCourse(row)"></el-button>
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
        <el-drawer v-model="visibleDrawer" title="添加课程" direction="rtl" size="50%">
            <!-- 添加课程表单 -->
            <el-form :model="courseModel" label-width="100px">
                
                <el-form-item label="课程名称">
                    <el-input v-model="courseModel.name" placeholder="请输入课程名称"></el-input>
                </el-form-item>
                
                <el-form-item label="课程封面">

                    <!-- 
                        auto-upload:设置是否自动上传
                        action:设置服务器接口路径
                        name:设置上传的文件字段名
                        headers:设置上传的请求头
                        on-success:设置上传成功的回调函数
                     -->
                   
                     <el-upload class="avatar-uploader" :auto-upload="true" :show-file-list="false"
                    action="/course/course/upload"
                    name="file"
                    :data="{path:'image/course/'}"
                    :headers="{'Authentication':tokenStore.token}"
                    :on-success="uploadSuccess"
                    >
                        <img v-if="courseModel.image" :src="courseModel.image" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="课程描述">
                    <el-input v-model="courseModel.description" placeholder="请输入课程描述"></el-input>
                </el-form-item>
                <el-form-item label="课程排序">
                    <el-input v-model="courseModel.sort" placeholder="请输入课程排序"></el-input>
                </el-form-item>
                <el-form-item label="发布状态">
                    <el-radio-group v-model="courseModel.status">
                        <el-radio value="1">启用</el-radio>
                        <el-radio value="0">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="title == '添加课程' ? addCourse() : updateCourse()">确认</el-button>
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
