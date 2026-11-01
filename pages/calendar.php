<?php

global $quest_board_page_id, $banner_title, $selected_calendar_date;

$quest_board_page_id = "calendar";

$selected_calendar_date = isset($_GET["date"]) ? $_GET["date"] : "";
$banner_title = "Calendário";
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
	<link rel="stylesheet" href="../styles/calendar.css" />
	<?php if ($selected_calendar_date) { ?>
		<link rel="stylesheet" href="../styles/calendar-date.css" />
	<?php } else { ?>
		<link rel="stylesheet" href="../styles/calendar-month.css" />
	<?php } ?>

</head>

<body class="background-main">
	<?php include_once "../components/pages-init.php"; ?>

	<!-- Content -->
	<div class="body-content">
		<div class="medium-card auto no-margin">
			<div class="calendar-header">
				<div class="calendar-navigation">
					<button id="calendar-prev" type="button" class="btn round flex-center-center"
						aria-label="Mês anterior">
						<img src="../images/icons/chevron-left.svg" alt="Sidenav open icon" class="icon medium" />
					</button>
					<h2 id="calendar-title" class="dark-card no-margin">-</h2>
					<button id="calendar-next" type="button" class="btn round flex-center-center"
						aria-label="Próximo mês">
						<img src="../images/icons/chevron-right.svg" alt="Sidenav open icon" class="icon medium" />
					</button>
				</div>
			</div>
			<?php
			if ($selected_calendar_date) {
				include_once "../components/calendar/date.php";
			} else {
				include_once "../components/calendar/month.php";
			}
			?>
		</div>
	</div>
	<!-- Enqueue scripts -->
	<script type="module" src="../js/crud.js"></script>
	<script type="module" src="../js/calendar.js"></script>
	<?php if ($selected_calendar_date) { ?>
		<script type="module" src="../js/calendar-date.js"></script>
	<?php } else { ?>
		<script type="module" src="../js/calendar-month.js"></script>
	<?php } ?>
</body>

</html>