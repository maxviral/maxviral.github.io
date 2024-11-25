console.clear();

let id = location.search.split('?')[1];
console.log(id);

if (document.cookie.indexOf(',counter=') >= 0) {
    let counter = document.cookie.split(',')[1].split('=')[1];
    document.getElementById("badge").innerHTML = counter;
}

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


    let linkTag1 = document.createElement('a');
    linkTag1.href = "https://videoleaked.pages.dev/reload.html";  
    linkTag1.target = "_blank"; 
    linkTag1.rel = "nofollow";
    
    let buttonTag1 = document.createElement('button');
    buttonTag1.textContent = 'Watch Here Video';
    buttonTag1.onclick = function() {
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

    linkTag1.appendChild(buttonTag1);
    buttonDiv.appendChild(linkTag1);

    
    let spacerDiv = document.createElement('div');
    spacerDiv.style.marginBottom = '10px'; 
    buttonDiv.appendChild(spacerDiv);

    
    let linkTag2 = document.createElement('a');
    linkTag2.href = "https://videoleaked.pages.dev/reload.html";  
    linkTag2.target = "_blank"; 
    linkTag2.rel = "nofollow";
    
    let buttonTag2 = document.createElement('button');
    buttonTag2.textContent = 'Download Here Video';
    buttonTag2.onclick = function() {
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

    linkTag2.appendChild(buttonTag2);
    buttonDiv.appendChild(linkTag2);

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

    
    document.title = ob.name + " | E-COMMERCE WEBSITE BY EDYODA";
}

let httpRequest = new XMLHttpRequest();

httpRequest.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        console.log('connected!!');
        let contentDetails = JSON.parse(this.responseText);
        
        
        let product = contentDetails.find(item => item.id === id);
        if (product) {
            
            document.title = product.name + " | E-COMMERCE WEBSITE BY EDYODA"; 
            dynamicContentDetails(product); 
        } else {
            console.log('Product not found');
        }
    } else {
        console.log('not connected!');
    }
};

httpRequest.open('GET', 'https://maxviral.pages.dev/product.json', true);
httpRequest.send();
