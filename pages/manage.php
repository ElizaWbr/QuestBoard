<?php

global $quest_board_page_id, $banner_title;

$quest_board_page_id = "manage";

$id = isset($_GET["event_id"]) ? $_GET["event_id"] : "";
$banner_title = $id ? "Editar Evento" : "Adicionar Evento";
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
			<div id="event-summary-submit" class="container-round-medium flex-center-center flex-column">
				<?php if ($id) {?>
					<div class="flex-center-center flex-column less-gap">
						<span id="manage-event-created-date"></span>
						<span id="manage-event-edited-date"></span>
						<span id="manage-event-people-counter"></span>
					</div>
					<div class="flex-center-center">
						<button id="manage-delete-event" class="btn text-icon red color-white">
							<img src="../images/icons/delete.svg" alt="Delete" class="icon medium"/>
							Excluir
						</button>
						<button id="manage-save-event" class="btn text-icon green color-white">
							<img src="../images/icons/save.svg" alt="Save" class="icon medium"/>
							Salvar
						</button>
					</div>
				<?php } else { ?>
					<div class="flex-center-center">
						<button id="manage-save-event" class="btn text-icon green color-white">
							<img src="../images/icons/save.svg" alt="Save" class="icon medium"/>
							Salvar
						</button>
					</div>
				<?php } ?>
			</div>
			<div class="event-form">
				<div class="container-round-medium">
					<div class="container-round-light">
						<div>Nome do evento</div>
						<div>Data inicial do evento</div>
						<div>Data final do evento</div>
						<div>Horário inicial do evento</div>
						<div>Horário final do evento</div>
						<div>Cor</div>
						<div>ícone</div>
						<div>Precisa de ingresso</div>
						<div>Valores dos ingressos</div>
						<div>Link para compra de ingresso</div>
						<div>Observações</div>
					</div>
				</div>
			</div>
        </div>
        <!-- Enqueue scripts -->
        <script type="module" src="../js/manage.js"></script>
	</body>
</html>
