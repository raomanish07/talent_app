export default {
  requests(state, _, _2, rootGetters) {
    const talentId = rootGetters.userId;
    return state.requests.filter(req => req.talentId === talentId);
  },
  hasRequests(_, getters) {
    return getters.requests && getters.requests.length > 0;
  }
};