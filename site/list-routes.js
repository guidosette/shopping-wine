const fs = require('fs');
const axios = require('axios');
const endOfLine = require('os').EOL;
const projectId =  "shopping-wine"
const newsDataPath = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/sitemap`;
const routesFile = './routes.txt';

axios.get(newsDataPath).then(res => {
  // console.log("res", res.data.documents);
  const routes = [];
  // var static = res.data.documents[1].fields.urls.arrayValue.values;
  // static.forEach(url => {
  //   console.log("static", url.stringValue);
  //   routes.push(url.stringValue);
  // });
  var dynamic = res.data.documents[0].fields.urls.arrayValue.values;
  console.log("urls", dynamic.length);
  dynamic.forEach(url => {
    const u = url.mapValue.fields.url.stringValue;
    console.log("url", u);
    if (u.charAt(0) === "/") {
      routes.push(u);
    } else {
      routes.push("/" + u);
    }
  });

  var itemsUnique = [];
  itemsUnique.push(...routes.filter((v, i, arr) => {
    return arr.findIndex(c => c === v) === i
  }));
  fs.writeFileSync(routesFile, itemsUnique.join(endOfLine), 'utf8');
}).catch(e => console.log(e));