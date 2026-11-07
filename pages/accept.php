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
		<div id="accept-event-form" class="full-width">
			<div id="accept-event-form-container" class="container-round-medium">
				<div class="container-round-light">
					<div class="input-field">
						<label for="accept-event-id">Id do evento</label>
						<input type="text" id="accept-event-id" name="event_id" />
					</div>
					<div class="flex-center-center">
						<button type="button" id="enter-event" name="enter_event"
							class="btn text-icon green color-white">
							<img src="../images/icons/magnify.svg" alt="Enter" class="icon medium" />
							Procurar
						</button>
					</div>
				</div>
			</div>
		</div>
		<div id="event-summary-content" style="display: none;">
			<div class="container-round-medium flex-center-center flex-column less-gap">
				<div id="ivalid-event-warning" style="display: none;"></div>
				<div id="accept-valid-event-data" class="card flex-center-center flex-column less-gap"
					style="display: none;">
					<h3 id="event-name">-</h3>
					<span id="event-description"></span>
					<span id="manage-event-user-name"></span>
					<div class="divider"></div>
					<span id="manage-event-user-email" class="details"></span>
					<span id="manage-event-created-date" class="details"></span>
					<span id="manage-event-members-counter" class="details"></span>
					<span id="manage-event-confirmed-counter" class="details"></span>

					<div class="flex-center-center margin-top">
						<button type="button" id="accept-valid-event" name="accept_valid_event"
							class="btn text-icon green color-white">
							<img src="../images/icons/check-circle.svg" alt="Enter" class="icon medium" />
							Entrar
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