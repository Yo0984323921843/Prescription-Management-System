// const { safeStorage } = require('electron')

const information = document.getElementById('info');
// information.innerText = `Yogita -This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`
// information.innerText = `Yogita `

const func = async () => {
    const response = await window.api.users()
    const drugs = await window.api.drugs()

    //initial load you can set here logic
    // console.log('yoyo',response) // prints out 'pong'
    // document.getElementById("email_id").value = response[0].email_id;     

  }
  
  func()


  // document.addEventListener('DOMContentLoaded',async()=>{
  //   let email_id = await window.api.rows();
  //   console.log('users ',email_id);

  // })



  document.querySelector("#login-btn").addEventListener("click", async () => {
    //get data with geteleid and check with database 
    
    const username = document.getElementById("email_id").value;
    const password = document.getElementById("password").value;

    // const pwd = safeStorage.encryptString('Admin@123');
    // safeStorage.decryptString(encrypted)
    // console.log('pwddd ',pwd)
    let users = await window.api.users();

      let chk = users.filter(item=> item.email_id === username && item.password === password)
      if(chk.length == 1){
        window.location.href = "dashboard.html";
      }

  });