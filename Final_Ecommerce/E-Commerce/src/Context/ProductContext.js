import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
const ProductContext = createContext()


export const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState([])
  const [categories, setCategories] = useState()
  const [category, setCategory] = useState("/products")
  const [productID, setProductID] = useState("")
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(false)

  

  useEffect(() => {
    setLoading(true)
    const getProductData = async () => {
      
        await axios.get(`http://localhost:5000/detail/product`).then((res) => {
          setProductList(res.data.result)
          setLoading(false)
        })
      
    }
    getProductData()
  }, [])
  
  const values = {
    productList,
    setCategory,
    loading,
  }
console.log(values)
  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  )
}

export const useProduct = () => useContext(ProductContext)