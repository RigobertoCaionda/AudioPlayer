let reproducerButton = document.querySelector('.reproducer');
let libraryButton = document.querySelector('.library');
let aboutReproducer = document.querySelector('.about-reproducer');
let velocity = document.querySelector('.velocity');
velocityOptions = document.querySelector('.velocity-options');
let songList = document.querySelector('.song-list');
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
});
velocity.addEventListener('click',()=>{
	velocityOptions.style.display = 'block';
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
document.querySelector('.audio-play-button').addEventListener('click',()=>{
	alert('oi');
});

/*FUNCOES*/
	 
/*END OF FUNCOES*/