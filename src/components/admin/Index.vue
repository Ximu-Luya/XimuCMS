<template>
    <div>
        <user-info></user-info>
    </div>
</template>

<script>
import userInfo from './components/Userinfo'
export default {
    name: 'AdminIndex',
    data(){
        return {
            
        }
    },
    components: {
        userInfo
    }
}
</script>

<style lang="scss" scoped>

</style>