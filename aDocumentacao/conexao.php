<?php

namespace controller;


function criarPDO(){
    try{
        $pdo = new \PDO("mysql:dbname=agenda;charset=utf8;host=localhost", 'root', '', 
        [\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
        \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC]);
        return $pdo;
    }catch(Exception $e){
        die("Não foi possível se conectar com o banco de dados");
    }
}

?>