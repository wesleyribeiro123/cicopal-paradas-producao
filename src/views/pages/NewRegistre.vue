<template>
  <div class="new">
    <div class="title row justify-center">
      <div class="position-logo fixed-top">
        <q-img
          :src="require('../../assets/LOGOMARCA_CICOPAL.png')"
          :ratio="16/9"
          fit="contain"
          width="100px"
        />
      </div>
      <div class="text-h5 flex justify-center content-center q-my-lg">
        Adicionar Nova Parada
      </div>
    </div>

    <div class="form" style="margin-left: 20%; margin-right: 20%;">
      <q-form
        class="q-gutter-md full-width full-height"
        @submit="onSubmit"
      >
        <div class="lineZero  row justify-between q-gutter-y-sm">
          <q-select
            outlined
            dense
            v-model="empresa"
            :options="optEmpresa"
            label="Empresa"
            style="width: 250px"
          />
        </div>

        <div class="lineOne   row justify-between q-gutter-y-sm">
          <q-input outlined dense v-model="reportDate" placeholder="Data Parada" style="width: 250px">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model="reportDate"
                    today-btn
                    mask="DD/MM/YYYY"
                    color="primary"
                    text-color="accent"
                    :locale="ptBR"
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        dense
                        flat
                        v-close-popup
                        label="Confirmar"
                        color="primary"
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input outlined dense v-model="reportTimeStart" placeholder="Hora Inicial" style="width: 250px">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="reportTimeStart" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Confirmar" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input outlined dense v-model="reportTimeEnd" placeholder="Hora Final" style="width: 250px">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="reportTimeEnd" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Confirmar" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

        </div>

        <div class="lineTwo   row justify-between q-gutter-y-sm">
          <q-select
            outlined
            dense
            v-model="linha"
            :options="optLinha"
            label="Linha"
            style="width: 250px"
          />

          <q-select
            outlined
            dense
            v-model="supervisor"
            :options="optSuper"
            label="Supervisor"
            style="width: 250px"
          />
  
          <q-input outlined dense v-model="operador" placeholder="Operador" style="width: 250px" />
        </div>

        <div class="lineThree row justify-between q-gutter-y-sm">
          <q-select
            outlined
            dense
            v-model="turno"
            :options="optTurno"
            label="Turno"
            style="width: 250px"
          />

          <q-select
            outlined
            dense
            v-model="tipo"
            :options="optTipo"
            label="Tipo"
            style="width: 250px"
          />

          <q-select
            outlined
            dense
            v-model="grupo"
            :options="optGrupo"
            label="Grupo Parada"
            style="width: 250px"
          />
        </div>

        <div class="lineFour  row justify-between q-gutter-y-sm">
          <q-select
            outlined
            dense
            v-model="quebra"
            :options="grupo ? optQuebra : [ 'Selecione um grupo' ]"
            label="Descrição Quebra"
            style="width: 250px"
          />

          <q-input outlined dense v-model="motivo" placeholder="Motivo" class="motivo" />
        </div>
        
        <div class="row justify-center">
          <q-btn label="Gravar Parada" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import locale from 'quasar/lang/pt-BR'
import { mapActions } from 'vuex'
import strDate from '../../helpers/stringToDate'

export default {
  data() {
    return {
      empresa: '',
      reportDate: '',
      reportTimeStart: '',
      reportTimeEnd: '',
      linha: [],
      supervisor: [],
      operador: '',
      grupo: '',
      tipo: [],
      turno: [],
      quebra: '',
      motivo: '',
      myDatas: null,
      ptBR: locale.date,
      optEmpresa: [
        { label: 'Cicopal'   ,value: "010101"},
        { label: 'Snacks'    ,value: "010201"},
        { label: 'Carper'    ,value: "010401"},
      ],
      optLinha: [
        { label: "Salgadinho Milho"   ,value: "milho" },
        { label: "Salgadinho Trigo"   ,value: "trigo" },
        { label: "Refresco 15g"       ,value: "ref15" },
        { label: "Refresco 160g"      ,value: "ref160" },
        { label: "PC14"               ,value: "pc14" },
        { label: "PC21"               ,value: "pc21" },
        { label: "Rosca"              ,value: "rosca" },
        { label: "Wafer"              ,value: "wafer" },
      ],
      optSuper: [
        { label: "Miqueias"       ,value: "Miqueias" },
        { label: "Luiz Eduardo"   ,value: "Luiz Eduardo" },
        { label: "Roberto"        ,value: "Roberto" },
        { label: "Ismael"         ,value: "Ismael" },
        { label: "Carlos"         ,value: "Carlos" },
        { label: "Jairo"          ,value: "Jairo" },
        { label: "Ederson"        ,value: "Ederson" },
        { label: "Elviston"       ,value: "Elviston" },
      ],
      optTurno: [
        { label: "Turno A"  ,value: "A" },
        { label: "Turno B"  ,value: "B" },
        { label: "Turno C"  ,value: "C" },
      ],
      optTipo: [
        { label: "Mecânica"     ,value: "meca" },
        { label: "Elétrica"     ,value: "elec" },
        { label: "Operacional"  ,value: "oper" },
        { label: "Outros"       ,value: "outr" },
      ],
      optGrupo: [
        { label: "Quebra"                   ,value: "quebr"   , children: [
          { label: "Quebra fabricação"            ,value: "fab" },
          { label: "Quebra empacotamento"         ,value: "emp" },
          { label: "Quebra maquinário"            ,value: "maq" },
          { label: "Quebra forno/fritador"        ,value: "for" },
          { label: "Quebra de esteiras"           ,value: "est" },
          { label: "Quebra sopradora"             ,value: "sop" },
          { label: "Quebra enchedora"             ,value: "enc" },
          { label: "Quebra rotuladora / Datadora" ,value: "rot" },
          { label: "Quebra compressor de ar"      ,value: "com" },
        ]},
        { label: "Setup"                    ,value: "setup"   , children: [
          { label: "Setup formato"                ,value: "for" },
          { label: "Setup produto"                ,value: "pro" },
        ]},
        { label: "Troca Ferramental"        ,value: "troca"   , children: [
          { label: "Troca de teflon"              ,value: "tef" },
          { label: "Troca de bobina"              ,value: "bob" },
          { label: "Alterar data "                ,value: "alt" },
        ]},
        { label: "Produção"                 ,value: "produ"   , children: [
          { label: "Inicio produção"              ,value: "ini" },
          { label: "Fim de produção"              ,value: "fim" },
        ]},
        { label: "Pequenas Paradas"         ,value: "peque"   , children: [
          { label: "Ajuste manutenção mecânica"    ,value: "mac" },
          { label: "Ajuste de manutenção elétrica" ,value: "ele" },
          { label: "Ajuste manutenção embalagem"   ,value: "emb" },
          { label: "Ajuste Operacional"            ,value: "ope" },
        ]},
        { label: "Baixa Velocidade"         ,value: "baixa"   , children: [
          { label: "Reprocesso Equipe Incompleta"           ,value: "inc" },
          { label: "Reprocesso Problemas em empacotadeiras" ,value: "emp" },
          { label: "Reprocesso Problemas nas esteiras"      ,value: "est" },
          { label: "Reprocesso Por falta de matéria prima"  ,value: "mat" },
          { label: "Reprocesso Problemas de seladoras"      ,value: "sel" },
          { label: "Defeito de embalagem"                   ,value: "emb" },
          { label: "Reprocesso Setup"                       ,value: "set" },
          { label: "Materia prima não conforme"             ,value: "nao" },
        ]},
        { label: "Defeito"                  ,value: "defei"   , children: [
          { label: "Peso Baixo"                   ,value: "pes" },
          { label: "Sobrepeso"                    ,value: "sob" },
        ]},
        { label: "Programadas"              ,value: "progr"   , children: [
          { label: "Falta de demanda"             ,value: "fal" },
          { label: "Manutenção Preventiva"        ,value: "man" },
          { label: "Teste novo produto"           ,value: "tes" },
          { label: "Treinamento"                  ,value: "tre" },
          { label: "Feriado"                      ,value: "fer" },
          { label: "Falta mão de obra"            ,value: "fal" },
          { label: "Refeição"                     ,value: "ref" },
          { label: "Férias Coletiva"              ,value: "col" },
        ]},
        { label: "Gestão"                   ,value: "gesta"   , children: [
          { label: "Falta de Comunicação"         ,value: "com" },
          { label: "Falta de Ar Comprimido"       ,value: "arc" },
          { label: "Falta de Água "               ,value: "agu" },
          { label: "Acidente"                     ,value: "aci" },
          { label: "Falta de Insumos"             ,value: "ins" },
          { label: "Reunião Não Programada"       ,value: "reu" },
          { label: "Falta de Energia"             ,value: "ene" },
          { label: "Alteração na Programação"     ,value: "alt" },
        ]},
        { label: "Movimentos Operacionais"  ,value: "movim"   , children: [
          { label: "Falta de Conhecimento / Habilidade" ,value: "hab" },
          { label: "Falta de Procedimentos"             ,value: "pro" },
        ]},
        { label: "Organização"              ,value: "organ"   , children: [
          { label: "Falta de Mão de Obra"         ,value: "fal" },
          { label: "Refeição"                     ,value: "ref" },
          { label: "Espera Técnico"               ,value: "esp" },
          { label: "Revezamento"                  ,value: "rev" },
        ]},
        { label: "Logística"                ,value: "logis"   , children: [
          { label: "Falta Paletes"                  ,value: "pal" },
          { label: "Falta Gaiolas"                  ,value: "gai" },
          { label: "Falta de Abastecimento Insumos" ,value: "aba" },
        ]},
        { label: "Medições Ajustes"         ,value: "medic"   , children: [
          { label: "Ajuste de Peso"              ,value: "pes" },
          { label: "Limpeza Não Programada"      ,value: "pro" },
          { label: "Ajuste de Maquinário"        ,value: "maq" },
          { label: "Ajuste no Forno"             ,value: "for" },
          { label: "Ajuste de Empacotamento"     ,value: "emp" },
          { label: "Ajuste Massa / Manipulação"  ,value: "mas" },
        ]},
      ],
    }
  },
  computed: {
    optQuebra() {
      let data = [];
      if(this.grupo != null) {
        let { children } = this.grupo
        children.forEach(el => {
          data.push(el)
        });
      }

      return data;
    }
  },
  methods: {
    ...mapActions("forms", [
      "burnData"
    ]),
    resetForm() {
      this.empresa = ''
      this.reportDate = ''
      this.reportTimeStart = ''
      this.reportTimeEnd = ''
      this.linha = []
      this.supervisor = []
      this.operador = ''
      this.turno = []
      this.tipo = []
      this.grupo = ''
      this.quebra = ''
      this.motivo = ''
    },
    async onSubmit() {
      if(
          this.empresa == '' ||
          this.reportDate == '' ||
          this.reportTimeStart == '' ||
          this.reportTimeEnd == '' ||
          this.linha == '' ||
          this.supervisor == '' ||
          this.operador == '' ||
          this.grupo == '' ||
          this.tipo == '' ||
          this.turno == '' ||
          this.quebra == '' ||
          this.motivo == ''
      ) {
        alert('Favor preencher todos os campos!')
      } else {
        this.myDatas = {
          empresa: this.empresa.label,
          data: (strDate(this.reportDate) * 1),
          hrInicio: this.reportTimeStart,
          hrFim: this.reportTimeEnd,
          linha: this.linha.label,
          supervisor: this.supervisor.label,
          operador: this.operador,
          grupo: this.grupo.label,
          tipo: this.tipo.label,
          turno: this.turno.label,
          quebra: this.quebra.label,
          motivo: this.motivo
        }
      }
      
      await this.burnData(this.myDatas);

      alert("Parada gravada com sucesso!!!")

      this.resetForm();
    },

  }
}
</script>

<style lang="scss">

  /* MOBILE */
  @media screen
  and (min-width: 0px)
  and (max-width: 800px) {
    .position-logo {
      top: 125px;
      left: 10px;
    }

    .motivo {
      width: 250px
    }
  }

  /* DESKTOP */
  @media screen
  and (min-width: 800px) {
    .position-logo {
      top: 135px;
      left: 50px;
    }

    .motivo {
      width: 515px
    }
  }
</style>