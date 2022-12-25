import { createRouter, createWebHistory } from 'vue-router';

import TalentDetail from './pages/talents/TalentDetail.vue';
import TalentsList from './pages/talents/TalentsList.vue';
import TalentRegistation from './pages/talents/TalentRegistration.vue';
import ContactTalent from './pages/requests/ContactTalent.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/talents' },
    { path: '/talents', component: TalentsList },
    {
      path: '/talents/:id',
      component: TalentDetail,
      props: true,
      children: [
        { path: 'contact', component: ContactTalent } // /talents/c1/contact
      ]
    },
    { path: '/register', component: TalentRegistation, meta: { requiresAuth: true } },
    { path: '/requests', component: RequestsReceived, meta: { requiresAuth: true } },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/talents');
  } else {
    next();
  }
});

export default router;
