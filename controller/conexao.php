<?php

namespace controller;

$databaseUrl = getenv('DATABASE_URL');

if (!$databaseUrl) {
    die('DATABASE_URL não está definida');
}

$parsed = parse_url($databaseUrl);
$host = $parsed['host'];
$user = $parsed['user'];
$pass = $parsed['pass'];
$dbname = ltrim($parsed['path'], '/');
$dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";

function criarPDO(){
    try{
        $pdo = new \PDO($dsn, $user, $pass, 
        [\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
        \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC]);
        return $pdo;
    }catch(Exception $e){
        die("Não foi possível se conectar com o banco de dados");
    }
}

?>