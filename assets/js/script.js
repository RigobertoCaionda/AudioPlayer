let reproducerButton = document.querySelector('.reproducer');
let libraryButton = document.querySelector('.library');
let aboutReproducer = document.querySelector('.about-reproducer');
let velocity = document.querySelector('.velocity');
velocityOptions = document.querySelector('.velocity-options');
let songList = document.querySelector('.song-list');
let audio = document.querySelector('audio');
let songListItemWrapper = document.querySelector('.song-list-item-wrapper');
let pauseButton = document.querySelector('.audio-pause-button');
let pause = document.querySelector('.pause-button');
let audioTitle = document.querySelector('.audio-title h4');
let audioAuthor = document.querySelector('.audio-author');
let playButton = document.querySelector('.play-button');
let randomButton = document.querySelector('.random-button');
let minutosPercorridos = document.querySelector('.minutes-covered');
let minutosFaltando = document.querySelector('.minutes-left');
let goNext = document.querySelector('.goNext-button');
let goBack = document.querySelector('.goBack-button');
let repeatButton =document.querySelector('.repeat-button');
let proximaFaixa = document.querySelector('.nextSong');
let tocandoPausado = 0;
let key;
let position;
let keyMaisUmExiste = -1;
musicas.map((item, index)=>{
	let musicaItem = document.querySelector('.musica-conjunto').cloneNode(true);
	if(item.title === undefined){
		item.title = 'desconhecido';
	}
	if(item.author === undefined){
		item.author = 'Artista desconhecido';
	}
	if(item.img === undefined){
		item.img = 'assets/images/musicaAnonima.jpg';
	}
	musicaItem.querySelector('.song-list-item').setAttribute('data-key', index);
	musicaItem.querySelector('.audio-name').innerHTML = item.title;
	musicaItem.querySelector('.audio-autor small').innerHTML = item.author;
	musicaItem.querySelector('.audio-image-mini img').src = item.img;
	songList.append(musicaItem);
	musicaItem.querySelector('.song-list-item').addEventListener('click',()=>{
		document.querySelectorAll('.musica-conjunto').forEach((item)=>{
			item.classList.remove('musicaTocando');
			item.querySelector('.audio-pause-button').style.display = 'none';
			item.querySelector('.audio-play-button').style.display = 'none';
		});
		musicaItem.classList.add('musicaTocando');
		musicaItem.querySelector('.audio-pause-button').style.display = 'block';
		key = musicaItem.querySelector('.song-list-item').getAttribute('data-key');
		musicaItem.querySelector('.audio-pause-button').addEventListener('click',()=>{
			audio.pause();
			tocandoPausado = 2;
			musicaItem.querySelector('.audio-pause-button').style.display = 'none';
			musicaItem.querySelector('.audio-play-button').style.display = 'block';
			musicaItem.querySelector('.audio-play-button').addEventListener('click',()=>{
				musicaItem.querySelector('.audio-pause-button').style.display = 'block';
				musicaItem.querySelector('.audio-play-button').style.display = 'none';
				audio.play();
				tocandoPausado = 1;
			});
		});
		audio.src = musicas[key].songUrl;
		audio.play();
		tocandoPausado = 1;
		if(!repeatButton.querySelector('i').classList.contains('aleatorio')
		 && !randomButton.querySelector('i').classList.contains('aleatorio')){

			if(musicas[parseInt(key)+1] !== undefined){
					proximaFaixa.innerHTML = `<span>Próxima Faixa:</span> ${musicas[parseInt(key)+1].title}`;
				}else{
					proximaFaixa.innerHTML = `<span>Próxima Faixa:</span> ${musicas[0].title}`;
				}
		}
	});


});
let pl = document.querySelector('.audio-play-button');
libraryButton.addEventListener('click',()=>{
	libraryButton.querySelector('span').style.color = '#7a7a7a7a';
	libraryButton.style.borderBottom = '3px solid #7a6cc3';
	reproducerButton.querySelector('span').style.color = '#76786d';
	reproducerButton.style.borderBottom = 'none';
	aboutReproducer.style.display = 'none';
	songList.style.display = 'block';
});

reproducerButton.addEventListener('click',()=>{
	reproducerButton.querySelector('span').style.color = '#7a7a7a7a';
	reproducerButton.style.borderBottom = '3px solid #7a6cc3';
	libraryButton.querySelector('span').style.color = '#76786d';
	libraryButton.style.borderBottom = 'none';
	aboutReproducer.style.display = 'block';
	songList.style.display = 'none';
	if(tocandoPausado == 1 || tocandoPausado == 2){
		if(randomButton.querySelector('i').classList.contains('aleatorio') && position !== undefined){
			audioTitle.innerHTML = musicas[position].title;
			audioAuthor.innerHTML = musicas[position].author;
		}else if(keyMaisUmExiste > -1){
			audioTitle.innerHTML = musicas[key].title;
			audioAuthor.innerHTML = musicas[key].author;
		}else{
			audioTitle.innerHTML = musicas[key].title;
			audioAuthor.innerHTML = musicas[key].author;
		}
		if(tocandoPausado == 1){
		pause.style.display = 'block';
		playButton.style.display = 'none';
		
		}
		if(tocandoPausado == 2){
			pause.style.display = 'none';
			playButton.style.display = 'block';
			
		}
	}
});
velocity.addEventListener('click',()=>{
	velocityOptions.style.display = 'block';
});

	pause.addEventListener('click',()=>{
		if(tocandoPausado == 1){
			pause.style.display = 'none';
			playButton.style.display = 'block';
			tocandoPausado = 2;
			audio.pause();
		}
		});	

	playButton.addEventListener('click',()=>{
		if(tocandoPausado == 2){
			playButton.style.display = 'none';
			pause.style.display = 'block';
			tocandoPausado = 1;
			audio.play();
		}
			
		});

document.addEventListener('click',(e)=>{
	if(e.target.classList.contains('number') || e.target.classList.contains('velocity-options') || 
		e.target.classList.contains('velocity') || e.target.classList.contains('velocity-span') ||
		e.target.classList.contains('velocity-numbers')){
		velocityOptions.style.display = 'block';
	}else{
		velocityOptions.style.display = 'none';
	}
});
	goNext.addEventListener('click',()=>{
		if(tocandoPausado == 1 || tocandoPausado == 2){
			nextSong();
		}
	});
	goBack.addEventListener('click',()=>{
		if(tocandoPausado == 1 || tocandoPausado == 2){
			prevSong();
		}
	});
let trajectoryInner = document.querySelector('.trajectory-inner');
	audio.addEventListener('timeupdate',(e)=>{
	 		const {duration, currentTime} = e.target;
	 		let porcentagem = ((currentTime / duration) * 100);
	 		trajectoryInner.style.width = `${porcentagem}%`;
	 		let s = parseInt(currentTime % 60);
	 		if(s < 10){
	 			s = `0${s}`;
	 		}
	 		let m =  parseInt((currentTime / 60) % 60);
	 		minutosPercorridos.innerHTML = `${m}:${s}`;
	 		let minutesLeft = duration - currentTime;
	 		let sMinLeft = parseInt(minutesLeft % 60);
	 		if(sMinLeft < 10){
	 			sMinLeft = `0${sMinLeft}`;
	 		}
	 		let mMinLeft = parseInt((minutesLeft / 60) % 60);
	 		minutosFaltando.innerHTML = `-${mMinLeft}:${sMinLeft}`;
	 	});

	audio.addEventListener('ended',()=>{
		if(repeatButton.querySelector('i').classList.contains('aleatorio')){
			this.currentTime = 0;
			audio.play();
		}else{
			pause.style.display = 'none';
			playButton.style.display = 'block';
			nextSong();
		}
	});
	randomButton.addEventListener('click',()=>{
		if(randomButton.querySelector('i').classList.contains('aleatorio')){
			randomButton.querySelector('i').classList.remove('aleatorio');
		}else{
			randomButton.querySelector('i').classList.add('aleatorio');
			proximaFaixa.innerHTML = `<span>Próxima Faixa:</span> não definido`;
		}
	});
	repeatButton.addEventListener('click',()=>{
		if(repeatButton.querySelector('i').classList.contains('aleatorio')){
			repeatButton.querySelector('i').classList.remove('aleatorio');
		}else{
			repeatButton.querySelector('i').classList.add('aleatorio');
			if(key !== undefined){
				proximaFaixa.innerHTML = `<span>Próxima Faixa:</span> ${musicas[key].title}`;
			}else{
				proximaFaixa.innerHTML = `<span>Próxima Faixa:</span> não definido`;
			}
		}
	});
	let trajectory = document.querySelector('.trajectory');
	trajectory.addEventListener('click',(e)=>{
		if(tocandoPausado == 1 || tocandoPausado == 2){
			const width = trajectory.clientWidth;
			const clickX = e.offsetX;
			const duration = audio.duration;
			audio.currentTime = (clickX / width) * duration;
		}
	});
/*FUNCOES*/
	 function nextSong(){
	 	if(randomButton.querySelector('i').classList.contains('aleatorio')){
	 		position = Math.round(Math.random() * (musicas.length - 1));
	 		audio.src = musicas[position].songUrl;
			audioTitle.innerHTML = musicas[position].title;
			audioAuthor.innerHTML = musicas[position].author;
			audio.play();
			tocandoPausado = 1;
			pause.style.display = 'block';
			playButton.style.display = 'none';
			document.querySelectorAll('.musica-conjunto').forEach((item)=>{
				item.classList.remove('musicaTocando');
				item.querySelector('.audio-pause-button').style.display = 'none';
				item.querySelector('.audio-play-button').style.display = 'none';
			});
			document.querySelectorAll('.musica-conjunto')[position+1].classList.add('musicaTocando');
			document.querySelectorAll('.musica-conjunto')[position+1].querySelector('.audio-pause-button').style.display = 'block';
			document.querySelectorAll('.musica-conjunto')[position+1].querySelector('.audio-play-button').style.display = 'none';
			document.querySelectorAll('.musica-conjunto')[position+1].querySelector('.audio-pause-button').addEventListener('click',()=>{
				audio.pause();
				tocandoPausado = 2;
				document.querySelectorAll('.musica-conjunto')[position+1].querySelector('.audio-pause-button').style.display = 'none';
				document.querySelectorAll('.musica-conjunto')[position+1].querySelector('.audio-play-button').style.display = 'block';
				document.querySelectorAll('.musica-conjunto')[position+1].querySelector('.audio-play-button').addEventListener('click',()=>{
				document.querySelectorAll('.musica-conjunto')[position+1].querySelector('.audio-pause-button').style.display = 'block';
				document.querySelectorAll('.musica-conjunto')[position+1].querySelector('.audio-play-button').style.display = 'none';
				audio.play();
				tocandoPausado = 1;
			});
			});
	 	}else{
	 		if(key >= (musicas.length-1)){
	 			key = 0;
	 		}else{
	 			key++;
	 		}
	 		keyMaisUmExiste = key;
	 		audio.src = musicas[key].songUrl;
	 		audioTitle.innerHTML = musicas[key].title;
	 		audioAuthor.innerHTML = musicas[key].author;
	 		audio.play();
	 		tocandoPausado = 1;
	 		pause.style.display = 'block';
			playButton.style.display = 'none';
			document.querySelectorAll('.musica-conjunto').forEach((item)=>{
				item.classList.remove('musicaTocando');
				item.querySelector('.audio-pause-button').style.display = 'none';
				item.querySelector('.audio-play-button').style.display = 'none';
			});	
			document.querySelectorAll('.musica-conjunto')[key+1].classList.add('musicaTocando');
			document.querySelectorAll('.musica-conjunto')[key+1].querySelector('.audio-pause-button').style.display = 'block';
			document.querySelectorAll('.musica-conjunto')[key+1].querySelector('.audio-play-button').style.display = 'none';
				document.querySelectorAll('.musica-conjunto')[key+1].querySelector('.audio-pause-button').addEventListener('click',()=>{
				audio.pause();
				tocandoPausado = 2;
				document.querySelectorAll('.musica-conjunto')[key+1].querySelector('.audio-pause-button').style.display = 'none';
				document.querySelectorAll('.musica-conjunto')[key+1].querySelector('.audio-play-button').style.display = 'block';
				document.querySelectorAll('.musica-conjunto')[key+1].querySelector('.audio-play-button').addEventListener('click',()=>{
				document.querySelectorAll('.musica-conjunto')[key+1].querySelector('.audio-pause-button').style.display = 'block';
				document.querySelectorAll('.musica-conjunto')[key+1].querySelector('.audio-play-button').style.display = 'none';
				audio.play();
				tocandoPausado = 1;
			});
			});
				if(musicas[key+1] !== undefined){
					proximaFaixa.innerHTML = `<span>Próxima Faixa:</span> ${musicas[key+1].title}`;
				}else{
					proximaFaixa.innerHTML = `<span>Próxima Faixa:</span> ${musicas[0].title}`;
				}
				
	 	}
	 }

 function prevSong(){
	 		if(key <= 0){
	 			key = musicas.length-1;
	 		}else{
	 			key--;
	 		}
	 		keyMaisUmExiste = key;
	 		audio.src = musicas[key].songUrl;
	 		audioTitle.innerHTML = musicas[key].title;
	 		audioAuthor.innerHTML = musicas[key].author;
	 		audio.play();
	 		tocandoPausado = 1;
	 		pause.style.display = 'block';
			playButton.style.display = 'none';
			document.querySelectorAll('.musica-conjunto').forEach((item)=>{
				item.classList.remove('musicaTocando');
				item.querySelector('.audio-pause-button').style.display = 'none';
				item.querySelector('.audio-play-button').style.display = 'none';
			});	
			document.querySelectorAll('.musica-conjunto')[key+1].classList.add('musicaTocando');
			document.querySelectorAll('.musica-conjunto')[key+1].querySelector('.audio-pause-button').style.display = 'block';
			document.querySelectorAll('.musica-conjunto')[key+1].querySelector('.audio-play-button').style.display = 'none';
				document.querySelectorAll('.musica-conjunto')[key+1].querySelector('.audio-pause-button').addEventListener('click',()=>{
				audio.pause();
				tocandoPausado = 2;
				document.querySelectorAll('.musica-conjunto')[key+1].querySelector('.audio-pause-button').style.display = 'none';
				document.querySelectorAll('.musica-conjunto')[key+1].querySelector('.audio-play-button').style.display = 'block';
				document.querySelectorAll('.musica-conjunto')[key+1].querySelector('.audio-play-button').addEventListener('click',()=>{
				document.querySelectorAll('.musica-conjunto')[key+1].querySelector('.audio-pause-button').style.display = 'block';
				document.querySelectorAll('.musica-conjunto')[key+1].querySelector('.audio-play-button').style.display = 'none';
				audio.play();
				tocandoPausado = 1;
			});
			});
				if(musicas[key+1] !== undefined){
					proximaFaixa.innerHTML = `<span>Próxima Faixa:</span> ${musicas[key+1].title}`;
				}else{
					proximaFaixa.innerHTML = `<span>Próxima Faixa:</span> ${musicas[0].title}`;
				}
	 }
/*END OF FUNCOES*/