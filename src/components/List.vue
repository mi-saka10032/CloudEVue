<template>
  <!--  聊天窗左侧，联系人列表-->
  <div id="list">
    <ul>
      <!--通过判断当前聊天用户id来绑定active，使对应元素高亮-->
      <li v-for="item in otherAdmins"
          :key="item.id"
          :class="{ active: item.id === currentSessionId }"
          style="position: relative"
          v-on:click="switchAdmins(item)"><!--   :class="[item.id === currentSessionId ? 'active':'']" -->
        <img class="avatar" :src="item.userFace" :alt="item.name">
        <p class="name">{{ item.name }}</p>
        <i :class="{'msg-tip': item.id === tipId && redDot}"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';

export default {
  name: 'List',
  computed: mapState('chatting', ['otherAdmins', 'currentSessionId','redDot','tipId']),
  //切换聊天用户显示状态
  methods: {
    ...mapMutations('chatting', ['changeCurrentSessionId','eraseRedDot']),
    switchAdmins(item) {
      this.eraseRedDot();
      this.changeCurrentSessionId(item);
    }
  }
}
</script>

<style lang="less" scoped>
#list {
  li {
    padding: 12px 15px;
    border-bottom: 1px solid #292C33;
    cursor: pointer;

    &:hover {
      background-color: rgba(255, 255, 255, 0.03);
    }
  }

  li.active { /*注意这个是.不是冒号:*/
    background-color: rgba(255, 255, 255, 0.1);
  }

  .avatar {
    border-radius: 2px;
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }

  .name {
    display: inline-block;
    margin-left: 15px;
  }

  .msg-tip {
    position: absolute;
    width: 10px;
    height: 10px;
    top: 50%;
    right: 5%;
    transform: translateY(-50%);
    border-radius: 50%;
    background-color: red;
  }
}
</style>
