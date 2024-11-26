import { Router } from "express";
import Incidente from "../models/Incidente";


const router = Router();

router.get("/",  async(req, res) => {
  const incidentes = await Incidente.find().sort({_id:-1}).lean(); 
  
  res.render("index",{incidentes : incidentes});
  });
router.get("/comentar", async(req, res)=>{
  try {
    const incidente = await Incidente.findById(req.params.id).lean();
    res.render("comentar",{incidente}); 
  } catch (error) {
    console.log(error.message);
    
  }
})
router.post("/incidencia/agregar", async (req, res)=>{
  try {
    const incidente = Incidente(req.body);
  await incidente.save();
  res.redirect("/")
  } catch (error) {
    console.log (error)
  }
});
router.post("/comentar/:id",async(req, res)=>{
  try {
    const id = req.params.id;
    const coment= req.body.comentario;
    if(!coment || !coment.texto || coment.texto.trim() === ""){
      console.log(coment)
      const actualizado = await Incidente.findByIdAndUpdate(
        
        id,
        {$push:{comentario:coment}},
      {new : true, upsert:true}
    );
    if (!actualizado) {
      return res.status(404).send("Incidente no encontrado"); 
    }
  } 
  res.redirect("/");
   
  } catch (error) {
    res.status(500).send("Error al actualizar el incidente",500);
  }
});
router.post("/filtrado", async(req,res)=>{
  try {
    const tipoBusq = req.body.tipo;
    const filtrado = await Incidente.find({tipo:tipoBusq}).sort({_id:-1}).lean(); 
    res.render("filtrado",{incidentes : filtrado});
    
    
  } catch (error) {
    
  }
})
router.post("/borrar/:id",async(req, res)=>{
  try {
    const id = req.params.id;
    const borrado = await Incidente.findByIdAndDelete( {_id:id})
    console .log (borrado); 
   
    res.redirect("/filtrado"); 
  }
  catch(error){
    console.log(error)
  }
});
  
router.get("/incidencia",(req,res)=>{
    res.render("incidencia")
});
router.get("/sospechoso",(req,res)=>{
  res.render("sospechoso")
});
router.get("/filtrado",(req,res)=>{
  res.render("filtrado")
});


export default router;