# eyeybot-azure

This is a simple Telegram Bot that echoes messages with certain prefixes.

The following environment variables are required for the bot to run:
  - `BOT_TOKEN`: Telegram bot token, see [Telegram API documentation](https://core.telegram.org/bots#3-how-do-i-create-a-bot) for more info
  - `WEBHOOK_ADDRESS`: web address for the webhook
    - For running locally, this should be a public URL mapped to your localhost ([ngrok](https://www.npmjs.com/package/ngrok#global-install) provides an easy way to get one), followed by `/api/EyEyBot`
    - For deployment, this should be the URL of your Azure Function App (e.g. https://my-app.azurewebsites.net/api/EyEyBot)

To run locally, simply run

```sh
npm start
```

To deploy, use the [Azure Functions extension for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions).
