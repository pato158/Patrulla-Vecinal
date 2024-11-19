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
   
  } catch (error) {
    res.status(500).send("Error al actualizar el incidente",500);
  }
});
  
router.get("/incidencia",(req,res)=>{
    res.render("incidencia")
});


export default router;