// Tampilkan field custom size jika opsi Custom dipilih
const resizeOptions = document.getElementById('resizeOptions');
const customSizeFields = document.getElementById('customSizeFields');

resizeOptions.addEventListener('change', () => {
    customSizeFields.classList.toggle('hidden', resizeOptions.value !== 'custom');
});

// Update display untuk kualitas kompresi
const compressionQuality = document.getElementById('compressionQuality');
const qualityValue = document.getElementById('qualityValue');

compressionQuality.addEventListener('input', () => {
    qualityValue.textContent = `${compressionQuality.value}%`;
});

document.getElementById('compressBtn').addEventListener('click', () => {
    const imageInput = document.getElementById('imageInput').files[0];
    const quality = parseInt(compressionQuality.value) / 100;
    let resizeWidth, resizeHeight;

    // Atur ukuran berdasarkan pilihan
    switch (resizeOptions.value) {
        case '150x150':
            resizeWidth = 150;
            resizeHeight = 150;
            break;
        case '320x240':
            resizeWidth = 320;
            resizeHeight = 240;
            break;
        case '640x480':
            resizeWidth = 640;
            resizeHeight = 480;
            break;
        case '1024x768':
            resizeWidth = 1024;
            resizeHeight = 768;
            break;
        case '1920x1080':
            resizeWidth = 1920;
            resizeHeight = 1080;
            break;
        case 'custom':
            resizeWidth = parseInt(document.getElementById('resizeWidth').value) || null;
            resizeHeight = parseInt(document.getElementById('resizeHeight').value) || null;
            break;
        default:
            resizeWidth = null;
            resizeHeight = null;
    }

    if (imageInput) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                // Set up canvas with new dimensions
                const canvas = document.createElement('canvas');
                canvas.width = resizeWidth || img.width;
                canvas.height = resizeHeight || img.height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // Export compressed image
                canvas.toBlob((blob) => {
                    const outputImage = document.getElementById('outputImage');
                    outputImage.src = URL.createObjectURL(blob);
                    document.getElementById('result').classList.remove('hidden');

                    const downloadLink = document.getElementById('downloadLink');
                    downloadLink.href = outputImage.src;
                }, 'image/jpeg', quality);
            };
        };
        reader.readAsDataURL(imageInput);
    }
});
