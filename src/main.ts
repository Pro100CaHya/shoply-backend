import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const start = async () => {
    const port = Number(process.env.PORT) || 5000;
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix("/api");

    const swaggerConfig = new DocumentBuilder()
        .setTitle("Shoply RESTful API")
        .setDescription("A RESTful API of online store named 'Shop.ly'")
        .setVersion("1.0.0")
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup("docs", app, document);

    await app.listen(port, () => console.log(`Server started on port ${port}`));
}

start();