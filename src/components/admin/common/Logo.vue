<template>
    <div id="logo-container" :class="{'collapse':collapse}">
        <transition name="sidebarLogoFade">
            <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
                <img v-if="logo" :src="logo" class="sidebar-logo" />
            </router-link>
            <router-link v-else key="expand" class="sidebar-logo-link" to="/">
                <img v-if="logo" :src="logo" class="sidebar-logo" />
                <h1 class="sidebar-title">{{title}}</h1>
            </router-link>
        </transition>
    </div>
</template>

<script>
import logoImg from '@/assets/img/logo.svg';
export default {
    name: 'logo',
    props: {
        collapse: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            title: '西木CMS',
            logo: logoImg
        };
    }
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
    transition: all 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
    opacity: 0;
}

#logo-container{
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #2b2f3a;
    text-align: center;
    overflow: hidden;
    transition: all 0.3s ease-in-out;

    .sidebar-logo-link {
        height: 100%;
        width: 100%;

        .sidebar-logo {
            width: 28px;
            height: 28px;
            vertical-align: middle;
        }

        .sidebar-title {
            display: inline-block;
            padding: 0 12px;
            margin: 0;
            color: #fff;
            font-weight: 600;
            line-height: 50px;
            font-size: 14px;
            font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
            vertical-align: middle;
        }
    }

    &.collapse {
        .sidebar-logo {
            margin-right: 0px;
        }
    }
}
</style>