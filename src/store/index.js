import Vue from "vue";
import VueX from "vuex";
import routesLists from "@/store/routesLists";
import employeesLists from "@/store/employeesLists";
import chatting from "@/store/chatting";

Vue.use(VueX);

const store = new VueX.Store({
    modules: {
        routesLists,
        employeesLists,
        chatting
    }
})

//开启store监视，将聊天记录实时存储到localStorage
store.watch(state => {
    return state.chatting.sessions;
}, value => {
    window.localStorage.setItem('vue-chat-session', JSON.stringify(value));
},{
    //开启watch监测的判断，因为实际更改的数据在对象的对象之中，需要开启深度监视
    deep: true
});

export default store;