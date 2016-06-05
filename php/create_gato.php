<?php

$oConn = mysqli_connect("127.0.0.1", "root", "", "gatos");

$sSQLInsertarGato = "INSERT INTO gatos VALUES (UUID(), ";
$sSQLInsertarGato .= "'" . $_POST["nombre"] . "', ";
$sSQLInsertarGato .= "'" . $_POST["raza"] . "', ";
$sSQLInsertarGato .= "'" . $_POST["color"] . "', ";
$sSQLInsertarGato .= "'" . $_POST["edad"] . "'";
$sSQLInsertarGato .= ");";

$oExecuteQuery = mysqli_query($oConn, $sSQLInsertarGato) or die("Error SQL");

$oReturn = Array();
$oReturn["error"] = false;
$oReturn["code"] = "OK";

echo json_encode($oReturn);