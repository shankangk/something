<script setup>
const { readFile, writeFile } = 'fs';

import { reactive, ref } from 'vue';

const form = ref(null);
const editForm = reactive({
  name: '',
  url: '',
  labels: [],
  description: '',
});
const rules = reactive({
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  url: [{ required: true, message: '请输入链接', trigger: 'blur' }],
  description: [{ required: true, message: '请输入描述', trigger: 'blur' }],
});

const onSubmit = () => {
  form.value.validate((valid) => {
    if (valid) {
      console.log('submit!');
      // 验证通过，提交表单
      updateData();
    } else {
      console.log('error submit!');
      return false;
    }
  });
};
const onClear = () => {
  console.log('clear!');
  form.value.resetFields();
};

const updateData = (newData, src) => {
  newData = { name: '小张' };
  src = src || '@assets/json/data.json';
  readFile(src, 'utf8', (err, data) => {
    // 如果错误则输出错误并返回
    if (err) {
      console.log('err', err);
      return;
    }
    // 存放读取到的数据
    const arr = JSON.parse(data);
    // 将新记录添加到数组中
    arr.push(newData);
    // 添加后写入
    writeFile(src, JSON.stringify(arr), 'utf8', function (err) {
      console.log('err', err);
    });
  });
};
</script>

<template>
  <el-form ref="form" :model="editForm" :rules="rules" label-width="auto" label-position="top">
    <el-form-item label="Website name" prop="name">
      <el-input v-model="editForm.name" placeholder="please input website name" />
    </el-form-item>
    <el-form-item label="Website URL" prop="url">
      <el-input v-model="editForm.url" placeholder="please input website URL" />
    </el-form-item>
    <el-form-item label="Website description" prop="description">
      <el-input v-model="editForm.description" type="textarea" placeholder="please input website description" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" plain @click="onSubmit">Submit</el-button>
      <el-button type="danger" plain @click="onClear">Clear</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.set-form-style {
  padding: 50px 100px;
}
</style>
