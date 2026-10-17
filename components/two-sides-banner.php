<?php

global $banner_title, $banner_icon_img;

if (!$banner_title) {
    return;
}

if ($banner_icon_img) {
    $banner_icon_img = "<img src='../images/icons/" . $banner_icon_img . ".svg' alt='Page icon' class='icon big'/>";
}

?>
<div class="two-sides-banner">
    <?php if ($banner_icon_img) { ?>
        <div class="the-site-icon">
            <?php echo $banner_icon_img; ?>
        </div>
    <?php } ?>
    <div class="banner-top">
        <h2>
            <?php echo $banner_title; ?>
        </h2>
    </div>
    <div class="banner-bottom">
        <div class="side-left"></div>
        <div class="side-right"></div>
    </div>
</div>
