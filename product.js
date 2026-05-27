import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-analytics.js";
  import { getFirestore,collection, getDocs,} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAdvPCB1DA_wFB2qD95-vtB5HSVhaZpujk",
    authDomain: "laxmi-xerox-47cb3.firebaseapp.com",
    projectId: "laxmi-xerox-47cb3",
    storageBucket: "laxmi-xerox-47cb3.firebasestorage.app",
    messagingSenderId: "90263972495",
    appId: "1:90263972495:web:c28f8d4e96d770bc255efa",
    measurementId: "G-76K4WLZZY5"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);


/*window.onload=function(){
    document.getElementById("welcome_page").style.opacity="0";

    setTimeout(function(){
        document.getElementById("welcome_page").style.display="none";
        document.getElementById("main_page").style.display="block";
    },10000);
};*/

function checkStatus(){
    const days=["Sunday","Monday","Tuesday","Wednesday","Thurday","Friday","Saturday"];
    const now=new Date();
    const day=now.getDay();
    const today=days[now.getDay()];
    const hours=now.getHours();
    const minutes=now.getMinutes();
    const currentTime=hours*60+minutes;
    let opentime;
    let closetime;
    let text;

    if(day>=1 && day<=6)//Monday to Saturday
        {
            opentime = 8*60;
            closetime = 21*60;

    }
    else//Sunday
        {
            opentime = 8*60;
            closetime = 13*60;
    }
    let textStatus=""
    //let statusElement=document.getElementById("status");

    if(currentTime>=opentime && currentTime<=closetime){
        text=today+': <span style="color:green"> Open now </span><i style="font-size:12px">(Closes 9.00PM)</i>';
    }
    else{  
        text=today+': <span style="color:red">Closed</span><i style="font-size:12px">(Opens 8.00AM)</i>';
    }
    document.getElementById("status").innerHTML=text;
    document.getElementById("status_in_menu").innerHTML=text;
}
checkStatus();

function toggleDropdown(){
    const dropdown=document.getElementById("dropdown");
    dropdown.style.display= dropdown.style.display=="block" ? "none":"block";
}
window.toggleDropdown=toggleDropdown;

let allProducts = [];
let currentCategory = "All";

async function  loadProducts(category="All"){

    
    
    const querySnapshot = await getDocs(collection(db,"products"));
  
     allProducts = [];
     
    querySnapshot.forEach((products)=>{
      const data = products.data();
        allProducts.push(data);
      
    });
    filterAndDisplayProducts();
  }
  



  function filterAndDisplayProducts(){

    const searchValue =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const filteredProducts =
        allProducts.filter((product)=>{

            const matchCategory =
                currentCategory === "All" ||
                product.category === currentCategory;

            const matchSearch =
                product.name
                .toLowerCase()
                .includes(searchValue);

            return matchCategory && matchSearch;
        });

    displayProducts(filteredProducts);
}



  
  function displayProducts(productsArray){
      const productContainer = document.getElementById("productContainer");

    productContainer.innerHTML="";
    let totalProducts=0;

    productsArray.forEach((data)=>{
      
     
        totalProducts++;
      productContainer.innerHTML +=`
      <div class="product-card">
        <img src="${data.image}">
        <div class="product-info">
          <h3>${data.name}</h3>
          <p>₹${data.price}</p>
           <a href="https://wa.me/919489094973?text=${encodeURIComponent(`Hello, I Want ${data.name}. Is this available now?`)}" target="_blank" >
           <i class="fa-brands fa-whatsapp"></i>
           Check Availablity<br>
        </a>
        </div>
        </div>`
      
    });
    document.getElementById("productTotal").innerText = `${totalProducts} products found`;

  }

  

window.filterProducts = function(category, button){

    currentCategory = category;

    filterAndDisplayProducts();

    const buttons =
        document.querySelectorAll(".filterBtn");

    buttons.forEach((btn)=>{
        btn.classList.remove("active");
    });

    button.classList.add("active");
}




function searchProducts(){

    const searchValue =
        document.getElementById("searchInput")
        .value
        .trim()
        .toLowerCase();

    const filteredProducts =
        allProducts.filter((product)=>{

            const productName =
                product.name
                ? product.name.toLowerCase()
                : "";

            const matchSearch =
                productName.includes(searchValue);

            const matchCategory =
                currentCategory === "All" ||
                product.category === currentCategory;

            return matchSearch && matchCategory;
        });

    displayProducts(filteredProducts);
}
 
window.searchProducts = searchProducts;

  
  loadProducts();

  const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
});

  
  
  

  
  
 





