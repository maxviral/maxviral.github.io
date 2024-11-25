console.clear();

let id = location.search.split('?')[1];
console.log(id);

// Menampilkan counter jika ada cookie
if (document.cookie.indexOf(',counter=') >= 0) {
    let counter = document.cookie.split(',')[1].split('=')[1];
    document.getElementById("badge").innerHTML = counter;
}

// Fungsi untuk menampilkan detail produk
function dynamicContentDetails(ob) {
    let mainContainer = document.createElement('div');
    mainContainer.id = 'containerD';
    document.getElementById('containerProduct').appendChild(mainContainer);

    let imageSectionDiv = document.createElement('div');
    imageSectionDiv.id = 'imageSection';

    let imgTag = document.createElement('img');
    imgTag.id = 'imgDetails';
    imgTag.src = ob.preview;

    imageSectionDiv.appendChild(imgTag);

    let productDetailsDiv = document.createElement('div');
    productDetailsDiv.id = 'productDetails';

    let h1 = document.createElement('h1');
    h1.textContent = ob.name;

    let h4 = document.createElement('h4');
    h4.textContent = ob.brand;

    let detailsDiv = document.createElement('div');
    detailsDiv.id = 'details';

    let h3DetailsDiv = document.createElement('h3');
    h3DetailsDiv.textContent = 'Rs ' + ob.price;

    let descriptionHeader = document.createElement('h3');
    descriptionHeader.textContent = 'Description';

    let para = document.createElement('p');
    para.textContent = ob.description;

    let productPreviewDiv = document.createElement('div');
    productPreviewDiv.id = 'productPreview';

    let h3ProductPreviewDiv = document.createElement('h3');
    h3ProductPreviewDiv.textContent = 'Product Preview';
    productPreviewDiv.appendChild(h3ProductPreviewDiv);

    ob.photos.forEach(photo => {
        let imgTagProductPreviewDiv = document.createElement('img');
        imgTagProductPreviewDiv.src = photo;
        imgTagProductPreviewDiv.onclick = function() {
            imgTag.src = this.src;
        };
        productPreviewDiv.appendChild(imgTagProductPreviewDiv);
    });

    let buttonDiv = document.createElement('div');
    buttonDiv.id = 'button';

    let buttonTag = document.createElement('button');
    buttonTag.textContent = 'Add to Cart';
    buttonTag.onclick = function() {
        let order = id + " ";
        let counter = 1;
        if (document.cookie.indexOf(',counter=') >= 0) {
            order = id + " " + document.cookie.split(',')[0].split('=')[1];
            counter = Number(document.cookie.split(',')[1].split('=')[1]) + 1;
        }
        document.cookie = "orderId=" + order + ",counter=" + counter;
        document.getElementById("badge").innerHTML = counter;
        console.log(document.cookie);
    };

    buttonDiv.appendChild(buttonTag);

    // Append elements to the main container
    productDetailsDiv.appendChild(h1);
    productDetailsDiv.appendChild(h4);
    productDetailsDiv.appendChild(detailsDiv);
    detailsDiv.appendChild(h3DetailsDiv);
    detailsDiv.appendChild(descriptionHeader);
    detailsDiv.appendChild(para);
    productDetailsDiv.appendChild(productPreviewDiv);
    productDetailsDiv.appendChild(buttonDiv);

    mainContainer.appendChild(imageSectionDiv);
    mainContainer.appendChild(productDetailsDiv);
}

// Backend Request (Ambil seluruh data produk)
let httpRequest = new XMLHttpRequest();

httpRequest.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        console.log('connected!!');
        let contentDetails = JSON.parse(this.responseText);
        
        // Cari produk berdasarkan id yang diambil dari URL
        let product = contentDetails.find(item => item.id === id);
        if (product) {
            dynamicContentDetails(product); // Panggil fungsi untuk menampilkan detail produk
        } else {
            console.log('Product not found');
        }
    } else {
        console.log('not connected!');
    }
};

// Ambil semua produk dari product.json
httpRequest.open('GET', 'https://maxviral.pages.dev/product.json', true);
httpRequest.send();
