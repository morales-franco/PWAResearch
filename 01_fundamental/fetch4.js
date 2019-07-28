//BLOB!
//Fetch a recursos, images, pdf, etc and then maybe we can storage these resources in cache
let img = document.querySelector('img');

fetch("dev.jpg")
.then(response => response.blob())
.then(blobImage => {
    console.log(blobImage);
    var imgPath = URL.createObjectURL(blobImage); //Generamos una URL para ese blob
    img.src = imgPath;
});