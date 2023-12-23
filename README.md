# swhitchbot 温湿度データロガー

## 概要
このスクリプトは、SwitchBotデバイスからの温度と湿度データをGoogleスプレッドシートに記録するために設計されています。登録されている各SwitchBotデバイスから最新のデータを取得し、構造化された形式で記録します。

## 特徴
- SwitchBot APIを使用してSwitchBotデバイスから温度と湿度データを取得します。
- タイムスタンプ付きのGoogleスプレッドシートにデータを記録します。
- シートやAPIトークンが見つからない場合のエラー処理。

## 前提条件
- Google Apps Script環境。
- SwitchBotアカウントと少なくとも1つのデバイス。
- SwitchBotからのAPIトークン。

## セットアップ
1. **Googleスプレッドシートの設定：**
   - 新しいGoogleスプレッドシートを作成します。
   - 'devices' と 'Data' という2つのシートを追加します。
   - 'devices' シートにデバイス名、デバイスID、デバイスタイプをリストします。
   - 'Data' シートはスクリプトによって自動的にフォーマットされます。

2. **SwitchBot APIトークン：**
   - SwitchBot APIトークンを取得します。
   - Google Apps Scriptのプロジェクトプロパティとして 'SwitchBotToken' としてAPIトークンを保存します。

3. **スクリプトのデプロイ：**
   - Google Apps Scriptエディタを開きます。
   - 提供されたスクリプトをコピーして貼り付けます。
   - `updateTemperatureAndHumidityData` 関数を保存して実行し、データの記録を開始します。

## 使用方法
- スクリプトは手動で実行するか、Google Apps Scriptのトリガーを使用して定期的に実行するように設定できます。

## 関数
- `updateTemperatureAndHumidityData`: 温度と湿度データを更新するメイン関数。
- `getSpreadsheet`: アクティブなGoogleスプレッドシートを取得します。
- `getSheet`: スプレッドシートから特定のシートを取得します。
- `getDevices`: 'devices' シートからデバイス情報を取得します。
- `prepareDataSheet`: データ入力用に 'Data' シートを準備します。
- `appendDeviceData`: デバイスの温度と湿度データを 'Data' シートに追加します。
- `callSwitchBotApi`: デバイスの最新データを取得するためにSwitchBot APIを呼び出します。
- `getApiToken`: スクリプトプロパティからSwitchBot APIトークンを取得します。

## エラー処理
- スクリプトには、シートが見つからない場合やAPIトークンがない場合などのシナリオのエラー処理が含まれています。

## 制限事項
- このスクリプトは、SwitchBot APIおよびGoogle Apps Script環境の利用可能性に依存しています。

## ライセンス
- このスクリプトはそのままの状態で提供され、保証やサポートは含まれません。ユーザーは自由に変更して自分のニーズに合わせて使用することができます。

---

*注：常に、第三者のAPIやサービスからデータを使用し、アクセスするために必要な許可を確保してください。
