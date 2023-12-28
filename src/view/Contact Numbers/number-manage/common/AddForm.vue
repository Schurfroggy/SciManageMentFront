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
import { ElMessageBox } from 'element-plus'

const state = reactive({
  dialogVisible: false,
  title: '',
  rules: {
  },
  formData: {
  },
  formItem: [

  ]
})
const formRef = ref(null)

function open(data) {
  /* state.formData = {}
  if (data) {
    state.title = '编辑委托方'
    state.formData = data
  } else {
    state.title = '新增委托方'
  }
  state.dialogVisible = true */
  if (data) {
    ElMessageBox({
      message: '联系人暂时不可编辑',
      type: 'error',
      showClose: true
    })
  } else {
    ElMessageBox({
      message: '暂时无法添加更多联系人',
      type: 'error',
      showClose: true
    })
  }
}

const edit = (data) => {}
// 确定
/* const confirm = () => {
  formRef.value.submitForm()
  if (state.title === '新增委托方') {
    handleAddSubmit()
  } else {
    handleEditSubmit()
  }
} */

const submitForm = (data) => {
  state.formData = data
}
const cancel = () => {
  state.dialogVisible = false
}

defineExpose({ open, edit })
</script>
