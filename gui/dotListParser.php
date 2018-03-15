<?php
function parseDotList($file)
{
    $document = file_get_contents($file);
    $lines = explode("\n", $document);
    $values = array();
    #print_r($lines);
    foreach ($lines as $line) {
        $value = strstr($line, 'Choice:');
        $value = strstr($value, ' ');
        #$value = str_replace(" ", "", $value);
        if ($value != "") {
            #echo "{$value} \n";
            $raw_data = ltrim($value);
            $key = strstr($raw_data, ' ', true);
            $data = strstr($raw_data, ' ');
            $data = ltrim($data);
            #echo "{$key} = {$data} \n";
            $values[$key] = $data;
        }
    }
    return $values;
}
