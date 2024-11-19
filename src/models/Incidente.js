import mongoose, { Schema, model } from "mongoose";

const incidenteSchema = new Schema(
  {
    tipo: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    herido: {
      type: Boolean,
      default: false,
    },
    
     direccion:{
      type: String,
     },
     comentario:{
      type: Array,
      default:[],
      
     }
    
  },
  {
    timestamps: true,
  }
);

export default model("Incidencias", incidenteSchema);
