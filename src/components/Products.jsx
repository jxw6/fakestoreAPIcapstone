import { useEffect, useState } from "react";
import { getProducts } from "../API";

export default function Products({ token, navigate}) {
    const [productsList, setProductsList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [filter, setFilter] = useState("");
    const [sorting, setSorting] = useState({ field: "title", ascending: true })

    function handleClick(e) {
        e.preventDefault();
    }

    function filterUpdate(e) {
        e.preventDefault();
        setFilter(e.target.value);
    }

    function applySorting(key, ascending) {
        setSorting({ key: key, ascending: ascending });
    }

    function getClassNameFor(name) {
        if (!sorting) {
            return;
        }
        console.log('Classname:')
        console.log(sorting.key === name ? sorting.ascending.toString() : undefined)
        return (sorting.key === name ? sorting.ascending.toString() : undefined);
    }

    useEffect(()=>{
        getProducts(setProductsList);
    },[]);

    useEffect(() => {
        const productsListCopy = [...productsList];
        const sortedProductsList = productsListCopy.sort((a, b) => {
            if (a[sorting.key] < b[sorting.key]) { return 1}
            if (a[sorting.key] > b[sorting.key]) { return -1}
            return 0
          });
        setProductsList(sorting.ascending ? sortedProductsList : sortedProductsList.reverse())
    }, [sorting]);

    return (
        <>
            <div className ='searchBar'>
                Search:
                <input className="productSearch" onChange={filterUpdate} type="search" />
            </div>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => applySorting('title', !sorting.ascending)} className={'a'+ getClassNameFor('title')}>Name</th>
                        <th>Product Image</th>
                        <th onClick={() => applySorting('price', !sorting.ascending)} className={'a'+ getClassNameFor('price')}>Price</th>
                        <th></th>
                    </tr>
                    <tr>
                        <th><hr></hr></th>
                        <th><hr></hr></th>
                        <th><hr></hr></th>
                        <th><hr></hr></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    </tr>
                    {console.log(productsList)}
                    {productsList.filter((product) =>
                 product.title.toUpperCase().includes(filter.toUpperCase()) || product.category.toUpperCase().includes(filter.toUpperCase())).map((product) => {
                    return (
                        <>
                        <tr className="productRow">
                            <td className='productTitle' onClick={() => {
                            setSelectedProduct(product.id);
                            navigate(`/products/${product.id}`);
                         }}>{product.title}</td>
                            <td className='productImage' onClick={() => {
                            setSelectedProduct(product.id);
                            navigate(`/products/${product.id}`);
                         }}><img src={product.image}/></td>
                            <td className='price'>${product.price}</td>
                            <td><button onClick={handleClick} >Add to Cart</button></td>
                         </tr>
                         <tr>
                            <td><hr></hr></td>
                            <td><hr></hr></td>
                            <td><hr></hr></td>
                            <td><hr></hr></td>
                         </tr>
                         </>
                    )
                 })}
                </tbody>
            </table>
        </>
    )
}