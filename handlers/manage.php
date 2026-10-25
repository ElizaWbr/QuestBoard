<?php
if (isset($_POST["action_save_event"])) {
    var_dump($_POST);

    $data = [
        "name" => getPostValue("event_name"),
        "description" => getPostValue("event_description"),
        "date_start" => getPostValue("event_date_start"),
        "date_end" => getPostValue("event_date_end"),
        "time_start" => getPostValue("event_time_start"),
        "time_end" => getPostValue("event_time_end"),
        "ticket" => getPostValue("event_ticket"),
        "ticket_price" => getPostValue("event_ticket_price"),
        "ticket_url" => getPostValue("event_ticket_url"),
        "obs" => getPostValue("event_obs"),
        "color" => getPostValue("event_color"),
        "image" => getPostValue("event_image")
    ];
}

function getPostValue($key): string
{
    return isset($_POST[$key]) ? $_POST[$key] : "";
}
