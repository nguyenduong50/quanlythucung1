'use strict';
//VARIABLE
const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");
const bmiBtn = document.getElementById("bmi-btn");

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const tbody = document.getElementById("tbody");

let listPet = [
    {id: 'P001', name: 'Tom', age: 3, type: 'Cat', weight: 3, length: 20, color: '#000000', breed: 'Tabby', vaccinated: true, dewormed: true, sterilized: true, bmi: 0, date: new Date()},
    {id: 'P002', name: 'Type', age: 5, type: 'Dog', weight: 5, length: 30, color: '#ffc107', breed: 'Mixed Breed', vaccinated: true, dewormed: false, sterilized: false, bmi: 0, date: new Date()},
    {id: 'P003', name: 'Type1', age: 5, type: 'Dog', weight: 5, length: 30, color: '#000000', breed: 'Mixed Breed', vaccinated: false, dewormed: true, sterilized: false, bmi: 0, date: new Date()},
    {id: 'P004', name: 'Type2', age: 5, type: 'Dog', weight: 5, length: 30, color: '#ffc107', breed: 'Mixed Breed', vaccinated: false, dewormed: false, sterilized: true, bmi: 0, date: new Date()},
    {id: 'P005', name: 'Type3', age: 5, type: 'Dog', weight: 5, length: 30, color: '#000000', breed: 'Mixed Breed', vaccinated: true, dewormed: true, sterilized: true, bmi: 0, date: new Date()},
    {id: 'P006', name: 'Type4', age: 5, type: 'Dog', weight: 5, length: 30, color: '#000000', breed: 'Mixed Breed', vaccinated: true, dewormed: true, sterilized: false, bmi: 0, date: new Date()},
    {id: 'P007', name: 'Type5', age: 5, type: 'Dog', weight: 5, length: 30, color: '#ffc107', breed: 'Mixed Breed', vaccinated: false, dewormed: true, sterilized: true, bmi: 0, date: new Date()},
    {id: 'P008', name: 'Tom2', age: 3, type: 'Cat', weight: 3, length: 20, color: '#000000', breed: 'Tabby', vaccinated: true, dewormed: true, sterilized: true, bmi: 0, date: new Date()},
];

let isShowHealthy = false;

//METHOD
function showListPetTable(list){
    tbody.innerHTML = '';
    
    for(let i = 0; i <= list.length - 1; i++){
        const row = document.createElement('tr');
        let vaccin = 'bi bi-x-circle-fill';
        let deworm = 'bi bi-x-circle-fill';
        let steriliz = 'bi bi-x-circle-fill';
        list[i].vaccinated ?  vaccin = 'bi bi-check-circle-fill' : vaccin = 'bi bi-x-circle-fill';
        list[i].dewormed ?  deworm = 'bi bi-check-circle-fill' : deworm = 'bi bi-x-circle-fill';
        list[i].sterilized ?  steriliz = 'bi bi-check-circle-fill' : steriliz = 'bi bi-x-circle-fill';

        row.innerHTML = '<td>' + list[i].id + '</td>' + '<td>' + list[i].name + '</td>' + '<td>' + list[i].age + '</td>' + 
                        '<td>' + list[i].type + '</td>' + 
                        '<td>' + list[i].weight + '</td>' + '<td>' + list[i].length + '</td>' +
                        '<td>' + list[i].breed + '</td>' + '<td>' + '<i class="bi bi-square-fill" style="color: ' + list[i].color +'"></i>' + '</td>' +
                        '<td>' + '<i class="' + vaccin + '"></i>' + '</td>' + '<td>' + '<i class="' + deworm + '"></i>' + '</td>' + 
                        '<td>' + '<i class="' + steriliz + '"></i>' + '</td>' + 
                        '<td>' + (list[i].bmi > 0 ? list[i].bmi : '??') + '</td>' +
                        '<td>' + list[i].date.getDate() + '/' + list[i].date.getMonth() + '/' + list[i].date.getFullYear() + '</td>' +
                        `<td> <button type="button" id="deleteBtn" class="btn btn-danger" onclick="deletePet('${i}')">Delete</button> </td>`;

        tbody.appendChild(row);
    }
}

function clearInput(){
    idInput.value = '';
    nameInput.value = '';
    ageInput.value = '';
    typeInput.value = 'Select Type';
    weightInput.value = '';
    lengthInput.value = '';
    colorInput.value = '#000000';
    breedInput.value = 'Select Breed';
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
}

function deletePet(i){
    if(confirm('Are you delete?')){
        listPet.splice(i,1);
        showListPetTable(listPet);
    }
}

function showHealthyPet(){
    let listHealthyPet = listPet.filter(function(item){
        return item.vaccinated === true && item.dewormed === true && item.sterilized === true;
        
    })

    showListPetTable(listHealthyPet);
}

function callBMI(weight, length, type){
    if(type === 'Dog'){
        return (weight * 703) / (length ** 2);
    }

    if(type === 'Cat'){
        return (weight * 886) / (length ** 2);
    }
}

//EVENT
submitBtn.addEventListener('click', function(){
    const dataPet = {
        id: idInput.value,
        name: nameInput.value,
        age: parseInt(ageInput.value),
        type: typeInput.value,
        weight: parseInt(weightInput.value),
        length: parseInt(lengthInput.value),
        color: colorInput.value,
        breed: breedInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,
        date: new Date(),
    }
  
    let validate = true;

    function validateInput(dataPet){
        let inputString = true;
        let inputNumber = true;

        for(let dataInput in dataPet){
            if(String(typeof(dataPet[dataInput]) === "number") && Number.isNaN(dataPet[dataInput]) ){
                validate = false;
                inputNumber = false;
            }

            if( String(typeof(dataPet[dataInput])) === "string" && dataPet[dataInput] === "" ){
                validate = false;
                inputString = false;
            } 

            // if( String(typeof(dataPet[dataInput])) === "string" && (dataPet[dataInput] === "" || dataPet[dataInput].substring(0,6) === "Select") ){
            //     alert('Input missing data');
            //     validate = false;
            // } 
        }

        if(!inputNumber){
            alert('Input missing data Age, Weight, Length');
        }
        
        if(!inputString){
            alert('Input missing data ID, Name');
        }

        if(dataPet.age < 1 || dataPet.age > 15){
            alert("Age must be between 1 and 15!");
            validate = false;
        }

        if(dataPet.weight < 1 || dataPet.weight > 15){
            alert("Weight must be between 1 and 15!");
            validate = false;
        }

        if(dataPet.length < 1 || dataPet.length > 100){
            alert("Length must be between 1 and 100!");
            validate = false;
        }

        if(dataPet.type === "Select Type"){
            alert("Please select Type!");
            validate = false;
        }

        if(dataPet.breed === "Select Breed"){
            alert("Please select Breed!");
            validate = false;
        }

        for(let i = 0; i <= listPet.length - 1; i++){
            if(dataPet.id === listPet[i].id){
                alert('ID must be unique!');
                validate = false;
            }
        }
    }

    validateInput(dataPet);

    if(validate){
        listPet.push(dataPet);
        showListPetTable(listPet);
        clearInput();
    }

})

healthyBtn.addEventListener('click', function(){
    isShowHealthy = !isShowHealthy;

    if(isShowHealthy){
        healthyBtn.innerHTML = 'Show All Pet';
        showHealthyPet();
    }
    else{
        healthyBtn.innerHTML = 'Show Healthy Pet';
        showListPetTable(listPet);
    }

    

})

bmiBtn.addEventListener('click', function(){
    for(let i = 0; i <= listPet.length - 1; i++){
        listPet[i].bmi = callBMI(listPet[i].weight, listPet[i].length, listPet[i].type).toFixed(2);
    }

    showListPetTable(listPet);
})

//DEFAULT
showListPetTable(listPet);

//MAIN PROGRAM

