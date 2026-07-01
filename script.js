let products = JSON.parse(localStorage.getItem("products")) || [];
console.log("Products:", products);
let currentCategory = "all";

const menu = document.getElementById("menu");
const logoPreview = document.getElementById("logoPreview");
const adVideo = document.getElementById("adVideo");

// بارگذاری لوگو
const savedLogo = localStorage.getItem("logo");
if (savedLogo) {
    logoPreview.src = savedLogo;
}

// بارگذاری ویدیو از فایل پروژه
adVideo.src = "video.mp4";

// نمایش محصولات
function renderProducts() {

    menu.innerHTML = "";

    const list = currentCategory === "all"
        ? products
        : products.filter(p => p.category === currentCategory);

    list.forEach((product, index) => {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${product.image}">
            <h3>${product.name}</h3>
            <p>${product.price} تومان</p>

            <button class="deleteBtn" onclick="deleteProduct(${index})">
                حذف محصول
            </button>
        `;

        menu.appendChild(card);

    });

}

renderProducts();

function filterCategory(cat){
    currentCategory = cat;
    renderProducts();
}

function openAdmin(){

    const pass = prompt("رمز را وارد کنید");

    if(pass==="4030"){
        document.getElementById("adminPanel").classList.remove("hidden");
    }else{
        alert("رمز اشتباه است");
    }

}

function closeAdmin(){
    document.getElementById("adminPanel").classList.add("hidden");
}

function saveProduct(){

    const name=document.getElementById("name").value.trim();
    const price=document.getElementById("price").value.trim();
    const category=document.getElementById("category").value;

    const imageFile=document.getElementById("image").files[0];
    const logoFile=document.getElementById("logo").files[0];

    if(name==="" || price===""){
        alert("نام و قیمت را وارد کنید");
        return;
    }

    if(!imageFile){
        alert("عکس محصول را انتخاب کنید");
        return;
    }

    const reader=new FileReader();
        reader.onload = function(e){

        products.push({
            name: name,
            price: price,
            category: category,
            image: e.target.result
        });

        localStorage.setItem("products", JSON.stringify(products));

        renderProducts();

        document.getElementById("name").value = "";
        document.getElementById("price").value = "";
        document.getElementById("image").value = "";

        alert("محصول ثبت شد");

    };

    reader.readAsDataURL(imageFile);

    if(logoFile){

        const r = new FileReader();

        r.onload = function(ev){

            logoPreview.src = ev.target.result;
            localStorage.setItem("logo", ev.target.result);

        };

        r.readAsDataURL(logoFile);

    }

}

function deleteProduct(index){

    const pass = prompt("رمز مدیریت را وارد کنید");

    if(pass !== "4030"){
        alert("رمز اشتباه است");
        return;
    }

    if(confirm("آیا از حذف این محصول مطمئن هستید؟")){

        products.splice(index, 1);

        localStorage.setItem("products", JSON.stringify(products));

        renderProducts();

        alert("محصول حذف شد");

    }

}
