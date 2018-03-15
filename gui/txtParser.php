<?php
function parse_txt($file, $string = false) {
    $document=file_get_contents($file);
    $lines=explode("\n",  $document);
    $num_lines=count($lines);
    $values=array();

    for ($i=0; $i < $num_lines; ++$i) {
        #echo "$lines[$i] \n";
        $key=strstr($lines[$i], '=', true);
        if ($key != "") {

            $key = str_replace(" ", "", $key);

            #echo "$key => $value \n";
            $value=strstr($lines[$i], '=');
            $value = str_replace("=", "", $value);

            if ( strstr($value, ';') and !$string ){

                $value=explode(';', $value);
                for ( $j=0; $j < count($value); $j++ ){

                    if( strstr($value[$j], " ") ) {

                        $value[$j] = str_replace(" ", "", $value[$j]);

                    }
                }
            } elseif ( strstr($value, ' ') ){

                $value = ltrim($value);

            }

            $values[$key] = $value;
        }
    }

    return $values;
}
function write_txt($values, $file){
    $txt="";
    foreach ($values as $key => $value) {

        if(is_array($value)) {
            $members=count($value);
            #echo "{$key} => ";
            $txt.="{$key} = ";
            for($i=0; $i < $members; $i++){
                if( $i == 0){
                    #echo "{$value[$i]}";
                    $txt.="{$value[$i]}";
                } else {
                    #echo "; {$value[$i]}";
                    $txt.="; {$value[$i]}";
                }
            }
            #echo "\n";
            $txt.="\n";
        } else {
            #echo "{$key} => {$value}\n";
            $txt.="{$key} = {$value}\n";
        }
    }
    $fileTxt=fopen($file, "w") or die("Where is the file?");
    fwrite($fileTxt, $txt);
}
?>
