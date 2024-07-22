<?php


namespace app\controllers\game;


use Yii;
use yii\web\Controller;

class Game2048Controller extends Controller
{
    public function actionIndex($retry = null)
    {
        if (!$retry) {
            Yii::$app->session->setFlash('retry', $retry);
        }

        return $this->render('index');
    }

    public function actionEndGame()
    {
        var_dump(Yii::$app->request->get('score'));
    }
}