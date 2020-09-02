(function(){
    'use strict';

    alert('Bem-vindo, espero que gostes :>')

    //Elementos do DOM
    var $horas = document.querySelector('#relogio');// relógio do canto superior esquerdo da página
    var $btnIniciar = document.querySelector('[data-js="iniciar"]');// botão iniciar
    var $btnpause = document.querySelector('[data-js="pause"]');// botão pause
    var $btncancelar = document.querySelector('[data-js="cancelar"]');// botão cancelar
    var $modeDark = document.querySelector('#dark');// input checkbox dark
    var $regrecivo = document.querySelector('#regreciva');// input checkbox box regrecivo
    var $bodycronometro = document.querySelector('.cronometro');// body part da difinição
    var $counter = document.querySelector('.counter');// Counter(contador)
    var $hora = document.querySelector('#horas');
    var $minuto = document.querySelector('#minutos');
    var $segundo = document.querySelector("#segundos");
    var $aviso = document.querySelector('.aviso');

    // Declaração de variaveis
    var temporizador;
    var hor = 0;
    var min = 0;
    var seg = 0;
    var s,h,m

    //Horas do canto superior esquerdo do página 
    setInterval(function relogio(){
        const data = new Date();
        let hora = data.getHours();
        let minutos = data.getMinutes();

        //Acrescenta um 0 na hora e nos minutos se a hora ou o minuto for menor que 10
        if(hora < 10){
            hora = "0" + hora
        }
        if(minutos < 10){
            minutos = "0" + minutos
        }

        //atribui o hora(hora e minuto) do sistema no input $horas 
        $horas.value = `${hora}:${minutos}`
    }, 1000)

    //Modo Dark
    $modeDark.addEventListener('change', () => {
        if($modeDark.checked){
            document.querySelector('.cronometro').style.background = "rgb(39, 38, 38)"
            $counter.style.color = "#fff"
            document.body.style.color = "#fff"
        }else{
            document.querySelector('.cronometro').style.background = "#fff"
            $counter.style.color = "#000"
            document.body.style.color = "#000"
        }
     })

    //Inicia o Cronômetro
    $btnIniciar.addEventListener('click', () => {
       if($regrecivo.checked){
           //Contagem recreciva
        console.log("ligado")
        $aviso.innerHTML = ''
        
        h = Array.from(hor)
        m = Array.from(min)
        s = Array.from(seg)
          
        if(hor < 10 && m[0] != 0){
            hor = "0" + hor
        }
        if(min < 10 && h[0] != 0){
            min = "0" + min
        }
        if(seg < 10 && s[0] != 0){
            seg = "0" + seg
        }

        if(Number($hora.value) != 0 || Number($hora.value) != '' || Number($minuto.value) != 0 || Number($minuto.value) != '' || Number($segundo.value) != 0 || Number($segundo.value) != ''){
            $hora.value = Number($hora.value) + 1
            $minuto.value = Number($minuto.value) + 1
            $segundo.value = Number($segundo.value) + 1
        }

        if($hora.value == '' && $minuto.value == '' && $segundo.value == '' && min == 0 && hor == 0 && seg == 0){
            $aviso.innerHTML = 'Click em Iniciar mas uma vez'
        }

        if($hora.value == '' && $minuto.value == '' && $segundo.value == '' || m[1] == 0 || h[1] == 0 || s[1] == 0){
            $aviso.innerHTML = ''

            seg = 60
            min = 59
            hor = 23

            temporizador = setInterval(function(){
               
                seg -= 1

                if(seg < 60){
                    if(seg < 10){
                        seg = "0" + seg
                    }
                }else{
                    seg = 59
                    min -= 1
                    if(min <= 59 ){
                        if(min < 10)
                            min = "0" + min
                    }else{
                        min = 59
                        hor -= 1
                        if(hor >= 23){
                            if(hor > 10){
                                hor = "0" + hor
                            }
                        }else{
                            clearInterval(temporizador)
                        }
                    }
                }

                $counter.innerHTML = `${hor}:${min}:${seg}`
            }, 1000)
       }else if(Number($hora.value) != 0 && Number($hora.value) != '' && Number($minuto.value) != 0 && Number($minuto.value) != '' && Number($segundo.value) != 0 && Number($segundo.value) != ''){
        //Temporizador

        $hora.value = Number($hora.value) - 1
        $minuto.value = Number($minuto.value) - 1
        $segundo.value = Number($segundo.value) - 1

        seg = $segundo.value
        min = $minuto.value
        hor = $hora.value

           temporizador = setInterval(function(){
    
                if( hor == 0 && min == 0 && seg == 0){
                    $hora.value = ''
                    $minuto.value = ''
                    $segundo.value = ''
                    $aviso.innerHTML = `Terminou o Tempo`
                    clearInterval(temporizador)
                }else{
                    seg -= 1

                    if(seg < 60){
                        if(seg < 10){
                            seg = "0" + seg
                        }
                    }else{
                        seg = 60
                        min -= 1
                        if(min <= 59 ){
                            if(min < 10)
                                min = "0" + min
                        }else{
                            min = 59
                            hor -= 1
                            if(hor >= 23){
                                if(hor > 10){
                                    hor = "0" + hor
                                }
                            }else{
                                clearInterval(temporizador)
                            }
                        }
                    }
                }
                $counter.innerHTML = `${hor}:${min}:${seg}`
        }, 1000)

       }//Terminou contagem regreciva
       }else{
            console.log('desligado')
            $aviso.innerHTML = ''
        
        h = Array.from(hor)
        m = Array.from(min)
        s = Array.from(seg)
          
        if(hor < 10 && m[0] != 0){
            hor = "0" + hor
        }
        if(min < 10 && h[0] != 0){
            min = "0" + min
        }
        if(seg < 10 && s[0] != 0){
            seg = "0" + seg
        }

        if(Number($hora.value) != 0 || Number($hora.value) != '' || Number($minuto.value) != 0 || Number($minuto.value) != '' || Number($segundo.value) != 0 || Number($segundo.value) != ''){
            $hora.value = Number($hora.value) + 1
            $minuto.value = Number($minuto.value) + 1
            $segundo.value = Number($segundo.value) + 1
        }

        if($hora.value == '' && $minuto.value == '' && $segundo.value == '' && min == 0 && hor == 0 && seg == 0){
            $aviso.innerHTML = 'Click em Iniciar mas uma vez'
        }

        if($hora.value == '' && $minuto.value == '' && $segundo.value == '' || m[1] == 0 || h[1] == 0 || s[1] == 0){
            $aviso.innerHTML = ''
            temporizador = setInterval(function(){
               
                seg = Number(1) + Number(seg)

                if(seg < 60){
                    if(seg < 10){
                        seg = "0" + seg
                    }
                }else{
                    seg = 0
                    min = Number(1) + Number(min)
                    if(min <= 60 ){
                        if(min < 10)
                            min = "0" + min
                    }else{
                        min = 0
                        hor = Number(1) + Number(hor)
                        if(hor <= 24){
                            if(hor < 10){
                                hor = "0" + hor
                            }
                        }else{
                            clearInterval(temporizador)
                        }
                    }
                }

                $counter.innerHTML = `${hor}:${min}:${seg}`
            }, 1000)
       }else if(Number($hora.value) != 0 && Number($hora.value) != '' && Number($minuto.value) != 0 && Number($minuto.value) != '' && Number($segundo.value) != 0 && Number($segundo.value) != ''){
        //Temporizador
        $hora.value = Number($hora.value) - 1
        $minuto.value = Number($minuto.value) - 1
        $segundo.value = Number($segundo.value) - 1
        if($hora.value < 10 && $hora.value > 0){
            $hora.value = "0" + $hora.value
            }
            if($minuto.value < 10 && $minuto.value > 0){
                $minuto.value = "0" + $minuto.value
            }
            if($segundo.value < 10 && $segundo.value > 0){
                $segundo.value = "0" + $segundo.value
            }
           temporizador = setInterval(function(){
    
                if( hor == Number($hora.value) && min == Number($minuto.value) && seg == Number($segundo.value)){
                    $hora.value = ''
                    $minuto.value = ''
                    $segundo.value = ''
                    $aviso.innerHTML = `Terminou o Tempo`
                    clearInterval(temporizador)
                }else{
                    seg = Number(1) + Number(seg)
        
                    if(seg < 60){
                        if(seg < 10){
                            seg = "0" + seg
                        }
                    }else{
                        seg = 0
                        min = Number(1) + Number(min)
                        if(min <= 60 ){
                            if(min < 10)
                                min = "0" + min
                        }else{
                            min = 0
                            hor = Number(1) + Number(hor)
                            if(hor <= 24){
                                if(hor < 10){
                                    hor = "0" + hor
                                }
                            }else{
                                clearInterval(temporizador)
                            }
                        }
                    }
                }
                $counter.innerHTML = `${hor}:${min}:${seg}`
        }, 1000)
       }//Terminou
       }
    });

    $btnpause.addEventListener('click', () => {
        clearInterval(temporizador)
        $aviso.innerHTML = `Pausado`
    })

    $btncancelar.addEventListener('click', () => {
        clearInterval(temporizador)
        hor = 0;
        min = 0;
        seg = 0;
        $hora.value = ''
        $minuto.value = ''
        $segundo.value = ''
        $aviso.innerHTML = `Cancelado com êxito`
        $counter.innerHTML = `00:00:00`
    })

})();