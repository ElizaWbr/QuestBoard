<?php

global $quest_board_page_id, $banner_title, $simple_banner_title;
$quest_board_page_id = "home";
$banner_title = "Bem vindo!";
$simple_banner_title = "Neste mês";

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
    <link rel="stylesheet" href="../styles/home.css" />
</head>

<body class="background-main">
    <?php include_once "../components/pages-init.php"; ?>

    <!-- Content -->
    <div class="body-content">
        <div>
            <?php include_once "../components/two-sides-banner.php"; ?>
        </div>
        <div id="user-next-event" class="card margin-top flex-center-center flex-column full-width">
        </div>
        <div class="medium-card margin-top links-cards-container">
            <div class="card no-margin half-padding">
                <img src='../images/icons/dark-event-list.svg' alt='Enter' class='icon medium' />
                <a href="./events.php" class="btn text color-white">
                    Listar
                </a>
            </div>
            <div class="card no-margin half-padding">
                <img src='../images/icons/dark-event-create.svg' alt='Enter' class='icon medium' />
                <a href="./manage.php" class="btn text color-white">
                    Criar
                </a>
            </div>
            <div class="card no-margin half-padding">
                <img src='../images/icons/dark-event-enter.svg' alt='Enter' class='icon medium' />
                <a href="./accept.php" class="btn text color-white">
                    Entrar
                </a>
            </div>
        </div>
        <div class="current-month-container">
            <?php include_once "../components/two-sides-simple-banner.php"; ?>
            <div class="medium-card no-margin current-month-cards-container">
                <div class="card no-margin half-padding">
                    <h2 id="month-past-events">0</h2>
                    <div class="dark-card no-margin">
                        Finalizados
                    </div>
                </div>
                <div class="card no-margin half-padding">
                    <h2 id="month-next-events">0</h2>
                    <div class="dark-card no-margin">
                        Próximos
                    </div>
                </div>
            </div>
        </div>
        <div class="medium-card margin-top flex-center-center full-width">
            <a href="./calendar.php" class="btn text-icon color-white">
                <img src="../images/icons/calendar.svg" alt="Cancel remove event" class="icon medium" />
                Ir para o calendário
            </a>
        </div>

    </div>
    <!-- Enqueue scripts -->
    <script type="module" src="../js/crud.js"></script>
    <script type="module" src="../js/home.js"></script>
</body>

</html>

</html>