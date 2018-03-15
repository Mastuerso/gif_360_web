#!/usr/bin/php
<?php
//require_once __DIR__ . '/vendor/autoload.php'; // change path as needed
require_once '/var/www/html/vendor/autoload.php'; // change path as needed
include_once '/var/www/html/gif_360_web/gui/txtParser.php'; //location of txt parser

echo "\n================POSTING ON FACEBOOK================\n";

$minidir=$argv[1];
$file=$minidir . "/gif_settings.txt";
$values=parse_txt($file);

$message_gif=$values["fb_message"];

$files=array_diff(scandir($minidir), array('..', '.'));

foreach ($files as $filename) {
    if ( strstr($filename, '.mp4') ) $video_dir=$minidir . "/" . $filename;
}

$access_token="EAAcZCKRY8rLwBAGGQZATSiD0YnOaVC4WiHBxyBEtcfZCpKU07XdQD73OcLZAFZCmnyxFEDIyAkDIe9c1eAiB1pxxyYxkZBW2ZCylIMDSpqR3gOk9VROX9KlPgUZCvnLOJUVZCFUZCFuMVYi8rpdPYgayi2El1uALUXuIpM2cKCFyoNrwZDZD";

//==================VIDEO UPLOAD==================

$fb = new Facebook\Facebook([
  'app_id' => '2039770536258748',
  'app_secret' => '05d78cbac9249efb43938f6e886b0251',
  'default_graph_version' => 'v2.10',
  ]);

$data = [
  'title' => $message_gif,
  'description' => $message_gif,
  'source' => $fb->videoToUpload($video_dir),
];

try {
  $response = $fb->post('/me/videos', $data, $access_token);
} catch(Facebook\Exceptions\FacebookResponseException $e) {
  // When Graph returns an error
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
  // When validation fails or other local issues
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}

$graphNode = $response->getGraphNode();
var_dump($graphNode);

echo 'Video ID: ' . $graphNode['id'];
echo "\r\n";

?>
