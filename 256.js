function hashText() {
    const inputText = document.getElementById('inputText').value;
    const hash = sha256(inputText);
    document.getElementById('outputText').value = hash;
}

function sha256(ascii) {
    const prime = 2 ** 32;
    const maxWord = prime - 1;
    const result = new DataView(new ArrayBuffer(32));
    const words = [];
    const asciiBitLength = ascii.length * 8;
    const hash = sha256.h = sha256.h || [];
    const k = sha256.k = sha256.k || [];
    let i, j, t, w, a, b, c, d, e, f, g, h, temp1, temp2;

    for (i = 0; i < 64; i++) {
        k[i] = (Math.abs(Math.sin(i + 1)) * prime) | 0;
    }

    ascii += '\x80';
    while (ascii.length % 64 - 56) ascii += '\x00';
    for (i = 0; i < ascii.length; i++) {
        j = ascii.charCodeAt(i);
        if (j >> 8) return;
        words[i >> 2] |= j << ((3 - i) % 4) * 8;
    }
    words[words.length] = ((asciiBitLength / prime) | 0);
    words[words.length] = (asciiBitLength);

    for (j = 0; j < words.length;) {
        w = words.slice(j, j += 16);
        for (i = 0; i < 64; i++) {
            t = w[i - 15], a = w[i - 2];
            w[i] = (i < 16 ? w[i] : (
                w[i - 16] + (t >>> 7 | t << 25) + (t >>> 18 | t << 14) + (t >>> 3) +
                w[i - 7] + (a >>> 17 | a << 15) + (a >>> 19 | a << 13) + (a >>> 10)
            )) | 0;
        }

        a = hash[0] | 0;
        b = hash[1] | 0;
        c = hash[2] | 0;
        d = hash[3] | 0;
        e = hash[4] | 0;
        f = hash[5] | 0;
        g = hash[6] | 0;
        h = hash[7] | 0;

        for (i = 0; i < 64; i++) {
            temp1 = h + (e >>> 6 | e << 26) + (e & f ^ ~e & g) + k[i] + w[i];
            temp2 = (a >>> 2 | a << 30) + (a & b ^ a & c ^ b & c);
            h = g;
            g = f;
            f = e;
            e = d + temp1 | 0;
            d = c;
            c = b;
            b = a;
            a = temp1 + temp2 | 0;
        }

        hash[0] = (hash[0] + a) | 0;
        hash[1] = (hash[1] + b) | 0;
        hash[2] = (hash[2] + c) | 0;
        hash[3] = (hash[3] + d) | 0;
        hash[4] = (hash[4] + e) | 0;
        hash[5] = (hash[5] + f) | 0;
        hash[6] = (hash[6] + g) | 0;
        hash[7] = (hash[7] + h) | 0;
    }

    for (i = 0; i < 8; i++) {
        result.setUint32(i * 4, hash[i]);
    }

    return Array.from(new Uint8Array(result.buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}
