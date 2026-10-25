<?php

global $quest_board_page_id, $pretty_title, $pretty_content;

$quest_board_page_id = "login";

$pretty_title = "Login";

$pretty_content = "<button id='firebase-auth-google-login' class='btn text-icon color-white'>";
$pretty_content .= "<img src='../images/icons/google.svg' alt='Site icon' class='icon medium'/>";
$pretty_content .= "Entrar com Google";
$pretty_content .= "</button>";
$pretty_content .= "<p id='firebase-auth-message'></p>";

?>
<!doctype html>
<html lang="pt-br">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="../images/icons/book.svg">
		<title>Login</title>
		<!-- Enqueue styles -->
		<link rel="stylesheet" href="../styles/main.css" />
        <link rel="stylesheet" href="../styles/pretty-container.css" />
        <link rel="stylesheet" href="../styles/banner.css" />
	</head>
	<body class="background-main">
        <!-- Enqueue navs scripts -->
        <script src="../node_modules/jquery/dist/jquery.min.js"></script>
		<!-- Content -->
        <div class="full-screen flex-center-center">
		    <?php include_once "../components/pretty-container.php"; ?>
        </div>
        <!-- Enqueue scripts -->
        <script type="module" src="../js/firebase.js"></script>
        <script type="module" src="../js/login.js"></script>
	</body>
</html>
