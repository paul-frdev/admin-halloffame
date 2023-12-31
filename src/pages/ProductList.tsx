import React, { useEffect, useState } from "react";
import { Empty, Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import { deleteProductById, getProducts, resetStateProduct } from '../store/productSlice';
import { Modal } from '../modals/Modal';
import { Button } from '../components/ui/Button';
import { toast } from 'react-toastify';
import { Loader } from '../components/ui/Loader';



const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a: any, b: any) => a.title.length - b.title.length,
  },
  {
    title: "Brands",
    dataIndex: "brands",
    sorter: (a: any, b: any) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a: any, b: any) => a.category.length - b.category.length,
  },
  {
    title: "Colors",
    dataIndex: "color",
  },
  {
    title: "Prices",
    dataIndex: "price",
    sorter: (a: any, b: any) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

let locale = {
  emptyText: <Empty />
};

export const ProductList = () => {

  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");

  const dispatch = useAppDispatch()
  const { products, isLoading } = useAppSelector((state: RootState) => state.products);


  useEffect(() => {
    dispatch(resetStateProduct())
    dispatch(getProducts())
  }, [])

  const product: any = [];
  for (let i = 0; i < products?.length!; i++) {
    const productArray: any = products?.[i];

    product.push({
      key: i + 1,
      title: productArray.product_title,
      brands: productArray.brands,
      category: productArray.categorytitle,
      color: productArray.colors,
      price: `${productArray.price}`,
      action: (
        <span className='flex justify-start items-center'>
          <Link to="/" className=" fs-3 mr-4 text-[#ef090d]">
            <BiEdit />
          </Link>
          <Button className="ms-3 fs-3 text-[#ef090d] bg-transparent border-0" onClick={() => showModal(productArray.product_id)}>
            <AiFillDelete />
          </Button>
        </span>
      ),
    })

  }
  const showModal = (e: string) => {
    setOpen(true);
    setProductId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteProduct = (e: string) => {
    try {
      dispatch(deleteProductById(e));
      setOpen(false);
      toast.success('Event deleted successfully')
      setTimeout(() => {
        dispatch(getProducts());
      }, 100);
    } catch (error) {
      toast.error(`Something went wrong, ${error}`)
    }
  };

  return (
    <div>
      <h3 className="mb-4 title">Product List</h3>
      <div>
        <Table
          columns={columns}
          dataSource={product}
          loading={{ indicator: <Loader />, spinning: isLoading }}
          locale={locale}
        />
        <Modal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteProduct(productId)
          }}
          title="Are you sure you want to delete product?"
        />
      </div>
    </div>
  )
}
