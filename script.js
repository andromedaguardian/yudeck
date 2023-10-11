const { jsPDF } = window.jspdf;

const input = document.getElementById("input");
const btnSelect = document.getElementById("btn-select");
const btnSave = document.getElementById("btn-save");
const preview = document.getElementById("preview");

input.addEventListener('change', updatePreview);
btnSave.addEventListener('click', generatePDF);

btnSelect.addEventListener('click', (e)=>{
	if(input){
		input.click();
	}
},false);


function generatePDF(){
	const numberOfFiles = input.files.length

	const doc = new jsPDF({unit: 'in', format:'a4'});
	
	const col = 3;
	const row = 3;	
	const margin = 0.58;
	const width = 2.25;
	const height = 3.25;
	const offset = 0.15;

	let i = 0;
	while(i < numberOfFiles){
		const file = input.files[i];
    		const img = new Image();
    		const format = file.name.split('.')[1];
		const x = margin + ((width + offset) * (i % col));
		const y = margin + ((height + offset) * (Math.floor(i / col) % row));  

    		img.src = URL.createObjectURL(file);
    		doc.addImage(img, format, x, y, width, height);
	
		i++;
		if(((i % (row * col))  === 0) && (i < numberOfFiles)){
			doc.addPage();
		}

	}

	const timestamp = new Date().getTime();
	doc.save("YUGIOHCARDS" + timestamp + ".pdf");

	input.value = "";
	btnSave.setAttribute("disabled", "disabled");
	preview.innerHTML = "Concluído";
	preview.style.color = "chartreuse";
}


function updatePreview(){
	clearPreview();
	const curFiles = input.files;
	const numberOfFiles = curFiles.length;
	const para = document.createElement("p");
	if(numberOfFiles === 0){
		btnSave.setAttribute("disabled", "disabled");
		btnSave.ariaDisabled = true;
		para.textContent = "Nenhum arquivo Selecionado";
	}else {
		btnSave.removeAttribute("disabled");
		btnSave.ariaDisabled = false;

		let text = (numberOfFiles === 1 ) ? ' arquivo selecionado' : ' arquivos selecionados';

		para.textContent = numberOfFiles + text;
	}
	preview.appendChild(para);
}

function clearPreview(){
	while(preview.firstChild){
		preview.removeChild(preview.firstChild);
	}
}
