<?php

global $quest_board_page_id, $pretty_title, $pretty_content, $pretty_icon;

$quest_board_page_id = "my-account";

$pretty_icon = "account";
$pretty_title = "Minha Conta";

$pretty_content = "<div id='my-account-image-data'></div>";
$pretty_content .= "<div id='my-account-user-data'></div>";

?>
<!doctype html>
<html lang="pt-br">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="../images/icons/book.svg">
		<title>Minha Conta</title>
		<!-- Enqueue styles -->
		<link rel="stylesheet" href="../styles/main.css" />
		<link rel="stylesheet" href="../styles/topbar.css" />
		<link rel="stylesheet" href="../styles/sidenav.css" />
		<link rel="stylesheet" href="../styles/pretty-container.css" />
        <link rel="stylesheet" href="../styles/banner.css" />
	</head>
	<body class="background-main">
		<?php include_once "../components/pages-init.php"; ?>
		<!-- Content -->
		<div class="body-content">
            <?php include_once "../components/pretty-container.php"; ?>
        </div>
		<!-- Enqueue page scripts -->
        <script type="module" src="../js/account.js"></script>
		<script type="module" src="../js/my-account.js"></script>
	</body>
</html>
