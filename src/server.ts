import app from "./app";
import prisma from "./config/database";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await prisma.$connect();
        console.log("✅ Подключено к базе данных");

        app.listen(PORT, () => {
            console.log(`🚀 Сервер запущен: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Ошибка подключения к базе данных:", error);
        process.exit(1);
    }
};

startServer();
