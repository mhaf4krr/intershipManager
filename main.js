document.querySelector('#data-management').className='hidden';

document.querySelector('#mode').addEventListener('change',(event)=> {
   
    if(event.target.value === 'admin')
    {
        document.querySelector('#control-panel').className='show';
        document.querySelector('#user-register-div').className='hidden';
        document.querySelector('#data-management').className='hidden';

    }
    
    if(event.target.value === 'registeration')
    {
        document.querySelector('#control-panel').className='hidden';
        document.querySelector('#user-register-div').className='show';
        document.querySelector('#data-management').className='hidden';

    }

    if(event.target.value === 'data-management')
    {
        document.querySelector('#data-management').className='show';
        document.querySelector('#control-panel').className='hidden';
        document.querySelector('#user-register-div').className='hidden';

    }



  
})

let status = document.querySelector('#register-status');

document.querySelector('#user-register-form').addEventListener('submit',(event)=>{
    event.preventDefault();
    let uidMessage = addStudent();
    status.innerHTML = `<p class ="success"> User Registered Successfully . Please Note down <b style="color:black">${uidMessage}</b> for your Reference </p>`;
   
   
})



class Student{
    constructor(firstName,lastName,RollNo,email,p1,p2,p3,uid){
        this.firstName = firstName;
        this.lastName = lastName;
        this.RollNo = RollNo;
        this.email = email;
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.uid = uid;
    }
}

let userList=[];
let filteredList = userList;

updateLocalData = () => {
   localStorage.setItem('list',JSON.stringify(userList));
    
}

addStudent = ()=> {
    let first = document.querySelector('#firstName').value.toUpperCase();
    let last = document.querySelector('#lastName').value.toUpperCase();
    let roll = document.querySelector('#rollNo').value.toUpperCase();
    let email = document.querySelector('#user-email').value.toUpperCase();
    let p1 = document.querySelector('#Preference1').value.toUpperCase();
    let p2 = document.querySelector('#Preference2').value.toUpperCase();
    let p3 = document.querySelector('#Preference3').value.toUpperCase();
    let uid = `${first}-${roll}`;
    let tempUser = new Student(first,last,roll,email,p1,p2,p3,uid);
    userList.push(tempUser);
    updateLocalData();
    return uid;
    
}

updateList = ()=> {
    if(JSON.parse(localStorage.getItem('list')))
    userList = JSON.parse(localStorage.getItem('list'));
    else userList = [];
} 


window.onload = ()=> {
    updateList();
}

renderList = (list,searchText,criteria) => {

    if(criteria ==='firstName'){

    filteredList = list.filter( (student)=>{
        return student.firstName.includes(searchText); 
     }) }


     else if(criteria === 'preference') {
        filteredList = list.filter( (student)=>{
            return student.p1.includes(searchText); 
         })}

    else if(criteria === 'uid') {
        filteredList = list.filter( (student)=>{
            return student.uid.includes(searchText); 
         })}
     
    else if(criteria === 'roll') {
            filteredList = list.filter( (student)=>{
                return student.RollNo.includes(searchText); 
             })}

   

             console.log(`${searchText} and ${criteria}`)

             console.log(filteredList);

          

    showFilteredList();
}

showFilteredList = ()=> {
    document.querySelector('#table1').innerHTML = `<thead> 
    <tr>
        <th>S.No</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Roll No</th>
        <th>PREFERENCE 1</th>
        <th>PREFERENCE 2</th>
        <th>PREFERENCE 3</th>
    </tr>
    </thead>
<tbody id='result'>
</tbody>`

    let i=1;
    filteredList.forEach((student)=> {
        InsertIntoTable(i,student.firstName,student.lastName,student.RollNo,student.p1,student.p2,student.p3);
        i++   
    })

    let button = document.createElement('button');
    button.textContent="print";
    button.setAttribute('onclick','printTable()');
    document.querySelector('#table1').appendChild(button);
}

function InsertIntoTable(i,Fname,Lname,RollNo,P1,P2,P3)
{
    const table = document.querySelector('#table1');
    let tr = document.createElement('tr');

    let td0 = document.createElement('td');
    let ti = document.createTextNode(`${i}`);
    td0.appendChild(ti);
    tr.appendChild(td0);

    let td1 = document.createElement('td');
    let tFN = document.createTextNode(`${Fname}`);
    td1.appendChild(tFN);
    tr.appendChild(td1);

    let td2 = document.createElement('td');
    let tLN = document.createTextNode(`${Lname}`);
    td2.appendChild(tLN);
    tr.appendChild(td2);

    let td3 = document.createElement('td');
    let tRN = document.createTextNode(`${RollNo}`);
    td3.appendChild(tRN);
    tr.appendChild(td3);

    let td4 = document.createElement('td');
    let tP1 = document.createTextNode(`${P1}`);
    td4.appendChild(tP1);
    tr.appendChild(td4);

    let td5 = document.createElement('td');
    let tP2 = document.createTextNode(`${P2}`);
    td5.appendChild(tP2);
    tr.appendChild(td5);

    let td6 = document.createElement('td');
    let tP3 = document.createTextNode(`${P3}`);
    td6.appendChild(tP3);
    tr.appendChild(td6);

    table.appendChild(tr);

  
}

printTable = ()=> {
    console.log('in function');
    let temp = document.querySelector('#display-board').innerHTML;
    let holdthis = document.body.innerHTML;
    document.body.innerHTML=temp;
    window.print();
    document.body.innerHTML = holdthis;
}

document.querySelector('#search-button').addEventListener('click',()=> {
    let searchText = document.querySelector('#searchText').value.toUpperCase();
    let criteria = document.querySelector('#criteria').value;
    document.querySelector('#table1').innerHTML = '';
    renderList(userList,searchText,criteria);
})

document.querySelector('#control-panel').className='hidden';

dataExport = () => {
    document.querySelector('#data-file').value = (localStorage.getItem('list'));
    document.querySelector('#notify').innerHTML  = `<p style="color:green;background:white"> Data Has Been Exported . Please take your Backup</p>`
    setTimeout(()=>{
        document.querySelector('#notify').innerHTML ='';
    },2500)
}

dataImport = ()=> {
    localStorage.setItem('list',(document.querySelector('#data-file').value));
    document.querySelector('#notify').innerHTML = `<p style="color:green;background:white"> Data Has Been Imported .</p>`
    setTimeout(()=>{
        document.querySelector('#notify').innerHTML ='';
    },2500)

    updateList();
}

document.querySelector('#import').addEventListener('click', (event)=> {
    dataImport();
})

document.querySelector('#export').addEventListener('click',(event) => {
    dataExport();
})


document.querySelector('#display-all').addEventListener('click',(event)=> {
    filteredList = userList;
    showFilteredList();
})