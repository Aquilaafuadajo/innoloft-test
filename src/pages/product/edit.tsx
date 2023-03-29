import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import {
  InnoPatent,
  InnoLocation,
  InnoCheckmark,
  InnoClock,
  InnoInvestor,
  InnoStrategy,
  InnoTechnologist,
  InnoCancel,
} from '../../assets/icons';
import { InnoLogoColored } from '../../assets/images';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { Item, Product } from '../../types';
import { getProduct, updateProduct } from '../../store/productReducer';
import { unwrapResult } from '@reduxjs/toolkit';
import { trlApi } from '../../api';

const EditProduct: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [tempProduct, setTempProduct] = React.useState<Product>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { productId } = useParams();
  const {
    product: { product },
    configuration: { config },
  } = useAppSelector((state) => state);
  const [trls, setTrls] = React.useState<Item[]>();
  const [newCategory, setNewCategory] = React.useState('');
  const [newBusinessModel, setNewBusinessModel] = React.useState('');
  const [investmentEffort, setInvestmentEffort] = React.useState('');

  const handleUpdateProduct = () => {
    setLoading(true);
    const action = updateProduct(tempProduct as Product);
    dispatch(action)
      .then(unwrapResult)
      .then(() => {
        setLoading(false);
        alert('Update Successful');
      })
      .catch(() => {
        alert('An Error Occured');
        setLoading(false);
      });
  };

  useEffect(() => {
    const asyncEffect = async () => {
      const fetchProducts = () => {
        const action = getProduct(productId as string);
        dispatch(action);
      };
      if (!product) {
        fetchProducts();
      } else {
        setTempProduct(product);
      }
      if (!trls?.length) {
        trlApi
          .getTrl()
          .then((d) => d)
          .then((d) => setTrls(d as unknown as Item[]));
      }
    };
    asyncEffect();
  }, [dispatch, product, productId, trls?.length]);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>, key: string) => {
    e.preventDefault();

    switch (key) {
      case 'investmentEffort':
        setTempProduct({ ...tempProduct, investmentEffort });
        setInvestmentEffort('');
        break;
      case 'businessModels':
        setTempProduct({
          ...tempProduct,
          [key]: [
            ...((tempProduct as Product)[key] as Item[]),
            { name: newBusinessModel, id: Math.random().toString() },
          ],
        });
        setNewBusinessModel('');
        break;
      case 'categories':
        setTempProduct({
          ...tempProduct,
          [key]: [
            ...((tempProduct as Product)[key] as Item[]),
            { name: newCategory, id: Math.random().toString() },
          ],
        });
        setNewCategory('');
        break;
      default:
        break;
    }
  };

  const handleDelete = (id: string, key: string) => {
    const filtered = tempProduct
      ? tempProduct[key]?.filter((category: Item) => category.id !== id)
      : [];
    setTempProduct({
      ...tempProduct,
      [key]: filtered,
    });
  };

  return !tempProduct ? (
    <></>
  ) : (
    <main className="w-full md:ml-8">
      <div className="flex items-center pt-3 pb-5">
        <p className="text-normal font-semibold mb-5">Offer Title</p>
        <button
          onClick={() => navigate(`/product/${productId}`)}
          className="ml-auto text-white text-sm px-3 py-2 rounded bg-[#272E71]"
        >
          View Offer
        </button>
      </div>
      <div className="flex flex-col md:flex-row border border-gray-300 rounded mb-6">
        <div className="flex flex-col w-full relative">
          <p className="flex absolute t-0 l-0">
            <InnoPatent />
            <span className="flex items-center bg-white font-semibold px-4 rounded-br-md">
              Patent
            </span>
          </p>
          <div className="w-full max-h-[300px] overflow-hidden">
            <img src={tempProduct?.picture} alt="" className="w-full" />
          </div>
          <div className="p-5">
            <input
              className="bg-inherit font-semibold focus:outline-none w-full border border-gray-300 rounded-md px-4 py-1 mb-3"
              type="text"
              value={tempProduct?.name}
              onChange={(e) =>
                setTempProduct({ ...tempProduct, name: e.target.value })
              }
            />
            <ReactQuill
              className="inno-editor mb-3"
              theme="snow"
              value={tempProduct?.description}
              onChange={(v) =>
                setTempProduct({ ...tempProduct, description: v })
              }
            />
            <div className="flex ml-auto w-max">
              <button
                disabled={loading}
                className="text-sm px-3 py-2 rounded bg-inherit"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProduct}
                disabled={loading}
                className="text-white text-sm px-3 py-2 rounded-md bg-[#9296B9] flex items-center"
              >
                <InnoCheckmark className="mr-2" />
                {loading ? 'saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
        {config?.hasUserSection && (
          <div className="flex flex-col w-[380px] p-5 border-l border-gray-300">
            <p className="font-semibold mb-5">Offered by</p>
            <InnoLogoColored className="mb-5" />
            <div className="flex items-start w-full mb-5">
              <div className="border border-white rounded-full w-14 h-14 overflow-hidden mr-3.5">
                <img
                  src={product?.user?.profilePicture}
                  alt={`${product?.user?.firstName} ${product?.user?.lastName}`}
                  className="w-full"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-semibold">{`${product?.user?.firstName} ${product?.user?.lastName}`}</p>
                <p className="text-lg">{product?.company?.name}</p>
              </div>
            </div>
            <div className="flex items-center mb-3">
              <InnoLocation />
              <p className="max-w-[160px]">
                {`${product?.company?.address.street}, ${product?.company?.address.city.name}, ${product?.company?.address.country.name}`}
              </p>
            </div>
            <iframe
              title="address"
              width="300"
              height="170"
              src="https://maps.google.com/maps?q=50.779729,6.100367&hl=es&z=14&amp;output=embed"
            />
          </div>
        )}
      </div>
      <div className="flex flex-col border border-gray-300 rounded p-5 mb-6">
        <p className="text-normal font-semibold mb-5">Video</p>
        <input
          className="bg-inherit focus:outline-none w-full border border-gray-300 rounded-md px-4 py-1 mb-3"
          type="text"
          placeholder="Add a youtube or vimeo link"
          value={tempProduct?.picture}
          onChange={(e) =>
            setTempProduct({ ...tempProduct, picture: e.target.value })
          }
        />
        <div className="flex ml-auto w-max">
          <button
            disabled={loading}
            className="text-sm px-3 py-2 rounded bg-inherit"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateProduct}
            disabled={loading}
            className="text-white text-sm px-3 py-2 rounded-md bg-[#9296B9] flex items-center"
          >
            <InnoCheckmark className="mr-2" />
            {loading ? 'saving...' : 'Save'}
          </button>
        </div>
      </div>
      <div className="flex flex-col border border-gray-300 rounded p-5 mb-6">
        <p className="text-normal font-semibold mb-5">Offer details</p>
        <div className="flex flex-col md:flex-row w-full mb-8">
          <div className="flex w-full max-w-[525px]">
            <InnoTechnologist />
            <div>
              <p className="mb-2.5">Technology</p>
              <ul className="flex flex-wrap">
                {tempProduct?.categories?.map((category) => (
                  <li
                    key={category.id}
                    className="rounded-full px-4 py-1 bg-slate-200 mr-3 mb-3"
                  >
                    {category.name}
                    <button
                      className="p2"
                      onClick={() => handleDelete(category.id, 'categories')}
                    >
                      <InnoCancel className="ml-3" />
                    </button>
                  </li>
                ))}
              </ul>
              <form onSubmit={(e) => handleAdd(e, 'categories')}>
                <input
                  name="category"
                  className="bg-inherit focus:outline-none w-1/2 border border-gray-300 rounded-md px-4 py-1 mb-3"
                  type="text"
                  placeholder="Add new"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </form>
            </div>
          </div>
          <div className="flex w-full max-w-[525px]">
            <InnoStrategy />
            <div>
              <p className="mb-2.5">Business Model</p>
              <ul className="flex flex-wrap">
                {tempProduct?.businessModels?.map((model) => (
                  <li
                    key={model.id}
                    className="rounded-full px-4 py-1 bg-slate-200 mr-3 mb-3"
                  >
                    {model.name}
                    <button
                      className="p2"
                      onClick={() => handleDelete(model.id, 'businessModels')}
                    >
                      <InnoCancel className="ml-3" />
                    </button>
                  </li>
                ))}
              </ul>
              <form onSubmit={(e) => handleAdd(e, 'businessModels')}>
                <input
                  name="category"
                  className="bg-inherit focus:outline-none w-1/2 border border-gray-300 rounded-md px-4 py-1 mb-3"
                  type="text"
                  placeholder="Add new"
                  value={newBusinessModel}
                  onChange={(e) => setNewBusinessModel(e.target.value)}
                />
              </form>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full mb-8">
          <div className="flex w-full max-w-[525px]">
            <InnoClock />
            <div>
              <p className="mb-2.5">TLR</p>
              <select
                className="rounded-full px-4 py-1 bg-slate-200 mr-3 focus:outline-none w-full max-w-[400px]"
                name="trls"
                id="trls"
                value={tempProduct?.trl?.id}
                onChange={(e) => e}
              >
                {trls?.map((trl) => (
                  <option key={trl.id} value={trl.id}>
                    {trl.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex w-full max-w-[525px]">
            <InnoInvestor />
            <div>
              <p className="mb-2.5">Cost</p>
              <ul className="flex">
                <li className="rounded-full px-4 py-1 bg-slate-200 mr-3 flex items-center mb-3">
                  {tempProduct?.investmentEffort}
                </li>
              </ul>
              <form onSubmit={(e) => handleAdd(e, 'investmentEffort')}>
                <input
                  name="category"
                  className="bg-inherit focus:outline-none w-1/2 border border-gray-300 rounded-md px-4 py-1 mb-3"
                  type="text"
                  placeholder="Add new"
                  value={investmentEffort}
                  onChange={(e) => setInvestmentEffort(e.target.value)}
                />
              </form>
            </div>
          </div>
        </div>
        <div className="flex ml-auto w-max">
          <button
            disabled={loading}
            className="text-sm px-3 py-2 rounded bg-inherit"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateProduct}
            disabled={loading}
            className="text-white text-sm px-3 py-2 rounded-md bg-[#9296B9] flex items-center"
          >
            <InnoCheckmark className="mr-2" />
            {loading ? 'saving...' : 'Save'}
          </button>
        </div>
      </div>
    </main>
  );
};

export default EditProduct;
