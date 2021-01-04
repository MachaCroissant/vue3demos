<template>
    <div class="user-profile">
        <div class="user-profile-side-bar">
            <div class="user-profile-user-panel">
                <h1 class="user-profile-username">@{{state.user.username}}</h1>
                <div class="user-profile-admin-badge" v-if="state.user.isAdmin">
                    Admin
                </div>
                <div class="user-profile-follower-count">
                    <strong>Followers:</strong> {{state.followers}}
                </div>
            </div>
            <CreateTwootPanel @add-twoot="addTwoot"/>
        </div>
        <div class="user-profile-twoots-wrapper">
            <TwootItem 
            v-for="twoot in state.user.twoots"
            :key="twoot.id"
            :username="state.user.username"
            :twoot="twoot"
            />
            <!-- 最后两个通过v-bind绑定的属性是作为prop传递给components的，会有验证 -->
        </div>
    </div>
</template>

<script>
    import {reactive, computed} from 'vue';
    import {useRoute} from 'vue-router'
    import {users} from '../assets/users.js';
    import TwootItem from '../components/TwootItem.vue';
    import CreateTwootPanel from '../components/CreateTwootPanel.vue';


    // 个人感觉这个views的每个单页有点类似于react中基于feature的某个slice，每个view page
    // 都会向它的component传递prop，引入component从components field中引用
    // 调用component就在template的html中调用，传递值通过template中给元素属性赋值实现
    // 所有的事件监听的回调函数都定义在view page中
    // 但是事件监听函数在每个component中去定义，并在事件监听函数内部去ctx.emit处于page view中的回调函数
    export default {
        name: "UserProfile",
        components: { CreateTwootPanel, TwootItem},
        setup(){
            // 实现路由
            const route = useRoute();
            const userId = computed(() => route.params.userId)

            // state/methods/computed（这里省略了）部分
            const state = reactive({
                followers: 0,
                user: users[userId.value-1] || users[0]
            })

            function addTwoot(twoot){
                state.user.twoots.unshift({id: state.user.twoots.length+1, content: twoot});
            }

            return {state, addTwoot, userId}
            
        }
    }
</script>

<style lang="scss" scoped>
.user-profile {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 10%;
    padding: 50px 5%;

    .user-profile-user-panel{
        display: flex;
        flex-direction: column;
        /* padding: 20px; */
        padding: 1.25em;
        /* 以上这两句是一样的效果，都会在原来盒子的基础上向外扩展 */
        /* 但是如果写20%会把padding向内挤压内容呈现出border-box的效果，这是为什么？有没有可能没有父元素样式所以吧当前元素当作基准了 */
        background-color: white;
        border-radius: 5px;
        border: 1px solid #DFE3E8;
        margin-bottom: auto;
    }

    h1{
        margin: 0;
    }

    .user-profile-admin-badge{
        background: rebeccapurple;
        color: white;
        border-radius: 5px;
        margin-right: auto;
        padding: 0 10px;
        font-weight: bold;
    }

    .user-profile-twoots-wrapper{
        display: grid;
        grid-gap: 5%;
        margin-bottom: auto;
    }
}
</style>