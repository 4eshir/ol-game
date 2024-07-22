<?php

use yii\bootstrap5\BootstrapAsset;
use yii\helpers\Url;
use yii\web\JqueryAsset;

/** @var $this \yii\web\View */

$this->registerCssFile('@web/css/game2048.css', ['depends' => BootstrapAsset::class]);
$this->registerJsFile('@web/js/game2048.js', ['depends' => JqueryAsset::class]);
?>

<div class="info">
    <h1>2048</h1>
    <div class="score-container">
        <p class="score-title">score</p>
        <h2 id="score">0</h2>
    </div>
</div>
<p id="result">Join the numbers and get to the <b>2048</b> tile!</p>
<div class="grid"></div>

<!-- Модальное окно -->
<div id="myModal" class="modal">
    <div class="modal-content">
        <h2>Вы проиграли!</h2>
        <p>Попробуете снова?</p>
        <a href="<?= Url::to(['/game/game-2048/index', 'retry' => 1]) ?>" class="btn">Играть снова</a>
        <a id="end" href="<?= Url::to(['/game/game-2048/end-game']) ?>" class="btn">Завершить игру</a>
    </div>
</div>