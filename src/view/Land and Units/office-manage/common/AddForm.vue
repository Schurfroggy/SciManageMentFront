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
    officeID: formRules('must'),
    area: formRules('must'),
    address: formRules('must')
  },
  formData: {
    officeID: '',
    area: '',
    address: ''
  },
  formItem: [
    {
      label: '办公室ID',
      type: 'number',
      value: 'officeID',
      width: 24
    },
    {
      label: '占地面积(/平方米)',
      type: 'text',
      value: 'area',
      width: 24
    },
    {
      label: '地址',
      type: 'textarea',
      value: 'address',
      width: 24
    }
  ]
})
const formRef = ref(null)

function open(data) {
  state.formData = {}
  if (data) {
    state.title = '编辑办公室'
    state.formData = data
  } else {
    state.title = '新增办公室'
  }
  state.dialogVisible = true
}

const edit = (data) => {}
// 确定
const confirm = () => {
  formRef.value.submitForm()
  if (state.title === '新增办公室') {
    handleAddSubmit()
  } else {
    handleEditSubmit()
  }
}

const handleAddSubmit = () => {
  const newdata = state.formData
  $api.post('/office/add?id=' + newdata.officeID + '&area=' + newdata.area + '&address=' + newdata.address).then(() => {
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
  $api.put('/office/update?id=' + newdata.officeID + '&area=' + newdata.area + '&address=' + newdata.address).then(() => {
    ElMessageBox({
      message: '修改成功',
      type: 'success',
      showClose: true
    })
    emit('update')
  }).catch(() => {
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
