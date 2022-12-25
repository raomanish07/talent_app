export default {
  async contactTalent(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message
    };
    const response = await fetch(
      `https://resource-app-11704-default-rtdb.firebaseio.com/requests/${payload.talentId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest)
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to send request.'
      );
      throw error;
    }

    newRequest.id = responseData.name;
    newRequest.talentId = payload.talentId;

    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context) {
    const talentId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://resource-app-11704-default-rtdb.firebaseio.com/requests/${talentId}.json?auth=` +
        token
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch requests.'
      );
      throw error;
    }

    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        talentId: talentId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      };
      requests.push(request);
    }

    context.commit('setRequests', requests);
  }
};
