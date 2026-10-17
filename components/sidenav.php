<?php
    global $quest_board_page_id;
    
    if(!$quest_board_page_id){
        $quest_board_page_id = "home";
        header("Location: ./pages/home.php");
        exit;
    }

    $pages = [
        "home" => "Início",
        "my-account" => "Minha conta",
        "events" => "Eventos",
        "calendar" => "Calendário"
    ];
?>

<div id="the-sidenav" class="slide-away">
    <div class="sidenav-banners-container">
        <?php
        foreach ($pages as $page_id => $page) {
            $class = $quest_board_page_id === $page_id ? "btn one-side-banner selected" : "btn one-side-banner";
            echo "<a href='../pages/" . $page_id . ".php' class='" . $class . "'>" . $page . "</a>";
        }
        ?>
    </div>
</div>
