<img 
  src="./static/img/_banner.png"
  alt="Resuming"
  style="width: 100%;"
/>

**Resuming** is a web platform designed for managing andsharing résumés. With it, users can create accounts and manage up to three profiles, which can be shared via a personalized URL, including their basic information, education, and work experience.

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Handlebars](https://img.shields.io/badge/Handlebars-%23000000?style=for-the-badge&logo=Handlebars.js&logoColor=white)

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Bulma](https://img.shields.io/badge/bulma-00D0B1?style=for-the-badge&logo=bulma&logoColor=white)

![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

### 🛠️ Installation and Setup

The system was developed using **Node.js 20**, and it is recommended to use this version to ensure compatibility. To set up the application, follow these instructions from the project root directory.

#### 1️⃣ Configure Environment Variables

Set up the environment variables based on the `.env.example` file. If you have a local copy of the code, simply copy the file and rename it to `.env`. The values to be defined are:

- `DATABASE_URL` — Database connection string.
- `JWT_SECRET` — Secret key for signing JWTs.
- `PORT` — Server port.

#### 2️⃣ Install Dependencies

```bash
npm install
```

#### 3️⃣ Run Migrations

```bash
npx prisma migrate dev
```

_or_

```bash
npx prisma migrate deploy
```

#### 4️⃣ Start the Server

```bash
npm run start:dev
```

_or_

```bash
npm run start
```

### 📖 API Documentation

To explore the technical details of the API, access **Swagger UI** at `/swagger/ui`. There, you will find a complete list of available endpoints, along with their input and output parameters.

### 🤝 Donation

Did you enjoy the project and want to support it financially? You can contribute via **PayPal** or, _para os meus compatriotas, através do **PIX**_ — just click on one of the options below:

[![PayPal](https://img.shields.io/badge/PayPal-Donate-1040C1?labelColor=121661&style=for-the-badge&logo=paypal&link=https://www.paypal.com/donate/?hosted_button_id=2P9HPGUP7Z43S)](https://www.paypal.com/donate/?hosted_button_id=2P9HPGUP7Z43S)
&nbsp;
[![PIX](https://img.shields.io/badge/PIX-Doar-FBB88A?labelColor=F26722&style=for-the-badge&logo=pix&logoColor=ffffff&link=https://tipa.ai/davidsantana06)](https://tipa.ai/davidsantana06)

This and other projects available on my profile were developed independently. Any support to help maintain this purpose is more than welcome! 💪

### ⚖️ License

This project uses the **MIT License**, which allows you to use and modify the code as you wish. The only requirement is to give proper credit, acknowledging the effort and time dedicated to its development.
