# SciManagementFront

## 1简介

这里是SciManagement的前端代码，采用vue.js，源模板来自gitee上的vite-vue3-template，是一个管理后台系统中前端解决方案，基于 [vue] [element-ui-plus] [vite]实现

## 2功能介绍

```mysql
- 登录 / 注销

- 简单的权限验证 / 多语言切换

- 编码规范

- 实现后端所有控制器功能对接
```

## 3安装

```mysql
// 推荐使用yarn来下载依赖及构建，yarn可以理解为npm的优化版本，如果没有安装要先安装yarn
npm install yarn -g

// 进入项目目录
cd vite-vue3-template

// 安装依赖
yarn install

// 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

// 启动服务
yarn dev

// 不使用yarn则直接使用npm启动即可
npm run dev
```

## 4发布

```mysql
// 构建测试环境
yarn build:stage

// 构建生产环境
yarn build:prod
```

## 5代码风格

本项目的风格指南主要是参照 `vue` 官方的[风格指南](https://v3.cn.vuejs.org/style-guide)。其中大部分规则配置在了[eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)之中，当没有遵循规则的时候会报错，详细内容见[eslint](./eslint.md)章节。

当然也有一些特殊的规范，是不能被 eslint 校验的。需要人为的自己注意，并且来遵循。最主要的就是文件的命名规则，这里来举例说明。

如果使用vscode，可配置保存后自动按照 eslint 规则格式化代码


### 5.1 Component

所有的`Component`文件都是以大写开头 (PascalCase)，这也是官方所[推荐的](https://cn.vuejs.org/v2/style-guide/index.html)。

但除了 `index.vue`。

例子：

- `@/src/components/BackToTop/index.vue`
- `@/src/components/Charts/Line.vue`
- `@/src/view/example/components/Button.vue`

### 5.2 JS文件

所有的`.js`文件都遵循横线连接 (kebab-case)。

例子：

- `@/src/utils/open-window.js`
- `@/src/view/svg-icons/require-icons.js`
- `@/src/components/MarkdownEditor/default-options.js`

### 5.3 View

在`view`文件下，代表路由的`.vue`文件都使用横线连接 (kebab-case)，代表路由的文件夹也是使用同样的规则。

例子：

- `@/src/view/svg-icons/index.vue`
- `@/src/view/svg-icons/require-icons.js`

使用横线连接 (kebab-case)来命名`view`主要是出于以下几个考虑。

- 横线连接 (kebab-case) 也是官方推荐的命名规范之一 [文档](https://cn.vuejs.org/v2/style-guide/index.html)
- `view`下的`.vue`文件代表的是一个路由，所以它需要和`component`进行区分(component 都是大写开头)
- 页面的`url` 也都是横线连接的，比如`https://www.xxx.admin/export-excel`，所以路由对应的`view`应该要保持统一
- 没有大小写敏感问题

### 5.4 ESlint检测

模板工程中配置ESlint检测，将开发环境中的的eslint配置文件设置为.eslintrc.js，或者设置为自动搜索配置。

## 6 目录结构

--public --资源目录，打包后不会被压缩
--src
  --api --平台接口
  --assets --资源目录，打包后会压缩
  --components --组件库
  --hooks --常用hooks
  --icon --icon图标集
  --layout  --布局组件
  --locales  --多语言
  --router  --路由文件
  --stoer --状态管理
  --utils  --常用工具类
  --view  --页面
  --App.vue  --入口页面
  --main.js  --入口方法
  --.env  --项目默认配置
  --.env.*  --对应环境的配置（会覆盖上面的.env配置）

## 7 打包部署

### 7.1 多环境

模板工程是基于Vue CLI 3创建的工程，多环境机制是由vue-cli实现的，在此只做简要说明，具体了解请参见[https://cli.vuejs.org/zh/guide/mode-and-env.html#%E6%A8%A1%E5%BC%8F]

.env.xxx是环境变量文件，如果要多定义一种环境，则增加一个环境变量文件，例如增加一个test环境，则先增加.env.test文件，再在其中增加相应的环境变量，构建test环境，使用命令

```bash
vue-cli-service build --mode test
```

建议将命令定义到package.json中便于以后使用，模板工程已经预置了production和stage的构建命令
使用package中的命令，可以进入项目文件夹后执行以下命令

```bash
// production构建
yarn run build:prod

// stage构建
yarn run build:stage

// 或者test这样构建，package.json需要提前定义"build:test": "vite build --mode test"
yarn run build:test
```

### 7.2 构建与部署

构建后会生成dist文件夹，部署到服务器上时，将dist全部内容部署上去，dist的名称需要根据情况修改。