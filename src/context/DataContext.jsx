import { createContext, useContext, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const DataContext = createContext(null);

export const DataProvider = ({children})=>{
    const[data,setData] = useState()
    const [cartItem,setCartItem] = useState([]); // thi is for add to cart 

    // this fumction for add to cart  or agar ek item ko do bar karege to quanttity bdhegi
    const addToCart = (product)=>{
       // console.log("Adding item to cart:", itemtocart);
       const itenInCart = cartItem.find((item)=> item.id===product.id);
       if(itenInCart)
       {
        // in quantity in cart
        const updatedCart = cartItem.map((item)=>item.id===product.id?{...item,quantity: item.quantity+1}:item)
        setCartItem(updatedCart);
        toast.success("Product quantity increased!")
       }
       else{
        setCartItem([...cartItem,{...product,quantity:1}])
        toast.success("Item added to cart! ")
       }
    }
    // cart me quantity ko + - ka button pr set karne k liye
    const updateQuantity = (cartItem,productId,action)=>{
        setCartItem(cartItem.map(item=>{
            if(item.id===productId){
                let newUnit = item.quantity;
                if(action==="increase")
                {
                   newUnit =   newUnit+1
                    toast.success(" Quantity increased!")
                }
                else if(action==="decrease")
                {
                   newUnit =  newUnit-1
                   toast.success(" Quantity decreased!")
                }
                return newUnit>0?{...item,quantity:newUnit}:null
            }
            return item
        }).filter(item=>item!=null)) //remover item 
    }

    // delete button cart se hatane k liye 

    const deleteItem = (productId)=>{
        setCartItem(cartItem.filter(item=>item.id!==productId))
        toast.success(" Item deleted !")
    }
    // fetching all product from api 

  const fetchAllProduct =async()=>{
      try {
         const res = await axios.get('https://dummyjson.com/products?limit=150') // this link get from fack store api 
         //console.log(res.data.products);
         const productData =res.data.products
         setData(productData);
      } catch (error) {
        console.log(error);
      }
  }    

  // category data 
   const getUniqueCategory = (data,property)=>{
          let newVal = data?.map((curElem)=>{
              return curElem[property]
          })
          newVal = ["All",...new Set(newVal)]
          return newVal
      }
  
      const categoryOnlyData = getUniqueCategory(data,"category")
      const brandOnlyData = getUniqueCategory(data,"brand")
      //console.log(brandOnlyData);
    return <DataContext.Provider value={{data,setData,fetchAllProduct,categoryOnlyData,brandOnlyData,cartItem,setCartItem,addToCart,updateQuantity,deleteItem}}>
        {children}
    </DataContext.Provider>
}

export const getData = ()=> useContext(DataContext);