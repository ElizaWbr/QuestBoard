<?php

global $quest_board_page_id, $banner_title;

$quest_board_page_id = "event";

$id = isset($_GET["id"]) ? $_GET["id"] : "";
$banner_title = "Evento";
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
    <link rel="stylesheet" href="../styles/inputs.css" />
</head>

<body class="background-main">
    <?php include_once "../components/pages-init.php"; ?>

    <!-- Content -->
    <div class="body-content">
        <div>
            <?php include_once "../components/two-sides-banner.php"; ?>
        </div>
        <!-- No event selected -->
        <div id="no-event-warning-message" class="container-round-medium flex-center-center flex-column"
            style="display: none;">
        </div>
        <!-- Event selected -->
        <input type="hidden" id="event-id" value="<?php echo $id; ?>" />
        <div class="event-form">
            <div id="event-summary-content" style="display: none;">
                <div class='container-round-small-event-details top'>
                    <div class='flex-center-center'>
                        <a id="event-author-email" href='' class='btn round-transparent green color-white'>
                            <img src='../images/icons/email.svg' alt='Email' class='icon medium' />
                        </a>
                        <a id="event-author-phone" href='' class='btn round-transparent green color-white'
                            target="_blank">
                            <img src='../images/icons/phone.svg' alt='phone' class='icon medium' />
                        </a>
                    </div>
                </div>
                <div class="container-round-medium flex-center-center flex-column less-gap margin-top">
                    <div class="card no-margin">
                        <div id="event-created-image" class="flex-center-center margin-bottom"></div>
                        <h3 id="event-created-name" class="flex-center-center">-</h3>
                        <span id="event-created-description"></span>
                    </div>
                    <span id="event-created-author-name" class="margin-top"></span>
                    <span id="event-created-date"></span>
                    <div class='flex-center-center less-gap'>
                        <img src='../images/icons/account.svg' alt='Membros' class='icon medium round-transparent' />
                        <span id="event-members-counter"></span>
                    </div>
                    <div class='flex-center-center less-gap'>
                        <img src='../images/icons/check-circle.svg' alt='Confirmados'
                            class='icon medium round-transparent' />
                        <span id="event-confirmed-counter"></span>
                    </div>
                    <div class="flex-center-center margin-top">
                        <button type="button" id="remove-event" class="btn text-icon red color-white">
                            <img src="../images/icons/account-remove.svg" alt="Remove event" class="icon medium" />
                            Sair
                        </button>
                        <button type="button" id="confirm-event" class="btn text-icon green color-white">
                            <img src="../images/icons/check-circle.svg" alt="Confirm event" class="icon medium" />
                            Confirmar presença
                        </button>
                    </div>
                    <div id="remove-event-confirmation-container" style="display: none;" class="card flex-center-center flex-column less-gap margin-top">
                        <span>Você tem certeza que deseja sair deste Evento?</span>
                        <span>Caso mude de ideia precisará do id para entrar novamente.</span>
                        <div class="flex-center-center no-margin">
                        <button type="button" id="remove-event-confirm" class="btn text-icon red color-white only-margin-top force-half">
                            <img src="../images/icons/delete.svg" alt="Confirm remove event" class="icon medium" />
                            Confirmar minha saída deste evento
                        </button>
                        <button type="button" id="remove-event-cancel" class="btn text-icon green color-white only-margin-top force-half">
                            <img src="../images/icons/check-circle.svg" alt="Cancel remove event" class="icon medium" />
                            Cancelar
                        </button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="event-data-container" style="display: none;">
                <div class="container-round-medium">
                    <div class="container-round-light">
                        <div id="event-created-details" class="flex-center-center flex-column less-gap">
                        </div>
                    </div>
                </div>
                <!-- Contato -->
                <div class="container-round-medium last">
                    <div class="container-round-light">
                        <p class="no-margin-top">Em caso de dúvidas entre em contato com a gente:</p>
                        <span id="event-author-email-text"></span>
                        <span id="event-author-phone-text"></span>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <!-- Enqueue scripts -->
    <script type="module" src="../js/crud.js"></script>
    <script type="module" src="../js/event.js"></script>
</body>

</html>