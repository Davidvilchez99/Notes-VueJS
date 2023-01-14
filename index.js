const {createApp} = Vue

createApp({
    data(){
        return{
            entradas: this.traerNotas(),
            entradasFiltradas: "",
            textoIntroducido: "",
            selected: "",
            tareasOrganizadas: []
        }
    },
    methods: {
        traerNotas(){
            if (localStorage.notas != null){
                notasLocal = JSON.parse(localStorage.notas)
                return notasLocal;
            }
            else{
                notas = [];
                return notas;
            }
        },
        muestraNumArtículos(){
            return this.entradas.length;
        },
        calcularFecha(fecha){
            return Math.floor(((Date.now() - fecha)/1000)/60);
        },
        nuevaNota(){
            this.entradas.push({
                title: this.textoIntroducido,
                priority: "high",
                date: Date.now(),
                completed: false,
            })
            localStorage.notas = JSON.stringify(this.entradas);
            this.textoIntroducido = "";
        },
        borrarTareasCompletadas(){
            tareasNoCompletadas =  this.entradas.filter((ent) => !ent.completed);
            this.entradas = tareasNoCompletadas;
            localStorage.notas = JSON.stringify(this.entradas);
        },
        borrarTarea(tarea){
            this.entradas = this.entradas.filter(ent => ent.title != tarea.title);
            localStorage.notas = JSON.stringify(this.entradas);
        },
        cambiarPrioridad(entrada, prioridad){
            entrada.priority = prioridad;
            this.organizarNotasPrioridad();
        },
        tareaCompletada(entrada){
            if (entrada.completed){
                entrada.completed = false;
            }
            else{
                entrada.completed = true;
            }
            localStorage.notas = JSON.stringify(this.entradas);
        },
        organizarNotasPrioridad(){
            this.entradas.sort( (a, b)=> {
                if (a.priority == b.priority){
                    return ;
                }
                else if (a.priority == "high"){
                    return -1;
                }
                else if (a.priority == "normal" && b.priority == "high"){
                    return 1;
                }else if (a.priority == "normal" && b.priority == "low"){
                    return -1;
                }
                else if (a.priority == "low" && (b.priority == "high" ||  b.priority == "normal")){
                    return 1;
                }
            })
            localStorage.notas = JSON.stringify(this.entradas);
        }
    },
    computed: {
        entradasNoCompletadas(){
            return this.entradas.filter((ent) => ent.completed== false).length;
        },
        tareasFiltradas(){
            if (this.entradasFiltradas)
                return this.entradas.filter((ent) => ent.title.includes(this.entradasFiltradas));
            else if(this.selected)
                return this.entradas.filter((ent) => ent.priority == this.selected);
            else {
                return this.entradas;
            }
        }
    }
}).mount('#vue');

