<template>
  <el-container>
    <el-header class="e-header">
      <div class="e-title">
        <img class="e-logo" src="../assets/image/cloudelogo.png" alt="云E办">
        <span class="e-logo-name">云E办</span>
      </div>
      <div>
        <el-button type="text"
                   icon="el-icon-bell"
                   size="normal"
                   style="color: red; margin-right: 20px"
                   @click="goChat"
        />
        <el-dropdown
            class="e-header-dropdown"
            @command="handleCommand"
            trigger="click">
        <span class="el-dropdown-link">
            {{ this.userInfo.name }}
            <i class="el-icon--right e-header-img"><img :src="this.userInfo.src" alt=""></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="setting">设置</el-dropdown-item>
            <el-dropdown-item command="logout">注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container class="e-content">
      <el-aside width="200px" class="e-aside">
        <el-menu router>
          <el-submenu v-for="(item,index) in routes"
                      unique-opened
                      :index="index+''"
                      :key="index">
            <template slot="title">
              <i class="el-icon-location" style="color: #1accff"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item v-for="(children,index) in item.children"
                          :key="index"
                          :index="children.path">
              {{ children.name }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="e-main">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="crumb-sep"
                       v-if="this.$router.currentRoute.path !== '/home'">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ this.$router.currentRoute.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div
            v-if="this.$router.currentRoute.path === '/home'"
            class="homeWelcome"
        >
          欢迎来到云E办系统！
        </div>
        <keep-alive include="EmpBasic">
          <router-view/>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {mapState, mapMutations} from "vuex";

export default {
  name: "Home",
  data() {
    return {
      userInfo: {
        name: '',
        src: ''
      }
    }
  },
  computed: {
    ...mapState('routesLists', ['routes'])
  },
  methods: {
    ...mapMutations('routesLists', ['initRoutes']),
    ...mapMutations('chatting', ['emitHeader']),
    //获取用户头像和名称等信息，通过向服务器解析token返回数据后获得
    getUserInfo() {
      this.$getRequest('/userinfo').then(value => {
        const {name, userFace} = value;
        this.userInfo = {name, src: userFace};
        this.emitHeader(this.userInfo);
      }).catch(error => {
        console.log(error);
      });
    },
    //退出登录指令
    handleCommand(command) {
      if (command === 'logout') {
        this.$uiMessageBox.confirm('退出登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'waring'
        }).then(() => {
          window.sessionStorage.removeItem('cloudetoken');
          this.$router.replace('/');
          this.$uiMessage.success('退出成功');
        }).catch(() => {
          this.$uiMessage.info('操作已取消');
        });
      }
    },
    //开启聊天窗
    goChat() {
      this.$router.push('/chat');
    }
  },
  mounted() {
    this.getUserInfo();

  },
  beforeDestroy() {
    this.initRoutes([]);
  }
}
</script>

<style lang="less" scoped>
.e-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 25px;
  background-color: skyblue;

  .e-title {
    width: 200px;
    height: 100%;
    font-size: 30px;
    color: aliceblue;

    .e-logo {
      width: 35%;
      height: 100%;
      vertical-align: middle;
    }

    .e-logo-name {
      margin-left: 10px;
      color: transparent;
      background-color : blue;
      text-shadow : rgba(255,255,255,0.5) 0 5px 6px, rgba(255,255,255,0.2) 1px 3px 3px;
      -webkit-background-clip : text;
    }
  }

  .e-header-dropdown {
    .el-dropdown-link {
      cursor: pointer;
      color: #fff;
    }

    .el-icon-arrow-down {
      font-size: 12px;
    }

    .el-dropdown-link {
      display: flex;
      align-items: center;
      font-size: 16px;

      .e-header-img {
        margin-left: 20px;
        width: 50px;
        height: 50px;
        overflow: hidden;
        border-radius: 50%;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

@keyframes masked-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}

.e-content {
  .e-main {
    .homeWelcome {
      width: 1000px;
      height: 200px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-30%,-50%);
      background-image: -webkit-linear-gradient(left, blue, #66ffff 10%, #cc00ff 20%, #CC00CC 30%, #CCCCFF 40%, #00FFFF 50%, #CCCCFF 60%, #CC00CC 70%, #CC00FF 80%, #66FFFF 90%, blue 100%);
      -webkit-text-fill-color: transparent; /* 将字体设置成透明色 */
      -webkit-background-clip: text; /* 裁剪背景图，使文字作为裁剪区域向外裁剪 */
      -webkit-background-size: 200% 100%;
      -webkit-animation: masked-animation 4s linear infinite;
      font-size: 80px;
      -webkit-user-select: none;
    }
  }

  .crumb-sep {
    margin-bottom: 25px;
  }
}
</style>