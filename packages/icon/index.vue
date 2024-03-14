<template>
    <div class="m-icon" :style="{ width: comWidth }">
        <div class="view-box">
            <div class="choose-icon fcc">
                <i v-if="icon" :class="icon"></i>
                <span v-else style="font-size: 14px;color:#cccccc;">icon</span>
            </div>
            <div v-if="isCopy" class="copy-code">
                <input type="text" class="code fcc" :value="html" :placeholder="placeholder">
                <i v-if="icon" class="del ri-close-circle-line" @click.stop="clearHandler"></i>
                <i class="copy ri-file-copy-2-fill" @click="copyHandler"></i>
            </div>
            <i class="search ri-search-eye-line fcc" @click="choose" :title="language === 'cn' ? '选择':'Choose'"></i>
        </div>
        <div v-if="chooseState" class="choose-box">
            <div class="tab" :style="{ width: tabWidth }">
                <ul>
                    <li v-for="(item, index) in icons" :key="index" @click="changeTabHandler(index)"
                        :class="{ active: activeIndex == index }">{{ language === 'cn' ? item.cn : item.en }}</li>
                </ul>
            </div>
            <div class="icons" id="icons">
                <ul>
                    <li v-for="(item, index) in icons[activeIndex].data" :key="index" @click="choseIconHandler(index)"
                        :class="{ active: activeIcon == index }">
                        <i :class="`ri-${item}`"></i>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script>
import iconsJson from './icons'
import './remixicon.css'

export default {
    name: 'MIcon',
    props: {
        isCopy: {
            type: Boolean,
            default: true
        },
        language: {
            type: String,
            default: 'cn'
        }
    },
    data() {
        return {
            activeIndex: 0,
            activeIcon: null,
            icons: iconsJson,
            icon: null,
            chooseState: false,
            html: null
        }
    },
    computed: {
        comWidth() {
            return this.isCopy ? '480px': '110px'
        },
        tabWidth() {
            return this.language === 'cn' ? '65px' : '135px'
        },
        placeholder() {
            return this.language === 'cn' ? '点击右侧查询按钮选择ICON' : 'Click right search button to choose icon'
        }
    },
    methods: {
        choose() {
            this.chooseState = !this.chooseState
        },
        changeTabHandler(index) {
            this.activeIndex = index
            this.activeIcon = null
            this.$nextTick(() => {
                const el = document.getElementById('icons')
                el.scrollTop = 0
            })
        },
        choseIconHandler(index) {
            this.activeIcon = index
            this.icon = `ri-${this.icons[this.activeIndex].data[index]}`
            this.html = `<i class="ri-${this.icons[this.activeIndex].data[index]}"></i>`
            this.chooseState = false
            this.$emit('onChoose', this.icon)
        },
        clearHandler(){
            this.chooseState = false
            this.icon = ''
            this.html = ''
            this.activeIndex = 0
            this.activeIcon = null
            this.$emit('onChoose', this.icon)
        },
        copyHandler() {
            if (!this.html) {
                // 值为空的时候，给出提示。可根据项目UI仔细设计
                console.log('无复制内容')
                return
            }
            // 动态创建 textarea 标签
            const textarea = document.createElement('textarea')
            // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
            textarea.readOnly = 'readonly'
            textarea.style.position = 'absolute'
            textarea.style.left = '-9999px'
            // 将要 copy 的值赋给 textarea 标签的 value 属性
            textarea.value = this.html
            // 将 textarea 插入到 body 中
            document.body.appendChild(textarea)
            // 选中值并复制
            textarea.select()
            console.log(document);
            const result = document.execCommand('Copy')
            if (result) {
                this.$emit('onCopy')
            }
            document.body.removeChild(textarea)
        }
    }
}
</script>

<style scoped>
ul,
li {
    list-style: none;
    margin: 0;
    padding: 0;
}

.fcc {
    display: flex;
    justify-content: center;
    align-items: center;
}

.m-icon {
    position: relative;
}

.view-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.choose-icon {
    width: 50px;
    height: 50px;
    padding: 3px;
    background: #f1f1f1;
    box-sizing: border-box;
    border: 1px solid #e2e2e2;
    border-radius: 3px;
    font-size: 36px;
    color: #b80000;
}

.copy-code {
    position: relative;
    margin: 0 10px;
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f1f1f1;
    box-sizing: border-box;
    border: 1px solid #e2e2e2;
    border-radius: 3px;
}

.code {
    flex: 1;
    height: 50px;
    line-height: 100%;
    font-size: 16px;
    background: #FFFFFF;
    border: none;
    outline: none;
}

.del{
    position: absolute;
    font-size: 16px;
    top: 17px;
    right: 60px;
    z-index: 99;
    color: #d2d2d2;
    cursor: pointer;
}

.copy {
    width: 50px;
    color: #0053b8;
    cursor: pointer;
}

.search {
    width: 50px;
    height: 50px;
    color: #0053b8;
    background: #FFFFFF;
    box-sizing: border-box;
    border: 1px solid #e2e2e2;
    border-radius: 3px;
    cursor: pointer;
}

.choose-box {
    position: absolute;
    z-index: 999;
    top: 55px;
    left: 0;
    width: 480px;
    height: 300px;
    border: 1px solid #e2e2e2;
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    font-size: 14px;
    color: #222;
    overflow: hidden;
}

.tab {
    /* width: 135px; */
    height: 100%;
    border-right: 1px solid #e2e2e2;
    scrollbar-width: none;
    /* firefox */
    -ms-overflow-style: none;
    /* IE 10+ */
    overflow-y: auto;
}

.tab::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
}

.tab ul {
    display: flex;
    flex-direction: column;
}

.tab ul li {
    line-height: 36px;
    background: #f1f1f1;
    border-bottom: 1px solid #e2e2e2;
    cursor: pointer;
    text-align: right;
    padding: 0 10px;
    box-sizing: border-box;
}

.tab ul li.active {
    background: rgb(0, 122, 198);
    color: #FFFFFF;
}

.icons {
    flex: 1;
    height: 100%;
    scrollbar-width: none;
    /* firefox */
    -ms-overflow-style: none;
    /* IE 10+ */
    overflow-y: auto;
}

.icons::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
}

.icons ul {
    display: flex;
    flex-wrap: wrap;
}

.icons ul li {
    margin: 2px;
    width: 36px;
    height: 36px;
    border: 1px solid #e2e2e2;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    cursor: pointer;
}

.icons ul li.active {
    background: rgb(0, 122, 198);
    color: #FFFFFF;
}

.icons ul li:hover {
    background: rgb(205, 205, 205);
}
</style>