const fs = require('fs');
const path = require('path');

const loger = (product,action) => {
    fs.readFile(path.join(__dirname,'db/log.json'), 'utf-8',(err,data)=>{
        if (err) {
            console.log(err);
        } else {
            const stats = JSON.parse(data);
            let now = new Date();
            stats.push({
                Datetime: `${(now.getDate())}-${now.getMonth()}-${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
                Product: product,
                action: action,
            });
            fs.writeFile(path.join(__dirname,'db/log.json'),JSON.stringify(stats,null,4),(err)=>{
                if (err){console.log(err);}
            });
        }
    });
};
module.exports = loger;