import { Request, Response } from "express";
import { CaseModel } from "../../data/models/case.model";

export class CaseController {

    public getCases = async (req: Request, res: Response) => {
        try {
            const cases = await CaseModel.find();
            return res.json(cases);
        }
        catch (error) {
            return res.json([]);
        }
    }

    public createCase = async (req: Request, res: Response) => {
        try {
            const { lat, lng, genre, age } = req.body; 
            const newCase = await CaseModel.create({
                lat,
                lng,
                genre,
                age
            });

            res.json(newCase);
        } catch (error) {
            res.json({ message: "Error creando el registro." });
        }
    }

    public getCaseById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const foundCase = await CaseModel.findById(id);
            if (!foundCase) {
                return res.status(404).json({ message: "Caso no encontrado." });
            }
            return res.json(foundCase);
        }
        catch (error) {
            return res.json({ message: "Ocurrió un error al traer el caso." });
        }
    }

    public getCasesLastWeek = async (req: Request, res: Response) => {
        const week = new Date();
        week.setDate(week.getDate() - 7);

        try {
            const recentCases = await CaseModel.find({
                creationDate: { $gte: week }
            });
            return res.json(recentCases);
        } catch (error) {
            return res.json({message: "Error al obtener los casos."});
        }
    };
    
    public updateCase = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { lat, lng, genre, age, isSent } = req.body;

            await CaseModel.findByIdAndUpdate(id, {
                lat,
                lng,
                genre,
                age,
                isSent
            });

            const updatedCase = await CaseModel.findById(id);
            return res.json(updatedCase);
        } catch (error) {
            console.error("Error al actualizar el caso:", error);
            res.status(500).json({ message: "Error al actualizar el caso." });
        }
    };

    public deleteCase = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const foundCase = await CaseModel.findById(id);
            if (!foundCase) {
                return res.status(404).json({ message: "Caso no encontrado." });
            }

            await CaseModel.findByIdAndDelete(id);
            return res.json({ message: "Caso eliminado." });
        } catch (error) {
            console.error("Error al eliminar el caso:", error);
            res.status(500).json({ message: "Error al eliminar el caso." });
        }
    };
}
