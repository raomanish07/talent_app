<template>
  <li class="talent">
    <h3>{{ fullName }}</h3>
    <h4>Exp: {{ exp }} Year</h4>
    <div>
      <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
    </div>
    <div class="actions">
      <base-button mode="outline" link :to="talentContactLink">Contact</base-button>
      <base-button link :to="talentDetailsLink">View Details</base-button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'firstName', 'lastName', 'exp', 'areas'],
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    talentContactLink() {
      return this.$route.path + '/' + this.id + '/contact'; // /talents/c1/contact
    },
    talentDetailsLink() {
      return this.$route.path + '/' + this.id; // /talents/c1
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
.talent{
background-color: rgb(253, 245, 230, 0.5);
}
</style>