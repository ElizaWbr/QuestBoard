<?php

global $quest_board_page_id;
$quest_board_page_id = "calendar";

?>
<!doctype html>
<html lang="pt-br">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="../images/icons/book.svg">
		<title>Início</title>
		<!-- Enqueue styles -->
		<link rel="stylesheet" href="../styles/main.css" />
		<link rel="stylesheet" href="../styles/topbar.css" />
		<link rel="stylesheet" href="../styles/sidenav.css" />
        <link rel="stylesheet" href="../styles/banner.css" />
	</head>
	<body class="background-main">
        <!-- Topbar -->
        <?php include_once("../components/topbar.php"); ?>
		<!-- Sidenav -->
		<?php include_once("../components/sidenav.php"); ?>
        <!-- Enqueue navs scripts -->
        <script src="../node_modules/jquery/dist/jquery.min.js"></script>
		<script type="module" src="../js/sidenav.js"></script>
		<!-- Content -->
		<div class="body-content">
            minha conta
        </div>
	</body>
</html>
