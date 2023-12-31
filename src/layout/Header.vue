<!--
 * @description: 头部组件
 * @author: wcy
 * @date: 2021-11-26
 -->
<template>
  <el-header>
    <BreadCrumb class="header-left" />
    <!-- <HeadMenu /> -->
    <div class="header-right">
      <el-tooltip content="消息">
        <el-badge>
          <el-icon><Bell/></el-icon>
        </el-badge>
      </el-tooltip>
      <el-tooltip :content="state.isFullScreen ? '退出全屏' : '全屏'">
        <el-icon class="head-item"><full-screen @click="handleFullScreen"/></el-icon>
      </el-tooltip>
      <LangChange class="head-item" style="color: #fff;"/>
      <el-dropdown size="medium" @command="handleCommand">
        <div class="user-info head-item">
          <img class="user_avatar" src="@/assets/img/avatar.jpg"/>
          <span class="username">{{ userName }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="user">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-dialog
          v-model="state.dialogVisible"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          title="我的个人信息"
          destroy-on-close
          width="50%">
        <div class="user-profile">
          <img class="avatar" style="width: 50%;" src="@/assets/img/avatar.jpg" alt="我的头像">
          <div>
            <p class="info">UUID：<span class="UUID">{{ usr.UUID }}</span></p>
            <p class="info">昵称：<span class="username">{{ usr.username }}</span></p>
            <p class="info">电话：<span class="phone">{{ usr.phone }}</span></p>
          </div>
        </div>
        <template #footer>
			<span class="dialog-footer">
				<el-button type="primary" @click="confirm">确定</el-button>
			</span>
        </template>
      </el-dialog>

    </div>
  </el-header>
</template>

<script setup>
import { getCurrentInstance, reactive } from 'vue'
import { useRouter } from 'vue-router'
import screenfull from 'screenfull'
import { removeAuthed, removeToken } from '@/utils/auth'
import BreadCrumb from '@/components/BreadCrumb/index.vue'
import { useUserStore } from '@/store/modules/user'
import LangChange from '@/components/Tool/LangChange.vue'
import { decode } from 'js-base64'

const { proxy } = getCurrentInstance()
const router = useRouter()
const userStore = useUserStore()
const usr = reactive({
  username: '',
  phone: '',
  UUID: ''
})

const userName = userStore.getUserInfo?.name
const state = reactive({
  isAsideMenu: true,
  isFullScreen: false,
  switchValue: 0
})

function open() {
  const encodedUserInfo = sessionStorage.getItem('jwt')
  if (encodedUserInfo) {
    const decodedUserInfo = JSON.parse(decode(encodedUserInfo))
    console.log(decodedUserInfo)

    usr.UUID = decodedUserInfo.UUID
    usr.username = decodedUserInfo.username
    usr.phone = decodedUserInfo.phone
    state.dialogVisible = true
  }
}
function confirm() {
  state.dialogVisible = false
}

// 用户操作
function handleCommand(command) {
  if (command === 'user') {
    open()
  } else {
    proxy.$message.success('退出成功')
    router.replace('/login')
    removeAuthed()
    removeToken()
    sessionStorage.clear()
    localStorage.clear()
  }
}
// 全屏 切换
function handleFullScreen() {
  if (screenfull.isEnabled) {
    state.isFullScreen = !state.isFullScreen
    screenfull.toggle()
  }
}
</script>

<style lang="less" scoped>
.el-header {
  padding: 0 16px 0 0;
  border-bottom: 1px solid @borderColor;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  background-color: @mainColor;
  color: @textActiveColor;
  .header-left {
    flex: 1;
    font-size: 24px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .header-right {
    display: flex;
    align-items: center;
    padding-left: 8px;
    width: auto;
		:deep(.el-badge) {
			sup {
				top: 9px;
				right: 24px;
			}
		}
		.el-icon {
			padding: 8px 3px;
			font-size: 20px;
			cursor: pointer;
			margin: 0 8px;
		}
    .user-info {
      margin: 0 16px;
      width: auto;
      text-align: right;
      color: @textActiveColor;
      cursor: pointer;
      .user_avatar {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
    }
    .user-profile {
      display: flex;
      align-items: center; /* 垂直居中 */
      justify-content: center; /* 水平居中 */
      gap: 20px; /* 图片和数据之间的间距，根据需要调整 */
    }
    .info {
      font-size: 20px;
      margin-bottom: 50px;
      padding: 10px; /* 文本与边框之间的内边距，根据需要调整 */
      border: 1px solid black; /* 边框样式和颜色，根据需要调整 */
      border-radius: 10px; /* 设置边角的圆角大小，根据需要调整 */
    }
    .UUID {
      font-size: 25px;
      color: darkorchid;
    }
    .username {
      font-size: 25px;
      color: dodgerblue;
    }
   .phone {
      font-size: 25px;
      color: grey;
    }
  }
}
</style>
