<?php

global $quest_board_page_id, $banner_title;

$quest_board_page_id = "events-created";
$banner_title = "Meus Eventos";
?>
<!doctype html>
<html lang="pt-br">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="../images/icons/book.svg">
    <title><?php echo $banner_title; ?></title>
    <!-- Enqueue styles -->
    <link rel="stylesheet" href="../styles/main.css" />
    <link rel="stylesheet" href="../styles/topbar.css" />
    <link rel="stylesheet" href="../styles/sidenav.css" />
    <link rel="stylesheet" href="../styles/banner.css" />
    <link rel="stylesheet" href="../styles/events.css" />
</head>

<body class="background-main">
    <?php include_once "../components/pages-init.php"; ?>

    <!-- Content -->
    <div class="body-content">
        <div>
            <?php include_once "../components/two-sides-banner.php"; ?>
        </div>
        <div id="created-quests-container">
        </div>
    </div>
    <!-- Enqueue scripts -->
    <script type="module" src="../js/crud.js"></script>
    <script type="module" src="../js/created-events.js"></script>
</body>

</html>