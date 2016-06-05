<?php

// print_r($_POST["uuids_delete"]);
$aUUIDsToDelete = $_POST["uuids_delete"];

$oConn = mysqli_connect("127.0.0.1", "root", "", "gatos");

for($i=0;$i< count($aUUIDsToDelete); $i++) {
    $sSQLDelete = "DELETE FROM gatos WHERE uuid = '".$aUUIDsToDelete[$i]."'";
    $oExecuteQuery = mysqli_query($oConn, $sSQLDelete) or die("Error SQL");
}

$oReturn = Array();
$oReturn["error"] = false;
$oReturn["code"] = "OK";

echo json_encode($oReturn);