# MICON
### 图标插件

mIcon 是个开源图标选择插件。插件采用[remixicon](https://remixicon.com)开源图标库。可免费用于个人项目和商业项目，Enjoy it~


## 使用说明

### 基本用法

仓库地址
[https://github.com/mifan007/vue2-m-icon.git](https://github.com/mifan007/vue2-m-icon.git)


![图破了，Sakyamuni](./demo.jpg)


#### 安装引入

> **Note:** 

npm安装
```
npm install vue2-m-icon --save
```
> 入口文件引入 CSS
```
import 'vue2-m-icon/dist/mIcon.css'
```
```
Vue.use(micon)
```

#### 使用

```vue

<template>
    <m-icon @onChoose="choose" @onCopy="copy" language="cn"></m-icon>
</template>
```
### PROPS

属性名|说明|类型|可选项|默认值
-|-|-|-|-
language|语言类型|string|cn、en|cn

### 方法事件

事件名|说明|类型|返回值
-|-|-|-
onChoose|选择图标|string|'ri-file-copy-2-fill'
onCopy|复制图标|string|'<i class="ri-arrow-down-circle-fill 2"></i>'

