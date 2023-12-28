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
    payoffID: formRules('must'),
    type: formRules('must'),
    name: formRules('must'),
    date: formRules('must'),
    ranks: formRules('must')
  },
  formData: {
    payoffID: '',
    type: '',
    name: '',
    date: '',
    ranks: ''
  },
  formItem: [
    {
      label: '科研成果ID',
      type: 'number',
      value: 'payoffID',
      width: 24
    },
    {
      label: '成果种类',
      type: 'select',
      value: 'type',
      width: 24,
      children: [
        {
          label: '论文',
          value: '论文'
        },
        {
          label: '软件著作权',
          value: '软件著作权'
        },
        {
          label: '发明专利',
          value: '发明专利'
        },
        {
          label: '实用新型专利',
          value: '实用新型专利'
        },
        {
          label: '外观专利',
          value: '外观专利'
        }
      ]
    },
    {
      label: '成果名',
      type: 'text',
      value: 'name',
      width: 24
    },
    {
      label: '取得时间',
      type: 'date',
      value: 'date',
      width: 24
    },
    {
      label: '排名',
      type: 'number',
      value: 'ranks',
      width: 24
    }
  ]
})
const formRef = ref(null)

function open(data) {
  state.formData = {}
  if (data) {
    state.title = '编辑成果'
    state.formData = data
  } else {
    state.title = '新增成果'
  }
  state.dialogVisible = true
}

const edit = (data) => {}
// 确定
const confirm = () => {
  formRef.value.submitForm()
  if (state.title === '新增成果') {
    handleAddSubmit()
  } else {
    handleEditSubmit()
  }
}

const handleAddSubmit = () => {
  const newdata = state.formData
  $api.post('/payoff/add?id=' + newdata.payoffID + '&name=' + newdata.name + '&type=' + newdata.type + '&date=' + newdata.date + '&ranks=' + newdata.ranks).then(() => {
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
  $api.put('/payoff/update?id=' + newdata.payoffID + '&name=' + newdata.name + '&type=' + newdata.type + '&date=' + newdata.date + '&ranks=' + newdata.ranks).then(() => {
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
