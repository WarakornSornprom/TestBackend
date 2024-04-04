module.exports = {
    HOST: "172.24.211.29", 
    USER: "postgres",
    PASSWORD: "1234",
    DB: "manyToMany_db",
    dialect: "postgres",
    port: "5432",
    pool:{
        max:5,
        min:0,
        acquire: 30000,
        idle: 10000
    }
}