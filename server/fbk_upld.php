#!/usr/bin/php
<?php
//require_once __DIR__ . '/vendor/autoload.php'; // change path as needed
require_once '/var/www/html/vendor/autoload.php'; // change path as needed


$link_gif="http://socialevent.mx/gif/uploads/360/nov29_1848_41.mp4";
$message_gif="nov29_1848_41.mp4";

$access_token="EAAcZCKRY8rLwBAJXhhtiamyLsTBNUAdWyhO4v7wwCZC9tE7OTYBWHjgP77ijwFqcyJxiOEQbMbgOFqMVToNRiwwhCu7d8SqueGQZCrnwnX6cHLphQBfG2OsQokeZAEeUyh4BniimoQW2d2joFuGx9nZCEfxGXC3GsNQ57Q4Uj9zyDWJ45rZCZCWUPvZBMJ8xhtUZD";
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

try {
    // Get the \Facebook\GraphNodes\GraphUser object for the current user.
    // If you provided a 'default_access_token', the '{access-token}' is optional.
    // Replace access token after 60 days from now Nov 1 2017
    $response = $fb->get('/me', $access_token);
} catch(\Facebook\Exceptions\FacebookResponseException $e) {
    // When Graph returns an error
    echo 'Graph returned an error: ' . $e->getMessage();
    exit;
} catch(\Facebook\Exceptions\FacebookSDKException $e) {
    // When validation fails or other local issues
    echo 'Facebook SDK returned an error: ' . $e->getMessage();
    exit;
}

try {
    // Returns a `FacebookFacebookResponse` object
    $post_gif = $fb->post(
        '/me/feed',
        array (
            'link' => $link_gif,
            'message' => $message_gif
        ),
        $access_token
    );
} catch(FacebookExceptionsFacebookResponseException $e) {
    echo 'Graph returned an error: ' . $e->getMessage();
    exit;
} catch(FacebookExceptionsFacebookSDKException $e) {
    echo 'Facebook SDK returned an error: ' . $e->getMessage();
    exit;
}


$me = $response->getGraphUser();
//echo 'Logged in as ' . $me->getName();
echo $message_gif.' posted on fbk';
echo "\r\n";

?>
