<?php

/**
 * Declaramos un objeto de conexión a MySQL, con los siguiente parámetros: 
 * 1.- Host / IP del servidor de MySQL (127.0.0.1 - Ordenador local)
 * 2.- Nombre de usuario (root - Superusuario CUIDADO, PERMISOS TOTALES)
 * 3.- Contraseña de usuario (vacia para ordenador local, desarrollo)
 * 4.- Nombre de la base de datos (gatos)
 * Este objeto de conexión se usará para muchas operaciones contra la base de datos
 */ 
$oConn = mysqli_connect("127.0.0.1", "root", "", "gatos");

/**
 * Declaramos una variable de tipo cadena (encerrada entre ""), con la siguiente sintaxis (asumiendo [] como placeholders)
 * $[NOMBRE_DE_VARIABLE_TIPO_STRING] = "[VALOR_DE_VARIABLE]";
 * SELECT * FROM gatos es una sentencia correcta en el lenguaje SQL, pero podemos poner lo que queramos
 **/
$sSQLSelectAll = "SELECT uuid, nombre, raza, color, edad FROM gatos ORDER BY nombre ASC";

// Otra variable de tipo cadena de texto
$sNoUsada = "En un lugar de la Mancha ...";

/**
 * Una llamada a mysqli_query devuelve un objeto de tipo instrucción SQL ejecutada, también llamado conjunto de resultados, en el caso de que 
 * la sentencia SQL ejecutada fuese un SELECT 
 * Declaramos un objeto llamado oExecQuery que contiene el resultado de ejecutar $sSQLSelectAll contra la conexión creada con $oConn
 **/
$oExecQuery = mysqli_query($oConn, $sSQLSelectAll);

/**
 * Sacamos filas y columnas, usando las funciones mysqli_num_rows y mysqli_num_fields, usando el objeto de resultados $oExecQuery
 * como argumento a la función.
 **/
$iNumRows = mysqli_num_rows($oExecQuery);
$iNumColumns = mysqli_num_fields($oExecQuery);

/* echo "Número de filas: ".$iNumRows."<br />";
echo "Número de columnas: ".$iNumColumns."<br />"; */

// Declaramos un Array vacio
$oAllData = Array();

// Iteramos las filas
for($i=0;$i<$iNumRows;$i++) {
    // El elemento $i del array $oAllData es el resultado de mysqli_fetch_row, con el objeto $oExecQuery como argumento
    // Tiene 'magia', porque sabe si ya ha sacado una fila, es decir, las recorre todas.
    // mysqli_fetch_row devuelve un array
    // Asi que $oAllData es un array de dos dimensiones al terminar el bucle
    $oAllData[$i] = mysqli_fetch_row($oExecQuery);
}

/* echo "<pre>";
print_r($oAllData);
echo "</pre>"; */

// Usamos json_encode para devolver $oAllData como JSON 
// Importante: Leer referencia de json_encode y json_decode 
echo json_encode($oAllData);