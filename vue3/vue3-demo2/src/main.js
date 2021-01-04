const data = function data(){
    return {
        title: "Vue3 Tutorial updated3",
        name: "Macha Croissant"
    };
}
const template = `<div><h1>{{title}}</h1>
{{name}}</div>`

const app = Vue.createApp({ data, template });

app.mount(".vue-app");