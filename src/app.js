import express from "express";
import indexRoutes from "./routes/indexRoutes"
import expHand from "express-handlebars";
import path, { extname } from "path";
import morgan from "morgan";

const app = express();

app.set("views",path.join(__dirname,"views"));
app.engine(
    ".hbs",
    expHand({
        layoutsDir: path.join(app.get("views"),"layouts"),
        defaultLayout: "main",
        extname:".hbs",
    })
);
app.set("view engine",".hbs");


//midlewear
app.use(morgan("dev"));
app.use(express.urlencoded({extended:false}));


//rutas

app.use(express.static (path.join(__dirname,"public")));
app.use(indexRoutes);

export default app;

//git remote add origin https://github.com/pato158/Patrulla-Vecinal.git