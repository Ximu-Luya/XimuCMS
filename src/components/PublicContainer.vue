<template>
    <div id="public-container">
        <xm-header></xm-header>
        <router-view></router-view>
        <xm-footer></xm-footer>
    </div>
</template>

<script>
import xmHeader from "./public/common/Header.vue";
import xmFooter from "./public/common/Footer.vue";

export default {
    name: "PublicContainer",
    components: {
        xmHeader,
        xmFooter,
    }
}
</script>