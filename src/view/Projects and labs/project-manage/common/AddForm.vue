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
    sciProjectID: formRules('must'),
    name: formRules('must'),
    content: formRules('must'),
    startDate: formRules('must'),
    endDate: formRules('must'),
    headName: formRules('must'),
    clientID: formRules('must'),
    testingID: formRules('must'),
    fund: formRules('must')
  },
  formData: {
    sciProjectID: '',
    name: '',
    content: '',
    startDate: '',
    endDate: '',
    headName: '',
    clientID: '',
    testingID: '',
    fund: ''
  },
  formItem: [
    {
      label: '项目ID',
      type: 'number',
      value: 'sciProjectID',
      width: 24
    },
    {
      label: '项目名',
      type: 'text',
      value: 'name',
      width: 24
    },

    {
      label: '项目内容',
      type: 'textarea',
      value: 'content',
      width: 24
    },
    {
      label: '项目开始时间',
      type: 'date',
      value: 'startDate',
      width: 24
    },
    {
      label: '项目结束时间',
      type: 'date',
      value: 'endDate',
      width: 24
    },
    {
      label: '项目负责人',
      type: 'text',
      value: 'headName',
      width: 24
    },
    {
      label: '委托方ID',
      type: 'number',
      value: 'clientID',
      width: 24
    },
    {
      label: '监测方ID',
      type: 'number',
      value: 'testingID',
      width: 24
    },
    {
      label: '项目资金(元)',
      type: 'text',
      value: 'fund',
      width: 24
    }
  ]
})
const formRef = ref(null)

function open(data) {
  state.formData = {}
  if (data) {
    state.title = '编辑科研项目'
    state.formData = data
  } else {
    state.title = '新增科研项目'
  }
  state.dialogVisible = true
}

const edit = (data) => {}
// 确定
const confirm = () => {
  formRef.value.submitForm()
  if (state.title === '新增科研项目') {
    handleAddSubmit()
  } else {
    handleEditSubmit()
  }
}

const handleAddSubmit = () => {
  const newdata = state.formData
  $api.post('/sci_project/add?sci_project_id=' + newdata.clientID + '&name=' + newdata.name + '&content=' + newdata.content + '&start_date=' + newdata.startDate + '&end_date=' + newdata.endDate + '&head_name=' + newdata.headName + '&client_id=' + newdata.clientID + '&testing_id=' + newdata.testingID + '&fund=' + newdata.fund).then((res) => {
    if (res.success === false) {
      ElMessageBox({
        message: '新增失败: ' + res.msg,
        type: 'error',
        showClose: true
      })
    } else {
      ElMessageBox({
        message: '新增成功',
        type: 'success',
        showClose: true
      })
      emit('update')
    }
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
  $api.put('/sci_project/update?sci_project_id=' + newdata.clientID + '&name=' + newdata.name + '&content=' + newdata.content + '&start_date=' + newdata.startDate + '&end_date=' + newdata.endDate + '&head_name=' + newdata.headName + '&client_id=' + newdata.clientID + '&testing_id=' + newdata.testingID + '&fund=' + newdata.fund).then((res) => {
    if (res.success === false) {
      ElMessageBox({
        message: '修改失败: ' + res.msg,
        type: 'error',
        showClose: true
      })
    } else {
      ElMessageBox({
        message: '修改成功',
        type: 'success',
        showClose: true
      })
      emit('update')
    }
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
