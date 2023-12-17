function MyEncryptionSystem() {
    this.modulus = null;
    this.publicExponent = 17; // Використовується як публічний експонент
    this.privateExponent = null;
}

MyEncryptionSystem.prototype.generateKeys = function () {
    const primeP = parseInt(prompt('Введіть перше просте число (p):'));
    const primeQ = parseInt(prompt('Введіть друге просте число (q):'));

    if (!this.isPrime(primeP) || !this.isPrime(primeQ)) {
        alert('Обидва числа повинні бути простими.');
        return;
    }

    this.modulus = primeP * primeQ;
    const totient = (primeP - 1) * (primeQ - 1);

    this.privateExponent = this.calculatePrivateExponent(this.publicExponent, totient);
};

MyEncryptionSystem.prototype.isPrime = function (num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

MyEncryptionSystem.prototype.encryptMessage = function () {
    this.generateKeys();
    const userMessage = parseInt(prompt('Введіть числове повідомлення:'));
    const encryptedMessage = this.encrypt(userMessage, this.publicExponent, this.modulus);
    alert(`Зашифроване повідомлення: ${encryptedMessage}`);
};

MyEncryptionSystem.prototype.decryptMessage = function () {
    const encryptedMessage = parseInt(prompt('Введіть зашифроване повідомлення:'));
    const decryptedMessage = this.encrypt(encryptedMessage, this.privateExponent, this.modulus);
    alert(`Розшифроване повідомлення: ${decryptedMessage}`);
};

MyEncryptionSystem.prototype.calculatePrivateExponent = function (publicExponent, totient) {
    for (let x = 1; x < totient; x++) {
        if ((publicExponent * x) % totient === 1) {
            return x;
        }
    }
    return null;
};

MyEncryptionSystem.prototype.encrypt = function (message, exponent, modulus) {
    if (modulus === 1) return 0;
    let result = 1;
    let base = message % modulus;

    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % modulus;
        }
        exponent = Math.floor(exponent / 2);
        base = (base * base) % modulus;
    }
    return result;
};

const myEncryptor = new MyEncryptionSystem();

function runEncryption() {
    myEncryptor.encryptMessage();
}

function runDecryption() {
    myEncryptor.decryptMessage();
}
