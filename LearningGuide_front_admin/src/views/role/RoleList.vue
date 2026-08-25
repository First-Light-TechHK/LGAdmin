<script setup>
import {
    Edit,
    Delete,
} from '@element-plus/icons-vue'

import { ref } from 'vue'


//角色分类数据模型
const types = ref([
    {
        "id": 1,
        "name": "游戏动漫"
    },
    {
        "id": 2,
        "name": "其他"
    }
])


//用户搜索时选中的类型与编码
const type = ref('')
const name = ref('')


//角色列表数据模型
const roles = ref([
    
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
    roleList()
}

//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num
    roleList()
}

import { roleListService, roleAddService, roleDeleteService, roleUpdateService } from '@/api/role';

//获取列表数据
const roleList = async()=> {
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        type: type.value ? type.value : null,
        name: name.value ? name.value : null,
    }
    let result = await roleListService(params)

    //渲染视图
    console.log(result.data.total)
    total.value = result.data.total
    roles.value = result.data.items

    //处理数据，给数据模型扩展一个属性typeName,类型名称
    for(let i=0;i<roles.value.length;i++) {
        let role = roles.value[i]
        if(role.type == 1) {
            role.type = '游戏动漫'
        }else if(role.type == 2) {
            role.type = '其他'
        }

        if(role.status == 0) {
            role.status = '禁用'
        }else {
            role.status = '启用'
        }
        
    }
}
roleList()

import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { Plus } from '@element-plus/icons-vue'
//控制抽屉是否显示
const visibleDrawer = ref(false)
//添加表单数据模型
const roleModel = ref({
    type: '',
    sceneId: '',
    name: '',
    avatar: '',
    introduce: '',
    words: '',
    voiceCode: '',
    description: '',
    status: 0,
    sort: 1
})

//导入token
import { useTokenStore } from '@/stores/token';
const tokenStore = useTokenStore()

//上传成功的回调函数
const uploadSuccess = (result)=>{
    roleModel.value.avatar = result.data
    console.log(result.data)
}

//添加角色
import { ElMessage } from 'element-plus';
const addRole = async()=>{

    //调用接口
    let result = await roleAddService(roleModel.value)
    ElMessage.success(result.msg ? result.msg : '添加成功')

    //让抽屉消失
    visibleDrawer.value = false
    //刷新当前列表
    roleList()
}

import { ElMessageBox } from 'element-plus';
//删除角色
const deleteRole = (row)=> {
    //提示用户，确认框
    ElMessageBox.confirm(
        '你确认要删除该角色吗',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        })
        .then(async () => {
            //调用接口
            let result = roleDeleteService(row.id)
            ElMessage({ type: 'success', message: '删除成功'})
            //刷新列表
            setTimeout(roleList, 200);
        })
        .catch(() => {
            ElMessage({ type: 'info', message: '用户取消了删除'})
        })
    
    
}

//显示编辑弹窗
const editRole = (row) => {
    console.log(row)
    title.value = '编辑角色'
    //让抽屉显示
    visibleDrawer.value = true

    if(row.type == "游戏动漫") {
        roleModel.value.type = 1
    }else if(row.type == "其他") {
        roleModel.value.type = 2
    }

    //数据拷贝
    roleModel.value.name = row.name
    roleModel.value.sceneId = row.sceneId
    roleModel.value.avatar = row.avatar
    roleModel.value.introduce = row.introduce
    roleModel.value.words = row.words
    roleModel.value.voiceCode = row.voiceCode
    roleModel.value.description = row.description
    roleModel.value.sort = row.sort
    roleModel.value.status = row.status=="启用" ? "1" : "0"
    //扩展id属性，将来需要传递给后台，完成分类的修改
    roleModel.value.id = row.id
    
}

//编辑角色
const updateRole = async() => {
    //调用接口
    let result = await roleUpdateService(roleModel.value)
    ElMessage.success(result.msg ? result.msg : '修改成功')
    //调用获取角色列表
    roleList()
    visibleDrawer.value = false     //隐藏弹窗

}

//清空表单数据
const clearData = ()=> {
    roleModel.value = {
        type: '',
        sceneId: '',
        name: '',
        avatar: '',
        introduce: '',
        words: '',
        voiceCode: '',
        description: '',
        status: 0,
        sort: 1
    }
}

</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>角色管理</span>
                <div class="extra">
                    <el-button type="primary" @click="visibleDrawer = true; title = '添加角色';clearData()">添加角色</el-button>
                </div>
            </div>
        </template>
        <!-- 搜索表单 -->
        <el-form inline>

            <el-form-item label="角色类型：" style="width: 200px">
                <el-select placeholder="请选择" v-model="type">
                    <el-option label="游戏动漫" value="1"></el-option>
                    <el-option label="其他" value="2"></el-option>
                </el-select>
                
            </el-form-item>
            <el-form-item label="角色名称：" style="width: 210px">
                <el-input v-model="name" placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="roleList">搜索</el-button>
                <el-button @click="type = '';name = '';">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 角色列表 -->
        <el-table :data="roles" style="width: 100%">
            <el-table-column label="ID" width="60" prop="id"></el-table-column>
            <el-table-column label="角色类型" width="100" prop="type"></el-table-column>
            <el-table-column label="角色场景" width="150" prop="sceneId"></el-table-column>
            <el-table-column label="角色名称" width="140" prop="name"></el-table-column>
            <el-table-column label="开场白" prop="introduce"></el-table-column>
            <el-table-column label="提示词" width="150" prop="words"></el-table-column>
            <el-table-column label="声音编码" prop="voiceCode"></el-table-column>
            <el-table-column label="角色描述" prop="description"></el-table-column>
            <el-table-column label="排序" prop="sort"></el-table-column>
            <el-table-column label="创建时间" width="170" prop="createTime"></el-table-column>
            <el-table-column label="状态" width="100" prop="status"></el-table-column>
            <el-table-column label="操作" width="150">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="editRole(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteRole(row)"></el-button>
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
        <el-drawer v-model="visibleDrawer" title="添加角色" direction="rtl" size="50%">
            <!-- 添加角色表单 -->
            <el-form :model="roleModel" label-width="100px">
                <el-form-item label="角色类型">
                    <el-select placeholder="请选择" v-model="roleModel.type">
                        <el-option v-for="c in types" :key="c.id" :label="c.name" :value="c.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色名称">
                    <el-input v-model="roleModel.name" placeholder="请输入角色名称"></el-input>
                </el-form-item>

                <el-form-item label="角色头像">

                <!-- 
                    auto-upload:设置是否自动上传
                    action:设置服务器接口路径
                    name:设置上传的文件字段名
                    headers:设置上传的请求头
                    on-success:设置上传成功的回调函数
                -->

                <el-upload class="avatar-uploader" :auto-upload="true" :show-file-list="false"
                action="/admin/admin/upload"
                name="file"
                :data="{path:'image/admin/'}"
                :headers="{'Authentication':tokenStore.token}"
                :on-success="uploadSuccess"
                >
                    <img v-if="roleModel.avatar" :src="roleModel.avatar" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
                </el-form-item>

                <el-form-item label="开场白">
                    <el-input v-model="roleModel.introduce" placeholder="请输入角色开场白"></el-input>
                </el-form-item>

                <el-form-item label="提示词">
                    <el-input v-model="roleModel.words" placeholder="请输入角色提示词"></el-input>
                </el-form-item>
                <el-form-item label="声音编码">
                    <el-input v-model="roleModel.voiceCode" placeholder="请输入角色声音编码"></el-input>
                </el-form-item>
                <el-form-item label="角色排序">
                    <el-input v-model="roleModel.sort" placeholder="请输入角色排序"></el-input>
                </el-form-item>
                
                <el-form-item label="角色描述">
                    <el-input v-model="roleModel.description" placeholder="请输入角色描述"></el-input>
                </el-form-item>

                <el-form-item label="发布状态">
                    <el-radio-group v-model="roleModel.status">
                        <el-radio value="1">启用</el-radio>
                        <el-radio value="0">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="title == '添加角色' ? addRole() : updateRole()">确认</el-button>
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
