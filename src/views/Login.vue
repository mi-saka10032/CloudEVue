<template>
  <div class="meteor-container">
    <Meteor/>
    <el-form :rules="rules"
             ref="form"
             :model="loginForm"
             class="loginContainer">
      <h3 class="loginTitle">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text"
                  auto-complete="false"
                  v-model="loginForm.username"
                  placeholder="请输入用户名">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  auto-complete="false"
                  v-model="loginForm.password"
                  placeholder="请输入密码">
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input type="text"
                  auto-complete="false"
                  v-model="loginForm.code"
                  placeholder="点击图片更换验证码"
                  style="width: 220px; margin-right: 5px">
        </el-input>
        <img :src="captureUrl"
             alt="verify"
             class="verify"
             @click="changeVerify"/>
        <el-button type="primary"
                   class="login-button"
                   @click="submitForm('form')">登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Meteor from "@/components/Meteor";

export default {
  name: "Login",
  components: {
    Meteor
  },
  data() {
    return {
      captureUrl: `${this.$BASE}/captcha?time=${new Date().getTime()}`,
      loginForm: {
        username: '',
        password: '',
        code: ''
      },
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        code: [{required: true, message: '请输入验证码', trigger: 'blur'}]
      }
    }
  },
  methods: {
    changeVerify() {
      this.captureUrl = `${this.$BASE}/captcha?time=${new Date().getTime()}`;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loadingInstance = this.isLoading(document.querySelector(".el-container"), '正在登录');
          this.$postRequest('/login', this.loginForm).then(value => {
            this.loadingInstance.close();
            window.sessionStorage.setItem('cloudetoken', value.obj.token);
            this.$router.replace('/home');
          }).catch(error => {
            this.loadingInstance.close();
            console.log(error);
          })
        } else {
          this.$uiMessage.error('请输入所有字段！');
          return false;
        }
      });
    },
  }
}
</script>

<style lang="less" scoped>
.meteor-container {
  width: 100vw;
  height: 100vh;
  background-color: var(--background-color);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat', sans-serif, Arial, 'Microsoft Yahei';
}

.loginContainer {
  position: relative;
  z-index: 1;
  border-radius: 15px;
  background-clip: padding-box;
  margin: 188px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  .loginTitle {
    margin: 0 auto 40px auto;
    text-align: center;
  }

  .verify {
    vertical-align: bottom;
  }

  .login-button {
    text-align: center;
    margin: 15px 0 0 0;
    width: 100%;
  }
}
</style>