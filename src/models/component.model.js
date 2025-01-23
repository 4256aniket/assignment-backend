import mongoose from "mongoose";

const componentSchema = new mongoose.Schema({
    Brand: { type: String },
    Model: { type: String },
    AccelSec: { type: Number },
    TopSpeed_KmH: { type: Number },
    Range_Km: { type: Number },
    Efficiency_WhKm: { type: Number },
    FastCharge_KmH: { type: String },
    RapidCharge: { type: String },
    PowerTrain: { type: String },
    PlugType: { type: String },
    BodyStyle: { type: String },
    Segment: { type: String },
    Seats: { type: Number },
    PriceEuro: { type: Number },
    Date: { type: Date }
});

export const Component = mongoose.model("Component", componentSchema);
