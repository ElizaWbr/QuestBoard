<?php

global $quest_board_page_id;

$quest_board_page_id = "calendar";
?>
<!doctype html>
<html lang="pt-br">

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="icon" href="../images/icons/book.svg">
	<title>Calendário</title>
	<!-- Enqueue styles -->
	<link rel="stylesheet" href="../styles/main.css" />
	<link rel="stylesheet" href="../styles/topbar.css" />
	<link rel="stylesheet" href="../styles/sidenav.css" />
	<link rel="stylesheet" href="../styles/banner.css" />
	<link rel="stylesheet" href="../styles/calendar.css" />
	<link rel="stylesheet" href="../styles/calendar-date.css" />
	<link rel="stylesheet" href="../styles/calendar-month.css" />
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
					<div class="flex-center-center flex-column less-gap">
						<h2 id="calendar-title-day" class="dark-card no-margin flex-fit-card">-</h2>
						<h2 id="calendar-title-month" class="dark-card no-margin flex-fit-card btn">-</h2>
					</div>
					<button id="calendar-next" type="button" class="btn round flex-center-center"
						aria-label="Próximo mês">
						<img src="../images/icons/chevron-right.svg" alt="Sidenav open icon" class="icon medium" />
					</button>
				</div>
			</div>
			<?php
			include_once "../components/calendar/date.php";
			include_once "../components/calendar/month.php";
			?>
		</div>
	</div>
	<!-- Enqueue scripts -->
	<script type="module" src="../js/crud.js"></script>
	<script type="module" src="../js/calendar.js"></script>
	<script type="module" src="../js/calendar-date.js"></script>
	<script type="module" src="../js/calendar-month.js"></script>
</body>

</html>