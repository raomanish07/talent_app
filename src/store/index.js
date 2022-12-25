import { createStore } from 'vuex';

import talentsModule from './modules/talents/index.js';
import requestsModule from './modules/requests/index.js';
import authModule from './modules/auth/index.js';

const store = createStore({
  modules: {
    talents: talentsModule,
    requests: requestsModule,
    auth: authModule
  }
});

export default store;