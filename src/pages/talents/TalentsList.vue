<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <talent-filter @change-filter="setFilters"></talent-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadTalents(true)">Refresh</base-button>
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">Login to Register as Talent</base-button>
          <base-button v-if="isLoggedIn && !isTalent && !isLoading" link to="/register">Register as Talent</base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasTalents">
          <talent-item
            v-for="talent in filteredTalents"
            :key="talent.id"
            :id="talent.id"
            :first-name="talent.firstName"
            :last-name="talent.lastName"
            :exp="talent.exp"
            :areas="talent.areas"
          ></talent-item>
        </ul>
        <h3 v-else>No talents found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import TalentItem from '../../components/talents/TalentItem.vue';
import TalentFilter from '../../components/talents/TalentFilter.vue';

export default {
  components: {
    TalentItem,
    TalentFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        vue: true,
        react: true,
        node: true,
        muse:true,
      },
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    isTalent() {
      return this.$store.getters['talents/isTalent'];
    },
    filteredTalents() {
      const talents = this.$store.getters['talents/talents'];
      return talents.filter((talent) => {
        if (this.activeFilters.vue && talent.areas.includes('vue')) {
          return true;
        }
        if (this.activeFilters.react && talent.areas.includes('react')) {
          return true;
        }
        if (this.activeFilters.node && talent.areas.includes('node')) {
          return true;
        }
        if (this.activeFilters.muse && talent.areas.includes('muse')) {
          return true;
        }       
        return false;
      });
    },
    hasTalents() {
      return !this.isLoading && this.$store.getters['talents/hasTalents'];
    },
  },
  created() {
    this.loadTalents();
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadTalents(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('talents/loadTalents', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>