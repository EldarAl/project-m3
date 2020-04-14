const sorting = document.querySelector('.sort');
const mainDiv = document.querySelector('.borderblock');
const div = document.querySelector('.input');
const button = document.querySelector('.button');
button.addEventListener('click', addList);
let sortImg = document.querySelector('.sortimage');
let deleteButtons = document.querySelectorAll('.delete');

//Создаем список
function addList () {
    const divclone = div.cloneNode(true);
    divclone.children[1].value = '';
    mainDiv.append(divclone);
    deleteButtons = document.querySelectorAll('.delete');

    createDrag ();
    addClickListener();  

}
//Создаем drag&drop
function createDrag (){
    const dragable = document.querySelectorAll('.drag');
    dragable.forEach((item) => {
        item.addEventListener('dragstart', ()=>{
            //Добавляем класс поднятым элементам
            item.parentNode.classList.add('changecolor');
            // console.log('najal')
        });
        item.addEventListener('dragend', ()=>{
            //Удаляем класс опущенным элементам
            item.parentNode.classList.remove('changecolor');
            // console.log('otpustil')
    
        })
    });

    mainDiv.addEventListener('dragover', (e)=>{
        console.log('dviqayu');
        e.preventDefault();
        let afterElement = getDragAfterElements(mainDiv, e.clientY)
        let draggable = document.querySelector('.changecolor');
        if (afterElement == null) {
            mainDiv.appendChild(draggable);
        } else {
            mainDiv.insertBefore(draggable, afterElement);
        }
    })

    
}




function getDragAfterElements(mainDiv, y) {
    let draggableElements = Array.from(mainDiv.querySelectorAll('.input:not(.changecolor)'));
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
};






//Создаем функцию создающая слушатель для каждой кнопки списка
function addClickListener (){
deleteButtons.forEach((item)=> {
    item.addEventListener('click', (e) => {
                e.target.parentElement.parentElement.remove();
            })
})
}

sorting.addEventListener('click', startSort);

//Получаем массив
function getArr(){
    let inputs = document.querySelectorAll('input');
    sortImg.classList.toggle('sorted');
    let arr = [];
    inputs.forEach((item) =>{
        arr.push(item.value);
    })
    return arr
    }




//Сортируем список
function alphabetlySort (){
    let inputs = document.querySelectorAll('input');
    let arr = getArr();
    arr.sort();
    for(let i = 0; i < inputs.length; i++){
        inputs[i].value = arr[i];
}

}


//Реверсивная сортировка 
function reverseSort () {
    let inputs = document.querySelectorAll('input');
    let arr = getArr();
    arr.reverse();
    for(let i = 0; i < inputs.length; i++){
    inputs[i].value = arr[i];
}
}
//Функция определяющая тип сортировки
function startSort () {
    if(sortImg.classList.contains('sorted')){
        reverseSort();
    }else{
        alphabetlySort();
    }
}





