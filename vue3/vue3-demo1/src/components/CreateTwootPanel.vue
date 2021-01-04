<template>
    <form class="create-twoot-panel" @submit.prevent="createNewTwoot" :class="{'--exceeded' : newTwootCharacterCount > 180}">
        <label for="newTwoot"><strong>New Twoot</strong> ( {{newTwootCharacterCount}}/180)</label> 
        <textarea id="newTwoot" rows="4" v-model="state.newTwootContent" />

        <div class="create-twoot-panel-submit">
            <div class="create-twoot-type">
                <label for="newTwootType"><strong>Type:</strong></label>
                <select id="newTwootTyple" v-model="state.selectedTwootType">
                <option :value="option.value" v-for="(option, index) in state.twootTypes" :key="index">
                    {{ option.name }}
                </option>
                </select>
            </div>

            <button>
                Twoot It!
            </button>
        </div>

    </form>
</template>

<script>
import { computed, reactive } from 'vue'
    export default {
        name: "CreateTwootPanel",
        // 这里的ctx应该就是当前组件所属于的page view
        // 这里的props是从page view的template中的元素传递过来的属性值
        setup(props, ctx){
            // state是该组件自己拥有的值，和从page view传递过来的props不一样
            const state = reactive({
                newTwootContent: '',
                selectedTwootType: 'instant',
                twootTypes: [
                    { value: 'draft', name: 'Draft'},
                    { value: 'instant', name: 'Instant Twoot'}
                ]
                // 这里存放初始化页面时的数据
            })
            
            // 用computed function来替代原来的computed field
            const newTwootCharacterCount = computed(() => state.newTwootContent.length)

            // 用普通的javascript函数来代替之间存放方法的method field
            function createNewTwoot() {
                if( state.newTwootContent && state.selectedTwootType !== 'draft'){
                    ctx.emit('add-twoot', state.newTwootContent);
                    // 第二个参数是第一个参数add-twoot函数的参数
                    // 这个emit是否就相当于dispatch一个函数
                    // 但是函数的执行是在该组件所在当前页面（也就是views文件夹中的某一个上）执行的
                    state.newTwootContent = '';
                }
            }
            // setup函数返回的结果要包括state/computed state/methods
            return {
                state, newTwootCharacterCount, createNewTwoot
            }
        }
    }
</script>

<style lang="scss" scoped>
.create-twoot-panel {
    margin-top: 20%;
    padding: 2% 0;
    display: flex;
    flex-direction: column;

    textarea {
        border: 1px solid #DFE3E8;
        border-radius: 5px;
    }

    .create-twoot-panel-submit{
        display: flex;
        justify-content: space-between;

        .create-twoot-type{
            padding: 2% 0;
        }

        button{
            padding: 1% 2%;
            margin: auto 0;
            border-radius: 5px;
            border: none;
            background-color: deeppink;
            color: white;
            font-weight: 1.5em;
        }
    }

    &.--exceeded {
        color: red;
        border-color: red;
    }

}

</style>