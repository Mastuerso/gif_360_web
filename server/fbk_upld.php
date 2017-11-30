#!/usr/bin/php
<?php
//require_once __DIR__ . '/vendor/autoload.php'; // change path as needed
require_once '/var/www/html/vendor/autoload.php'; // change path as needed


$link_gif="http://socialevent.mx/gif/uploads/360/";
$message_gif="someone@domain.co";
$video_dir="/home/onikom/gif_360/main/gifs/nov28_1931_36/nov29_1855_46.mp4";

$access_token="EAAcZCKRY8rLwBAPWOZA7ZCq1xAHnfNTBfHVZBKhuD4mxNmTz5mIacsk8YsVBgQGZCCQGd1U5m7mbZC7eX57TaMaSJ5YOkqSZBIXLnf0gj5azshZCOGKG2LEkvZCV2YMZBl8XlJBtgUI55v7p4kuquwDDZAZC6q7qZBYqooa2WWfpFYTZCZAu7hOPAs1yAp6ci53nMbR71gZD";
#$access_token="EAAcZCKRY8rLwBAF7wWZCLnxMiIDZBBBYQZBxxLDyvF6CzHpELll7gm72YfXQw1HgfuUuNizxles5ZAuTo4x5uVqksB6EJVnZAstL5laZBzV80k4evx923cLfFtjMa7ZBHOcH6EYLdD9L5dlw2hCcFRWyvY7Yqhz9jv4kXagZC53DpjQZDZD";

$fb = new \Facebook\Facebook([
    'app_id' => '2039770536258748',
    'app_secret' => '05d78cbac9249efb43938f6e886b0251',
    'default_graph_version' => 'v2.10',
    //'default_access_token' => '{access-token}', // optional
]);

// Use one of the helper classes to get a Facebook\Authentication\AccessToken entity.
//   $helper = $fb->getRedirectLoginHelper();
//   $helper = $fb->getJavaScriptHelper();
//   $helper = $fb->getCanvasHelper();
//   $helper = $fb->getPageTabHelper();

//try {
//    // Get the \Facebook\GraphNodes\GraphUser object for the current user.
//    // If you provided a 'default_access_token', the '{access-token}' is optional.
//    // Replace access token after 60 days from now Nov 1 2017
//    $response = $fb->get('/me', $access_token);
//} catch(\Facebook\Exceptions\FacebookResponseException $e) {
//    // When Graph returns an error
//    echo 'Graph returned an error: ' . $e->getMessage();
//    exit;
//} catch(\Facebook\Exceptions\FacebookSDKException $e) {
//    // When validation fails or other local issues
//    echo 'Facebook SDK returned an error: ' . $e->getMessage();
//    exit;
//}
//
//try {
//    // Returns a `FacebookFacebookResponse` object
//    $post_gif = $fb->post(
//        '/me/feed',
//        array (
//            'link' => $link_gif,
//            'message' => $message_gif
//        ),
//        $access_token
//    );
//} catch(FacebookExceptionsFacebookResponseException $e) {
//    echo 'Graph returned an error: ' . $e->getMessage();
//    exit;
//} catch(FacebookExceptionsFacebookSDKException $e) {
//    echo 'Facebook SDK returned an error: ' . $e->getMessage();
//    exit;
//}
//
//
//$me = $response->getGraphUser();
////echo 'Logged in as ' . $me->getName();
//echo $message_gif.' posted on fbk';
//echo "\r\n";

//==================VIDEO UPLOAD

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
