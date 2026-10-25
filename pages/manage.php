<?php

global $quest_board_page_id, $banner_title;

$quest_board_page_id = "manage";

$id = isset($_GET["id"]) ? $_GET["id"] : "";
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
	<link rel="stylesheet" href="../styles/inputs.css" />
</head>

<body class="background-main">
	<?php include_once "../components/pages-init.php"; ?>

	<!-- Content -->
	<div class="body-content">
		<div>
			<?php include_once "../components/two-sides-banner.php"; ?>
		</div>
		<input type="hidden" id="event-id" value="<?php echo $id; ?>" />
		<div id="event-summary-content" style="display: none;">
			<!-- <div id="event-summary" class="container-round-medium flex-center-center flex-column"></div> -->
			<div class="container-round-medium flex-center-center flex-column less-gap">
				<span id="manage-event-created-date"></span>
				<span id="manage-event-edited-date"></span>
				<span id="manage-event-members-counter"></span>
				<span id="manage-event-confirmed-counter"></span>
			</div>
		</div>
		<form class="event-form" method="post">
			<div class="container-round-medium first">
				<div class="container-round-light">
					<div class="input-field">
						<label for="event-name">Nome do evento</label>
						<input type="text" id="event-name" name="event_name" />
					</div>
					<div class="input-field">
						<label for="event-description">Descrição</label>
						<textarea id="event-description" name="event_description"></textarea>
					</div>
					<div class="input-field">
						<label for="event-date-start">Data inicial</label>
						<input type="date" id="event-date-start" name="event_date_start" />
					</div>
					<div class="input-field">
						<label for="event-date-end">Data final</label>
						<input type="date" id="event-date-end" name="event_date_end" />
					</div>
					<div class="input-field">
						<label for="event-time-start">Horário de início</label>
						<input type="time" id="event-time-start" name="event_time_start" />
					</div>
					<div class="input-field">
						<label for="event-time-end">Horário final</label>
						<input type="time" id="event-time-end" name="event_time_end" />
					</div>
				</div>
			</div>
			<div class="container-round-medium">
				<div class="container-round-light">
					<div class="input-field-checkbox">
						<label for="event-ticket">Precisa de ingresso</label>
						<input type="checkbox" id="event-ticket" name="event_ticket" />
					</div>
					<div id="event-ticket-controller" style="display: none;">
						<div class="input-field">
							<label for="event-ticket-price">Valores dos ingressos</label>
							<input type="text" id="event-ticket-price" name="event_ticket_price" />
						</div>
						<div class="input-field">
							<label for="event-ticket-url">Link para compra de ingresso</label>
							<input type="text" id="event-ticket-url" name="event_ticket_url" />
						</div>
					</div>
				</div>
			</div>
			<div class="container-round-medium last">
				<div class="container-round-light">
					<div class="input-field">
						<label for="event-obs">Observações</label>
						<textarea id="event-obs" name="event_obs"></textarea>
					</div>
					<div class="divider"></div>
					<div class="input-field-color">
						<label for="event-color">Selecione uma cor para representar o evento</label>
						<input type="color" id="event-color" name="event_color" />
					</div>
					<div class="divider"></div>
					<div class="input-field">
						<label for="event-image">Adicione o link de uma imagem para representar o evento</label>
						<input type="text" id="event-image" name="event_image" />
					</div>
				</div>
			</div>

			<div id="event-submit-delete" class="container-round-medium flex-center-center flex-column">
				<div class="flex-center-center">
					<?php if ($id) { ?>
						<button id="manage-delete-event" class="btn text-icon red color-white">
							<img src="../images/icons/delete.svg" alt="Delete" class="icon medium" />
							Excluir
						</button>
					<?php } ?>
					<button type="button" id="manage-save-event" name="action_save_event"
						class="btn text-icon green color-white">
						<img src="../images/icons/save.svg" alt="Save" class="icon medium" />
						Salvar
					</button>
				</div>
				<p id="event-form-error-message" class="color-red" style="display: none;"></p>
			</div>
		</form>

	</div>
	<!-- Enqueue scripts -->
	<script type="module" src="../js/crud.js"></script>
	<script type="module" src="../js/manage.js"></script>
</body>

</html>