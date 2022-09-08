const { Pool } = require('pg');
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
// const pool = new Pool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_DATABASE,
//     port: process.env.DB_PORT,
//     // ssl: { rejectUnauthorized: false },
// });

// const connectionString = `postgresql://dbuser:secretpassword@database.server.com:3211/mydb`;

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false,
        ca: `MIIDfzCCAmegAwIBAgIBADANBgkqhkiG9w0BAQsFADB3MS0wKwYDVQQuEyQ4YzU0
YzJlZS1jM2Q0LTRlYjgtOGRiYy04OTYzZjlmYzZkODAxIzAhBgNVBAMTGkdvb2ds
ZSBDbG91ZCBTUUwgU2VydmVyIENBMRQwEgYDVQQKEwtHb29nbGUsIEluYzELMAkG
A1UEBhMCVVMwHhcNMjIwOTA3MTYxMTEyWhcNMzIwOTA0MTYxMjEyWjB3MS0wKwYD
VQQuEyQ4YzU0YzJlZS1jM2Q0LTRlYjgtOGRiYy04OTYzZjlmYzZkODAxIzAhBgNV
BAMTGkdvb2dsZSBDbG91ZCBTUUwgU2VydmVyIENBMRQwEgYDVQQKEwtHb29nbGUs
IEluYzELMAkGA1UEBhMCVVMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIB
AQDWJozoQk3ihju/jARqERriYUDWHzkIUnHOXCP7VxvY4R/4IaGmmfhehSOu2fL1
JwIFgk33fcCApDrHICQm2ZY9wVzLN5+nsQIcTBIUI22ipvwGK/gC6MKzF0K9YaaK
qderpfAjgonTdPjOr1JyRpei54y/e+oWZ/CfScV8nQ4roYx9Y9aH8I/4yMo/hJgk
Zx8CC3IR5AwJv0MvxyUiRAseOJ9TOP3MzSfyeqFvF6P1eYnjaAlpIUuDeTR2GFhb
u1QDSYsbkWMeBrJb+Ghe2/qCl2vlv6508ihfq2KC8ipdBOV6Mie6F0X9FARMXZIO
VMXmniJdras/Gajum6DAh6yxAgMBAAGjFjAUMBIGA1UdEwEB/wQIMAYBAf8CAQAw
DQYJKoZIhvcNAQELBQADggEBADL6c25JQJvb91vGE9cyoziCatAheIH3frku8cRO
vsmD23NbJJdSiWSQwpDJzqmDO/YQ/JliqdsMTeOL9QPi7Quh8iLFqieRdDopaXly
w7hfmqL8JPJVshNHcE4FMfLy+AKiuOz1DceswKSw1Z/f4YEimGkSCcxGzRWLAYbk
JGZJnQYNEdnIgS3jJVDcapzCOquWiq0oq9nHeliDUfLhX6oVmgccXNgxMneMlbB+
MSv5LAruAu2GksvEQ3ltFxSzG5UpDNx+xA5UXx6Z8An9bDHITr6VaajILd3SZiYI
WLgZ1vK2dZPPbkuvlZnshuZ6RBk4TTy+WupC53Tpm86ezi8=`,
    },
});

module.exports = pool;
