import mailSender from "../../commonHelpers/mailSender";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { subscriberMail, letterSubject, letterHtml } = req.body;

            const result = await mailSender(subscriberMail, letterSubject, letterHtml);

            console.log("Email sent successfully:", result);

            res.status(200).json({ success: true, result });
        } catch (error) {
            console.error("Error sending email:", error);
            res.status(500).json({ success: false, error: "Error sending email" });
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}