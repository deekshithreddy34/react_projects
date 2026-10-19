import { useEffect, useState } from 'react'

import './App.css'

type ProductCardProps={
  image:string;
  title:string

}

const ProductCard=({image,title}:ProductCardProps)=>{
  return <div className='product-card'>
    <img src={image} alt={title} className='product-img' />
<span >{title}</span>
  </div>

}

const PAGE_SIZE=10

function App() {
  const [products, setProducts] = useState([])
  const [currentPage,setCurrentPage]=useState(0)
  const fetchdata=async ()=>{
    const data=await fetch("https://dummyjson.com/products?limit=500")
    const res=await data.json()
    console.log(res)
    setProducts(res.products)
  }

  const handlePageChange=(n:number)=>{
    setCurrentPage(n)
  }

  const handleNext=()=>{
      setCurrentPage((prev) => prev+1);
  }

  const handlePrev=()=>{
       setCurrentPage((prev) => prev-1)
  }
  

  useEffect(()=>{
    fetchdata()
  },[])
  const start=currentPage * PAGE_SIZE
  const end=start+PAGE_SIZE
  const totalProducts=products.length;

  const noOfPages=Math.ceil(totalProducts/PAGE_SIZE)

  return !products.length ? <h1>"NO PRODUCTS FOUND" </h1>:(
    <div>
        <h1>
          Pagination
        </h1>

       
      <div className='pages'>
         <button disabled={currentPage===0} onClick={handlePrev}>⬅️</button>
    {[...Array(noOfPages).keys()].map(n => <span className={"page-number" + (n=== currentPage ? "active" : "")}  key={n} onClick={()=>handlePageChange(n)}>{n}</span>)}
     <button disabled={currentPage===noOfPages-1} onClick={handleNext}>➡️</button>
  </div>
        <div className='products-container'>
      {products.slice(start,end).map((p)=><ProductCard key={p.id} image={p.thumbnail}  title={p.title}></ProductCard>)}
</div>

  
    </div>
  )
}

export default App
