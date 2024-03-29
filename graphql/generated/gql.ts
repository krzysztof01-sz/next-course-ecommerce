/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "fragment FullProduct on Product {\n  id\n  title\n  slug\n  description\n  longDescription\n  rating\n  price\n  image {\n    id\n    width\n    height\n    url(transformation: {image: {resize: {width: 800, height: 400}}})\n  }\n}": types.FullProductFragmentDoc,
    "fragment LightProduct on Product {\n  id\n  title\n  slug\n  image {\n    id\n    width\n    height\n    url(transformation: {image: {resize: {width: 800, height: 400}}})\n  }\n}": types.LightProductFragmentDoc,
    "mutation CreateOrder($order: OrderCreateInput!) {\n  createOrder(data: $order) {\n    id\n    email\n    products {\n      title\n      id\n    }\n  }\n}": types.CreateOrderDocument,
    "mutation CreateProductReview($review: ReviewCreateInput!) {\n  createReview(data: $review) {\n    id\n    title\n    content\n    rating\n  }\n}": types.CreateProductReviewDocument,
    "mutation PublishProductReview($id: ID!) {\n  publishReview(to: PUBLISHED, where: {id: $id}) {\n    stage\n  }\n}": types.PublishProductReviewDocument,
    "query GetAllProducts {\n  products {\n    ...LightProduct\n  }\n}": types.GetAllProductsDocument,
    "query GetAllProductsSlug {\n  products {\n    slug\n  }\n}": types.GetAllProductsSlugDocument,
    "query GetHomepageProducts {\n  products(first: 2) {\n    id\n    title\n    slug\n    rating\n    description\n    image {\n      id\n      width\n      height\n      url(transformation: {image: {resize: {width: 800, height: 400}}})\n    }\n  }\n}": types.GetHomepageProductsDocument,
    "query GetProductDetails($slug: String!) {\n  product(where: {slug: $slug}) {\n    ...FullProduct\n  }\n}": types.GetProductDetailsDocument,
    "query GetProductReviews($slug: String!) {\n  product(where: {slug: $slug}) {\n    reviews(orderBy: createdAt_DESC) {\n      id\n      title\n      content\n      rating\n    }\n  }\n}": types.GetProductReviewsDocument,
    "query GetPageProducts($first: Int!, $skip: Int!) {\n  productsConnection(first: $first, skip: $skip) {\n    edges {\n      node {\n        ...LightProduct\n      }\n    }\n    aggregate {\n      count\n    }\n  }\n}": types.GetPageProductsDocument,
};

export function graphql(source: "fragment FullProduct on Product {\n  id\n  title\n  slug\n  description\n  longDescription\n  rating\n  price\n  image {\n    id\n    width\n    height\n    url(transformation: {image: {resize: {width: 800, height: 400}}})\n  }\n}"): (typeof documents)["fragment FullProduct on Product {\n  id\n  title\n  slug\n  description\n  longDescription\n  rating\n  price\n  image {\n    id\n    width\n    height\n    url(transformation: {image: {resize: {width: 800, height: 400}}})\n  }\n}"];
export function graphql(source: "fragment LightProduct on Product {\n  id\n  title\n  slug\n  image {\n    id\n    width\n    height\n    url(transformation: {image: {resize: {width: 800, height: 400}}})\n  }\n}"): (typeof documents)["fragment LightProduct on Product {\n  id\n  title\n  slug\n  image {\n    id\n    width\n    height\n    url(transformation: {image: {resize: {width: 800, height: 400}}})\n  }\n}"];
export function graphql(source: "mutation CreateOrder($order: OrderCreateInput!) {\n  createOrder(data: $order) {\n    id\n    email\n    products {\n      title\n      id\n    }\n  }\n}"): (typeof documents)["mutation CreateOrder($order: OrderCreateInput!) {\n  createOrder(data: $order) {\n    id\n    email\n    products {\n      title\n      id\n    }\n  }\n}"];
export function graphql(source: "mutation CreateProductReview($review: ReviewCreateInput!) {\n  createReview(data: $review) {\n    id\n    title\n    content\n    rating\n  }\n}"): (typeof documents)["mutation CreateProductReview($review: ReviewCreateInput!) {\n  createReview(data: $review) {\n    id\n    title\n    content\n    rating\n  }\n}"];
export function graphql(source: "mutation PublishProductReview($id: ID!) {\n  publishReview(to: PUBLISHED, where: {id: $id}) {\n    stage\n  }\n}"): (typeof documents)["mutation PublishProductReview($id: ID!) {\n  publishReview(to: PUBLISHED, where: {id: $id}) {\n    stage\n  }\n}"];
export function graphql(source: "query GetAllProducts {\n  products {\n    ...LightProduct\n  }\n}"): (typeof documents)["query GetAllProducts {\n  products {\n    ...LightProduct\n  }\n}"];
export function graphql(source: "query GetAllProductsSlug {\n  products {\n    slug\n  }\n}"): (typeof documents)["query GetAllProductsSlug {\n  products {\n    slug\n  }\n}"];
export function graphql(source: "query GetHomepageProducts {\n  products(first: 2) {\n    id\n    title\n    slug\n    rating\n    description\n    image {\n      id\n      width\n      height\n      url(transformation: {image: {resize: {width: 800, height: 400}}})\n    }\n  }\n}"): (typeof documents)["query GetHomepageProducts {\n  products(first: 2) {\n    id\n    title\n    slug\n    rating\n    description\n    image {\n      id\n      width\n      height\n      url(transformation: {image: {resize: {width: 800, height: 400}}})\n    }\n  }\n}"];
export function graphql(source: "query GetProductDetails($slug: String!) {\n  product(where: {slug: $slug}) {\n    ...FullProduct\n  }\n}"): (typeof documents)["query GetProductDetails($slug: String!) {\n  product(where: {slug: $slug}) {\n    ...FullProduct\n  }\n}"];
export function graphql(source: "query GetProductReviews($slug: String!) {\n  product(where: {slug: $slug}) {\n    reviews(orderBy: createdAt_DESC) {\n      id\n      title\n      content\n      rating\n    }\n  }\n}"): (typeof documents)["query GetProductReviews($slug: String!) {\n  product(where: {slug: $slug}) {\n    reviews(orderBy: createdAt_DESC) {\n      id\n      title\n      content\n      rating\n    }\n  }\n}"];
export function graphql(source: "query GetPageProducts($first: Int!, $skip: Int!) {\n  productsConnection(first: $first, skip: $skip) {\n    edges {\n      node {\n        ...LightProduct\n      }\n    }\n    aggregate {\n      count\n    }\n  }\n}"): (typeof documents)["query GetPageProducts($first: Int!, $skip: Int!) {\n  productsConnection(first: $first, skip: $skip) {\n    edges {\n      node {\n        ...LightProduct\n      }\n    }\n    aggregate {\n      count\n    }\n  }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;