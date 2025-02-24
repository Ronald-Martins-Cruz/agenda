<?php
spl_autoload_register(function ($class) {
    // Converte o namespace em caminho do arquivo
    $file = __DIR__ . '/' . str_replace('\\', '/', $class) . '.php';

    if (file_exists($file)) {
        require_once $file;
    }
});
?>