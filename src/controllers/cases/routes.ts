import { Router } from "express";
import { CaseController } from "./controller";

export class CasesRoutes{
    static get routes(): Router{
        const router = Router();
        const controller = new CaseController();
        router.get("/", controller.getCases);
        router.get("/last", controller.getCasesLastWeek);
        router.get("/:id", controller.getCaseById);
        router.post("/", controller.createCase);
        router.put("/:id", controller.updateCase);
        router.delete("/:id", controller.deleteCase);
        return router;
    }
}