<template>
  <div class="reports">
    <div class="row flex full-width justify-between q-mb-lg">
      <div class="img col-3">
        <q-img
          :src="require('../../assets/LOGOMARCA_CICOPAL.png')"
          class="img-logo"
        />
      </div>
      <div class="title col-6 text-h5 flex justify-center content-center">
        Relatório de Paradas
      </div>
      <div class="filter col-3 flex row justify-end">
        <q-input outlined dense v-model="inputDate" placeholder="Selecione a Data" style="width: 280px" @keypress:enter="getInfos">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date
                  v-model="reportDate"
                  color="primary"
                  text-color="accent"
                  range
                  :locale="ptBR"
                >
                  <div class="row items-center justify-end">
                    <q-btn
                      dense
                      flat
                      v-close-popup
                      label="Confirmar"
                      color="primary"
                      @click="filterDate"
                    />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>

    <div class="table">
      <q-table
        :rows="rowsTable"
        :columns="cols"
        :filter="filterTable"
        :rows-per-page-options="10"
        row-key="id"
        dense
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filterTable" placeholder="Pesquisar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      <template v-slot:top-left>
        <q-btn
          class="q-px-md"
          icon="file_download"
          label="Exportar CSV"
          color="primary"
          outline
          no-caps
          dense
          @click="exportTable(rowsTable)"
        />
      </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import locale from 'quasar/lang/pt-BR'
import numberToDate from '../../helpers/numberToDate'
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      reportDate: null,
      inputDate: null,
      filterTable: null,
      dataTable: null,
      ptBR: locale.date,
      cols: [
        { name: 'empresa'           ,label: 'Empresa'         ,field: 'empresa'      ,align: 'center'     ,sortable: true },
        { name: 'data'              ,label: 'Data Parada'     ,field: 'data'         ,align: 'center'     ,sortable: true },
        { name: 'hrInicio'          ,label: 'Hora Inicial'    ,field: 'hrInicio'     ,align: 'center'     ,sortable: true },
        { name: 'hrFim'             ,label: 'Hora Final'      ,field: 'hrFim'        ,align: 'center'     ,sortable: true },
        { name: 'linha'             ,label: 'Linha'           ,field: 'linha'        ,align: 'center'     ,sortable: true },
        { name: 'supervisor'        ,label: 'Supervisor'      ,field: 'supervisor'   ,align: 'center'     ,sortable: true },
        { name: 'operador'          ,label: 'Operador'        ,field: 'operador'     ,align: 'center'     ,sortable: true },
        { name: 'turno'             ,label: 'Turno'           ,field: 'turno'        ,align: 'center'     ,sortable: true },
        { name: 'tipo'              ,label: 'Tipo Parada'     ,field: 'tipo'         ,align: 'center'     ,sortable: true },
        { name: 'grupo'             ,label: 'Grupo Parada'    ,field: 'grupo'        ,align: 'center'     ,sortable: true },
        { name: 'quebra'            ,label: 'Desc. Quebra'    ,field: 'quebra'       ,align: 'center'     ,sortable: true },
        { name: 'motivo'            ,label: 'Motivo'          ,field: 'motivo'       ,align: 'center'     ,sortable: true },
      ],
    }
  },
  computed: {
    ...mapState("forms", ["questions"]),
    rowsTable() {
      let reg = this.questions

      // reg.sort((a, b) => b.data - a.data)

      return reg.map(r => {
        return {
          id:           r.id,
          empresa:      r.empresa,
          data:         numberToDate(r.data),
          hrInicio:     r.hrInicio,
          hrFim:        r.hrFim,
          linha:        r.linha,
          supervisor:   r.supervisor,
          operador:     r.operador,
          turno:        r.turno,
          tipo:         r.tipo,
          grupo:        r.grupo,
          quebra:       r.quebra,
          motivo:       r.motivo
        }
      })
    }
  },
  methods: {
    ...mapActions('forms', [
      'getRegister'
    ]),
    filterDate() {
      this.inputDate = `De: ${this.reportDate.from} - Até: ${this.reportDate.to}`
      this.getInfos();
    },
    async getInfos() {
      if(this.reportDate) {
        await this.getRegister(this.reportDate)
      }
    },
    exportTable(aTable) {
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += [
        Object.keys(aTable[0]).join(";"),
        ...aTable.map(item => Object.values(item).join(";"))
        ].join("\n")
        .replace(/(^\[)|(\]$)/gm, "")
        .replaceAll("ç", "c")
        .replaceAll("ã", "a")
        .replaceAll("â", "a")
        .replaceAll("á", "a")
        .replaceAll("à", "a")
        .replaceAll("ê", "e")
        .replaceAll("é", "e")
        .replaceAll("í", "i")
        .replaceAll("õ", "o")
        .replaceAll("ô", "o")
        .replaceAll("ú", "u");

      const data = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", data);
      link.setAttribute("download", "export.csv");
      link.click();
    }
  },
}
</script>

<style lang="scss">
  .q-table__top, .q-table__bottom, thead tr:first-child th {
    background-color: #e0e7f1;
  }

  /* MOBILE */
  @media screen
  and (min-width: 0px)
  and (max-width: 800px) {
    .img-logo {
      width: 120px;
    }
  }

  /* DESKTOP */
  @media screen
  and (min-width: 800px) {
    .img-logo {
      width: 120px;
    }
  }
</style>