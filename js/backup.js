
console.log('desligado')
$warning.innerHTML = ''

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

if(Number($hour.value) != 0 || Number($hour.value) != '' || Number($minute.value) != 0 || Number($minute.value) != '' || Number($second.value) != 0 || Number($second.value) != ''){
  $hour.value = Number($hour.value) + 1
  $minute.value = Number($minute.value) + 1
  $second.value = Number($second.value) + 1
}

if($hour.value == '' && $minute.value == '' && $second.value == '' && min == 0 && hor == 0 && seg == 0){
  $warning.innerHTML = 'Click em start mas uma vez'
}

if($hour.value == '' && $minute.value == '' && $second.value == '' || m[1] == 0 || h[1] == 0 || s[1] == 0){
  $warning.innerHTML = ''
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
}else if(Number($hour.value) != 0 && Number($hour.value) != '' && Number($minute.value) != 0 && Number($minute.value) != '' && Number($second.value) != 0 && Number($second.value) != ''){
  //Temporizador
  $hour.value = Number($hour.value) - 1
  $minute.value = Number($minute.value) - 1
  $second.value = Number($second.value) - 1
  if($hour.value < 10 && $hour.value > 0){
    $hour.value = "0" + $hour.value
  }
  if($minute.value < 10 && $minute.value > 0){
    $minute.value = "0" + $minute.value
  }
  if($second.value < 10 && $second.value > 0){
    $second.value = "0" + $second.value
  }
  temporizador = setInterval(function(){

    if( hor == Number($hour.value) && min == Number($minute.value) && seg == Number($second.value)){
      $hour.value = ''
      $minute.value = ''
      $second.value = ''
      $warning.innerHTML = `Terminou o Tempo`
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
