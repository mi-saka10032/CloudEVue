import {getRequest} from "./api";

export const initMenu = (router,store) => {
    //如果state中routes长度大于0说明已经加载完成，无需二次加载
    if (store.state.routesLists.routes.length > 0) {
        return;
    }
    getRequest('/system/config/menu').then(data => {
        if (data) {
            //格式化router
            let fmtRoutes = formatRoutes(data);
            //添加新路由数组到router
            router.addRoutes(fmtRoutes);
            //数据存入vuex
            store.commit('routesLists/initRoutes', fmtRoutes);
        }
    })
}

export const formatRoutes = (routes) => {
    let fmtRoutes = [];
    routes.forEach(router => {
        let {
            path,
            component,
            name,
            iconCls,
            children
        } = router;
        if (children && children instanceof Array) {
            //递归
            children = formatRoutes(children);
        }
        let fmRouter = {
            path,
            name,
            iconCls,
            children,
            component: () => {
                const start = component.slice(0, 3);
                switch (start) {
                    case 'Hom': {
                        return import('@/views/' + component);
                    }
                    case 'Emp': {
                        return import('@/views/emp/' + component);
                    }
                    case 'Per': {
                        return import('@/views/per/' + component);
                    }
                    case 'Sal': {
                        return import('@/views/sal/' + component);
                    }
                    case 'Sta': {
                        return import('@/views/sta/' + component);
                    }
                    case 'Sys': {
                        return import('@/views/sys/' + component + '.vue');
                    }
                }
            }
        }
        fmtRoutes.push(fmRouter);
    });
    return fmtRoutes;
};