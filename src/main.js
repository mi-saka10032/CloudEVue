import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store";
import {
    Aside,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Checkbox,
    Col,
    Container,
    DatePicker,
    Dialog,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Form,
    FormItem,
    Header,
    Input,
    Loading,
    Main,
    Menu,
    MenuItem,
    MenuItemGroup,
    Message,
    MessageBox,
    Option,
    Pagination,
    RadioGroup,
    Radio,
    Row,
    Select,
    Submenu,
    Table,
    TableColumn
} from "element-ui";
import {BASE, getRequest, postRequest, putRequest, deleteRequest} from "./utils/api";
import {initMenu} from "./utils/menu";
import mixins from "./utils/mixin";
import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";

Vue.config.productionTip = false

Vue.use(Aside);
Vue.use(Button);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Container);
Vue.use(Checkbox);
Vue.use(Col);
Vue.use(DatePicker);
Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Header);
Vue.use(Input);
Vue.use(Main);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Option);
Vue.use(Pagination);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Row);
Vue.use(Select);
Vue.use(Submenu);
Vue.use(Table);
Vue.use(TableColumn);
Vue.prototype.$uiLoading = Loading;
Vue.prototype.$uiMessage = Message;
Vue.prototype.$uiMessageBox = MessageBox;

Vue.prototype.$BASE = BASE;
Vue.prototype.$getRequest = getRequest;
Vue.prototype.$postRequest = postRequest;
Vue.prototype.$putRequest = putRequest;
Vue.prototype.$deleteRequest = deleteRequest;

//混入
Vue.mixin({
    methods: {
        isLoading: mixins.methods.isLoading
    }
});

//前置路由守卫
router.beforeEach((to, from, next) => {
    if (window.sessionStorage.getItem('cloudetoken')) {
        //清除原本路由，准备添加新路由
        initMenu(router,store);
        //判断路由是否为聊天，是则调用VueSocketIO连接websocket
        if (to.path === '/chat') {
            const sio = new VueSocketIO({
                debug: false,
                connection: SocketIO(BASE)
            })
            Vue.use(sio);
        }
        next();
    } else {
        if (to.path === '/') next();
        else next('/');
    }
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
