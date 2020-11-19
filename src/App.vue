<template>
    <div id="app">
        <xm-header></xm-header>
        <router-view></router-view>
        <!-- <div id="content">
        </div> -->
        <xm-footer></xm-footer>
    </div>
</template>

<script>
import xmHeader from "./components/common/Header.vue";
import xmFooter from "./components/common/Footer.vue";

export default {
    name: "App",
    components: {
        xmHeader,
        xmFooter,
    },
};
</script>

<style lang="scss">
@import "./assets/css/main.scss"; //引入主要预置样式的修改
</style>
