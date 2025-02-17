import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'list-questions',
        component: () => import('../views/ListQuestionsView.vue')
    },
    {
        path: '/random-list/',
        name: 'random-list',
        component: () => import('../views/RandomListQuestionsView.vue'),
        props: true
    },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router