## Fix: QR Code em ambientes headless

### Passo 1: instalar o Google Chrome

#### Exemplo em ambientes Debian

```
sudo apt update

wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

sudo apt -y install ./google-chrome-stable_current_amd64.deb
```

### Passo 2: Checar o caminho do executável do Google Chrome
```
which google-chrome-stable

(exemplo de resultado: /usr/bin/google-chrome-stable)
```
### Passo 3: Alterar o caminho do Google Chrome nas configurações do pacote venom-bot instalado

```
vim node_modules/venom-bot/dist/controllers/browser.js
```
- Navegar até a função `initBrowser()` (por volta da linha 224)
- Dentro do `case 0`, alterar o valor da variável `chromePath` para refletir o caminho do Google Chrome



### Original

```javascript
/**
 * Initializes browser, will try to use chrome as default
 * @param session
 */
function initBrowser(session, options, logger, extras) {
    if (extras === void 0) { extras = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var chromePath, browserFetcher, folderSession, folderMulidevice, proxy, browser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    chromePath = getChrome(); //MODIFICAR ESTA VARIÁVEL
                    if (!(chromePath && options.useChrome)) return [3 /*break*/, 1];
                    extras = __assign(__assign({}, extras), { executablePath: chromePath });
                    return [3 /*break*/, 4];

```


Modificado:
```javascript
/**
 * Initializes browser, will try to use chrome as default
 * @param session
 */
function initBrowser(session, options, logger, extras) {
    if (extras === void 0) { extras = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var chromePath, browserFetcher, folderSession, folderMulidevice, proxy, browser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    chromePath = '/usr/bin/google-chrome-stable';
                    if (!(chromePath && options.useChrome)) return [3 /*break*/, 1];
                    extras = __assign(__assign({}, extras), { executablePath: chromePath });
                    return [3 /*break*/, 4];

```