(function(){
	'use strict'

	//Elementos do DOM
	const $real_time = document.querySelector('#real_time')// relógio do canto superior esquerdo da página
	const $btnstart = document.querySelector('[data-js="start"]')// botão Iniciar
	const $btnpause = document.querySelector('[data-js="pause"]')// botão pause
	const $btncancel = document.querySelector('[data-js="cancel"]')// botão cancel
	const $modeDark = document.querySelector('#dark')// input checkbox dark
	const $return = document.querySelector('#return')// input checkbox box return
	const $bodyponometer = document.querySelector('.ponometer')// body part da difinição
  const $settings = document.querySelector('.settings')
	const $counter = document.querySelector('.counter')// Counter(contador)
	const $hour = document.querySelector('#hours')
	const $minute = document.querySelector('#minutes')
	const $second = document.querySelector("#seconds")
	const $warning = document.querySelector('.warning')

	// Declaração de variaveis
	var temporizador
	var hor = 0
	var min = 0
	var seg = 0
	var s, h, m

  let segundos = 0
  let timer

  function getTimeFromSecund(segundo){
    const data = new Date(segundo * 1000)
    return data.toLocaleTimeString('pt-PT', {
      hour12: false,
      timeZone: 'GMT'
    })
  }

  function iniciaRelogio() {
    timer = setInterval(function() {
      segundos++
      $counter.innerHTML = getTimeFromSecund(segundos)
    }, 1000)
  }

	//Hora do canto superior esquerdo do página
	setInterval(function real_time(){
		const data = new Date()
		let hour = data.getHours()
		let minutes = data.getMinutes()

		//Acrescenta um 0 na hour e nos minutes se a hour ou o minute for menor que 10
		if(hour < 10){
			hour = "0" + hour
		}
		if(minutes < 10){
			minutes = "0" + minutes
		}

		//atribui o hour(hour e minute) do sistema no input $real_time
		$real_time.value = `${hour}:${minutes}`
	}, 1000)

	//Modo Dark
	$modeDark.addEventListener('change', () => {
		if($modeDark.checked){
			document.querySelector('.ponometer').style.background = "#181818"
			$counter.style.color = "#fff"
			document.body.style.color = "#fff"
      $settings.style.background = "#1d1d1d"
		}else{
			document.querySelector('.ponometer').style.background = "#fff"
			$counter.style.color = "#000"
			document.body.style.color = "#000"
      $settings.style.background = "#f8f8f2"
		}
	})

	//Inicia o Cronômetro
	$btnstart.addEventListener('click', () => {
    $counter.classList.remove('pause')
    $warning.innerHTML = ''

		if(!$return.checked){
      $counter.classList.remove('pause')
      clearInterval(timer)
      iniciaRelogio()
		}else {
			//Contagem recreciva

			$warning.innerHTML = ''
      $counter.classList.remove('pause')

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
			}else if(Number($hour.value) != 0 && Number($hour.value) != '' && Number($minute.value) != 0 && Number($minute.value) != '' && Number($second.value) != 0 && Number($second.value) != ''){
				//Temporizador

				$hour.value = Number($hour.value) - 1
				$minute.value = Number($minute.value) - 1
				$second.value = Number($second.value) - 1

				seg = $second.value
				min = $minute.value
				hor = $hour.value

				temporizador = setInterval(function(){
					if( hor == 0 && min == 0 && seg == 0){
						$hour.value = ''
						$minute.value = ''
						$second.value = ''
						$warning.innerHTML = `Terminou o Tempo`
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

			}//Terminou contagem return
		}
	})

	$btnpause.addEventListener('click', () => {
    $counter.classList.add('pause')
    clearInterval(timer)
		clearInterval(temporizador)
		$warning.innerHTML = `Pausado`
	})

	$btncancel.addEventListener('click', () => {
    $counter.classList.remove('pause')
    clearInterval(timer)
		clearInterval(temporizador)
    segundos = 0
		hor = 0
		min = 0
		seg = 0
		$hour.value = ''
		$minute.value = ''
		$second.value = ''
		$warning.innerHTML = `Cancelado com êxito`
		$counter.innerHTML = `00:00:00`

    setTimeout(() => {
		  $warning.innerHTML = ''
    }, 2000)
	})
})()
