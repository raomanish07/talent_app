import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
      talents: [
        {
          id: 'c1',
          firstName: 'Manish',
          lastName: 'Rao',
          areas: ['vue', 'react', 'node'],
          description:
            "I'm Manish and as a Senior developer in  VDX.TV for years. I love to work on Vue,React and Node JS.",
          exp: 13
        },
        {
          id: 'c2',
          firstName: 'Ashish',
          lastName: 'Kumar',
          areas: ['muse'],
          description:
            'I am Ashish and as a senior developer in VDX.TV company, I can work on muse.',
          exp: 15
        }
      ]
    };
  },
  mutations,
  actions,
  getters
};
