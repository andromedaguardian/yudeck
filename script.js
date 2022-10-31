const { jsPDF } = window.jspdf;

const input = document.getElementById("input");
const btn = document.getElementById("btn");
const btnSave = document.getElementById("btn-save");
const preview = document.getElementById("preview");

input.addEventListener('change', updatePreview);

btn.addEventListener('click', (e)=>{
	if(input){
		input.click();
	}
},false);

btnSave.addEventListener('click', (e)=>{
	if(input.files.length === 0){
		clearPreview();
		const para = document.createElement('p');
		para.textContent = "Para salvar, selecione os arquivos primeiro";
		para.className="error";
		//para.style="color: red";
		preview.appendChild(para);
		return;
	}
	const doc = new jsPDF({unit: 'in', format:'a4'});
	
	const margin = 0.57;
	const width = 2.25;
	const height = 3.25;
	const offset = 0.15;
	let x = margin;
	let y = margin;
	let hcards = 0;
	let vcards = 0;
	let count = 0;
	for(file of input.files){
		const img = new Image();
		img.src = URL.createObjectURL(file);
		format = file.name.split('.')[1];
		doc.addImage(img, format, x, y, width, height);
		x += width + offset;
		hcards += 1;
		count += 1;
		if(hcards >= 3){
			x = margin;
			y += height + offset;
			vcards += 1;
			hcards = 0;
			if(vcards >= 3){
				y = margin;
				vcards = 0;
				if(count < input.files.length){
					doc.addPage();
				}
			}
		}

	}
	const timestamp = new Date().getTime();
	doc.save("YUGIOHCARDS" + timestamp + ".pdf");
	input.value = '';
},false);


function updatePreview(){
	clearPreview();
	const curFiles = input.files;
	if(curFiles.length === 0){
		const para = document.createElement("p");
		para.textContent = "Nenhum arquivo Selecionado";
		preview.appenChild(para);
	}else {
		const n_sel_files = document.createElement('p');
		n_sel_files.textContent = curFiles.length + ' arquivos selecionados';
		preview.appendChild(n_sel_files);
		/*
		for(file of curFiles){
			const img = document.createElement('img');
			img.src = URL.createObjectURL(file);
			img.style="width:40px;height:40px;objec-fit:contain;";

			const para = document.createElement('p');
			para.textContent = file.name;

			preview.appendChild(img);
			preview.appendChild(para);
		}
		*/
	}
}

function clearPreview(){
	while(preview.firstChild){
		preview.removeChild(preview.firstChild);
	}
}
