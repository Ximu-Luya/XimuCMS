<template>
    <div id="header">
        <router-link id="logo" to="/index">
            <img width="50px" style="color: #fff; margin: 0 10px;" :src="Logo" />
            工作室
        </router-link>

        <div id="topNav">
            <router-link to="">首页</router-link>
            <router-link to="">研究项目</router-link>
            <router-link to="">博客</router-link>
            <router-link to="">联系我们</router-link>
        </div>
    </div>
</template>

<script>
import Logo from "@/assets/img/logo.svg";

export default {
    name: "Header",
    data() {
        return {
            Logo
        };
    },
};
</script>

<style lang="scss" scoped>
#header{
    width: 100%;
    padding: 20px 17%;
    display: flex;
    justify-content: space-between;
    position: fixed;
    // left: 50%;
    // transform: translate(-50%, 0);
    transition: 0.7s all;
    z-index: 100;

    #logo{
        display: flex;
        align-items: center;
    }

    #topNav{
        display: flex;
        align-items: center;
        width: 80%;
        justify-content: flex-end;
    }

    a{
        color: #fff;
        font-weight: 500;
        font-size: 1.5rem;
        padding: 0 30px;
    }
}
.notTop{
    box-shadow: 0px 0px 2px #333333;
    background-color: #535353;
}
</style>