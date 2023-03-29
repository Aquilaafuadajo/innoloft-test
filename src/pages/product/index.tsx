import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
import {
  InnoChevronRight,
  InnoClock,
  InnoHome,
  InnoInvestor,
  InnoLocation,
  InnoPatent,
  InnoStrategy,
  InnoTechnologist,
} from '../../assets/icons';
import { InnoLogoColored } from '../../assets/images';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getProduct } from '../../store/productReducer';

const Product: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const {
    product: { loading, product },
    configuration: { config },
  } = useAppSelector((state) => state);

  useEffect(() => {
    const fetchProducts = () => {
      const action = getProduct(productId as string);
      dispatch(action);
    };
    if (!product) {
      fetchProducts();
    }
  }, [dispatch, product, productId]);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <main className="w-full md:ml-8">
      <div className="flex items-center pt-3 pb-5">
        <InnoHome className="mr-3" />
        <InnoChevronRight className="mr-3" />
        <span className="mr-3">Offers</span>
        <InnoChevronRight className="mr-3" />
        <span className="font-semibold">{product?.name}</span>
        <button
          onClick={() => navigate(`/product/edit/${productId}`)}
          className="ml-auto text-white text-sm px-3 py-2 rounded bg-[#272E71]"
        >
          Edit
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
            <img src={product?.picture} alt="product" className="w-full" />
          </div>
          <div className="p-5">
            <h4 className="font-semibold mb-3">{product?.name}</h4>
            <ReactQuill
              className="inno-editor-readonly mb-3"
              theme="snow"
              readOnly
              modules={{ toolbar: false }}
              value={product?.description}
            />
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
        <div className="flex justify-center w-full max-w-[715px] ml-auto mr-auto">
          <iframe
            title="video"
            className="w-full h-[400px]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            src={product?.video}
          />
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
                {product?.categories?.map((category) => (
                  <li
                    key={category.id}
                    className="rounded-full px-4 py-1 bg-slate-200 mr-3 mb-3"
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex w-full max-w-[525px]">
            <InnoStrategy />
            <div>
              <p className="mb-2.5">Business Model</p>
              <ul className="flex flex-wrap">
                {product?.businessModels?.map((model) => (
                  <li
                    key={model.id}
                    className="rounded-full px-4 py-1 bg-slate-200 mr-3 mb-3"
                  >
                    {model.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full mb-8">
          <div className="flex w-full max-w-[525px]">
            <InnoClock />
            <div>
              <p className="mb-2.5">TLR</p>
              <ul className="flex">
                <li className="rounded-full px-4 py-1 bg-slate-200 mr-3">
                  {product?.trl?.name}
                </li>
              </ul>
            </div>
          </div>
          <div className="flex w-full max-w-[525px]">
            <InnoInvestor />
            <div>
              <p className="mb-2.5">Cost</p>
              <ul className="flex">
                <li className="rounded-full px-4 py-1 bg-slate-200 mr-3">
                  {product?.investmentEffort}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Product;
