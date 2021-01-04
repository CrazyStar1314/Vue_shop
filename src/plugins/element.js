import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
// 把这个弹框组件挂在到Vue原型对象上 每一个组件都可以通过$名使用该方法
Vue.prototype.$message = Message
