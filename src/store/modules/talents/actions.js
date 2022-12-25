export default {
  async registerTalent(context, data) {
    const userId = context.rootGetters.userId;
    const talentData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      exp: data.exp,
      areas: data.areas
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://resource-app-11704-default-rtdb.firebaseio.com/talents/${userId}.json?auth=` +
        token,
      {
        method: 'PUT',
        body: JSON.stringify(talentData)
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // error ...
    }

    context.commit('registerTalent', {
      ...talentData,
      id: userId
    });
  },
  async loadTalents(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(
      `https://resource-app-11704-default-rtdb.firebaseio.com/talents.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const talents = [];

    for (const key in responseData) {
      const talent = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        exp: responseData[key].exp,
        areas: responseData[key].areas
      };
      talents.push(talent);
    }

    context.commit('setTalents', talents);
    context.commit('setFetchTimestamp');
  }
};
