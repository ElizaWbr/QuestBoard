<?php
    /* 
     * Style need to be called on page head
     * <link rel="stylesheet" href="../styles/login.css" />
     * <link rel="stylesheet" href="../styles/banner.css" />
     */
    global $pretty_title, $pretty_content, $pretty_icon, $banner_title, $banner_icon_img;

    if (!$pretty_title || !$pretty_content) {
        return;
    }

    $banner_title = $pretty_title;
    $banner_icon_img = $pretty_icon;
    if (!$banner_icon_img) {
        $banner_icon_img = "book";
    }
?>

<div class="pretty-container">
    <div class="first-pretty-layer flex-center-center">
        <div class="background-decor flex-center-center"></div>
    </div>
    <div class="second-pretty-layer flex-center-center">
        <div class="pretty-header">
            <?php include_once "../components/two-sides-banner.php"; ?>
        </div>
        <div class="pretty-content flex-center-center">
            <?php
            echo $pretty_content;
            ?>
        </div>
    </div>
</div>
