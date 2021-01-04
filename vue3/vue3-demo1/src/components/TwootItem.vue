<template>
    <div class="twoot-item">
        <div class="user-profile-twoot">
        <div class="twoot-item-user">
            @{{username}}
        </div>
        <div class="twoot-item-content">
            {{twoot.content}}
        </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TwootItem",
        props: {
            // 用一个对象来验证从父亲页面传递过来的参数
            // 由于这些参数需要在这个组件里使用，所以被用在了template中
            // 不用state是因为当前component的state是依赖于父亲组件（也就是page view）的state
            // 因此只需要父亲组件把他自己的state传递过来，到子组件中成为prop中即可，维护起来也比较方便，一个变了另一个也变
            username: {
                type: String,
                required: true
            },
            twoot: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
.twoot-item {
    padding: 2%;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #DFE3E8;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.25s ease;

    &:hover{
        transform: scale(1.1, 1.1);
    }
    .twoot-item-user{
        font-weight: bold;
    }
}


</style>