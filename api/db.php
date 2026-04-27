<?php

function getDbConnection()
{
	$host = getenv('DB_HOST') ?: '127.0.0.1';
	$user = getenv('DB_USER') ?: 'TheBeast';
	$password = getenv('DB_PASSWORD') ?: 'WeLoveCOP4331';
	$database = getenv('DB_NAME') ?: 'COP4331';

	return new mysqli($host, $user, $password, $database);
}

?>
