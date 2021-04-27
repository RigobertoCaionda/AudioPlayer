let reproducerButton = document.querySelector('.reproducer');
let libraryButton = document.querySelector('.library');
libraryButton.addEventListener('click',()=>{
	libraryButton.querySelector('span').style.color = '#7a7a7a7a';
	libraryButton.style.borderBottom = '3px solid #7a6cc3';
	reproducerButton.querySelector('span').style.color = '#76786d';
	reproducerButton.style.borderBottom = 'none';
});

reproducerButton.addEventListener('click',()=>{
	reproducerButton.querySelector('span').style.color = '#7a7a7a7a';
	reproducerButton.style.borderBottom = '3px solid #7a6cc3';
	libraryButton.querySelector('span').style.color = '#76786d';
	libraryButton.style.borderBottom = 'none';
});

/*FUNCOES*/
	 
/*END OF FUNCOES*/