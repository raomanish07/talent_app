<template>
  <base-card>
    <h2>Find the Talent by Skills</h2>
    <span class="filter-option">
      <input type="checkbox" id="vue" checked @change="setFilter" />
      <label for="vue">Vue</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="react" checked @change="setFilter" />
      <label for="react">React</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="node" checked @change="setFilter" />
      <label for="node">Node</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="muse" checked @change="setFilter" />
      <label for="muse">Muse</label>
    </span>
  </base-card>
</template>

<script>
export default {
  emits: ['change-filter'],
  data() {
    return {
      filters: {
        vue: true,
        react: true,
        node: true,
        muse:true
        
      }
    };
  },
  methods: {
    setFilter(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive
      };
      this.filters = updatedFilters;
      this.$emit('change-filter', updatedFilters);
    }
  }
}
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>