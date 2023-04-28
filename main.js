const { app, BrowserWindow, ipcMain, Menu } = require("electron");
// const { width, height } = screen.getPrimaryDisplay().workAreaSize;
const url = require("url");
const path = require("path");
const createWindow = () => {
  const win = new BrowserWindow({
    width: "100vw",
    height: "100vh",
    webPreferences: {
      // nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  //   const mainMenu = Menu.buildFromTemplate([{
  //     label:"Quit",
  //     accelerator: process.platform == 'darwin'?'command+Q':'Ctrl+Q',
  //     click(){
  //       app.quit();
  //     }
  //   }]);
  // Menu.setApplicationMenu(mainMenu);
  // ipcMain.handle('ping', () => 'yoyo')
  const sqlite3 = require("sqlite3");
  const db = new sqlite3.Database("./database.db");
  db.serialize(() => {
    db.run("select email_id from users");
  });

  ipcMain.handle("db-query", async (event, sqlQuery) => {
    return new Promise((res) => {
      db.all(sqlQuery, (err, rows) => {
        // console.log('here', rows)// it displays in terminal
        res(rows);
      });
    });
  });

  ipcMain.handle("drug-query", async (event, sqlQuery) => {
    return new Promise((res) => {
      db.all(sqlQuery, (err, rows) => {
        // console.log('checking for drugs', rows[0])// it displays in terminal
        res(rows);
      });
    });
  });

  ipcMain.handle("add-customer", async (event, sqlQuery, data) => {
    const sql = `insert into customers(first_name,middle_name,last_name,email_id,house_no,street_name,mobile_no,post_code,record,dob,allergy) values('${data.first_name}','${data.middle_name}','${data.last_name}','${data.email}','${data.house_no}','${data.street_name}','${data.contact}','${data.post_code}','${data.record}','${data.dob}','${data.allergy}')`;
    return new Promise((res) => {
      db.all(sql, (err, rows) => {
        // res(rows);
      });
    });
  });

  ipcMain.handle("get-customers", async (event, sqlQuery) => {
    const sql = `select c.id,c.email_id ,c.mobile_no,c.dob ,c.mobile_no ,(c.house_no || " "|| c.street_name|| " "|| c.post_code || " "||c.city) address, (c.first_name||" "||c.middle_name||" "||c.last_name)name  ,GROUP_CONCAT(h.history) history, GROUP_CONCAT(h.allergy) allergy,h.date from customers c join customer_medical_history h on c.id = h.customer_id group by c.id`
    console.log('sql ',sql);
    return new Promise((res) => {
      db.all(sql, (err, rows) => {
        res(rows);
        console.log(rows)
      });
    });
    // return await db.all(sqlQuery,(err,res)=>{
    //   console.log('ress ',res)
    // })
  });
  //

  ipcMain.handle("get-last-id", async (event, sqlQuery, data) => {
    const sql = "select MAX(id) from sales";
    return new Promise((res) => {
      db.all(sql, (err, rows) => {
        res(rows);
        console.log(rows);
      });
    });
  });

  ipcMain.handle("add-sale-items", async (event, sqlQuery, data) => {
    const sale_items = data.sale_items;
    const last_id = data.last_id;
    for (i = 0; i < sale_items.length; i++) {
      let id = i + 1;
      const sql3 = `insert into sale_items(product_seq,drug_id,quantity,price,sale_id) values('${id}','${sale_items[i].drug}','${sale_items[i].quantity}','${sale_items[i].price}','${last_id}')`;
      console.log("sql", sql3);
      new Promise((res) => {
        db.all(sql3, (err, rows) => {
          res(rows);
          console.log("rows ", rows);
          // start to adding sale item
          // end to sale item
        });
      });
    }

    // window.location.href= "src/prescription.html"
  });

  ipcMain.handle("add-sales", async (event, sqlQuery, data) => {
    const sql1 = `insert into sales(customer_id,total_cost,ship_to) values('${data.customer_id}','${data.final_cost}','${data.ship_to}')`;
    return new Promise((res) => {
      db.all(sql1, (err, rows) => {
        res(rows);
        console.log("rows ", rows);
        // start to get max
        const sql = "select MAX(id) from sales";
        new Promise((res) => {
          db.all(sql, (err, rows) => {
            res(rows);
            //start to add sale
            const sale_items = data.sale_items;
            const last_id = rows[0]["MAX(id)"];
            for (i = 0; i < sale_items.length; i++) {
              let id = i + 1;
              const sql3 = `insert into sale_items(product_seq,drug_id,quantity,price,sale_id) values('${id}','${sale_items[i].drug}','${sale_items[i].quantity}','${sale_items[i].price}','${last_id}')`;
              console.log("sql", sql3);
              new Promise((res) => {
                db.all(sql3, (err, rows) => {
                  res(rows);
                  console.log("rows ", rows);
                  // start to adding sale item
                  // end to sale item
                });
              });
            }

            //ed to add sale
          });
        });
        // end to get max
      });
    });
  });

  ipcMain.handle("get-sales", async (event, sqlQuery) => {
    const sql = `select s.id,c.name,s.total_cost,s.ship_to from sales s join customers c on s.customer_id = c.id `;

    return new Promise((res) => {
      db.all(sql, (err, rows) => {
        res(rows);
        // console.log('rowss ',rows)
        // res.send(rows)
      });
    });
  });
  ipcMain.handle("get-saleItems", async (event, sqlQuery, index) => {
    const sql = `select s.id, s.sale_id,s.product_seq,d.drug_name,s.quantity,s.price from sale_items s join drugs d on s.drug_id = d.id where s.sale_id = ${index}`;
    return new Promise((res) => {
      db.all(sql, (err, rows) => {
        res(rows);
      });
    });
  });

  ipcMain.handle("delete-sale-items", async (event, sqlQuery, index) => {
    const sql = `delete from sale_items where sale_id= ${index}`;
    return new Promise((res) => {
      db.all(sql, (err, rows) => {
        res(rows);
      });
    });
  });
  ipcMain.handle("delete-sale-item", async (event, sqlQuery, index) => {
    const sql = `delete from sale_items where id= ${index}`;
    return new Promise((res) => {
      db.all(sql, (err, rows) => {
        res(rows);
      });
    });
  });
  ipcMain.handle("delete-sale", async (event, sqlQuery, index) => {
    const sql = `delete from sales where id= ${index}`;
    return new Promise((res) => {
      db.all(sql, (err, rows) => {
        res(rows);
      });
    });
  });
  //
  win.loadFile("./src/index.html");
};

app.whenReady().then(() => {
  // const displays = screen.getAllDisplays()
  // console.log('ele ',displays
  // )

  createWindow();
});
