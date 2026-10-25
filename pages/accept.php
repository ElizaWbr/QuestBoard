<?php

global $quest_board_page_id, $banner_title;

$quest_board_page_id = "accept";
$banner_title = "Entrar em Evento";
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
		<form class="accept-event-form" method="post">
			<div class="container-round-medium first">
				<div class="container-round-light">
					<div class="input-field">
						<label for="accept-event-id">Id do evento</label>
						<input type="text" id="accept-event-id" name="event_id" />
					</div>
					<div class="flex-center-center">
						<button type="button" id="enter-event" name="enter_event" class="btn text-icon green color-white">
							<img src="../images/icons/magnify.svg" alt="Enter" class="icon medium" />
							Procurar
						</button>
					</div>
				</div>
			</div>
		</form>
		<div id="event-summary-content" style="display: none;">
			<div class="container-round-medium flex-center-center flex-column less-gap">
				<div id="ivalid-event-warning" style="display: none;"></div>
				<div id="accept-valid-event-data" class="flex-center-center flex-column less-gap" style="display: none;">
					<span id="manage-event-user-name"></span>
					<span id="manage-event-user-email"></span>
					<span id="manage-event-image"></span>
					<span id="manage-event-color"></span>
					<span id="manage-event-created-date"></span>
					<span id="manage-event-edited-date"></span>
					<span id="manage-event-members-counter"></span>
					<span id="manage-event-confirmed-counter"></span>

					<div class="flex-center-center">
						<button type="button" id="accept-valid-event" name="accept_valid_event" class="btn text-icon green color-white">
							<img src="../images/icons/check-circle.svg" alt="Enter" class="icon medium" />
							Confirmar
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Enqueue scripts -->
	<script type="module" src="../js/crud.js"></script>
	<script type="module" src="../js/accept.js"></script>
	<script type="module" src="../js/created-events.js"></script>
</body>

</html>