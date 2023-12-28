<template>
	<el-dialog v-model="state.dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" :title="state.title" destroy-on-close width="50%">
		<Form ref="formRef" :form-data="state.formData" :form-item="state.formItem" :rules="state.rules" @submitForm="submitForm"/>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="primary" @click="confirm">确定</el-button>
				<el-button @click="cancel">取消</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script setup>
import { reactive, ref } from 'vue'
import Form from '@/components/Form/Form.vue'
import { formRules } from '@/utils/config.js'
import * as $api from '@/utils/axios'
import { ElMessageBox } from 'element-plus'

const state = reactive({
  dialogVisible: false,
  title: '',
  rules: {
    secretaryID: formRules('must'),
    labID: formRules('must'),
    name: formRules('must'),
    gender: formRules('must'),
    age: formRules('must'),
    employDate: formRules('must'),
    work: formRules('must')
  },
  formData: {
    secretaryID: '',
    labID: '',
    name: '',
    gender: '',
    age: '',
    employDate: '',
    work: ''
  },
  formItem: [
    {
      label: '秘书ID',
      type: 'number',
      value: 'secretaryID',
      width: 24
    },
    {
      label: '所属研究室ID',
      type: 'number',
      value: 'labID',
      width: 24
    },
    {
      label: '姓名',
      type: 'text',
      value: 'name',
      width: 24
    },
    {
      label: '性别',
      type: 'select',
      value: 'gender',
      width: 24,
      children: [
        {
          label: '男',
          value: '男'
        },
        {
          label: '女',
          value: '女'
        }
      ]
    },
    {
      label: '年龄',
      type: 'number',
      value: 'age',
      width: 24
    },
    {
      label: '上任时间',
      type: 'date',
      value: 'employDate',
      width: 24
    },
    {
      label: '主要工作',
      type: 'text',
      value: 'work',
      width: 24
    }
  ]
})
const formRef = ref(null)

function open(data) {
  state.formData = {}
  if (data) {
    state.title = '编辑秘书'
    state.formData = data
  } else {
    state.title = '新增秘书'
  }
  state.dialogVisible = true
}

const edit = (data) => {}
// 确定
const confirm = () => {
  formRef.value.submitForm()
  if (state.title === '新增秘书') {
    handleAddSubmit()
  } else {
    handleEditSubmit()
  }
}

const handleAddSubmit = () => {
  const newdata = state.formData
  $api.post('/secretary/add?secretary_id=' + newdata.secretaryID + '&lab_id=' + newdata.labID + '&name=' + newdata.name + '&gender=' + newdata.gender + '&age=' + newdata.age + '&employ_date=' + newdata.employDate + '&work=' + newdata.work)
    .then(() => {
      ElMessageBox({
        message: '新增成功',
        type: 'success',
        showClose: true
      })
      emit('update')
    }).catch(() => {
      ElMessageBox({
        message: '新增失败',
        type: 'error',
        showClose: true
      })
    })
  state.dialogVisible = false
}

const handleEditSubmit = (data) => {
  const newdata = state.formData
  $api.put('/secretary/update?secretary_id=' + newdata.secretaryID + '&lab_id=' + newdata.labID + '&name=' + newdata.name + '&gender=' + newdata.gender + '&age=' + newdata.age + '&employ_date=' + newdata.employDate + '&work=' + newdata.work)
    .then(() => {
      ElMessageBox({
        message: '修改成功',
        type: 'success',
        showClose: true
      })
      emit('update')
    })
    .catch(() => {
      ElMessageBox({
        message: '修改失败',
        type: 'error',
        showClose: true
      })
    })
  state.dialogVisible = false
}

const submitForm = (data) => {
  state.formData = data
}
const cancel = () => {
  state.dialogVisible = false
}

const emit = defineEmits(['update'])
defineExpose({ open, edit })
</script>
