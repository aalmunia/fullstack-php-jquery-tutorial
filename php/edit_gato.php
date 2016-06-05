<?php

$oConn = mysqli_connect("127.0.0.1", "root", "", "gatos");

$sSQLEditarGato = "UPDATE gatos SET ";
$sSQLEditarGato .= " nombre = '" . $_POST["nombre"] . "', ";
$sSQLEditarGato .= " raza = '" . $_POST["raza"] . "', ";
$sSQLEditarGato .= "color = '" . $_POST["color"] . "', ";
$sSQLEditarGato .= "edad = '" . $_POST["edad"] . "'";
$sSQLEditarGato .= " WHERE uuid = '".$_POST["uuid"] ."'";

$oExecuteQuery = mysqli_query($oConn, $sSQLEditarGato) or die("Error SQL");

$oReturn = Array();
$oReturn["error"] = false;
$oReturn["code"] = "OK";

echo json_encode($oReturn);