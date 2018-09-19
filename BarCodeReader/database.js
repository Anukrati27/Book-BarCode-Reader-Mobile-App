import Expo, { SQLite } from 'expo';

const database_name = 'webMobile.db'
const database_version = '1.0'
const database_displayname = 'SQLite Test Database'
const database_size = 200000
let db

export class ReactNativeSQLite2Test {
  static myInstance = null;
  constructor(props) {
      this.state = {
      record: [],
    };
  }
  
  static getInstance() {
    if (ReactNativeSQLite2Test.myInstance == null) {
      ReactNativeSQLite2Test.myInstance = new ReactNativeSQLite2Test();
        this.myInstance.initialiseDB();
    }

    return this.myInstance;
}

  componentWillUnmount () {
    db.close()
  }

  errorCB = (err) => {
    console.log('error: ', err)
    return false
  }

  deleteCB = () => {
    console.log('Database DELETED')
  }

  populateDB = (tx) => {
    tx.executeSql('DROP TABLE IF EXISTS Book;')
    tx.executeSql('CREATE TABLE IF NOT EXISTS Book( ' +
      'bookId INTEGER PRIMARY KEY NOT NULL, ' +
      'isbn INTEGER, ' +
      'title VARCHAR(60) NOT NULL, ' +
      'authors VARCHAR(60) , ' +
      'pageCount INTEGER, ' +
      'publisher VARCHAR(60) ); ', [], this.successCB, this.errorCB)
  }

  insertDataInDB  = (data) =>{
    db.transaction(
      tx => {
        tx.executeSql('INSERT INTO Book(isbn, title, authors, pageCount, publisher) VALUES '
          +'(?,?,?,?,?);', [data[0],data[1],data[2],data[3],data[4]])
      },
      this.errorCB
    );
  }


 fetchData(callback){
    return new Promise(function(resolve,reject) {
    db.transaction(
       (tx) => {
        tx.executeSql('SELECT * FROM Book;', [], (tx, results) => {
            console.log("Query completed");
            var len = results.rows.length;
            resolve(results);
        });
      });
      });
  }

  initialiseDB = () => {
    db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size, this.openCB, this.errorCB)
    db.transaction(this.populateDB, this.errorCB, () => {
      console.log('Transaction is now finished')
    })
  }
};


