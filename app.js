new Vue({
    el: '#app',
    data: {
        playerVida: 100,
        thanosVida: 100,
        jogoRodando: false,
        rodadas: []
    },
    methods: {
        iniciarJogo: function() {
            this.jogoRodando = true;
            this.playerVida = 100;
            this.thanosVida = 100;  
            this.rodadas = [];          
        },
        atacar: function() {
            var danos = this.calcularDanos(3, 10);
            this.thanosVida -= danos;            
            this.ataqueThanos();
            this.rodadas.unshift({
                isPlayer: true,
                text: 'Thor acertou o Thanos com ' + danos + ' pontos'
            });
            if(this.checarVencedor()){
                return;
            }
        },
        ataqueEspecial: function() {
            var danos = this.calcularDanos(10, 20);
            this.thanosVida -= danos;
            this.rodadas.unshift({
                isPlayer: true,
                text: 'Thor acertou o Thanos com um ataque especial de ' + danos + ' pontos'
            });
            if(this.checarVencedor()){
                return;
            }
            this.ataqueThanos();
        },
        defesa: function() {
            if (this.playerVida <= 90) {
                this.playerVida += 10;
            }
            else {
                this.playerVida = 100;
            }
            this.rodadas.unshift({
                isPlayer: false,
                text: 'Thor se defendeu do ataque e recuperou 10 pontos'
            });
            this.ataqueThanos();
        },
        desistir: function() {
            this.jogoRodando = false;

        },
        ataqueThanos: function(){
            var danos = this.calcularDanos(5, 12);
            this.playerVida -=  danos;
            this.rodadas.unshift({
                isPlayer: false,
                text: 'Thanos acertou o Thor com ' + danos
            });
            this.checarVencedor();
        },
        calcularDanos: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checarVencedor: function() {
            if (this.thanosVida <= 0){
                if (confirm('Thor ganhou! Deseja iniciar novamente o jogo?')){
                    this.iniciarJogo();
                }
                else {
                    this.jogoRodando = false;
                }
                return true;
            }
            else if (this.playerVida <= 0){
                if (confirm('Thanos ganhou! Deseja iniciar novamente o jogo?')){
                    this.iniciarJogo();
                }
                else {
                    this.jogoRodando = false;
                }
                return false;
            }
            return false;
        }
    }
})