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
    testingID: formRules('must'),
    name: formRules('must'),
    address: formRules('must'),
    headID: formRules('must'),
    linkID: formRules('must')
  },
  formData: {
    testingID: '',
    name: '',
    address: '',
    headID: ''
  },
  formItem: [
    {
      label: '监测方ID',
      type: 'number',
      value: 'testingID',
      width: 24
    },
    {
      label: '合作方名称',
      type: 'text',
      value: 'name',
      width: 24
    },
    {
      label: '地址',
      type: 'textarea',
      value: 'address',
      width: 24
    },
    {
      label: '负责人ID',
      type: 'number',
      value: 'headID',
      width: 24
    },
    {
      label: '联系人ID(如果要输入多个，用英文逗号隔开)',
      type: 'text',
      value: 'linkID',
      width: 24
    }
  ]
})
const formRef = ref(null)

function open(data) {
  state.formData = {}
  if (data) {
    state.title = '编辑监测方'
    state.formData = data
  } else {
    state.title = '新增监测方'
  }
  state.dialogVisible = true
}

const edit = (data) => {}
// 确定
const confirm = () => {
  formRef.value.submitForm()
  if (state.title === '新增监测方') {
    handleAddSubmit()
  } else {
    handleEditSubmit()
  }
}

const handleAddSubmit = () => {
  const newdata = state.formData
  $api.post('/testing/add?id=' + newdata.testingID + '&name=' + newdata.name + '&address=' + newdata.address + '&head_id=' + newdata.headID + '&links=' + newdata.linkID).then(() => {
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
  $api.put('/testing/update?id=' + newdata.testingID + '&name=' + newdata.name + '&address=' + newdata.address + '&head_id=' + newdata.headID + '&links=' + newdata.linkID).then(() => {
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
