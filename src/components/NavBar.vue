<template>
  <q-header elevated>
    <q-toolbar class="bg-primary">
      <q-toolbar-title class="text-center text-white">
        Paradas Produção
      </q-toolbar-title>
    </q-toolbar>
    <q-tabs
      v-model="tab"
      class="text-white bg-primary"
      dense
      no-caps
      switch-indicator
      align="justify"
    >
      <q-tab
        v-for="tab in tabVisible"
        :key="tab"
        :name="tab.name"
        :icon="tab.icon"
        :label="tab.label"
        @click="tabActive(tab.name)"
      />
    </q-tabs>
  </q-header>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      tabs: [
        { name: "home"          ,icon: "home"         ,label: "Página Inicial"    ,visible: 'all' },
        { name: "registration"  ,icon: "library_add"  ,label: "Novo Registro"     ,visible: 'all' },
        { name: "report"        ,icon: "summarize"    ,label: "Relatório"         ,visible: 'desk' },
        { name: "settings"      ,icon: "settings"     ,label: "Configurações"     ,visible: 'none' },
      ]
    }
  },
  computed: {
    tabVisible() {
      let isMobile = this.$q.screen.xs
      let tabs = []

      if(isMobile) {
        this.tabs.forEach(el => {
          if(el.visible === 'all') {
            tabs.push(el)
          }
        })
      } else {
        this.tabs.forEach(el => {
          if(el.visible === 'all' || el.visible === 'desk') {
            tabs.push(el)
          }
        })
      }

      return tabs;
    }
  },
  methods: {
    tabActive(tab) {
      this.$router.push({ path: tab });
    }
  },
}
</script>
