<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域
      ref的应用，表示这个名称就是这个表单的实例对象
       -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <!-- 如果element-ui官方提供的图标不够，可以去阿里图标库下载
          字体图标同css一样 放在assets--fonts--里
             然后同样需要导入import './assets/fonts/icon.css' -->
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-s-custom"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-s-cooperation"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        //   验证用户和密码是否合格
        username: [
          { required: true, message: '请输入账户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
      resetLoginForm () {
        // 该实例对象下，$refs.loginFormRef就是该引用对象
          this.$refs.loginFormRef.resetFields()
      },
      login () {
          this.$refs.loginFormRef.validate(async valid => {
            // 判断这个值是否为false 如果是false直接返回就是不发起请求
            if (!valid) return
            // 如果一个对象返回的promise形式，可以使用async 和 await简化数据 变成data
            // 返回的数据中 只有data数据有用，使用解构赋值出来
            const { data: res } = await this.$http.post('login', this.loginForm)
            // 通过判断meta.status状态码是否登录成功
            if (res.meta.status !== 200) return this.$message.error('登录失败')
            this.$message.success('登录成功')
                // 1.将登录成功之后的token保存到客户端的seeeionStorage中
                //     项目中出了登录之外的其他api借口，必须在登录之后才能访问
                //     token只应在当前网站打开期间生效 所以将token保存在sessionStroage中
                // 2.通过编程式导航跳转到后台主页，路由地址是 /home
            window.sessionStorage.setItem('token', res.data.token)
            this.$router.push('/home')
          })
      }
  }
}
</script>
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    position: relative;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
