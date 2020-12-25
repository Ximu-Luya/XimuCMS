<template>
    <div class="header">
        <router-link id="logo" to="/public/index">
            <img style="color: #fff; margin: 0 10px" :src="Logo" />
            云计算与高性能计算团队
        </router-link>

        <div id="topNav">
            <router-link to="/public/index">首页</router-link>
            <router-link to="/public/achievement">团队成果</router-link>
            <router-link to="/public/blog">博客</router-link>
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
    computed: {
        path(){
            return this.$route.path;
        },
    },
    watch: {
        "$route": "pathChange",
    },
    mounted(){
        const _this = this;
        _this.pathChange();
    },
    methods: {
        pathChange(){
            const _this = this;
            console.log(_this.path)
            if(_this.path === '/public/index') {
                document.getElementsByClassName("header")[0].style = "position: fixed;";
                document.getElementsByClassName("header")[0].setAttribute("id", "");
                window.addEventListener('scroll', _this.setHeaderAttribute);
            }
            else{
                window.removeEventListener('scroll', _this.setHeaderAttribute);
                document.getElementsByClassName("header")[0].style = "";
                document.getElementsByClassName("header")[0].setAttribute("id", "notTop");
            }
        },
        setHeaderAttribute(){
            let scrollTop = window.pageYOffset;
            if (this.path === '/public/index'){
                if(scrollTop !== 0) document.getElementsByClassName("header")[0].setAttribute("id", "notTop");
                else document.getElementsByClassName("header")[0].setAttribute("id", "");
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    padding: 20px 13%;
    display: flex;
    justify-content: space-between;
    transition: 0.7s all;
    z-index: 100;
    font-size: 1.5rem;
    height: 90px;

    #logo {
        width: 520px;
        font-size: 1.75rem;
        display: flex;
        align-items: center;
        transition: inherit;
        img {
            width: 50px;
            transition: inherit;
        }
    }

    #topNav {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    a {
        color: #fff;
        font-weight: 500;
        padding: 0 30px;
    }
}
#notTop {
    box-shadow: 0px 0px 2px #333333;
    background-color: #535353;
    padding: 20px 15%;
    font-size: 1.25rem;
    height: 80px;

    #logo {
        font-size: 1.5rem;
        img {
            width: 40px;
        }
    }

    a {
        color: #fff;
        font-weight: 500;
        // font-size: 1.5rem;
        padding: 0 30px;
    }
}
</style>