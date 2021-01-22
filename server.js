const chalk = require("chalk");
const express = require("express");

const bodyParser = require("body-parser");

const providerEnv = require("./config/env.wrapper");
const mongDbUrl = providerEnv.MONGODB_URL;

if (!mongDbUrl) {
  console.log(chalk.redBright(`MongoDB url unset.`));
  process.exit();
}

const app = express();
app.use(express.static("public"));


// api
let apiRoutes = require('./api/demo/contact-routes')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// MongoDB
const mongoose = require("mongoose");
mongoose.connect(mongDbUrl, { useNewUrlParser: true });
const db = mongoose.connection
db.on('error',(err)=>{
  console.log(chalk.yellowBright(`Mongo DB error ${mongDbUrl} \n`),err);
})

db.once('open',()=>{
  console.log(chalk.blue(`MongoDB ${mongDbUrl} has been Connected.`))
})


app.use('/api',apiRoutes)

app.listen(providerEnv.PORT, () => {
  console.log(chalk.greenBright(`${providerEnv.APP_NAME} starting...`));
  console.log(
    chalk.cyanBright(
      `Click http://localhost:${providerEnv.PORT}/index.html visit.`
    )
  );
});
