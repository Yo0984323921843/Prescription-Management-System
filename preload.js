const { contextBridge, ipcRenderer } = require('electron')
// const Chart = require('chart.js');
// const sqlite3 = require('sqlite3');
// const db = new sqlite3.Database('./database.db');


contextBridge.exposeInMainWorld('api', {
  // node: () => process.versions.node,
  // chrome: () => process.versions.chrome,
  // electron: () => process.versions.electron,
  // ping: () => ipcRenderer.invoke('ping'),
  users: ()=>  ipcRenderer.invoke('db-query',"select * from users"),
  drugs:()=>ipcRenderer.invoke('drug-query',"select * from drugs"),
  addCustomers:(data)=>ipcRenderer.invoke('add-customer',"select * from customers",data),
  getcustomers:()=>ipcRenderer.invoke('get-customers',""),
  addSales:(data)=>ipcRenderer.invoke('add-sales',"select * from sales",data),
  getSales:()=>ipcRenderer.invoke('get-sales',""),
  getSaleItems:(index)=>ipcRenderer.invoke('get-saleItems',"",index),
  deleteSale:(index)=>ipcRenderer.invoke('delete-sale',"",index),
  getLastId:()=>ipcRenderer.invoke('get-last-id',""),
  addSaleItems:(data)=>ipcRenderer.invoke('add-sale-items',"",data),
  deleteSaleItems:(index)=>ipcRenderer.invoke('delete-sale-items',"",index)

})
// contextBridge.exposeInMainWorld('versions', {
//   node: () => process.versions.node,
//   chrome: () => process.versions.chrome,
//   electron: () => process.versions.electron,
//   // we can also expose variables, not just functions
// })
