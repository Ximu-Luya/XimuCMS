<template>
    <div id="public-container">
        <xm-header></xm-header>
        <xm-sidebar></xm-sidebar>
        <router-view></router-view>
    </div>
</template>

<script>
import xmHeader from "./admin/common/Header.vue";
import xmSidebar from "./admin/common/Sidebar.vue";

export default {
    name: "AdminContainer",
    components: {
        xmHeader,
        xmSidebar
    }
}
</script>