import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
  import { getAnalytics} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-analytics.js";
  import {getAuth, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";
  import { getFirestore,addDoc,collection, getDocs,deleteDoc,doc,updateDoc} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";
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
  const auth=getAuth(app);
  const db=getFirestore(app);

  onAuthStateChanged(auth,(user)=>{
    if(!user){
      window.location.href="admin.html";
    }
  });


  window.uploadProduct=async function(){
    const category=document.getElementById("productCategory").value;
    const name=document.getElementById("productName").value;
    const price=document.getElementById("productPrice").value;
    const file=document.getElementById("productImage").files[0];

    if(!category||!name||!price||!file){
      alert("Fill all the fields");
      return;
    }

    try{
      const formData = new FormData();

      formData.append("file",file);

      formData.append(
        "upload_preset",
        "product_images"
      );
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/duxa3v6nl/image/upload",
        {
          method:"POST",
          body:formData
        }
      );
      const data=await response.json();
      const imageURL=data.secure_url;

      await addDoc(collection(db,"products"),
    {
      category:category,
      name:name,
      price:price,
      image:imageURL
    });

    alert("Product Added Succesfully");
    }

    catch(error){
      console.log(error);
      alert("Upload Failed"+error);
    }
  }

  async function  loadProducts(){

    const adminProducts = document.getElementById("adminProducts");

    adminProducts.innerHTML="";

    const querySnapshot = await getDocs(collection(db,"products"));

    querySnapshot.forEach((products)=>{
      const data = products.data();

      const id=products.id;

      adminProducts.innerHTML +=`
      <div class="product-card">
        <img src="${data.image}">
        <div class="product-info">
          <h3>${data.name}</h3>
          <p>₹${data.price}</p>
          <button onclick="editProduct(
          '${id}', 
          '${data.name}',
          '${data.price}')">Edit</button>

          <button onclick="deleteProduct('${id}')">Delete</button>`;
    });
   

  }
 window.editProduct= async function(id, name, price){
        const newName= prompt("Enter a New Name",name);
        const newPrice= prompt("Enter a Price",price);
        if (newName && newPrice){
          await updateDoc(doc(db,"products",id),
        {
          name:newName,
          price:newPrice
        });
        loadProducts();
        }
    }

    window.deleteProduct=async function(id){
      const confirmDelete = confirm("Delete this product?");

      if(confirmDelete){
        await deleteDoc(doc(db,"products",id));
        loadProducts();
      }
    }

  loadProducts();

