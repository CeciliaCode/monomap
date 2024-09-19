import cron from 'node-cron';
import { CaseModel } from '../../data/models/case.model';
import { envs } from '../../config/envs.plugin';
import { EmailService } from '../services/email.service';
import { generateCaseEmailTemplate } from '../templates/email.template';

export const emailJob = () => {
    const emailService = new EmailService();

    cron.schedule("*/10 * * * * *", async () => {
        try {
            const cases = await CaseModel.find({ isSent: false });
            if (!cases.length) {
                console.log("No hay casos pendientes por enviar.");
                return;
            }
            console.log(`Procesando ${cases.length} casos.`);
            await Promise.all(
                cases.map(async (caseData) => {
                    try {
                        const htmlBody = generateCaseEmailTemplate(
                            caseData.genre,  // Género de la persona enferma
                            caseData.age.toString(),    // Edad de la persona enferma
                            caseData.lat,
                            caseData.lng
                        )
                        await emailService.sendEmail({
                            to: envs.MAIL_USER ?? '',
                            subject: `Nuevo caso registrado: ${caseData.genre}, ${caseData.age} años`,
                            htmlBody: htmlBody
                        });
                        console.log(`Email enviado para el caso con Id: ${caseData._id}`)
                        let updateCase = {
                            genre: caseData.genre,
                            age: caseData.age,
                            lat: caseData.lat,
                            lng: caseData.lng,
                            isSent: true
                        };
                        await CaseModel.findByIdAndUpdate(caseData._id, updateCase);
                        console.log(`Caso actualizado para el Id: ${caseData._id}`)
                    } catch (error) {
                        console.error("Error al procesar el caso.")
                    }
                })
            );
        } catch (error) {
            console.error("Error durante el envío de correos")
        }
    });
}


