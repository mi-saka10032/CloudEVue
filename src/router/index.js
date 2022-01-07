import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Home from "@/views/Home";
import FriendChat from "@/views/chat/FriendChat";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        hidden: true
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/chat',
                name: '在线聊天',
                component: FriendChat
            }
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

//对push类编程式路由重复点击的触发的异常进行捕捉
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

export default router