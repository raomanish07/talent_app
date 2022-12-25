<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>Exp: {{ exp }} Year</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedTalent: null,
    };
  },
  computed: {
    fullName() {
      return this.selectedTalent.firstName + ' ' + this.selectedTalent.lastName;
    },
    areas() {
      return this.selectedTalent.areas;
    },
    exp() {
      return this.selectedTalent.exp;
    },
    description() {
      return this.selectedTalent.description;
    },
    contactLink() {
      return this.$route.path + '/' + this.id + '/contact';
    },
  },
  created() {
    this.selectedTalent = this.$store.getters['talents/talents'].find(
      (talent) => talent.id === this.id
    );
  },
};
</script>