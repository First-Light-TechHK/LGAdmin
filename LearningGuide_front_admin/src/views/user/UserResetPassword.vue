<script setup>

import { ref } from 'vue'

import { useTokenStore } from '@/stores/token';

import { ElMessage } from 'element-plus';

//用户密码表单数据模型
const passwordData = ref({
    old_pwd: "",
    new_pwd: "",
    re_pwd: ""
})

//校验密码的函数
const checkRePassword = (rule, value, callback) => {
    if(value === '') {
        callback(new Error('请再次输入密码'))
    }else if(value !== passwordData.value.new_pwd) {
        callback(new Error('请确保两次输入的密码一样'))
    }else {
        callback()
    }
}

//定义表单验证规则
const rules = {
    old_pwd: [
        { required: true, message: '请输入原密码', trigger: 'blur' },
        { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
    ],
    new_pwd: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
    ],
    re_pwd: [
        { validator: checkRePassword, trigger: 'blur' }
    ]
}

import { userPasswordUpadateService } from '@/api/user';
//更新密码
const updatePassword = async() => {
    //调用接口
    let result = await userPasswordUpadateService(passwordData.value) 
    ElMessage.success(result.msg ? result.msg : '修改成功')
}



</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>修改密码</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="passwordData" :rules="rules" label-width="100px" size="large">
                    <el-form-item label="旧密码" prop="old_pwd">
                        <el-input v-model="passwordData.old_pwd"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="new_pwd">
                        <el-input v-model="passwordData.new_pwd"></el-input>
                    </el-form-item>
                    <el-form-item label="重复新密码" prop="re_pwd">
                        <el-input v-model="passwordData.re_pwd"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updatePassword">提交修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>

<style lang="scss" scoped>

</style>